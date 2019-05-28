var SIMPLE_MODE_KEY = "simpleModeActive";
var ELEGANT_MODE_CLASS_NAME = "elegant";
var TOOLTIP_ELEGANT = "Switch to elegant theme";
var TOOLTIP_SIMPLE = "Switch to simple theme (better for slow connections)";

var ls = window.localStorage;
var elegantCssListenerCache = new Map();

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!function(c){"use strict";var e=function(e,t,n,r){var o,i=c.document,a=i.createElement("link");if(t)o=t;else{var d=(i.body||i.getElementsByTagName("head")[0]).childNodes;o=d[d.length-1]}var f=i.styleSheets;if(r)for(var l in r)r.hasOwnProperty(l)&&a.setAttribute(l,r[l]);a.rel="stylesheet",a.href=e,a.media="only x",function e(t){if(i.body)return t();setTimeout(function(){e(t)})}(function(){o.parentNode.insertBefore(a,t?o:o.nextSibling)});var s=function(e){for(var t=a.href,n=f.length;n--;)if(f[n].href===t)return e();setTimeout(function(){s(e)})};function u(){a.addEventListener&&a.removeEventListener("load",u),a.media=n||"all"}return a.addEventListener&&a.addEventListener("load",u),(a.onloadcssdefined=s)(u),a};"undefined"!=typeof exports?exports.loadCSS=e:c.loadCSS=e}("undefined"!=typeof global?global:this);

function matchAndLoad(f, q, before, className, listenerCache) {
  var mq = window.matchMedia(q);
  var loaded = false;
  if (mq.matches && !loaded) {
    loadCSS(f, before, q, { "class": className });
    loaded = true;
  }
  function listener(mq) {
    if (mq.matches && !loaded) {
      loadCSS(f, before, q, { "class": className });
      // loaded = true;
    }
  }
  mq.addListener(listener);
  if (listenerCache) {
    listenerCache.set(mq, listener);
  }
}

function loadElegantTheme() {
  var titleElem = document.getElementsByTagName("title")[0];
  // setTimeout(function () {
  loadCSS("/css/defer-elegant.css", titleElem, "all", { "class": ELEGANT_MODE_CLASS_NAME });
  // }, 2000);

  matchAndLoad(
      "/css/defer-elegant-min-width-2750.css",
      "screen and (min-width:2750px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME,
      elegantCssListenerCache
  );
  matchAndLoad(
      "/css/defer-elegant-min-width-1100.css",
      "screen and (min-width:1100px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME,
      elegantCssListenerCache
  );
  matchAndLoad(
      "/css/defer-elegant-max-width-1099.css",
      "screen and (max-width: 1099px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME,
      elegantCssListenerCache
  );
  matchAndLoad(
      "/css/defer-elegant-min-width-785.css",
      "screen and (min-width: 785px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME,
      elegantCssListenerCache
  );
  matchAndLoad(
      "/css/defer-elegant-max-width-784.css",
      "screen and (max-width: 784px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME,
      elegantCssListenerCache
  );
}

function supportsIntersectionObserver() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    // IE 10 or older
    return false;
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11
    return false;
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    // Edge (IE 12+)
    return false;
  }

  // other browser
  return true;
}

function loadImg(figure) {
  var src = figure.getAttribute("src");
  if (src) {
    var img = figure.getElementsByTagName("img")[0];
    if (img) {
      img.setAttribute("src", src);
    }
  }
}

function init() {
  var images = document.querySelectorAll(".js-lazy-image");
  var supported = ("IntersectionObserver" in window);

  if (supported) {
    var config = {
      rootMargin: "50px 0px",
      threshold: 0.01,
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0) {
          observer.unobserve(entry.target);
          loadImg(entry.target);
        }
      });
    }, config);
    images.forEach(function (image) {
      observer.observe(image);
    });
  } else {
    // does not contain IntersectionObserver, so load all images normally
    Array.from(images).forEach(function (image) {
      loadImg(image);
    });
  }

  var titleElem = document.getElementsByTagName("title")[0];
  // setTimeout(function () {
  loadCSS("/css/defer.css", titleElem);
  // }, 1000);

  // setTimeout(function () {
  matchAndLoad(
      "/css/defer-min-width-1100.css",
      "screen and (min-width:1100px)",
      titleElem,
  );
  matchAndLoad(
      "/css/defer-max-width-1099.css",
      "screen and (max-width: 1099px)",
      titleElem,
  );
  matchAndLoad(
      "/css/defer-max-width-784.css",
      "screen and (max-width: 784px)",
      titleElem,
  );
  // }, 3000);

  var themeLinkElem = document.getElementsByClassName("theme-link")[0].childNodes[0];
  themeLinkElem.onclick = function() {
    var isSimpleMode = ls.getItem(SIMPLE_MODE_KEY) === "true";
    if (isSimpleMode) {
      ls.setItem(SIMPLE_MODE_KEY, "false");
      loadElegantTheme();
      this.setAttribute("title", TOOLTIP_SIMPLE);
    } else {
      ls.setItem(SIMPLE_MODE_KEY, "true");
      var list = document.getElementsByClassName(ELEGANT_MODE_CLASS_NAME);
      Array.from(list).forEach(function (e) {
        e.parentNode.removeChild(e);
      });
      elegantCssListenerCache.forEach(function (v, k) {
        k.removeListener(v);
      });
      this.setAttribute("title", TOOLTIP_ELEGANT);
    }
    return false;
  };

  // set the theme according to network limitations
  var connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
  if (connection && (
      connection.saveData ||
      connection.effectiveType === "cellular" ||
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
  )) {
    // Network Information API exists, but the user has a slow connection or
    // is using the Save-Data preference is enabled, so do not load stage-2
    // fonts and elegant theme in order to reduce the amount of mobile data
    // that is used for this session
  } else {
    var isSimpleMode = ls.getItem(SIMPLE_MODE_KEY) === "true";
    if (isSimpleMode) {
      themeLinkElem.setAttribute("title", TOOLTIP_ELEGANT);
    } else {
      themeLinkElem.setAttribute("title", TOOLTIP_SIMPLE);
      loadElegantTheme();
    }
  }
}

var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) {
  raf(function () {
    window.setTimeout(init, 0);
  });
} else {
  window.addEventListener("load", init);
}

window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
