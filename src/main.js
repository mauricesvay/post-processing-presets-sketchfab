// ==UserScript==
// @name          Sketchfab Post-Process Presets
// @namespace     https://github.com/PadreZippo/post-processing-presets-sketchfab
// @version       0.1.0
// @updateURL     https://raw.githubusercontent.com/PadreZippo/post-processing-presets-sketchfab/master/user.js
// @downloadURL   https://raw.githubusercontent.com/PadreZippo/post-processing-presets-sketchfab/master/user.js
// @description   Stores post-processing presets
// @include       https://sketchfab.com/models/*/edit
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_listValues
// @grant         GM_deleteValue
// @grant         GM_xmlhttpRequest
// @grant         GM_download
// ==/UserScript==

console.log( 'Editor extras injected' );
console.log( 'Custom presets: ' + GM_listValues() );

var $ = unsafeWindow.publicLibraries.$,
    _ = unsafeWindow.publicLibraries._;

//http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM = ( function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function ( obj, callback ) {
        if ( MutationObserver ) {
            // define a new observer
            var obs = new MutationObserver( function ( mutations, observer ) {
                if ( mutations[ 0 ].addedNodes.length || mutations[ 0 ].removedNodes.length )
                    callback();
            } );
            // have the observer observe foo for changes in children
            obs.observe( obj, {
                childList: true,
                subtree: true
            } );
        } else if ( eventListenerSupported ) {
            obj.addEventListener( 'DOMNodeInserted', callback, false );
            obj.addEventListener( 'DOMNodeRemoved', callback, false );
        }
    };
} )();

function initialize() {
    initializePostProcessing();
    initializeMaterials();
}

initialize();
