/**
 * 表面水波质点模型
 */
class SurfacePoint {
    static SPRING_CONSTANT = 0.03;
    static SPRING_FRICTION = 0.9;
    static WAVE_SPREAD = 0.3;
    static ACCELERATION_RATE = 0.01;

    constructor(renderer, x) {
        this.renderer = renderer;
        this.x = x;
        this.previous = null;
        this.next = null;
        this.init();
    }

    init() {
        this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
        this.height = this.initHeight;
        this.fy = 0;
        this.force = { previous: 0, next: 0 };
    }

    setPreviousPoint(previous) {
        this.previous = previous;
    }

    setNextPoint(next) {
        this.next = next;
    }

    interfere(y, velocity) {
        const direction = (this.renderer.height - this.height - y) >= 0 ? -1 : 1;
        this.fy = this.renderer.height * SurfacePoint.ACCELERATION_RATE * direction * Math.abs(velocity);
    }

    updateSelf() {
        this.fy += SurfacePoint.SPRING_CONSTANT * (this.initHeight - this.height);
        this.fy *= SurfacePoint.SPRING_FRICTION;
        this.height += this.fy;
    }

    updateNeighbors() {
        if (this.previous) {
            this.force.previous = SurfacePoint.WAVE_SPREAD * (this.height - this.previous.height);
        }
        if (this.next) {
            this.force.next = SurfacePoint.WAVE_SPREAD * (this.height - this.next.height);
        }
    }

    render(context) {
        if (this.previous) {
            this.previous.height += this.force.previous;
            this.previous.fy += this.force.previous;
        }
        if (this.next) {
            this.next.height += this.force.next;
            this.next.fy += this.force.next;
        }
        context.lineTo(this.x, this.renderer.height - this.height);
    }
}

/**
 * 游动与跳跃飞鱼模型
 */
class Fish {
    static GRAVITY = 0.4;

    constructor(renderer) {
        this.renderer = renderer;
        this.init();
    }

    static getRandom(min, max) {
        return min + (max - min) * Math.random();
    }

    init() {
        this.direction = Math.random() < 0.5;
        this.x = this.direction ? (this.renderer.width + this.renderer.THRESHOLD) : -this.renderer.THRESHOLD;
        this.previousY = this.y || 0;
        this.vx = Fish.getRandom(4, 10) * (this.direction ? -1 : 1);

        if (this.renderer.reverse) {
            this.y = Fish.getRandom(this.renderer.height * 0.1, this.renderer.height * 0.4);
            this.vy = Fish.getRandom(2, 5);
            this.ay = Fish.getRandom(0.05, 0.2);
        } else {
            this.y = Fish.getRandom(this.renderer.height * 0.6, this.renderer.height * 0.9);
            this.vy = Fish.getRandom(-5, -2);
            this.ay = Fish.getRandom(-0.2, -0.05);
        }

        this.isOut = false;
        this.theta = 0;
        this.phi = 0;
    }

    reverseVertical() {
        this.isOut = !this.isOut;
        this.ay *= -1;
    }

    controlStatus() {
        this.previousY = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.ay;

        const surfaceThreshold = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;

        if (this.renderer.reverse) {
            if (this.y > surfaceThreshold) {
                this.vy -= Fish.GRAVITY;
                this.isOut = true;
            } else {
                if (this.isOut) {
                    this.ay = Fish.getRandom(0.05, 0.2);
                }
                this.isOut = false;
            }
        } else {
            if (this.y < surfaceThreshold) {
                this.vy += Fish.GRAVITY;
                this.isOut = true;
            } else {
                if (this.isOut) {
                    this.ay = Fish.getRandom(-0.2, -0.05);
                }
                this.isOut = false;
            }
        }

        if (!this.isOut) {
            this.theta = (this.theta + Math.PI / 20) % (Math.PI * 2);
            this.phi = (this.phi + Math.PI / 30) % (Math.PI * 2);
        }

        // 跃出或切入水面时激起涟漪
        this.renderer.generateEpicenter(
            this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD,
            this.y,
            this.y - this.previousY
        );

        // 超出边界后重置
        if (
            (this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD) ||
            (this.vx < 0 && this.x < -this.renderer.THRESHOLD)
        ) {
            this.init();
        }
    }

    render(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.PI + Math.atan2(this.vy, this.vx));
        context.scale(1, this.direction ? 1 : -1);

        // 绘制鱼身
        context.beginPath();
        context.moveTo(-30, 0);
        context.bezierCurveTo(-20, 15, 15, 10, 40, 0);
        context.bezierCurveTo(15, -10, -20, -15, -30, 0);
        context.fill();

        // 绘制摆动的尾鳍
        context.save();
        context.translate(40, 0);
        context.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
        context.beginPath();
        context.moveTo(0, 0);
        context.quadraticCurveTo(5, 10, 20, 8);
        context.quadraticCurveTo(12, 5, 10, 0);
        context.quadraticCurveTo(12, -5, 20, -8);
        context.quadraticCurveTo(5, -10, 0, 0);
        context.fill();
        context.restore();

