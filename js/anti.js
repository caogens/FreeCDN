(function() {
    if (window.__ANTI_INAPP_INIT__) return;

    var ua = (navigator.userAgent || '').toLowerCase();

    var isWeChat = ua.indexOf('micromessenger') !== -1 || ua.indexOf('wxwork') !== -1;
    var isQQ = ua.indexOf('qq/') !== -1 || (ua.indexOf('mqqbrowser') !== -1 && ua.indexOf('qbwebviewtype') !== -1);
    var isAlipay = ua.indexOf('alipayclient') !== -1;
    var isDingTalk = ua.indexOf('dingtalk') !== -1;
    var isWeibo = ua.indexOf('weibo') !== -1;
    var isOtherInApp = ua.indexOf('baiduboxapp') !== -1 || ua.indexOf('aweme') !== -1 || ua.indexOf('bytedance') !== -1 || ua.indexOf('kuaishou') !== -1 || ua.indexOf('zhihu') !== -1;

    if (!(isWeChat || isQQ || isAlipay || isDingTalk || isWeibo || isOtherInApp)) return;
    window.__ANTI_INAPP_INIT__ = true;

    document.title = '页面载入中...';

    var isMobile = /android|iphone|ipad|ipod|mobile/i.test(ua);
    var isIOS = /iphone|ipad|ipod/.test(ua);
    var isPC = !isMobile;

    var currentUrl = window.location.href;
    var schemeLess = currentUrl.replace(/^https?:\/\//i, '');
    var scheme = location.protocol === 'https:' ? 'https' : 'http';

    var style = document.createElement('style');
    style.textContent = `
        body > *:not(#anti-box-wrap):not(script):not(style) { display: none !important; }
        #anti-box-wrap * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        #anti-box-wrap {
            position: fixed; inset: 0; width: 100%; height: 100%;
            background: #0b1120; color: #f8fafc;
            z-index: 2147483647; overflow-y: auto;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 60px 20px 40px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        #anti-box-wrap::before {
            content: ""; position: fixed; top: -140px; right: -140px;
            width: 360px; height: 360px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%);
            pointer-events: none; z-index: 1;
        }
        #anti-box-wrap::after {
            content: ""; position: fixed; bottom: -120px; left: -120px;
            width: 300px; height: 300px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
            pointer-events: none; z-index: 1;
        }
        .anti-guide {
            position: fixed; top: 16px; right: 18px;
            display: flex; align-items: center; gap: 6px;
            background: rgba(14, 165, 233, 0.15); border: 1px solid rgba(56, 189, 248, 0.35);
            color: #38bdf8; font-size: 13px; font-weight: 500;
            padding: 7px 14px; border-radius: 24px;
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            z-index: 20; animation: anti-float 1.8s ease-in-out infinite;
        }
        .anti-guide-arrow { font-size: 16px; font-weight: bold; line-height: 1; }
        @keyframes anti-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
        .anti-card {
            width: 100%; max-width: 390px; margin: auto 0;
            background: rgba(22, 32, 54, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.09);
            border-radius: 24px; padding: 32px 24px 28px;
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            position: relative; z-index: 10; text-align: center;
        }
        .anti-icon-circle {
            width: 54px; height: 54px; margin: 0 auto 16px;
            background: linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(99, 102, 241, 0.18));
            border: 1px solid rgba(56, 189, 248, 0.25);
            border-radius: 16px; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 8px 16px -4px rgba(14, 165, 233, 0.2);
        }
        .anti-icon-circle svg { width: 28px; height: 28px; fill: none; stroke: #38bdf8; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .anti-badge-label {
            display: inline-flex; align-items: center; gap: 4px;
            font-size: 12px; color: #38bdf8; background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 20px;
            padding: 2px 10px; margin-bottom: 12px;
        }
        .anti-title { font-size: 19px; font-weight: 600; color: #f8fafc; margin-bottom: 10px; letter-spacing: -0.01em; }
        .anti-desc { font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
        .anti-steps { display: flex; flex-direction: column; gap: 12px; margin-bottom: 26px; text-align: left; }
        .anti-step-item {
            display: flex; align-items: flex-start; gap: 12px;
            background: rgba(11, 17, 32, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 14px; padding: 13px 15px;
        }
        .anti-step-num {
            width: 22px; height: 22px;
            background: rgba(56, 189, 248, 0.15); color: #38bdf8;
            border-radius: 50%; font-size: 12px; font-weight: 700;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 1px;
        }
        .anti-step-txt { font-size: 13.5px; line-height: 1.5; color: #cbd5e1; }
        .anti-step-txt strong { color: #38bdf8; font-weight: 600; }
        .anti-actions { display: flex; flex-direction: column; gap: 10px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 22px; }
        .anti-btn {
            width: 100%; height: 46px; border: none; border-radius: 12px;
            font-size: 14.5px; font-weight: 500; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: opacity 0.2s, transform 0.1s;
        }
        .anti-btn:active { transform: scale(0.98); opacity: 0.9; }
        .anti-btn-primary {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }
        .anti-btn-sub {
            background: rgba(255, 255, 255, 0.06); color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        #anti-toast {
            position: fixed; bottom: 35px; left: 50%; transform: translateX(-50%) translateY(20px);
            background: #0284c7; color: #fff; padding: 10px 20px; border-radius: 22px;
            font-size: 13px; font-weight: 500; opacity: 0; pointer-events: none; transition: all 0.25s ease;
            z-index: 2147483647; box-shadow: 0 6px 18px rgba(0,0,0,0.4);
        }
        #anti-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    `;
    (document.head || document.documentElement).appendChild(style);

    var wrap = document.createElement('div');
    wrap.id = 'anti-box-wrap';

    var stepOne = isPC ? '点击窗口右上角 <strong>•••</strong> 更多选项' : '轻触屏幕右上角 <strong>•••</strong> 菜单按钮';
    var stepTwo = isPC ? '选择 <strong>在默认浏览器中打开</strong> 或直接复制网址' : (isIOS ? '选择 <strong>在 Safari 中打开</strong>' : '选择 <strong>在浏览器中打开</strong>');

    wrap.innerHTML = `
        ${!isPC ? `
        <div class="anti-guide">
            <span>轻触右上角菜单</span>
            <span class="anti-guide-arrow">↗</span>
        </div>` : ''}
        <div class="anti-card">
            <div class="anti-icon-circle">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
            <div class="anti-badge-label">
                <span>浏览体验优化</span>
            </div>
            <h2 class="anti-title">为了获得更好的浏览体验</h2>
            <p class="anti-desc">当前应用内置环境可能影响网页功能正常使用，建议在系统自带浏览器中打开本站。</p>
            <div class="anti-steps">
                <div class="anti-step-item">
                    <div class="anti-step-num">1</div>
                    <div class="anti-step-txt">${stepOne}</div>
                </div>
                <div class="anti-step-item">
                    <div class="anti-step-num">2</div>
                    <div class="anti-step-txt">${stepTwo}</div>
                </div>
            </div>
            <div class="anti-actions">
                ${(!isIOS && !isPC) ? `
                <button class="anti-btn anti-btn-sub" id="anti-btn-intent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    <span>尝试直接打开</span>
                </button>` : ''}
                <button class="anti-btn anti-btn-primary" id="anti-btn-copy">
                    <svg id="anti-copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span id="anti-copy-text">复制网址自行打开</span>
                </button>
            </div>
        </div>
        <div id="anti-toast">网址已复制到剪贴板</div>
    `;

    function mountWrap() {
        if (document.body) {
            document.body.appendChild(wrap);
            bindEvents();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(wrap);
                bindEvents();
            });
        }
    }

    function showToast(msg) {
        var toast = document.getElementById('anti-toast');
        if (!toast) return;
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 2000);
    }

    function onCopySuccess() {
        showToast('网址已复制，请粘贴到浏览器打开');
        var copyText = document.getElementById('anti-copy-text');
        var copyIcon = document.getElementById('anti-copy-icon');
        if (copyText && copyIcon) {
            copyText.innerText = '已成功复制';
            copyIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
            copyIcon.setAttribute('stroke', '#4ade80');
            setTimeout(function() {
                copyText.innerText = '复制网址自行打开';
                copyIcon.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
                copyIcon.setAttribute('stroke', 'currentColor');
            }, 2500);
        }
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
            onCopySuccess();
        } catch (e) {
            showToast('请长按右上角复制链接');
        }
        document.body.removeChild(ta);
    }

    function copyUrl() {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(currentUrl).then(onCopySuccess).catch(function() { fallbackCopy(currentUrl); });
        } else {
            fallbackCopy(currentUrl);
        }
    }

    function bindEvents() {
        var btnCopy = document.getElementById('anti-btn-copy');
        if (btnCopy) btnCopy.onclick = copyUrl;

        var btnIntent = document.getElementById('anti-btn-intent');
        if (btnIntent) {
            btnIntent.onclick = function() {
                var intentUrl = 'intent://' + schemeLess + '#Intent;scheme=' + scheme + ';action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end';
                window.location.href = intentUrl;
                setTimeout(copyUrl, 1200);
            };
        }
    }

    mountWrap();
})();
