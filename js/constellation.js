/**
 * 科技粒子星网背景
 * 纯原生 JS 零依赖即插即用脚本，自带鼠标互动与全穿透
 */
(function (window, document) {
    'use strict';

    function initConstellation() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initConstellation);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'constellation-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:-1;background:transparent;';
        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var cw = 0, ch = 0;
        var dots = [];
        var dotCount = 80;
        var maxDist = 130;
        var mouse = { x: null, y: null, maxDist: 160 };

        function resize() {
            cw = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            ch = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            dotCount = Math.floor((cw * ch) / 14000);
            createDots();
        }

        function Dot() {
            this.x = Math.random() * cw;
            this.y = Math.random() * ch;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.radius = Math.random() * 1.5 + 1;
        }

        Dot.prototype.update = function () {
            if (this.x < 0 || this.x > cw) this.vx = -this.vx;
            if (this.y < 0 || this.y > ch) this.vy = -this.vy;
            this.x += this.vx;
            this.y += this.vy;
        };

        Dot.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(120, 160, 255, 0.7)';
            ctx.fill();
        };

        function createDots() {
            dots = [];
            for (var i = 0; i < dotCount; i++) {
                dots.push(new Dot());
            }
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
        });

        resize();

        function render() {
            ctx.clearRect(0, 0, cw, ch);

            for (var i = 0; i < dots.length; i++) {
                dots[i].update();
                dots[i].draw();

                // 粒子与粒子间连线
                for (var j = i + 1; j < dots.length; j++) {
                    var dx = dots[i].x - dots[j].x;
                    var dy = dots[i].y - dots[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        var alpha = (1 - dist / maxDist) * 0.4;
                        ctx.strokeStyle = 'rgba(100, 150, 255, ' + alpha + ')';
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // 粒子与鼠标连线互动
                if (mouse.x !== null && mouse.y !== null) {
                    var mdx = dots[i].x - mouse.x;
                    var mdy = dots[i].y - mouse.y;
                    var mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                    if (mdist < mouse.maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        var mAlpha = (1 - mdist / mouse.maxDist) * 0.7;
                        ctx.strokeStyle = 'rgba(140, 200, 255, ' + mAlpha + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            window.requestAnimationFrame(render);
        }

        render();
    }

    initConstellation();
})(window, document);
