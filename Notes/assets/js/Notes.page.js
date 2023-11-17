function getChildren(t, e) {
  for (let s of t.children) if (s.className === e) return s;
  return null;
}
document.addEventListener("DOMContentLoaded", () => {
  Notes_post_GN();
  Rewrite_the_comments();
  Comments_submitted();
  Comments_window();
  Comment_Format();
  Comment_emoji();
  fn_qqinfo();
  
  $(".Notes_reads_article p:empty").remove(),
    customElements.define(
      "xc-mtitle",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.innerHTML = `\n\t\t\t\t<span class="Notes_mtitle">\n\t\t\t\t\t<span class="Notes_mtitle__text">\n\t\t\t\t\t\t${
              this.getAttribute("title") || "默认标题"
            }\n\t\t\t\t\t</span>\n\t\t\t\t</span>\n\t\t\t`);
        }
      }
    ),
    customElements.define(
      "xc-mp3",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              name: this.getAttribute("name"),
              url: this.getAttribute("url"),
              theme: this.getAttribute("theme") || "#1989fa",
              cover: this.getAttribute("cover"),
              autoplay: !!this.getAttribute("autoplay")
            }),
            this.render();
        }
        render() {
          if (!this.options.url) return (this.innerHTML = "音频地址未填写！");
          (this.innerHTML =
            '<span style="display: block" class="_content"></span>'),
            new APlayer({
              container: getChildren(this, "_content"),
              theme: this.options.theme,
              autoplay: this.options.autoplay,
              audio: [
                {
                  url: this.options.url,
                  name: this.options.name,
                  cover: this.options.cover
                }
              ]
            });
        }
      }
    ),
    customElements.define(
      "xc-music",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              id: this.getAttribute("id"),
              color: this.getAttribute("color") || "#1989fa",
              autoplay: !!this.getAttribute("autoplay")
            }),
            this.render();
        }
        render() {
          if (!this.options.id)
            return (this.innerHTML = "网易云歌曲ID未填写！");
          (this.innerHTML =
            '<span style="display: block" class="_content"></span>'),
            fetch(
              "https://www.vvhan.com/usr/themes/Joe/NeteaseCloudMusicApi.php?id=" +
                this.options.id
            ).then(async (t) => {
              const e = await t.json();
              new APlayer({
                container: getChildren(this, "_content"),
                lrcType: 1,
                theme: this.options.color,
                autoplay: this.options.autoplay,
                audio: e
              });
            });
        }
      }
    ),
    customElements.define(
      "xc-mlist",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              id: this.getAttribute("id"),
              color: this.getAttribute("color") || "#1989fa",
              autoplay: !!this.getAttribute("autoplay")
            }),
            this.render();
        }
        render() {
          if (!this.options.id)
            return (this.innerHTML = "网易云歌单ID未填写！");
          (this.innerHTML =
            '<span style="display: block" class="_content"></span>'),
            fetch(
              "https://api.i-meto.com/meting/api?server=netease&type=playlist&id=" +
                this.options.id
            ).then(async (t) => {
              const e = await t.json();
              new APlayer({
                container: getChildren(this, "_content"),
                lrcType: 3,
                theme: this.options.color,
                autoplay: this.options.autoplay,
                audio: e
              });
            });
        }
      }
    ),
    customElements.define(
      "xc-abtn",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              color: this.getAttribute("color") || "var(--theme)",
              href: this.getAttribute("href") || "#",
              radius: this.getAttribute("radius") || "4px",
              content: this.getAttribute("content") || "超链按钮"
            }),
            (this.innerHTML = `\n<a class="Notes_abtn"style="background: ${this.options.color}; border-radius: ${this.options.radius}"href="${this.options.href}"target="_blank"rel="noopener noreferrer nofollow">\n<span class="Notes_abtn__content">\n ${this.options.content}\n</span>\n</a>\n`);
        }
      }
    ),
    customElements.define(
      "xc-dotted",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.startColor = this.getAttribute("startColor") || "#ff6c6c"),
            (this.endColor = this.getAttribute("endColor") || "#1989fa"),
            (this.innerHTML = `\n\t\t\t\t\t<span class="Notes_dotted"style="background-image: repeating-linear-gradient(-45deg, ${this.startColor} 0, ${this.startColor} 20%, transparent 0, transparent 25%, ${this.endColor} 0, ${this.endColor} 45%, transparent 0, transparent 50%)"></span>\n\t\t\t\t`);
        }
      }
    ),
    customElements.define(
      "xc-cloud",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              type: this.getAttribute("type") || "default",
              title: this.getAttribute("title") || "默认标题",
              url: this.getAttribute("url"),
              password: this.getAttribute("password")
            });
          const t = {
            default: "默认网盘",
            360: "360网盘",
            bd: "百度网盘",
            ty: "天翼网盘",
            ct: "城通网盘",
            wy: "微云网盘",
            github: "Github仓库",
            lz: "蓝奏云网盘"
          };
          this.innerHTML = `\n\t\t\t\t\t<span class="Notes_cloud">\n\t\t\t\t\t\t<div class="Notes_cloud__logo _${
            this.options.type
          }"></div>\n\t\t\t\t\t\t<div class="Notes_cloud__describe">\n\t\t\t\t\t\t\t<div class="Notes_cloud__describe-title">${
            this.options.title
          }</div>\n\t\t\t\t\t\t\t<div class="Notes_cloud__describe-type">来源：${
            t[this.options.type] || "默认网盘"
          }${
            this.options.password ? " | 提取码：" + this.options.password : ""
          }</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a class="Notes_cloud__btn"href="${
            this.options.url
          }"target="_blank"rel="noopener noreferrer nofollow">\n\t\t\t\t\t\t\t<i class="iconfont Xc-icon-xiazai"></i>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</span>\n\t\t\t\t`;
        }
      }
    ),
    customElements.define(
      "xc-hide",
      class extends HTMLElement {
        constructor() {
          super(), this.render();
        }
        render() {
          (this.innerHTML =
            '<span class="Notes_hide">此处内容设置了 <a href="/admin">登录</a> 或 <i class="Notes_hide__button">回复</i> 可见</span>'),
            (this.$button = this.querySelector(".Notes_hide__button"));
          const t = document.querySelector(".Notes_comment"),
            e = document.querySelector(".Notes_header");
          t &&
            e &&
            this.$button.addEventListener("click", () => {
              const s = t.offsetTop - e.offsetHeight - 15;
              window.scrollTo({ top: s, behavior: "smooth" });
            });
        }
      }
    ),
    customElements.define(
      "xc-message",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              type: /^success$|^info$|^warning$|^error$/.test(
                this.getAttribute("type")
              )
                ? this.getAttribute("type")
                : "info",
              content: this.getAttribute("content") || "消息内容"
            }),
            (this.innerHTML = `\n\t\t\t\t\t<span class="Notes_message ${this.options.type}">\n\t\t\t\t\t\t<span class="Notes_message__icon"></span>\n\t\t\t\t\t\t<span class="Notes_message__content">${this.options.content}</span>\n\t\t\t\t\t</span>\n\t\t\t\t`);
        }
      }
    ),
    customElements.define(
      "xc-progress",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              percentage: /^\d{1,3}%$/.test(this.getAttribute("percentage"))
                ? this.getAttribute("percentage")
                : "50%",
              color: this.getAttribute("color") || "#ff6c6c"
            }),
            (this.innerHTML = `\n\t\t\t\t<span class="Notes_progress">\n\t\t\t\t\t<div class="Notes_progress__strip">\n\t\t\t\t\t\t<div class="Notes_progress__strip-percent"style="width: ${this.options.percentage}; background: ${this.options.color};"></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="Notes_progress__percentage">${this.options.percentage}</div>\n\t\t\t\t</span>\n\t\t\t`);
        }
      }
    ),
    customElements.define(
      "xc-callout",
      class extends HTMLElement {
        constructor() {
          super();
          const t = getChildren(this, "_temp");
          this.options = {
            color: this.getAttribute("color") || "#f0ad4e",
            content:
              t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "") || "标注内容"
          };
          const e = `\n\t\t\t\t\t<div class="Notes_callout"style="border-left-color: ${this.options.color};">\n\t\t\t\t\t\t${this.options.content}\n\t\t\t\t\t</div>\n\t\t\t\t`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = e;
          else {
            const t = document.createElement("span");
            (t.style.display = "block"),
              (t.className = "_content"),
              (t.innerHTML = e),
              this.appendChild(t);
          }
        }
      }
    ),
    customElements.define(
      "xc-alert",
      class extends HTMLElement {
        constructor() {
          super();
          const t = getChildren(this, "_temp");
          this.options = {
            type: /^success$|^info$|^warning$|^error$/.test(
              this.getAttribute("type")
            )
              ? this.getAttribute("type")
              : "info",
            content:
              t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, "") || "警告提示"
          };
          const e = `\n\t\t\t\t\t<div class="Notes_alert ${this.options.type}">\n\t\t\t\t\t\t${this.options.content}\n\t\t\t\t\t</div>\n\t\t\t\t`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = e;
          else {
            const t = document.createElement("span");
            (t.style.display = "block"),
              (t.className = "_content"),
              (t.innerHTML = e),
              this.appendChild(t);
          }
        }
      }
    ),
    customElements.define(
      "xc-timeline",
      class extends HTMLElement {
        constructor() {
          super();
          const t = getChildren(this, "_temp");
          let e = t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, ""),
            s = "";
          e.replace(
            /{timeline-item([^}]*)}([\s\S]*?){\/timeline-item}/g,
            function (t, e, n) {
              s += `\n\t\t\t\t\t<div class="Notes_timeline__item">\n\t\t\t\t\t\t<div class="Notes_timeline__item-tail"></div>\n\t\t\t\t\t\t<div class="Notes_timeline__item-circle"${e}></div>\n\t\t\t\t\t\t<div class="Notes_timeline__item-content">${n
                .trim()
                .replace(
                  /^(<br>)|(<br>)$/g,
                  ""
                )}</div>\n\t\t\t\t\t</div>\n\t\t\t\t`;
            }
          );
          let n = `<div class="Notes_timeline">${s}</div>`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = n;
          else {
            const t = document.createElement("span");
            (t.className = "_content"),
              (t.style.display = "block"),
              (t.innerHTML = n),
              this.appendChild(t);
          }
          this.querySelectorAll(".Notes_timeline__item-circle").forEach(
            (t, e) => {
              const s = t.getAttribute("color") || "#19be6b";
              t.style.borderColor = s;
            }
          );
        }
      }
    ),
    customElements.define(
      "xc-collapse",
      class extends HTMLElement {
        constructor() {
          super();
          const t = getChildren(this, "_temp");
          let e = t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, ""),
            s = "";
          e.replace(
            /{collapse-item([^}]*)}([\s\S]*?){\/collapse-item}/g,
            function (t, e, n) {
              s += `\n\t\t\t\t\t<div class="Notes_collapse__item"${e}>\n\t\t\t\t\t\t<div class="Notes_collapse__item-head">\n\t\t\t\t\t\t\t<div class="Notes_collapse__item-head--label"></div>\n\t\t\t\t\t\t\t<svg class="Notes_collapse__item-head--icon"xmlns="http://www.w3.org/2000/svg"width="22"height="22"viewBox="0 0 24 24"><path d="M7.406 7.828L12 12.422l4.594-4.594L18 9.234l-6 6-6-6z"/></svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="Notes_collapse__item-wrapper">\n\t\t\t\t\t\t\t<div class="Notes_collapse__item-wrapper--content">${n
                .trim()
                .replace(
                  /^(<br>)|(<br>)$/g,
                  ""
                )}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t`;
            }
          );
          let n = `<div class="Notes_collapse">${s}</div>`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = n;
          else {
            const t = document.createElement("span");
            (t.className = "_content"),
              (t.style.display = "block"),
              (t.innerHTML = n),
              this.appendChild(t);
          }
          this.querySelectorAll(".Notes_collapse__item").forEach((t) => {
            const e = t.getAttribute("label") || "折叠标题",
              s = getChildren(t, "Notes_collapse__item-head"),
              n = getChildren(s, "Notes_collapse__item-head--label");
            n.innerHTML = e;
            const i = getChildren(t, "Notes_collapse__item-wrapper"),
              o = getChildren(i, "Notes_collapse__item-wrapper--content"),
              r = t.getAttribute("open");
            null !== r &&
              (t.classList.add("active"), (i.style.maxHeight = "none")),
              s.addEventListener("click", () => {
                i.style.maxHeight = o.offsetHeight + "px";
                let e = setTimeout(() => {
                  t.classList.contains("active")
                    ? (t.classList.remove("active"), (i.style.maxHeight = 0))
                    : (t.classList.add("active"),
                      (i.style.maxHeight = o.offsetHeight + "px")),
                    clearTimeout(e);
                }, 30);
              });
          });
        }
      }
    ),
    customElements.define(
      "xc-dplayer",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              src: this.getAttribute("src"),
              player: this.getAttribute("player")
            }),
            this.render();
        }
        render() {
          this.options.src
            ? (this.innerHTML = `<iframe allowfullscreen="true"class="Notes_vplayer"src="${
                this.options.player + this.options.src
              }"></iframe>`)
            : (this.innerHTML = "播放地址未填写！");
        }
      }
    ),
    customElements.define(
      "xc-bilibili",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.bvid = this.getAttribute("bvid")),
            (this.page = Object.is(Number(this.getAttribute("page")), NaN)
              ? 1
              : this.getAttribute("page")),
            this.render();
        }
        render() {
          this.bvid
            ? (this.innerHTML = `<iframe allowfullscreen="true"class="Notes_vplayer"src="//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}"></iframe>`)
            : (this.innerHTML = "Bvid未填写！");
        }
      }
    ),
    customElements.define(
      "xc-tabs",
      class extends HTMLElement {
        constructor() {
          super();
          const t = getChildren(this, "_temp");
          let e = t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, ""),
            s = "",
            n = "";
          e.replace(
            /{tabs-pane([^}]*)}([\s\S]*?){\/tabs-pane}/g,
            function (t, e, i) {
              (s += `<div class="Notes_tabs__head-item"${e}></div>`),
                (n += `<div style="display: none"class="Notes_tabs__body-item"${e}>${i
                  .trim()
                  .replace(/^(<br>)|(<br>)$/g, "")}</div>`);
            }
          );
          let i = `\n<div class="Notes_tabs">\n<div class="Notes_tabs__head">${s}</div>\n<div class="Notes_tabs__body">${n}</div>\n</div>\n`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = i;
          else {
            const t = document.createElement("span");
            (t.className = "_content"),
              (t.style.display = "block"),
              (t.innerHTML = i),
              this.appendChild(t);
          }
          this.querySelectorAll(".Notes_tabs__head-item").forEach((t, e) => {
            const s = t.getAttribute("label");
            (t.innerHTML = s),
              t.addEventListener("click", () => {
                this.querySelectorAll(".Notes_tabs__head-item").forEach((t) =>
                  t.classList.remove("active")
                ),
                  this.querySelectorAll(".Notes_tabs__body-item").forEach(
                    (t) => (t.style.display = "none")
                  ),
                  this.querySelector(`.Notes_tabs__body-item[label="${s}"]`) &&
                    (this.querySelector(
                      `.Notes_tabs__body-item[label="${s}"]`
                    ).style.display = "block"),
                  t.classList.add("active");
              }),
              0 === e && t.click();
          });
        }
      }
    ),
    customElements.define(
      "xc-gird",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              column:
                isNaN(this.getAttribute("column")) ||
                !this.getAttribute("column")
                  ? 3
                  : this.getAttribute("column"),
              gap:
                isNaN(this.getAttribute("gap")) || !this.getAttribute("gap")
                  ? 15
                  : this.getAttribute("gap")
            });
          const t = getChildren(this, "_temp");
          let e = t.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, ""),
            s = "";
          e.replace(/{gird-item}([\s\S]*?){\/gird-item}/g, function (t, e) {
            s += `<div class="Notes_gird__item">${e
              .trim()
              .replace(/^(<br>)|(<br>)$/g, "")}</div>`;
          });
          let n = `<div class="Notes_gird"style="gap: ${this.options.gap}px; grid-template-columns: repeat(${this.options.column}, 1fr);">${s}</div>`;
          if (getChildren(this, "_content"))
            getChildren(this, "_content").innerHTML = n;
          else {
            const t = document.createElement("span");
            (t.className = "_content"),
              (t.style.display = "block"),
              (t.innerHTML = n),
              this.appendChild(t);
          }
        }
      }
    ),
    customElements.define(
      "xc-copy",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.options = {
              showText: this.getAttribute("showText") || "点击复制",
              copyText: this.getAttribute("copyText") || "默认文本"
            }),
            (this.innerHTML = `<span class="Notes_copy"style="cursor: pointer; user-select: none;">${this.options.showText}</span>`);
          const t = getChildren(this, "Notes_copy");
          "undefined" != typeof ClipboardJS && "undefined" != typeof Qmsg
            ? new ClipboardJS(t, { text: () => this.options.copyText }).on(
                "success",
                () => Qmsg.success("复制成功！")
              )
            : t.addEventListener("click", () =>
                alert("该功能请前往前台查看！")
              );
        }
      }
    ),
    $(".Notes_reads_article p:empty").remove();
});

