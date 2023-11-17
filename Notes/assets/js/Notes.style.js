localStorage.getItem("data-night") && document.querySelector("html").setAttribute("data-night", "night");
document.addEventListener("DOMContentLoaded", () => {
  Notes_mode();
  Search_Box_pop_up();
  Global_drop_down_box();
  Wap_Sidebar();
  Wap_Search_Box();
  Search_Box_Close();
  Wap_Search_Box_Close();
  Website_time();
  Me_motto();
  Notes_Wallpaper();
  Message_card();
  Notes_post_Rotation_swiper();
  Notes_scroll();
  Notes_tongji();
  Notes_fhdb();
  Notes_mymusic();
});
function Notes_mode() {
  if (localStorage.getItem("data-night")) {
    $(".Notes_action_item.mode .icon-1").addClass("active");
    $(".Notes_action_item.mode .icon-2").removeClass("active");
    $.getScript("/usr/themes/Notes/assets/js/Notes.bjxg.js");
  } else {
    $("html").removeAttr("data-night");
    $(".Notes_action_item.mode .icon-1").removeClass("active");
    $(".Notes_action_item.mode .icon-2").addClass("active");
  }
  $(".Notes_action_item.mode").on("click", () => {
    if (localStorage.getItem("data-night")) {
      $(".Notes_action_item.mode .icon-1").removeClass("active");
      $(".Notes_action_item.mode .icon-2").addClass("active");
      $("html").removeAttr("data-night");
      localStorage.removeItem("data-night");
    } else {
      $(".Notes_action_item.mode .icon-1").addClass("active");
      $(".Notes_action_item.mode .icon-2").removeClass("active");
      $("html").attr("data-night", "night");
      localStorage.setItem("data-night", "night");
      $.getScript("/usr/themes/Notes/assets/js/Notes.bjxg.js");
    }
  });
}
function Search_Box_pop_up() {
  $(".header_internal-search .input").on("click", (e) => {
    e.stopPropagation();
    $(".header_internal-search .result").addClass("active");
  });
  $(document).on("click", function () {
    $(".header_internal-search .result").removeClass("active");
  });
}
function Global_drop_down_box() {
  $(".Notes_dropdown").each(function (index, item) {
    const menu = $(this).find(".Notes_dropdown_menu");
    const trigger = $(item).attr("trigger") || "click";
    const placement = $(item).attr("placement") || $(this).height() || 60;
    menu.css("top", placement);
    if (trigger === "hover") {
      $(this).hover(
        () => $(this).addClass("active"),
        () => $(this).removeClass("active")
      );
    } else {
      $(this).on("click", function (e) {
        $(this).toggleClass("active");
        $(document).one("click", () => $(this).removeClass("active"));
        e.stopPropagation();
      });
      menu.on("click", (e) => e.stopPropagation());
    }
  });
}

