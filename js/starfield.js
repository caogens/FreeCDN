/**
 * 旋转星空背景特效
 * 纯原生 JS 零依赖即插即用脚本
 */
(function (window, document) {
    'use strict';

    function initStarfield() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initStarfield);
            return;
        }

        var STARFIELD = {
            maxStars: 1800,
            hue: 217,

            init: function () {
                this.setupCanvas();
                this.createStarCache();
                this.createStars();
                this.bindEvents();
                this.render();
            },

            setupCanvas: function () {
                this.canvas = document.createElement('canvas');
                this.canvas.id = 'starfield-effect-canvas';
                this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:-1;';

                document.body.appendChild(this.canvas);
                this.ctx = this.canvas.getContext('2d');
                this.resize();
            },

            resize: function () {
                this.w = this.canvas.width = window.innerWidth || document.documentElement.clientWidth;
                this.h = this.canvas.height = window.innerHeight || document.documentElement.clientHeight;

                if (this.stars) {
                    for (var i = 0; i < this.stars.length; i++) {
                        this.stars[i].orbitX = this.w / 2;
                        this.stars[i].orbitY = this.h / 2;
                    }
                }
            },

            createStarCache: function () {
                this.cacheCanvas = document.createElement('canvas');
                this.cacheCtx = this.cacheCanvas.getContext('2d');
                this.cacheCanvas.width = 100;
                this.cacheCanvas.height = 100;

                var half = this.cacheCanvas.width / 2;
                var gradient = this.cacheCtx.createRadialGradient(half, half, 0, half, half, half);
                gradient.addColorStop(0.025, '#CCC');
                gradient.addColorStop(0.1, 'hsl(' + this.hue + ', 61%, 33%)');
                gradient.addColorStop(0.25, 'hsl(' + this.hue + ', 64%, 6%)');
                gradient.addColorStop(1, 'transparent');

                this.cacheCtx.fillStyle = gradient;
                this.cacheCtx.beginPath();
                this.cacheCtx.arc(half, half, half, 0, Math.PI * 2);
                this.cacheCtx.fill();
            },

            random: function (min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }
                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            maxOrbit: function (x, y) {
                var max = Math.max(x, y);
                return Math.round(Math.sqrt(max * max + max * max)) / 2;
            },

            createStars: function () {
                this.stars = [];
                var self = this;

                function Star() {
                    this.orbitRadius = self.random(self.maxOrbit(self.w, self.h));
                    this.radius = self.random(60, this.orbitRadius) / 8;
                    this.orbitX = self.w / 2;
                    this.orbitY = self.h / 2;
                    this.timePassed = self.random(0, self.maxStars);
                    this.speed = self.random(this.orbitRadius) / 50000;
                    this.alpha = self.random(2, 10) / 10;
                }

                Star.prototype.draw = function () {
                    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
                    var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
                    var twinkle = self.random(10);

                    if (twinkle === 1 && this.alpha > 0) {
                        this.alpha -= 0.05;
                    } else if (twinkle === 2 && this.alpha < 1) {
                        this.alpha += 0.05;
                    }

                    self.ctx.globalAlpha = this.alpha;
                    self.ctx.drawImage(
                        self.cacheCanvas,
                        x - this.radius / 2,
                        y - this.radius / 2,
                        this.radius,
                        this.radius
                    );
                    this.timePassed += this.speed;
                };

                for (var i = 0; i < this.maxStars; i++) {
                    this.stars.push(new Star());
                }
            },

            bindEvents: function () {
                var self = this;
                window.addEventListener('resize', function () {
                    self.resize();
                });
            },

            render: function () {
                var self = this;

                function loop() {
                    self.ctx.globalCompositeOperation = 'source-over';
                    self.ctx.globalAlpha = 0.5;
                    self.ctx.fillStyle = 'hsla(' + self.hue + ', 64%, 6%, 2)';
                    self.ctx.fillRect(0, 0, self.w, self.h);

                    self.ctx.globalCompositeOperation = 'lighter';
                    for (var i = 0, l = self.stars.length; i < l; i++) {
                        self.stars[i].draw();
                    }

                    window.requestAnimationFrame(loop);
                }

                loop();
            }
        };

        STARFIELD.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStarfield);
    } else {
        initStarfield();
    }
})(window, document);