        // 绘制侧鳍
        context.save();
        context.translate(-3, 0);
        context.rotate((Math.PI / 3 + Math.PI / 10 * Math.sin(this.phi)) * (this.renderer.reverse ? -1 : 1));
        context.beginPath();

        if (this.renderer.reverse) {
            context.moveTo(5, 0);
            context.bezierCurveTo(10, 10, 10, 30, 0, 40);
            context.bezierCurveTo(-12, 25, -8, 10, 0, 0);
        } else {
            context.moveTo(-5, 0);
            context.bezierCurveTo(-10, -10, -10, -30, 0, -40);
            context.bezierCurveTo(12, -25, 8, -10, 0, 0);
        }

        context.closePath();
        context.fill();
        context.restore();

        context.restore();

        this.controlStatus();
    }
}

/**
 * 主渲染调度器
 */
class FishRenderer {
    POINT_INTERVAL = 5;
    FISH_COUNT = 5;
    MAX_INTERVAL_COUNT = 50;
    INIT_HEIGHT_RATE = 0.5;
    THRESHOLD = 50;
    RESIZE_DEBOUNCE_DELAY = 150;

    constructor(containerSelector = '#jsi-flying-fish-container') {
        this.container = typeof containerSelector === 'string'
            ? document.querySelector(containerSelector)
            : containerSelector;

        if (!this.container) {
            console.warn(`FishRenderer: 容器 "${containerSelector}" 未找到`);
            return;
        }

        this.points = [];
        this.fishes = [];
        this.resizeTimer = null;
        this.axis = null;
        this.reverse = false;

        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.setup();
        this.bindEvents();
        this.render();
    }

    setup() {
        this.points = [];
        this.fishes = [];
        this.intervalCount = this.MAX_INTERVAL_COUNT;

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.fishCount = (this.FISH_COUNT * this.width * this.height) / (500 * 500);

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.reverse = false;

        this.fishes.push(new Fish(this));
        this.createSurfacePoints();
    }

    createSurfacePoints() {
        const count = Math.round(this.width / this.POINT_INTERVAL);
        this.pointInterval = this.width / (count - 1);
        this.points.push(new SurfacePoint(this, 0));

        for (let i = 1; i < count; i++) {
            const point = new SurfacePoint(this, i * this.pointInterval);
            const previous = this.points[i - 1];

            point.setPreviousPoint(previous);
            previous.setNextPoint(point);
            this.points.push(point);
        }
    }

    getAxis(event) {
        const rect = this.container.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    handleResize = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.setup();
        }, this.RESIZE_DEBOUNCE_DELAY);
    };

    handleMouseEnter = (event) => {
        this.axis = this.getAxis(event);
    };

    handleMouseMove = (event) => {
        const axis = this.getAxis(event);
        if (!this.axis) {
            this.axis = axis;
        }
        this.generateEpicenter(axis.x, axis.y, axis.y - this.axis.y);
        this.axis = axis;
    };

    reverseVertical = () => {
        this.reverse = !this.reverse;
        for (const fish of this.fishes) {
            fish.reverseVertical();
        }
    };

    generateEpicenter(x, y, velocity) {
        const centerY = this.height / 2;
        if (y < centerY - this.THRESHOLD || y > centerY + this.THRESHOLD) {
            return;
        }

        const index = Math.round(x / this.pointInterval);
        if (index >= 0 && index < this.points.length) {
            this.points[index].interfere(y, velocity);
        }
    }

    bindEvents() {
        window.addEventListener('resize', this.handleResize);
        this.container.addEventListener('mouseenter', this.handleMouseEnter);
        this.container.addEventListener('mousemove', this.handleMouseMove);
        this.container.addEventListener('click', this.reverseVertical);
    }

    controlStatus() {
        for (const point of this.points) {
            point.updateSelf();
        }
        for (const point of this.points) {
            point.updateNeighbors();
        }

        if (this.fishes.length < this.fishCount) {
            if (--this.intervalCount === 0) {
                this.intervalCount = this.MAX_INTERVAL_COUNT;
                this.fishes.push(new Fish(this));
            }
        }
    }

    render = () => {
        requestAnimationFrame(this.render);

        this.controlStatus();
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = 'hsl(210, 50%, 80%)';

        // 渲染鱼群
        for (const fish of this.fishes) {
            fish.render(this.context);
        }

        // 渲染水体波浪遮罩
        this.context.save();
        this.context.globalCompositeOperation = 'xor';
        this.context.beginPath();
        this.context.moveTo(0, this.reverse ? 0 : this.height);

        for (const point of this.points) {
            point.render(this.context);
        }

        this.context.lineTo(this.width, this.reverse ? 0 : this.height);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    };
}

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    new FishRenderer('#jsi-flying-fish-container');
});
