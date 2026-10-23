/**
 * 3D 离子风暴背景特效
 * 纯原生 JS 封装，零外部依赖，即插即用
 */
(function (window, document) {
    'use strict';

    function initIonStorm() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initIonStorm);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'ion-storm-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:-1;';

        document.body.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        var vars = {
            canvas: canvas,
            ctx: ctx,
            frameNo: 0,
            camX: 0,
            camY: 0,
            camZ: -14,
            pitch: 0,
            yaw: 0,
            cx: 0,
            cy: 0,
            bounding: 10,
            scale: 500,
            floor: 26.5,
            points: [],
            initParticles: 700,
            initV: 0.01,
            distributionRadius: 800,
            vortexHeight: 25
        };

        function resize() {
            vars.canvas.width = window.innerWidth || document.documentElement.clientWidth;
            vars.canvas.height = window.innerHeight || document.documentElement.clientHeight;
            vars.cx = vars.canvas.width / 2;
            vars.cy = vars.canvas.height / 2;
        }

        window.addEventListener('resize', resize);
        resize();

        vars.pitch = elevation(vars.camX, vars.camZ, vars.camY) - Math.PI / 2;

        function project3D(x, y, z, v) {
            var p, d;
            x -= v.camX;
            y -= v.camY - 8;
            z -= v.camZ;
            p = Math.atan2(x, z);
            d = Math.sqrt(x * x + z * z);
            x = Math.sin(p - v.yaw) * d;
            z = Math.cos(p - v.yaw) * d;
            p = Math.atan2(y, z);
            d = Math.sqrt(y * y + z * z);
            y = Math.sin(p - v.pitch) * d;
            z = Math.cos(p - v.pitch) * d;

            var rx1 = -1000, ry1 = 1;
            var rx2 = 1000, ry2 = 1;
            var rx3 = 0, ry3 = 0;
            var rx4 = x, ry4 = z;
            var uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
            var ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
            var ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;

            if (!z) z = 0.000000001;
            if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
                return {
                    x: v.cx + (rx1 + ua * (rx2 - rx1)) * v.scale,
                    y: v.cy + y / z * v.scale,
                    d: (x * x + y * y + z * z)
                };
            }
            return { d: -1 };
        }

        function elevation(x, y, z) {
            var dist = Math.sqrt(x * x + y * y + z * z);
            if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
            return 0.00000001;
        }

        function rgb(col) {
            col += 0.000001;
            var r = parseInt((0.5 + Math.sin(col) * 0.5) * 16, 10);
            var g = parseInt((0.5 + Math.cos(col) * 0.5) * 16, 10);
            var b = parseInt((0.5 - Math.sin(col) * 0.5) * 16, 10);
            return '#' + r.toString(16) + g.toString(16) + b.toString(16);
        }

        function interpolateColors(RGB1, RGB2, degree) {
            var w2 = degree;
            var w1 = 1 - w2;
            return [
                w1 * RGB1[0] + w2 * RGB2[0],
                w1 * RGB1[1] + w2 * RGB2[1],
                w1 * RGB1[2] + w2 * RGB2[2]
            ];
        }

        function rgbArray(col) {
            col += 0.000001;
            var r = parseInt((0.5 + Math.sin(col) * 0.5) * 256, 10);
            var g = parseInt((0.5 + Math.cos(col) * 0.5) * 256, 10);
            var b = parseInt((0.5 - Math.sin(col) * 0.5) * 256, 10);
            return [r, g, b];
        }

        function colorString(arr) {
            var r = parseInt(arr[0], 10);
            var g = parseInt(arr[1], 10);
            var b = parseInt(arr[2], 10);
            return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
        }

        function spawnParticle(v) {
            var p = Math.PI * 2 * Math.random();
            var ls = Math.sqrt(Math.random() * v.distributionRadius);
            var pt = {
                x: Math.sin(p) * ls,
                y: -v.vortexHeight / 2,
                vy: v.initV / 20 + Math.random() * v.initV,
                z: Math.cos(p) * ls,
                radius: 200 + 800 * Math.random(),
                color: 0,
                dist: 0
            };
            pt.color = pt.radius / 1000 + v.frameNo / 250;
            v.points.push(pt);
        }

        function process(v) {
            if (v.points.length < v.initParticles) {
                for (var k = 0; k < 5; ++k) spawnParticle(v);
            }

            var p = Math.atan2(v.camX, v.camZ);
            var d = Math.sqrt(v.camX * v.camX + v.camZ * v.camZ);
            d -= Math.sin(v.frameNo / 80) / 25;
            var t = Math.cos(v.frameNo / 300) / 165;
            v.camX = Math.sin(p + t) * d;
            v.camZ = Math.cos(p + t) * d;
            v.camY = -Math.sin(v.frameNo / 220) * 15;
            v.yaw = Math.PI + p + t;
            v.pitch = elevation(v.camX, v.camZ, v.camY) - Math.PI / 2;

            for (var i = 0; i < v.points.length; ++i) {
                var px = v.points[i].x;
                var py = v.points[i].y;
                var pz = v.points[i].z;
                var pd = Math.sqrt(px * px + pz * pz) / 1.0075;
                var ptAngle = 0.1 / (1 + pd * pd / 5);
                var pp = Math.atan2(px, pz) + ptAngle;

                v.points[i].x = Math.sin(pp) * pd;
                v.points[i].z = Math.cos(pp) * pd;
                v.points[i].y += v.points[i].vy * ptAngle * ((Math.sqrt(v.distributionRadius) - pd) * 2);

                if (v.points[i].y > v.vortexHeight / 2 || pd < 0.25) {
                    v.points.splice(i, 1);
                    spawnParticle(v);
                }
            }
        }

        function drawFloor(v) {
            var x, y, z, d, point, a, size;
            for (var i = -25; i <= 25; i += 1) {
                for (var j = -25; j <= 25; j += 1) {
                    x = i * 2;
                    z = j * 2;
                    y = v.floor;
                    d = Math.sqrt(x * x + z * z);
                    point = project3D(x, y - d * d / 85, z, v);
                    if (point.d !== -1) {
                        size = 1 + 15000 / (1 + point.d);
                        a = 0.15 - Math.pow(d / 50, 4) * 0.15;
                        if (a > 0) {
                            v.ctx.fillStyle = colorString(interpolateColors(rgbArray(d / 26 - v.frameNo / 40), [0, 128, 32], 0.5 + Math.sin(d / 6 - v.frameNo / 8) / 2));
                            v.ctx.globalAlpha = a;
                            v.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
                        }
                    }
                }
            }
            v.ctx.fillStyle = '#82f';
            for (var m = -25; m <= 25; m += 1) {
                for (var n = -25; n <= 25; n += 1) {
                    x = m * 2;
                    z = n * 2;
                    y = -v.floor;
                    d = Math.sqrt(x * x + z * z);
                    point = project3D(x, y + d * d / 85, z, v);
                    if (point.d !== -1) {
                        size = 1 + 15000 / (1 + point.d);
                        a = 0.15 - Math.pow(d / 50, 4) * 0.15;
                        if (a > 0) {
                            v.ctx.fillStyle = colorString(interpolateColors(rgbArray(-d / 26 - v.frameNo / 40), [32, 0, 128], 0.5 + Math.sin(-d / 6 - v.frameNo / 8) / 2));
                            v.ctx.globalAlpha = a;
                            v.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
                        }
                    }
                }
            }
        }

        function sortFunction(a, b) {
            return b.dist - a.dist;
        }

        function draw(v) {
            v.ctx.globalAlpha = 0.15;
            v.ctx.fillStyle = '#000';
            v.ctx.fillRect(0, 0, v.canvas.width, v.canvas.height);

            drawFloor(v);

            var point, a, size, d;
            for (var i = 0; i < v.points.length; ++i) {
                point = project3D(v.points[i].x, v.points[i].y, v.points[i].z, v);
                if (point.d !== -1) {
                    v.points[i].dist = point.d;
                    size = 1 + v.points[i].radius / (1 + point.d);
                    d = Math.abs(v.points[i].y);
                    a = 0.8 - Math.pow(d / (v.vortexHeight / 2), 1000) * 0.8;
                    v.ctx.globalAlpha = (a >= 0 && a <= 1) ? a : 0;
                    v.ctx.fillStyle = rgb(v.points[i].color);
                    if (point.x > -1 && point.x < v.canvas.width && point.y > -1 && point.y < v.canvas.height) {
                        v.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
                    }
                }
            }
            v.points.sort(sortFunction);
        }

        function loop() {
            vars.frameNo++;
            process(vars);
            draw(vars);
            window.requestAnimationFrame(loop);
        }

        loop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIonStorm);
    } else {
        initIonStorm();
    }
})(window, document);
