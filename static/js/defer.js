
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function loadImg(figure) {
    var src = figure.getAttribute('src');
    if (src) {
        var img = figure.getElementsByTagName('img')[0];
        if (img) {
        	img.setAttribute('src',src);
        }
    }
}

var init = function() {
	const images = document.querySelectorAll('.js-lazy-image');

	var version = detectIE();

	if (version === false) {
	    // it's not IE nor Edge, so IntersectionObserver is supported
	    const config = {
	        rootMargin: '50px 0px',
	        threshold: 0.01
	    };

	    if (!('IntersectionObserver' in window)) {
	        Array.from(images).forEach(image => loadImg(image));
	    } else {
	        let observer = new IntersectionObserver(function(entries){
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

var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(init, 0); });
else window.addEventListener('load', init);


window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-103779128-1', 'auto');
ga('send', 'pageview');
