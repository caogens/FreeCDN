document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".Notes_config__aside .item"),t=document.querySelector(".Notes_config__notice"),s=document.querySelector(".Notes_config > form"),n=document.querySelectorAll(".Notes_content");if(e.forEach(function(o){o.addEventListener("click",function(){e.forEach(function(e){e.classList.remove("active")}),o.classList.add("active");var c=o.getAttribute("data-current");sessionStorage.setItem("Notes_config_current",c),"Notes_notice"===c?(t.style.display="block",s.style.display="none"):(t.style.display="none",s.style.display="block"),n.forEach(function(e){e.style.display="none";var t=e.classList.contains(c);t&&(e.style.display="block")})})}),sessionStorage.getItem("Notes_config_current")){var o=sessionStorage.getItem("Notes_config_current");"Notes_notice"===o?(t.style.display="block",s.style.display="none"):(s.style.display="block",t.style.display="none"),e.forEach(function(e){var t=e.getAttribute("data-current");t===o&&e.classList.add("active")}),n.forEach(function(e){e.classList.contains(o)&&(e.style.display="block")})}else e[0].classList.add("active"),t.style.display="block",s.style.display="none";var c=new XMLHttpRequest;c.onreadystatechange=function(){if(4===c.readyState)if(200<=c.status&&300>c.status||304===c.status){var e=JSON.parse(c.responseText);t.innerHTML=e.success?'<p class="title">最新版本：'+e.title+"</p>"+e.content:"请求失败！"}else t.innerHTML="请求失败！"},c.open("get","//%77%77%77%2e%78%63%63%78%2e%63%63/api_Notes.php?type=collect&key=18e958d8c7fa5d435844f95c9f254fca",!0),c.send(null)});