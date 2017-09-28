/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function(w){
    "use strict";
    /* exported loadCSS */
    var loadCSS = function( href, before, media ){
        // Arguments explained:
        // `href` [REQUIRED] is the URL for your CSS file.
        // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
            // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
        // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
        var doc = w.document;
        var ss = doc.createElement( "link" );
        var ref;
        if( before ){
            ref = before;
        }
        else {
            var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
            ref = refs[ refs.length - 1];
        }

        var sheets = doc.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        ss.media = "only x";

        // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
        function ready( cb ){
            if( doc.body ){
                return cb();
            }
            setTimeout(function(){
                ready( cb );
            });
        }
        // Inject link
            // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
            // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ready( function(){
            ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
        });
        // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
        var onloadcssdefined = function( cb ){
            var resolvedHref = ss.href;
            var i = sheets.length;
            while( i-- ){
                if( sheets[ i ].href === resolvedHref ){
                    return cb();
                }
            }
            setTimeout(function() {
                onloadcssdefined( cb );
            });
        };

        function loadCB(){
            if( ss.addEventListener ){
                ss.removeEventListener( "load", loadCB );
            }
            ss.media = media || "all";
        }

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if( ss.addEventListener ){
            ss.addEventListener( "load", loadCB);
        }
        ss.onloadcssdefined = onloadcssdefined;
        onloadcssdefined( loadCB );
        return ss;
    };
    // commonjs
    if( typeof exports !== "undefined" ){
        exports.loadCSS = loadCSS;
    }
    else {
        w.loadCSS = loadCSS;
    }
}( typeof global !== "undefined" ? global : this ));

/*! loadJS. [c]2014 Filament Group, Inc. MIT License */
(function( w ){
    var loadJS = function( src, cb ){
        "use strict";
        var ref = w.document.getElementsByTagName( "script" )[ 0 ];
        var script = w.document.createElement( "script" );
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore( script, ref );
        if (cb && typeof(cb) === "function") {
            script.onload = cb;
        }
        return script;
    };
    // commonjs
    if( typeof module !== "undefined" ){
        module.exports = loadJS;
    }
    else {
        w.loadJS = loadJS;
    }
}( typeof global !== "undefined" ? global : this ));

loadCSS("/css/defer.css");
loadCSS("/css/print.css", "", "only print");

var minWidth1081Loaded = false;
var maxWidth1080Loaded = false;
var maxWidth750Loaded = false;

const mq1 = window.matchMedia("screen and (min-width:1081px)");
if(mq1.matches && !minWidth1081Loaded) {
    loadCSS("/css/defer-min-width-1081.css", "", "screen and (min-width:1081px)");
    minWidth1081Loaded = true;
}
mq1.addListener(function(mq1) {
    if(mq1.matches && !minWidth1081Loaded) {
        loadCSS("/css/defer-min-width-1081.css", "", "screen and (min-width:1081px)");
        minWidth1081Loaded = true;
    }
});

const mq2 = window.matchMedia("screen and (max-width:1080px)");
if(mq2.matches && !maxWidth1080Loaded) {
    loadCSS("/css/defer-max-width-1080.css", "", "screen and (max-width:1080px)");
    maxWidth1080Loaded = true;
}
mq2.addListener(function(mq2) {
    if(mq2.matches && !maxWidth1080Loaded) {
        loadCSS("/css/defer-max-width-1080.css", "", "screen and (max-width:1080px)");
        maxWidth1080Loaded = true;
    }
});

const mq3 = window.matchMedia("screen and (max-width:750px)");
if(mq3.matches && !maxWidth750Loaded) {
    loadCSS("/css/defer-max-width-750.css", "", "screen and (max-width:750px)");
    maxWidth750Loaded = true;
}
mq3.addListener(function(mq3) {
    if(mq3.matches && !maxWidth750Loaded) {
        loadCSS("/css/defer-max-width-750.css", "", "screen and (max-width:750px)");
        maxWidth750Loaded = true;
    }
});

loadJS("/js/defer.js");
loadJS("https://www.google-analytics.com/analytics.js");

window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-103779128-1', 'auto');
ga('send', 'pageview');
