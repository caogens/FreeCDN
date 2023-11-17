var pjax = new Pjax({
  selectors: [
    "title",
    ".Notes_main",
    ".Notes_top_img",
    ".header_internal",
    ".header_roll",
    ".header_search",
    ".header_hyal",
    ".header_search_PC",
    "Notes_Pjax_top"
  ]
});
$(document).on("pjax:send", function () {
  NProgress.start();
});
$(document).on("pjax:complete", function () {
  Search_Box_pop_up();
  Global_drop_down_box();
  Rewrite_the_comments();
  Comments_submitted();
  Comments_window();
  Comment_Format();
  Wap_Sidebar();
  Wap_Search_Box();
  Search_Box_Close();
  Wap_Search_Box_Close();
  Website_time();
  Comment_emoji();
  Me_motto();
  Notes_post_GN();
  Notes_Wallpaper();
  Message_card();
  Notes_post_Rotation_swiper();
  NProgress.done();
  Notes_tongji();
});

$(document).ready(function () {
$.fancybox.defaults.hash = false;
});
