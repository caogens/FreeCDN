/**
 * 绚丽高空烟花特效
 * 纯原生 JS 零依赖即插即用脚本，适配移动/桌面端，点击完全穿透
 */
(function (window, document) {
    'use strict';

    function initFireworks() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initFireworks);
            return;
        }

        var config = {
            showText: false, // 是否在夜空显示当前年份祝福（true: 开启文字粒子; false: 纯烟花沉浸版）
            text: new Date().getFullYear() + ' 新年快乐！', // 自动识别当前年份
            gravity: 0.08,  // 粒子重力加速度
            friction: 0.96  // 空气阻力阻尼
        };

        var canvas = document.createElement('canvas');
        canvas.id = 'fireworks-effect-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:999999;background:transparent;';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var cw = 0, ch = 0;
        var rockets = [];
        var particles = [];
        var textTargets = [];
        var counter = 0;

        function resize() {
            cw = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            ch = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            if (config.showText) {
                generateTextTargets();
            }
        }

        window.addEventListener('resize', resize);
        resize();

        function generateTextTargets() {
            textTargets = [];
            var offCanvas = document.createElement('canvas');
            var offCtx = offCanvas.getContext('2d');
            var fontSize = Math.min(Math.floor(cw / 10), 100);
            offCtx.font = 'bold ' + fontSize + 'px sans-serif';
            var tWidth = offCtx.measureText(config.text).width;
            offCanvas.width = tWidth + 20;
            offCanvas.height = fontSize * 1.5;

            offCtx.font = 'bold ' + fontSize + 'px sans-serif';
            offCtx.fillStyle = '#fff';
            offCtx.fillText(config.text, 10, fontSize);

            var imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
            var step = 4;
            var startX = (cw - offCanvas.width) / 2;
            var startY = ch * 0.22;

            for (var y = 0; y < imgData.height; y += step) {
                for (var x = 0; x < imgData.width; x += step) {
                    var idx = (y * imgData.width + x) * 4;
                    if (imgData.data[idx + 3] > 128) {
                        textTargets.push({
                            x: startX + x,
                            y: startY + y
                        });
                    }
                }
            }
        }

        // 烟花弹（火箭）
        function Rocket() {
            this.x = cw * (0.15 + Math.random() * 0.7);
            this.y = ch;
            // 目标高度位于屏幕顶部 15% ~ 35% 之间
            var targetY = ch * (0.15 + Math.random() * 0.2);
            var distance = ch - targetY;
            var g = 0.18;
            this.g = g;
            // 根据高度公式 v^2 = 2 * g * h 逆推初速度，确保在最高空滞空起爆
            this.vy = -Math.sqrt(2 * g * distance);
            this.vx = (Math.random() - 0.5) * 1.6;
            this.hue = Math.floor(Math.random() * 360);
            this.trail = [];
        }

        Rocket.prototype.update = function () {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 5) this.trail.shift();
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.g;
            return this.vy >= 0; // 到达顶点时引爆
        };

        Rocket.prototype.draw = function () {
            ctx.save();
            ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, 75%)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            if (this.trail.length > 0) {
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (var i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
            }
            ctx.stroke();
            ctx.restore();
        };

        // 爆炸粒子
        function Particle(x, y, hue, target) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            this.target = target;
            var angle = Math.random() * Math.PI * 2;
            var speed = 2 + Math.random() * 6;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = 0.012 + Math.random() * 0.015;
            this.trail = [];
        }

        Particle.prototype.update = function () {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 4) this.trail.shift();

            if (this.target) {
                var dx = this.target.x - this.x;
                var dy = this.target.y - this.y;
                this.vx += dx * 0.005;
                this.vy += dy * 0.005;
                this.vx *= 0.92;
                this.vy *= 0.92;
            } else {
                this.vx *= config.friction;
                this.vy *= config.friction;
                this.vy += config.gravity;
            }

            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            return this.alpha <= 0;
        };

        Particle.prototype.draw = function () {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, 65%)';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            if (this.trail.length > 0) {
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (var i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
            }
            ctx.stroke();
            ctx.restore();
        };

        function explode(x, y, hue) {
            var count = 55 + Math.floor(Math.random() * 25);
            for (var i = 0; i < count; i++) {
                var target = null;
                if (config.showText && textTargets.length > 0 && Math.random() < 0.6) {
                    var idx = Math.floor(Math.random() * textTargets.length);
                    target = textTargets.splice(idx, 1)[0];
                }
                particles.push(new Particle(x, y, hue, target));
            }
        }

        function loop() {
            ctx.clearRect(0, 0, cw, ch);
            counter++;

            // 发射频率
            if (counter % 35 === 0) {
                rockets.push(new Rocket());
            }

            for (var i = rockets.length - 1; i >= 0; i--) {
                rockets[i].draw();
                if (rockets[i].update()) {
                    explode(rockets[i].x, rockets[i].y, rockets[i].hue);
                    rockets.splice(i, 1);
                }
            }

            for (var j = particles.length - 1; j >= 0; j--) {
                particles[j].draw();
                if (particles[j].update()) {
                    particles.splice(j, 1);
                }
            }

            window.requestAnimationFrame(loop);
        }

        loop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFireworks);
    } else {
        initFireworks();
    }
})(window, document);
