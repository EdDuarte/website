const SIMPLE_MODE_KEY = 'simpleModeActive';
const ELEGANT_MODE_CLASS_NAME = 'elegant';
const TOOLTIP_ELEGANT = 'Switch to elegant theme';
const TOOLTIP_SIMPLE = 'Switch to simple theme (better for slow connections)';

const ls = window.localStorage;
const elegantCssListenerCache = new Map();

const themeLinkElem = document.getElementsByClassName("theme-link")[0].childNodes[0];
const titleElem = document.getElementsByTagName("title")[0];

function supportsIntersectionObserver() {
  const ua = window.navigator.userAgent;

  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older
    return false;
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11
    return false;
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+)
    return false;
  }

  // other browser
  return true;
}

function loadImg(figure) {
  const src = figure.getAttribute('src');
  if (src) {
    const img = figure.getElementsByTagName('img')[0];
    if (img) {
      img.setAttribute('src', src);
    }
  }
}

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

const matchAndLoad = function (f, q, before, className, listenerCache) {
  const mq = window.matchMedia(q);
  let loaded = false;
  if (mq.matches && !loaded) {
    loadCSS(f, before, q, className);
    loaded = true;
  }
  const listener = (mq) => {
    if (mq.matches && !loaded) {
      loadCSS(f, before, q, className);
      // loaded = true;
    }
  };
  mq.addListener(listener);
  if (listenerCache) {
    listenerCache.set(mq, listener);
  }
};

const loadElegantTheme = function () {
  // setTimeout(function () {
  loadCSS("/css/defer-elegant.css", titleElem, "all", ELEGANT_MODE_CLASS_NAME);
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
    Array.from(list).forEach((e) => {
      e.parentNode.removeChild(e);
    });
    elegantCssListenerCache.forEach((v, k) => {
      k.removeListener(v);
    });
    themeLinkElem.setAttribute('title', TOOLTIP_ELEGANT);
  }
  return false;
};

const init = function () {
  const images = document.querySelectorAll('.js-lazy-image');
  const supported = supportsIntersectionObserver();

  if (supported === true) {
    const config = {
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    if (!('IntersectionObserver' in window)) {
      // it's WebKit browser, but does not contain
      // IntersectionObserver, so load images normally
      Array.from(images).forEach(image => loadImg(image));
    } else {
      let observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            loadImg(entry.target);
          }
        });
      }, config);
      images.forEach(image => {
        observer.observe(image);
      });
    }
  } else {
    // it's IE or Edge, so load images normally
    Array.from(images).forEach(image => loadImg(image));
  }

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

// set the theme according to network limitations
  const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
  if (connection && connection.effectiveType === 'cellular') {
    // do not load elegant theme, in order to reduce the amount
    // of mobile data that is used for this session
  } else {
    const isSimpleMode = ls.getItem(SIMPLE_MODE_KEY) === 'true';
    if (isSimpleMode) {
      themeLinkElem.setAttribute('title', TOOLTIP_ELEGANT);
    } else {
      themeLinkElem.setAttribute('title', TOOLTIP_SIMPLE);
      loadElegantTheme();
    }
  }
};

const raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function () {
  window.setTimeout(init, 0);
});
else window.addEventListener('load', init);
