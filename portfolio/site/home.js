/* 把 site/content.js 铺到页面上：目录、三个栏目、主题切换。
   文字里用〔〕包起来的部分会显示成占位样式，方便你之后替换。 */

(function () {
  "use strict";

  var S = window.SITE;
  if (!S) return;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* 转义之后，把〔…〕变成占位样式 */
  function fill(v) {
    return esc(v).replace(/〔([^〕]*)〕/g, '<span class="slot">$1</span>');
  }

  function attrs(link) {
    return link.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function el(id) { return document.getElementById(id); }

  function heading(section) {
    return '<h2 class="h"><span class="h__num">' + esc(section.num) + "</span>" +
      esc(section.title) + "</h2>";
  }

  if (S.meta && S.meta.title) {
    document.title = S.meta.title;
    var d = document.querySelector('meta[name="description"]');
    if (d && S.meta.description) d.setAttribute("content", S.meta.description);
  }

  el("name").textContent = S.name || "";

  /* 目录 ------------------------------------------------------------- */
  var sections = [S.intro, S.works, S.contact];
  var toc = el("toc");
  if (toc) {
    toc.innerHTML =
      '<h2 class="h">' + esc(S.tocTitle || "目录") + "</h2>" +
      '<ol class="toc__list">' +
        sections.map(function (s) {
          return '<li class="toc__row"><a href="#' + esc(s.id) + '">' +
            '<span class="toc__num">' + esc(s.num) + "</span>" +
            '<span class="toc__label">' + esc(s.title) + "</span>" +
            '<span class="toc__leader" aria-hidden="true"></span>' +
          "</a></li>";
        }).join("") +
      "</ol>";
  }

  /* 一 · 自我介绍 ----------------------------------------------------- */
  var intro = el("intro");
  if (intro && S.intro) {
    intro.innerHTML = heading(S.intro) +
      '<div class="lede">' +
        (S.intro.paragraphs || []).map(function (p) { return "<p>" + fill(p) + "</p>"; }).join("") +
      "</div>";
  }

  /* 二 · 作品与网站 --------------------------------------------------- */
  var works = el("works");
  if (works && S.works) {
    works.innerHTML = heading(S.works) +
      (S.works.intro ? '<p class="sec__intro">' + fill(S.works.intro) + "</p>" : "") +
      '<ul class="cards">' +
        (S.works.items || []).map(function (item) {
          return '<li><a class="card" href="' + esc(item.href) + '"' + attrs(item) + ">" +
            '<span class="card__title">' + esc(item.title) + "</span>" +
            '<span class="card__text">' + fill(item.text) + "</span>" +
            '<span class="card__go">' + esc(item.label || "打开") +
              '<span class="card__arrow" aria-hidden="true">→</span></span>' +
          "</a></li>";
        }).join("") +
      "</ul>";
  }

  /* 三 · 联系 --------------------------------------------------------- */
  var contact = el("contact");
  if (contact && S.contact) {
    contact.innerHTML = heading(S.contact) +
      '<ul class="links">' +
        (S.contact.items || []).map(function (l) {
          return '<li><a class="link" href="' + esc(l.href) + '"' + attrs(l) + ">" +
            esc(l.label) + " ↗</a></li>";
        }).join("") +
      "</ul>" +
      (S.contact.text ? '<p class="sec__intro">' + fill(S.contact.text) + "</p>" : "");
  }

  /* 右上角链接 --------------------------------------------------------- */
  var tools = el("tools");
  if (tools) {
    tools.innerHTML = (S.links || []).map(function (l) {
      return '<a class="link" href="' + esc(l.href) + '"' + attrs(l) + ">" + esc(l.label) + "</a>";
    }).join("");
  }

  /* 日读 / 夜读 -------------------------------------------------------- */
  var btn = el("theme");
  if (btn) {
    var paint = function () {
      var night = document.documentElement.dataset.theme === "night";
      btn.textContent = night ? "日读" : "夜读";
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", night ? "#121212" : "#fbfaf7");
    };
    btn.addEventListener("click", function () {
      var night = document.documentElement.dataset.theme === "night";
      if (night) document.documentElement.removeAttribute("data-theme");
      else document.documentElement.dataset.theme = "night";
      try { localStorage.setItem("fp-theme", night ? "day" : "night"); } catch (e) {}
      paint();
    });
    paint();
  }

  document.documentElement.classList.add("is-ready");
})();
