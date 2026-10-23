/**
 * 黑客帝国代码雨背景特效
 * 纯原生 JS 封装，零外部依赖，即插即用
 */
(function (window, document) {
    'use strict';

    function initCodeRain() {
        if (!document.body) {
            window.addEventListener('DOMContentLoaded', initCodeRain);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.id = 'matrix-code-rain-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;margin:0;padding:0;border:none;outline:none;display:block;pointer-events:none;z-index:-1;background:#000;';

        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');

        var cw = 0;
        var ch = 0;
        var cols = 0;
        var step = 20; // 字符上下间距
        var fontSize = 16;
        var codeRainArr = [];
        var charSet = ['0', '1', '1', '0', '1', '0', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

        function setCanvasSize() {
            cw = canvas.width = window.innerWidth || document.documentElement.clientWidth;
            ch = canvas.height = window.innerHeight || document.documentElement.clientHeight;
            ctx.font = 'bold ' + fontSize + 'px "Courier New", Consolas, monospace';
            cols = Math.floor(cw / 18);
        }

        function createCodeRain() {
            codeRainArr = [];
            var rowsPerCol = Math.ceil(ch / step);

            for (var n = 0; n < cols; n++) {
                var col = [];
                var basePos = Math.floor(Math.random() * 300);
                var speed = Math.floor(Math.random() * 6) + 4;
                var colX = n * 18 + Math.floor(Math.random() * 4);

                for (var i = 0; i < rowsPerCol; i++) {
                    col.push({
                        x: colX,
                        y: -(step * i) - basePos,
                        speed: speed,
                        text: charSet[Math.floor(Math.random() * charSet.length)],
                        isHead: (i === 0)
                    });
                }
                codeRainArr.push(col);
            }
        }

        function resize() {
            setCanvasSize();
            createCodeRain();
        }

        window.addEventListener('resize', resize);
        setCanvasSize();
        createCodeRain();

        function render() {
            ctx.clearRect(0, 0, cw, ch);

            for (var n = 0; n < codeRainArr.length; n++) {
                var col = codeRainArr[n];

                for (var i = 0; i < col.length; i++) {
                    var code = col[i];

                    if (code.y > ch + step) {
                        code.y = -step;
                        code.text = charSet[Math.floor(Math.random() * charSet.length)];
                    } else {
                        code.y += code.speed;
                    }

                    // 字符随机微弱闪烁变幻
                    if (Math.random() < 0.02) {
                        code.text = charSet[Math.floor(Math.random() * charSet.length)];
                    }

                    // 头部高亮白绿，末梢渐变暗绿
                    if (code.isHead) {
                        ctx.fillStyle = '#e0ffd0';
                    } else {
                        var lightness = Math.max(15, 60 - i * 2);
                        ctx.fillStyle = 'hsl(123, 100%, ' + lightness + '%)';
                    }

                    ctx.fillText(code.text, code.x, code.y);
                }
            }

            window.requestAnimationFrame(render);
        }

        render();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeRain);
    } else {
        initCodeRain();
    }
})(window, document);