function Notes_post_GN() {
  const e = (e) => window.btoa(unescape(encodeURIComponent(e))),
    t = (e) => decodeURIComponent(escape(window.atob(e))),
    a = $(".Notes_reads").attr("data-cid");
  {
    Prism.highlightAll(),
      $("pre[class*='language-']").each(function (e, t) {
        let a = $(t).find("code[class*='language-']").text(),
          o = $(
            '<span class="copy"><i class="iconfont Xc-icon-fuzhi" title="复制"></i></span>'
          );
        new ClipboardJS(o[0], { text: () => a }).on("success", () =>
          Qmsg.success("复制成功！")
        ),
          $(t).append(o);
      });
  }
  {
    $(".Notes_reads_article img:not(img.owo_image)").each(function () {
      $(this).wrap(
        $(
          `<span style="display: block;"data-fancybox="Xc" href="${$(this).attr(
            "src"
          )}"></span>`
        )
      );
    });
  }
  {
    $(".Notes_reads_article a:not(.Notes_reads_article-anote)").each(
      function () {
        $(this).attr({ target: "_blank", rel: "noopener noreferrer nofollow" });
      }
    );
  }
  {
  $(".Notes_dynamic>.comment-list>li .comment-parent .content img").each(function () {
      $(this).wrap(
        $(
          `<span style="display: block;"data-fancybox="Xc" href="${$(this).attr(
            "src"
          )}"></span>`
        )
      );
    });
  }
  {
    let o = localStorage.getItem(e("views"))
      ? JSON.parse(t(localStorage.getItem(e("views"))))
      : [];
    const i = o.includes(a);
    i ||
      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: { routeType: "handle_views", cid: a },
        success(t) {
          if (1 !== t.code) return;
          $("#Notes_Article_Views").html(`${t.data.views}阅读`), o.push(a);
          const i = e("views"),
            s = e(JSON.stringify(o));
          localStorage.setItem(i, s);
        }
      });
  }
  {
    let o = localStorage.getItem(e("agree"))
      ? JSON.parse(t(localStorage.getItem(e("agree"))))
      : [];
    o.includes(a)
      ? $(".Notes_reads_agree .icon-1").addClass("active")
      : $(".Notes_reads_agree .icon-2").addClass("active");
    let i = !1;
    $(".Notes_reads_agree .icon").on("click", function () {
      if (i) return;
      (i = !0),
        (o = localStorage.getItem(e("agree"))
          ? JSON.parse(t(localStorage.getItem(e("agree"))))
          : []);
      let s = o.includes(a);
      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: {
          routeType: "handle_agree",
          cid: a,
          type: s ? "disagree" : "agree"
        },
        success(t) {
          if (1 !== t.code) return;
          if (($(".Notes_reads_agree .text").html(t.data.agree), s)) {
            const e = o.findIndex((e) => e === a);
            o.splice(e, 1),
              $(".Notes_reads_agree .icon-1").removeClass("active"),
              $(".Notes_reads_agree .icon-2").addClass("active"),
              Qmsg.warning("已取消点赞！");
            $(".Notes_reads_agree .icon").removeClass("active");
          } else
            o.push(a),
              $(".Notes_reads_agree .icon-2").removeClass("active"),
              $(".Notes_reads_agree .icon-1").addClass("active"),
              Qmsg.success("点赞成功");
          $(".Notes_reads_agree .icon").addClass("active");
          const i = e("agree"),
            l = e(JSON.stringify(o));
          localStorage.setItem(i, l);
        },
        complete() {
          i = !1;
        }
      });
    });
  }
  {
    let e = !1;
    $(".Notes_reads_article-protected").on("submit", function (t) {
      t.preventDefault();
      const o = $(this).attr("action") + "&time=" + +new Date(),
        i = $(this).find('input[type="password"]').val();
      if ("" === i.trim()) return Qmsg.info("请输入访问密码！");
      e ||
        ((e = !0),
        $.ajax({
          url: o,
          type: "POST",
          data: { cid: a, protectCID: a, protectPassword: i },
          dataType: "text",
          success(t) {
            let a = [],
              o = "";
            (a = $(t).contents()),
              Array.from(a).forEach((e) => {
                "container" === e.parentNode.className && (o = e);
              }),
              /Notes/.test(t)
                ? location.reload()
                : (Qmsg.warning(o.textContent.trim() || ""),
                  (e = !1),
                  $(".Notes_comment_respond-form .foot .submit button").html(
                    "发表评论"
                  ));
          }
        }));
    });
  }
}
function Rewrite_the_comments() {
  if ($(".Notes_comment_respond").length) {
    const respond = $(".Notes_comment_respond");
    $(".Notes_comment_reply").on("click", function () {
      const coid = $(this).attr("data-coid");
      const item = $("#" + $(this).attr("data-id"));
      respond.find(".Notes_comment_respond-form").attr("data-coid", coid);
      item.append(respond);
      $(".Notes_comment_respond-type .item[data-type='text']").click();
      $(".Notes_comment_cancle").show();
      window.scrollTo({
        top: item.offset().top - $(".Notes_header").height() - 15,
        behavior: "smooth"
      });
    });
    $(".Notes_comment_cancle").on("click", function () {
      respond.find(".Notes_comment_respond-form").removeAttr("data-coid");
      $(".Notes_comment_cancle").hide();
      $(".Notes_comment_title").after(respond);
      $(".Notes_comment_respond-type .item[data-type='text']").click();
    });
  }
}
function Comments_submitted() {
  if ($(".Notes_comment").length) {
    let isSubmit = false;
    $(".Notes_comment_respond-form").on("submit", function (e) {
      e.preventDefault();
      const action =
        $(".Notes_comment_respond-form").attr("action") +
        "?time=" +
        +new Date();
      const type = $(".Notes_comment_respond-form").attr("data-type");
      const parent = $(".Notes_comment_respond-form").attr("data-coid");
      const author = $(
        ".Notes_comment_respond-form .head input[name='author']"
      ).val();
      const _ = $(".Notes_comment_respond-form input[name='_']").val();
      const mail = $(
        ".Notes_comment_respond-form .head input[name='mail']"
      ).val();
      const url = $(
        ".Notes_comment_respond-form .head input[name='url']"
      ).val();
      let text = $(
        ".Notes_comment_respond-form .body textarea[name='text']"
      ).val();
      if (author.trim() === "") return Qmsg.info("请输入昵称！");
      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail))
        return Qmsg.info("请输入正确的邮箱！");
      if (type === "text" && text.trim() === "")
        return Qmsg.info("请输入评论内容！");
      if (type === "draw") {
        const txt = $("#Notes_comment_draw")[0].toDataURL("image/webp", 0.1);
        text = "{!{" + txt + "}!} ";
      }
      if (isSubmit) return;
      isSubmit = true;
      $(".Notes_comment_respond-form .foot .submit button").html("发送中...");
      $.ajax({
        url: action,
        type: "POST",
        data: { author, mail, text, parent, url, _ },
        dataType: "text",
        success(res) {
          let arr = [],
            str = "";
          arr = $(res).contents();
          Array.from(arr).forEach((_) => {
            if (_.parentNode.className === "container") str = _;
          });
          if (!/Notes/.test(res)) {
            Qmsg.warning(str.textContent.trim() || "");
            isSubmit = false;
            $(".Notes_comment_respond-form .foot .submit button").html(
              "发表评论"
            );
          } else {
            window.location.reload();
          }
        },
        error() {
          isSubmit = false;
          $(".Notes_comment_respond-form .foot .submit button").html(
            "发表评论"
          );
          Qmsg.warning("发送失败！请刷新重试！");
        }
      });
    });
  }
}
function Comments_window() {
  $(".comment_list_item .term .content .user .author a").each((index, item) =>
    $(item).attr("target", "_blank")
  );
}
function Comment_Format() {
  $(".Notes_comment .Notes_pagination a").each((index, item) => {
    const href = $(item).attr("href");
    if (href && href.includes("#")) {
      $(item).attr("href", href.replace("#comments", "?scroll=Notes_comment"));
    }
  });
}
function Comment_emoji() {
  if ($(".Notes_owo_contain").length && $(".Notes_owo_target").length) {
    $.ajax({
      url: window.Xc.THEME_URL + "assets/json/Notes.owo.json",
      dataType: "json",
      success(res) {
        let barStr = "";
        let scrollStr = "";
        for (let key in res) {
          const item = res[key];
          barStr += `<div class="item"data-type="${key}">${key}</div>`;
          scrollStr += `<ul class="scroll"data-type="${key}">${item
            .map(
              (_) =>
                `<li class="item"data-text="${_.data}">${
                  key === "颜文字"
                    ? `${_.icon}`
                    : `<img class="lazyload"src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjUyOTQ1MjE4NjI3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMzNTEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTU2My4yIDQ2My4zTDY3NyA1NDBjMS43IDEuMiAzLjcgMS44IDUuOCAxLjggMC43IDAgMS40LTAuMSAyLTAuMiAyLjctMC41IDUuMS0yLjEgNi42LTQuNGwyNS4zLTM3LjhjMS41LTIuMyAyLjEtNS4xIDEuNi03LjhzLTIuMS01LjEtNC40LTYuNmwtNzMuNi00OS4xIDczLjYtNDkuMWMyLjMtMS41IDMuOS0zLjkgNC40LTYuNiAwLjUtMi43IDAtNS41LTEuNi03LjhsLTI1LjMtMzcuOGExMC4xIDEwLjEgMCAwIDAtNi42LTQuNGMtMC43LTAuMS0xLjMtMC4yLTItMC4yLTIuMSAwLTQuMSAwLjYtNS44IDEuOGwtMTEzLjggNzYuNmMtOS4yIDYuMi0xNC43IDE2LjQtMTQuNyAyNy41IDAuMSAxMSA1LjUgMjEuMyAxNC43IDI3LjR6TTM4NyAzNDguOGgtNDUuNWMtNS43IDAtMTAuNCA0LjctMTAuNCAxMC40djE1My4zYzAgNS43IDQuNyAxMC40IDEwLjQgMTAuNEgzODdjNS43IDAgMTAuNC00LjcgMTAuNC0xMC40VjM1OS4yYzAtNS43LTQuNy0xMC40LTEwLjQtMTAuNHogbTMzMy44IDI0MS4zbC00MS0yMGExMC4zIDEwLjMgMCAwIDAtOC4xLTAuNWMtMi42IDAuOS00LjggMi45LTUuOSA1LjQtMzAuMSA2NC45LTkzLjEgMTA5LjEtMTY0LjQgMTE1LjItNS43IDAuNS05LjkgNS41LTkuNSAxMS4ybDMuOSA0NS41YzAuNSA1LjMgNSA5LjUgMTAuMyA5LjVoMC45Yzk0LjgtOCAxNzguNS02Ni41IDIxOC42LTE1Mi43IDIuNC01IDAuMy0xMS4yLTQuOC0xMy42eiBtMTg2LTE4Ni4xYy0xMS45LTQyLTMwLjUtODEuNC01NS4yLTExNy4xLTI0LjEtMzQuOS01My41LTY1LjYtODcuNS05MS4yLTMzLjktMjUuNi03MS41LTQ1LjUtMTExLjYtNTkuMi00MS4yLTE0LTg0LjEtMjEuMS0xMjcuOC0yMS4xaC0xLjJjLTc1LjQgMC0xNDguOCAyMS40LTIxMi41IDYxLjctNjMuNyA0MC4zLTExNC4zIDk3LjYtMTQ2LjUgMTY1LjgtMzIuMiA2OC4xLTQ0LjMgMTQzLjYtMzUuMSAyMTguNCA5LjMgNzQuOCAzOS40IDE0NSA4Ny4zIDIwMy4zIDAuMSAwLjIgMC4zIDAuMyAwLjQgMC41bDM2LjIgMzguNGMxLjEgMS4yIDIuNSAyLjEgMy45IDIuNiA3My4zIDY2LjcgMTY4LjIgMTAzLjUgMjY3LjUgMTAzLjUgNzMuMyAwIDE0NS4yLTIwLjMgMjA3LjctNTguNyAzNy4zLTIyLjkgNzAuMy01MS41IDk4LjEtODUgMjcuMS0zMi43IDQ4LjctNjkuNSA2NC4yLTEwOS4xIDE1LjUtMzkuNyAyNC40LTgxLjMgMjYuNi0xMjMuOCAyLjQtNDMuNi0yLjUtODctMTQuNS0xMjl6IG0tNjAuNSAxODEuMWMtOC4zIDM3LTIyLjggNzItNDMgMTA0LTE5LjcgMzEuMS00NC4zIDU4LjYtNzMuMSA4MS43LTI4LjggMjMuMS02MSA0MS05NS43IDUzLjQtMzUuNiAxMi43LTcyLjkgMTkuMS0xMTAuOSAxOS4xLTgyLjYgMC0xNjEuNy0zMC42LTIyMi44LTg2LjJsLTM0LjEtMzUuOGMtMjMuOS0yOS4zLTQyLjQtNjIuMi01NS4xLTk3LjctMTIuNC0zNC43LTE4LjgtNzEtMTkuMi0xMDcuOS0wLjQtMzYuOSA1LjQtNzMuMyAxNy4xLTEwOC4yIDEyLTM1LjggMzAtNjkuMiA1My40LTk5LjEgMzEuNy00MC40IDcxLjEtNzIgMTE3LjItOTQuMSA0NC41LTIxLjMgOTQtMzIuNiAxNDMuNC0zMi42IDQ5LjMgMCA5NyAxMC44IDE0MS44IDMyIDM0LjMgMTYuMyA2NS4zIDM4LjEgOTIgNjQuOCAyNi4xIDI2IDQ3LjUgNTYgNjMuNiA4OS4yIDE2LjIgMzMuMiAyNi42IDY4LjUgMzEgMTA1LjEgNC42IDM3LjUgMi43IDc1LjMtNS42IDExMi4zeiIgcC1pZD0iMzM1MiIgZmlsbD0iI2JmYmZiZiI+PC9wYXRoPjwvc3ZnPg=="data-src="${
                        window.Xc.THEME_URL + _.icon
                      }"alt="${_.data}"/>`
                }</li>`
            )
            .join("")}</ul>`;
        }
        $(".Notes_owo_contain").html(
          `<div class="seat"><svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 496 512"style="height: 23px;line-height: 23px;background: #bec6d4c9;opacity: .8;border-radius: 50px;width: 23px;"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm141.4 389.4c-37.8 37.8-88 58.6-141.4 58.6s-103.6-20.8-141.4-58.6S48 309.4 48 256s20.8-103.6 58.6-141.4S194.6 56 248 56s103.6 20.8 141.4 58.6S448 202.6 448 256s-20.8 103.6-58.6 141.4zM328 224c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm-160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm194.4 64H133.6c-8.2 0-14.5 7-13.5 15 7.5 59.2 58.9 105 121.1 105h13.6c62.2 0 113.6-45.8 121.1-105 1-8-5.3-15-13.5-15z"></path></svg></div><div class="box">${scrollStr}<div class="bar">${barStr}</div></div>`
        );
        $(document).on("click", function () {
          $(".Notes_owo_contain .box").stop().slideUp("fast");
        });
        $(".Notes_owo_contain .seat").on("click", function (e) {
          e.stopPropagation();
          $(this).siblings(".box").stop().slideToggle("fast");
        });
        $(".Notes_owo_contain .box .bar .item").on("click", function (e) {
          e.stopPropagation();
          $(this).addClass("active").siblings().removeClass("active");
          const scrollIndx =
            '.Notes_owo_contain .box .scroll[data-type="' +
            $(this).attr("data-type") +
            '"]';
          $(scrollIndx).show().siblings(".scroll").hide();
        });
        $(".Notes_owo_contain .scroll .item").on("click", function () {
          const text = $(this).attr("data-text");
          $(".Notes_owo_target").insertContent(text);
        });
        $(".Notes_owo_contain .box .bar .item").first().click();
      }
    });
  }
}
function fn_qqinfo() {
  var qq_num = $("#author").val();
  if (qq_num) {
    if (!isNaN(qq_num)) {
      $.ajax({
        url: "/usr/themes/Notes/core/qq_info.php",
        type: "POST",
        data: { qq: qq_num },
        async: true,
        dataType: "json",
        success: function (data) {
          $("#mail").val(qq_num + "@qq.com");
          $("#comment").focus();
          if (data == null) {
            $("#author").val("");
          } else {
            $("#author").val(data.name == "" ? "" : data.name);
            $("div.ajax-user-avatar img").attr("src", data.qqtx);
          }
        },
        error: function (err) {
          $("#author").val("");
          $("#mail").val(qq_num + "@qq.com");
          $("#comment").focus();
        }
      });
    }
  }
}







