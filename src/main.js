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