function Wap_Sidebar() {
  $(".header_internal_zola").on("click", function () {
    $(".header_search").removeClass("active");
    if ($(".header_roll").hasClass("active")) {
      $("body").css("overflow", "");
      $(".header_hyal").removeClass("active slideout");
      $(".header_roll").removeClass("active");
    } else {
      $("body").css("overflow", "overflow");
      $(".header_hyal").addClass("active slideout");
      $(".header_roll").addClass("active");
    }
  });
}
function Wap_Search_Box() {
  $(".header_internal-sousuo").on("click", function () {
    $(".header_roll").removeClass("active");
    if ($(".header_search").hasClass("active")) {
      $("body").css("overflow", "");
      $(".header_hyal").removeClass("active slideout");
      $(".header_search").removeClass("active");
      $(".header_search_PC").removeClass("active");
    } else {
      $("body").css("overflow", "overflow");
      $(".header_hyal").addClass("active");
      $(".header_search").addClass("active");
      $(".header_search_PC").addClass("active");
    }
  });
}
function Search_Box_Close() {
  $(".header_hyal").on("click", function () {
    $("body").css("overflow", "");
    $(".header_hyal").removeClass("active slideout");
    $(".header_search").removeClass("active");
    $(".header_roll").removeClass("active");
  });
}
function Notes_mymusic() {
  $(".Notes_action_item.music").on("click", function () {
    if ($(".Notes_music").hasClass("active")) {
      $(".Notes_music").removeClass("active");
    } else {
      $(".Notes_music").addClass("active");
    }
  });
  $(".Notes_music_gaunbi").on("click", function () {
    if ($(".Notes_music").hasClass("active")) {
      $(".Notes_music").removeClass("active");
    } 
  });
}
function Wap_Search_Box_Close() {
  $(".header_roll-menu .current")
    .parents(".panel-body")
    .show()
    .siblings(".panel")
    .addClass("in");
  $(".header_roll-menu .panel").on("click", function () {
    const panelBox = $(this).parent().parent();
    panelBox.find(".panel").not($(this)).removeClass("in");
    panelBox
      .find(".panel-body")
      .not($(this).siblings(".panel-body"))
      .stop()
      .hide("fast");
    $(this).toggleClass("in").siblings(".panel-body").stop().toggle("fast");
  });
}
function Website_time() {
  const getRunTime = () => {
    const birthDay = new Date(Xc.BIRTHDAY);
    const today = +new Date();
    const timePast = today - birthDay.getTime();
    let day = timePast / (1000 * 24 * 60 * 60);
    let dayPast = Math.floor(day);
    let hour = (day - dayPast) * 24;
    let hourPast = Math.floor(hour);
    let minute = (hour - hourPast) * 60;
    let minutePast = Math.floor(minute);
    let second = (minute - minutePast) * 60;
    let secondPast = Math.floor(second);
    day = String(dayPast).padStart(2, 0);
    hour = String(hourPast).padStart(2, 0);
    minute = String(minutePast).padStart(2, 0);
    second = String(secondPast).padStart(2, 0);
    $(".Notes_run__day").html(day);
    $(".Notes_run__hour").html(hour);
    $(".Notes_run__minute").html(minute);
    $(".Notes_run__second").html(second);
  };
  if (
    Xc.BIRTHDAY &&
    /(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2})\:(\d{1,2})\:(\d{1,2})/.test(
      Xc.BIRTHDAY
    )
  ) {
    getRunTime();
    setInterval(getRunTime, 1000);
  }
}

