/**
 * 3D景深漫天飘雪背景
 * 纯原生 JS 封装，多景深层叠、平滑风阻漂移、全穿透
 */
(function (window, document) {
    'use strict';

    function initSnowfall() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initSnowfall);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'snowfall-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:999999;background:transparent;';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var cw = 0, ch = 0;
        var flakes = [];
        var flakeCount = 100;
        var wind = 0;

        function resize() {
            cw = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            ch = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            flakeCount = Math.floor(cw / 12);
            createFlakes();
        }

        function Flake() {
            this.reset(true);
        }

        Flake.prototype.reset = function (isInit) {
            this.x = Math.random() * cw;
            this.y = isInit ? Math.random() * ch : -10;
            // 景深模拟：z 轴决定大小、速度和透明度
            this.z = Math.random() * 0.8 + 0.2; 
            this.radius = this.z * 3.5;
            this.vy = this.z * 1.8 + 0.6;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.alpha = this.z * 0.7 + 0.2;
            this.sway = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
        };

        Flake.prototype.update = function () {
            this.sway += this.swaySpeed;
            this.x += Math.sin(this.sway) * 0.8 + wind + this.vx;
            this.y += this.vy;

            if (this.y > ch + 10) {
                this.reset(false);
            }
            if (this.x > cw + 10) this.x = -10;
            if (this.x < -10) this.x = cw + 10;
        };

        Flake.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
            ctx.fill();
        };

        function createFlakes() {
            flakes = [];
            for (var i = 0; i < flakeCount; i++) {
                flakes.push(new Flake());
            }
        }

        window.addEventListener('resize', resize);
        resize();

        var windTime = 0;
        function render() {
            ctx.clearRect(0, 0, cw, ch);
            windTime += 0.005;
            wind = Math.sin(windTime) * 0.5; // 自然周期性微风

            for (var i = 0; i < flakes.length; i++) {
                flakes[i].update();
                flakes[i].draw();
            }
            window.requestAnimationFrame(render);
        }

        render();
    }

    initSnowfall();
})(window, document);
