/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function (w) {
  "use strict";
  /* exported loadCSS */
  const loadCSS = function (href, before, media) {
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

loadCSS("/css/defer.css");

let minWidth1100Loaded = false;
let maxWidth1099Loaded = false;
let minWidth785Loaded = false;
let maxWidth784Loaded = false;

const q1 = "screen and (min-width:1100px)";
const mq1 = window.matchMedia(q1);
if (mq1.matches && !minWidth1100Loaded) {
  loadCSS("/css/defer-min-width-1100.css", "", q1);
  minWidth1100Loaded = true;
}
mq1.addListener(function (mq1) {
  if (mq1.matches && !minWidth1100Loaded) {
    loadCSS("/css/defer-min-width-1100.css", "", q1);
    minWidth1100Loaded = true;
  }
});

const q2 = "screen and (max-width: 1099px)";
const mq2 = window.matchMedia(q2);
if (mq2.matches && !maxWidth1099Loaded) {
  loadCSS("/css/defer-max-width-1099.css", "", q2);
  maxWidth1099Loaded = true;
}
mq2.addListener(function (mq2) {
  if (mq2.matches && !maxWidth1099Loaded) {
    loadCSS("/css/defer-max-width-1099.css", "", q2);
    maxWidth1099Loaded = true;
  }
});

const q3 = "screen and (min-width: 785px)";
const mq3 = window.matchMedia(q3);
if (mq3.matches && !minWidth785Loaded) {
  loadCSS("/css/defer-min-width-785.css", "", q3);
  minWidth785Loaded = true;
}
mq3.addListener(function (mq3) {
  if (mq3.matches && !minWidth785Loaded) {
    loadCSS("/css/defer-min-width-785.css", "", q3);
    minWidth785Loaded = true;
  }
});

const q4 = "screen and (max-width: 784px)";
const mq4 = window.matchMedia(q4);
if (mq4.matches && !maxWidth784Loaded) {
  loadCSS("/css/defer-max-width-784.css", "", q4);
  maxWidth784Loaded = true;
}
mq4.addListener(function (mq4) {
  if (mq4.matches && !maxWidth784Loaded) {
    loadCSS("/css/defer-max-width-784.css", "", q4);
    maxWidth784Loaded = true;
  }
});

loadJS("/js/defer.js");
loadJS("https://www.google-analytics.com/analytics.js");

window.ga = window.ga || function () {
  (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', 'UA-103779128-1', 'auto');
ga('send', 'pageview');