function Notes_fhdb() {
    let _debounce = null;
    const handleScroll = () => ((document.documentElement.scrollTop || document.body.scrollTop) > 300 ? $(".Notes_action_item.scroll").addClass("active") : $(".Notes_action_item.scroll").removeClass("active"));
    handleScroll();
    $(document).on("scroll", () => {
      clearTimeout(_debounce);
      _debounce = setTimeout(handleScroll, 80);
    });
    $(".Notes_action_item.scroll").on("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
function Me_motto() {
  let motto = Xc.MOTTO;
  if (!motto) motto = "有钱终成眷属，没钱亲眼目睹";
  if (motto.includes("http")) {
    $.ajax({
      url: motto,
      dataType: "text",
      success: (res) => $(".Notes_motto").html(res)
    });
  } else {
    $(".Notes_motto").html(motto);
  }
}

function Notes_Wallpaper() {
  function t() {
    window.scrollTo({ top: 0, behavior: "smooth" }),
      $(".Notes_wallpaper__list").html(""),
      (l = !0),
      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: {
          routeType: "wallpaper_list",
          cid: e.cid,
          start: e.start,
          count: e.count
        },
        success(t) {
          if (1 !== t.code) return (l = !1);
          l = !1;
          let e = "";
          t.data.forEach((t) => {
            e += `\n<a class="item animated bounceIn" data-fancybox="gallery" href="${
              t.url
            }">\n<img width="100%"height="100%"class="lazyload"src="${
              Xc.LAZY_LOAD
            }"data-src="${t.img_1024_768 || t.url}"alt="壁纸">\n</a>`;
          }),
            $(".Notes_wallpaper__list").html(e),
            (i = t.total),
            a();
        }
      });
  }
  function a() {
    let t = "";
    e.start / e.count != 0 &&
      (t += `\n<li class="Notes_wallpaper__pagination-item"data-start="0">首页</li>\n<li class="Notes_wallpaper__pagination-item"data-start="${
        e.start - e.count
      }">\n<svg viewBox="0 0 1024 1024"xmlns="http://www.w3.org/2000/svg"width="12"height="12"><path d="M822.272 146.944l-396.8 396.8c-19.456 19.456-51.2 19.456-70.656 0-18.944-19.456-18.944-51.2 0-70.656l396.8-396.8c19.456-19.456 51.2-19.456 70.656 0 18.944 19.456 18.944 45.056 0 70.656z"/><path d="M745.472 940.544l-396.8-396.8c-19.456-19.456-19.456-51.2 0-70.656 19.456-19.456 51.2-19.456 70.656 0l403.456 390.144c19.456 25.6 19.456 51.2 0 76.8-26.112 19.968-51.712 19.968-77.312.512zm-564.224-63.488c0-3.584 0-7.68.512-11.264h-.512v-714.24h.512c-.512-3.584-.512-7.168-.512-11.264 0-43.008 21.504-78.336 48.128-78.336s48.128 34.816 48.128 78.336c0 3.584 0 7.68-.512 11.264h.512v714.24h-.512c.512 3.584.512 7.168.512 11.264 0 43.008-21.504 78.336-48.128 78.336s-48.128-35.328-48.128-78.336z"/></svg>\n</li>\n<li class="Notes_wallpaper__pagination-item"data-start="${
        e.start - e.count
      }">${Math.ceil(e.start / e.count)}</li>\n`),
      (t += `<li class="Notes_wallpaper__pagination-item active">${
        Math.ceil(e.start / e.count) + 1
      }</li>`),
      e.start != i - e.count &&
        (t += `\n<li class="Notes_wallpaper__pagination-item"data-start="${
          e.start + e.count
        }">${
          Math.ceil(e.start / e.count) + 2
        }</li>\n<li class="Notes_wallpaper__pagination-item"data-start="${
          e.start + e.count
        }">\n<svg class="next"viewBox="0 0 1024 1024"xmlns="http://www.w3.org/2000/svg"width="12"height="12"><path d="M822.272 146.944l-396.8 396.8c-19.456 19.456-51.2 19.456-70.656 0-18.944-19.456-18.944-51.2 0-70.656l396.8-396.8c19.456-19.456 51.2-19.456 70.656 0 18.944 19.456 18.944 45.056 0 70.656z"/><path d="M745.472 940.544l-396.8-396.8c-19.456-19.456-19.456-51.2 0-70.656 19.456-19.456 51.2-19.456 70.656 0l403.456 390.144c19.456 25.6 19.456 51.2 0 76.8-26.112 19.968-51.712 19.968-77.312.512zm-564.224-63.488c0-3.584 0-7.68.512-11.264h-.512v-714.24h.512c-.512-3.584-.512-7.168-.512-11.264 0-43.008 21.504-78.336 48.128-78.336s48.128 34.816 48.128 78.336c0 3.584 0 7.68-.512 11.264h.512v714.24h-.512c.512 3.584.512 7.168.512 11.264 0 43.008-21.504 78.336-48.128 78.336s-48.128-35.328-48.128-78.336z"/></svg>\n</li>\n`),
      e.start < i - e.count &&
        (t += `<li class="Notes_wallpaper__pagination-item"data-start="${
          i - e.count
        }">末页</li>`),
      $(".Notes_wallpaper__pagination").html(t);
  }
  let l = !1,
    e = { cid: -999, start: -999, count: 48 },
    i = -999;
  $.ajax({
    url: Xc.BASE_API,
    type: "POST",
    dataType: "json",
    data: { routeType: "wallpaper_type" },
    success(t) {
      if (1 !== t.code)
        return $(".Notes_wallpaper__type-list").html(
          '<li class="error">壁纸抓取失败！请联系作者！</li>'
        );
      if (!t.data.length)
        return $(".Notes_wallpaper__type-list").html(
          '<li class="error">暂无数据！</li>'
        );
      let a = "";
      t.data.forEach(
        (t) =>
          (a += `<li class="item animated swing"data-cid="${t.id}">${t.name}</li>`)
      ),
        $(".Notes_wallpaper__type-list").html(a),
        $(".Notes_wallpaper__type-list .item").first().click();
    }
  }),
    $(".Notes_wallpaper__type-list").on("click", ".item", function () {
      const a = $(this).attr("data-cid");
      l ||
        ($(this).addClass("active").siblings().removeClass("active"),
        (e.cid = a),
        (e.start = 0),
        t());
    }),
    $(".Notes_wallpaper__pagination").on(
      "click",
      ".Notes_wallpaper__pagination-item",
      function () {
        const a = $(this).attr("data-start");
        a && !l && ((e.start = Number(a)), t());
      }
    );
}
function Message_card() {
  let e = 100;
  const o = [
      "#F8D800",
      "#0396FF",
      "#EA5455",
      "#7367F0",
      "#32CCBC",
      "#F6416C",
      "#28C76F",
      "#9F44D3",
      "#F55555",
      "#736EFE",
      "#E96D71",
      "#DE4313",
      "#D939CD",
      "#4C83FF",
      "#F072B6",
      "#C346C2",
      "#5961F9",
      "#FD6585",
      "#465EFB",
      "#FFC600",
      "#FA742B",
      "#5151E5",
      "#BB4E75",
      "#FF52E5",
      "#49C628",
      "#00EAFF",
      "#F067B4",
      "#F067B4",
      "#ff9a9e",
      "#00f2fe",
      "#4facfe",
      "#f093fb",
      "#6fa3ef",
      "#bc99c4",
      "#46c47c",
      "#f9bb3c",
      "#e8583d",
      "#f68e5f"
    ],
    t = (e, o) => Math.floor(Math.random() * (o - e + 1)) + e,
    a = $(".Notes_reads_leaving-list").width(),
    n = $(".Notes_reads_leaving-list").height(),
    i = [
      "20px 300px",
      "20px 400px",
      "20px 500px",
      "30px 300px",
      "30px 400px",
      "30px 500px",
      "40px 300px",
      "40px 400px",
      "40px 500px"
    ],
    l = [
      "300px 20px",
      "400px 20px",
      "500px 20px",
      "300px 30px",
      "400px 30px",
      "500px 30px",
      "300px 40px",
      "400px 40px",
      "500px 40px"
    ];
  $(".Notes_reads_leaving-list .item").each((d, s) => {
    const c = t(1, 1),
      r = o[t(0, o.length - 1)],
      p = Math.ceil($(s).width()),
      h = Math.ceil($(s).height()),
      x = t(0, n - h),
      u = t(0, a - p);
    $(s).css({
      display: "block",
      zIndex: c,
      background: r,
      top: x,
      left: u,
      borderTopLeftRadius: l[t(0, l.length - 1)],
      borderTopRightRadius: i[t(0, i.length - 1)],
      borderBottomLeftRadius: i[t(0, i.length - 1)],
      borderBottomRightRadius: i[t(0, i.length - 1)]
    }),
      $(s).on("dragStart", (o) => {
        e++, $(s).css({ zIndex: e });
      });
  });
}
function Notes_post_Rotation_swiper() {
  var mySwiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: { delay: 3000 }
  });
}
function Notes_scroll() {
  window.addEventListener("load", function () {
    const e = new URLSearchParams(location.search).get("scroll");
    if (e) {
      const o = $(".Notes_header").height();
      let t = null;
      if (
        ((t = $("#" + e).length > 0 ? $("#" + e) : $("." + e)),
        t && t.length > 0)
      ) {
        const e = t.offset().top - o - 40;
        window.scrollTo({ top: e, behavior: "smooth" });
      }
    }
  });
}
function Notes_tongji() {
  let t = 0;
  function e() {
    "loading..." !== $(".Notes_census__filing .button").html() &&
      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: { routeType: "article_filing", page: ++t },
        success(t) {
          if (!t.length)
            return (
              $(".Notes_census__filing .item.load").remove(),
              Qmsg.warning("没有更多内容了")
            );
          let e = "";
          t.forEach((t) => {
            e += `\n\t\t\t\t\t\t\t<div class="item">\n\t\t\t\t\t\t\t\t<div class="tail"></div>\n\t\t\t\t\t\t\t\t<div class="head"></div>\n\t\t\t\t\t\t\t\t<div class="wrapper">\n\t\t\t\t\t\t\t\t\t<div class="panel">${
              t.date
            }<svg viewBox="0 0 1024 1024"xmlns="http://www.w3.org/2000/svg"><path d="M21.6 772.8c28.8 28.8 74.4 28.8 103.2 0L512 385.6l387.2 387.2c28.8 28.8 74.4 28.8 103.2 0 28.8-28.8 28.8-74.4 0-103.2L615.2 282.4l-77.6-77.6c-14.4-14.4-37.6-14.4-51.2 0l-77.6 77.6L21.6 669.6c-28.8 28.8-28.8 75.2 0 103.2z"/></svg></div>\n\t\t\t\t\t\t\t\t\t<ol class="panel-body">\n\t\t\t\t\t\t\t\t\t\t${t.list
              .map(
                (t) =>
                  `<li><a rel="noopener noreferrer"target="_blank"href="${t.permalink}">${t.title}</a></li>`
              )
              .join(
                ""
              )}\n\t\t\t\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t`;
          }),
            $("#filing").append(e),
            $(".Notes_census__filing .button").html("加载更多");
        }
      });
  }
  e(),
    $(".Notes_census__filing .content").on("click", ".panel", function () {
      const t = $(this).parents(".content");
      t.find(".panel").not($(this)).removeClass("in"),
        t
          .find(".panel-body")
          .not($(this).siblings(".panel-body"))
          .stop()
          .hide("fast"),
        $(this).toggleClass("in").siblings(".panel-body").stop().toggle("fast");
    }),
    $(".Notes_census__filing .button").on("click", function () {
      e(), $(this).html("loading...");
    });
}


