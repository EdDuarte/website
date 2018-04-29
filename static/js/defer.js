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

};

const raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function () {
  window.setTimeout(init, 0);
});
else window.addEventListener('load', init);
