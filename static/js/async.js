
const SIMPLE_MODE_KEY = 'simpleModeActive';
const ELEGANT_MODE_CLASS_NAME = 'elegant';
const TOOLTIP_ELEGANT = 'Switch to elegant theme';
const TOOLTIP_SIMPLE = 'Switch to simple theme (better for slow connections)';

const ls = window.localStorage;

const themeLinkElem = document.getElementsByClassName("theme-link")[0].childNodes[0];
const titleElem = document.getElementsByTagName("title")[0];

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function (w) {
  "use strict";
  /* exported loadCSS */
  const loadCSS = function (href, before, media, className) {
    // Arguments explained:
    // `href` [REQUIRED] is the URL for your CSS file.
    // `before` [OPTIONAL] is the element the script should use as a reference
    // for injecting our stylesheet <link> before
    // By default, loadCSS attempts to inject the link after the last stylesheet
    // or script in the DOM. However, you might desire a more specific location
    // in your document.
    // `media` [OPTIONAL] is the media type or query of the stylesheet. By
    // default it will be 'all'
    const doc = w.document;
    const ss = doc.createElement("link");
    if (className) {
      ss.setAttribute("class", className);
    }
    let ref;
    if (before) {
      ref = before;
    }
    else {
      const refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
      ref = refs[refs.length - 1];
    }

    const sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily set media to something inapplicable to ensure it'll fetch
    // without blocking render
    ss.media = "only x";

    // wait until body is defined before injecting link. This ensures a
    // non-blocking load in IE11.
    function ready(cb) {
      if (doc.body) {
        return cb();
      }
      setTimeout(function () {
        ready(cb);
      });
    }

    // Inject link
    // Note: the ternary preserves the existing behavior of "before" argument,
    // but we could choose to change the argument to "after" in a later release
    // and standardize on ref.nextSibling for all refs
    // Note: `insertBefore` is used instead of `appendChild`, for safety re:
    // http://www.paulirish.com/2011/surefire-dom-element-insertion/
    ready(function () {
      ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
    });
    // A method (exposed on return object for external use) that mimics onload
    // by polling document.styleSheets until it includes the new sheet.
    const onloadcssdefined = function (cb) {
      const resolvedHref = ss.href;
      let i = sheets.length;
      while (i--) {
        if (sheets[i].href === resolvedHref) {
          return cb();
        }
      }
      setTimeout(function () {
        onloadcssdefined(cb);
      });
    };

    function loadCB() {
      if (ss.addEventListener) {
        ss.removeEventListener("load", loadCB);
      }
      ss.media = media || "all";
    }

    // once loaded, set link's media back to `all` so that the stylesheet
    // applies once it loads
    if (ss.addEventListener) {
      ss.addEventListener("load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined(loadCB);
    return ss;
  };
  // commonjs
  if (typeof exports !== "undefined") {
    exports.loadCSS = loadCSS;
  }
  else {
    w.loadCSS = loadCSS;
  }
}(typeof global !== "undefined" ? global : this));

/*! loadJS. [c]2014 Filament Group, Inc. MIT License */
(function (w) {
  const loadJS = function (src, cb) {
    "use strict";
    const ref = w.document.getElementsByTagName("script")[0];
    const script = w.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    if (cb && typeof(cb) === "function") {
      script.onload = cb;
    }
    return script;
  };
  // commonjs
  if (typeof module !== "undefined") {
    module.exports = loadJS;
  }
  else {
    w.loadJS = loadJS;
  }
}(typeof global !== "undefined" ? global : this));

const matchAndLoad = function (f, q, before, className) {
  const mq = window.matchMedia(q);
  let loaded = false;
  if (mq.matches && !loaded) {
    loadCSS(f, before, q, className);
    loaded = true;
  }
  mq.addListener(function (mq) {
    if (mq.matches && !loaded) {
      loadCSS(f, before, q, className);
      // loaded = true;
    }
  });
};

const loadElegantTheme = function () {
  // setTimeout(function () {
  loadCSS("/css/defer-elegant.css", titleElem, "all", ELEGANT_MODE_CLASS_NAME);
  // }, 2000);

  matchAndLoad(
      "/css/defer-elegant-min-width-2750.css",
      "screen and (min-width:2750px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME
  );
  matchAndLoad(
      "/css/defer-elegant-min-width-1100.css",
      "screen and (min-width:1100px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME
  );
  matchAndLoad(
      "/css/defer-elegant-max-width-1099.css",
      "screen and (max-width: 1099px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME
  );
  matchAndLoad(
      "/css/defer-elegant-min-width-785.css",
      "screen and (min-width: 785px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME
  );
  matchAndLoad(
      "/css/defer-elegant-max-width-784.css",
      "screen and (max-width: 784px)",
      titleElem,
      ELEGANT_MODE_CLASS_NAME
  );
};

const toggleTheme = function () {
  const isSimpleMode = ls.getItem(SIMPLE_MODE_KEY) === 'true';
  if (isSimpleMode) {
    ls.setItem(SIMPLE_MODE_KEY, 'false');
    loadElegantTheme();
    themeLinkElem.setAttribute('title', TOOLTIP_SIMPLE);
  } else {
    ls.setItem(SIMPLE_MODE_KEY, 'true');
    const list = document.getElementsByClassName(ELEGANT_MODE_CLASS_NAME);
    console.log(list);
    Array.from(list).forEach((e) => {
      console.log(e);
      e.parentNode.removeChild(e);
    });
    themeLinkElem.setAttribute('title', TOOLTIP_ELEGANT);
  }
  return false;
};

// setTimeout(function () {
loadCSS("/css/defer.css", titleElem);
// }, 1000);

// setTimeout(function () {

matchAndLoad(
    "/css/defer-min-width-1100.css",
    "screen and (min-width:1100px)",
    titleElem
);
matchAndLoad(
    "/css/defer-max-width-1099.css",
    "screen and (max-width: 1099px)",
    titleElem
);
matchAndLoad(
    "/css/defer-max-width-784.css",
    "screen and (max-width: 784px)",
    titleElem
);

// }, 3000);

const isSimpleMode = ls.getItem(SIMPLE_MODE_KEY) === 'true';

if (isSimpleMode) {
  themeLinkElem.setAttribute('title', TOOLTIP_ELEGANT);
} else {
  themeLinkElem.setAttribute('title', TOOLTIP_SIMPLE);
  loadElegantTheme();
}

loadJS("/js/defer.js");
loadJS("https://www.google-analytics.com/analytics.js");

window.ga = window.ga || function () {
  (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', 'UA-103779128-1', 'auto');
ga('send', 'pageview');
