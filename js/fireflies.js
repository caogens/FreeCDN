/**
 * 梦幻萤火虫光斑背景特效
 * 纯原生 JS 封装，低功耗、发光呼吸感、全穿透
 */
(function (window, document) {
    'use strict';

    function initFireflies() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initFireflies);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'fireflies-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:-1;background:transparent;';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var cw = 0, ch = 0;
        var flies = [];
        var flyCount = 45;

        function resize() {
            cw = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            ch = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            flyCount = Math.floor((cw * ch) / 25000);
            createFlies();
        }

        function Firefly() {
            this.reset(true);
        }

        Firefly.prototype.reset = function (isInit) {
            this.x = Math.random() * cw;
            this.y = isInit ? Math.random() * ch : ch + 20;
            this.radius = Math.random() * 2.5 + 1.5;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = -(Math.random() * 0.7 + 0.3);
            this.alpha = 0;
            this.maxAlpha = Math.random() * 0.7 + 0.3;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.angle = Math.random() * Math.PI * 2;
            this.hue = Math.random() < 0.6 ? 50 : 80; // 50: 暖金黄, 80: 萤火青绿
        };

        Firefly.prototype.update = function () {
            this.angle += this.pulseSpeed;
            this.alpha = (Math.sin(this.angle) + 1) / 2 * this.maxAlpha;
            this.x += this.vx + Math.sin(this.angle * 0.5) * 0.3;
            this.y += this.vy;

            if (this.y < -30 || this.x < -30 || this.x > cw + 30) {
                this.reset(false);
            }
        };

        Firefly.prototype.draw = function () {
            if (this.alpha <= 0.01) return;

            // 绘制柔和呼吸光晕
            var glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
            glow.addColorStop(0, 'hsla(' + this.hue + ', 100%, 75%, ' + this.alpha + ')');
            glow.addColorStop(0.3, 'hsla(' + this.hue + ', 100%, 65%, ' + (this.alpha * 0.5) + ')');
            glow.addColorStop(1, 'hsla(' + this.hue + ', 100%, 50%, 0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // 核心高亮点
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.alpha * 0.9) + ')';
            ctx.fill();
        };

        function createFlies() {
            flies = [];
            for (var i = 0; i < flyCount; i++) {
                flies.push(new Firefly());
            }
        }

        window.addEventListener('resize', resize);
        resize();

        function render() {
            ctx.clearRect(0, 0, cw, ch);
            for (var i = 0; i < flies.length; i++) {
                flies[i].update();
                flies[i].draw();
            }
            window.requestAnimationFrame(render);
        }

        render();
    }

    initFireflies();
})(window, document);