(function (e) {
  e.fn.extend({
    insertContent: function (t, n) {
      var a = e(this)[0];
      if (document.selection) {
        this.focus();
        var s = document.selection.createRange();
        (s.text = t), this.focus(), s.moveStart("character", -i);
        var c = s.text.length;
        if (2 == arguments.length) {
          var i = a.value.length;
          s.moveEnd("character", c + n),
            n <= 0
              ? s.moveStart("character", c - 2 * n - t.length)
              : s.moveStart("character", c - n - t.length),
            s.select();
        }
      } else if (a.selectionStart || "0" == a.selectionStart) {
        var o = a.selectionStart,
          r = a.selectionEnd,
          l = a.scrollTop;
        (a.value =
          a.value.substring(0, o) + t + a.value.substring(r, a.value.length)),
          this.focus(),
          (a.selectionStart = o + t.length),
          (a.selectionEnd = o + t.length),
          (a.scrollTop = l),
          2 == arguments.length &&
            (a.setSelectionRange(o - n, a.selectionEnd + n), this.focus());
      } else (this.value += t), this.focus();
    },
    selectionRange: function (e, t) {
      var n = "",
        a = this[0];
      if (void 0 === e)
        n =
          /input|textarea/i.test(a.tagName) &&
          /firefox/i.test(navigator.userAgent)
            ? a.value.substring(a.selectionStart, a.selectionEnd)
            : document.selection
            ? document.selection.createRange().text
            : document.getSelection().toString();
      else {
        if (!/input|textarea/.test(a.tagName.toLowerCase())) return !1;
        if ((void 0 === t && (t = e), a.setSelectionRange))
          a.setSelectionRange(e, t), this.focus();
        else {
          var s = a.createTextRange();
          s.move("character", e), s.moveEnd("character", t - e), s.select();
        }
      }
      return void 0 === e ? n : this;
    }
  });
})(jQuery);
