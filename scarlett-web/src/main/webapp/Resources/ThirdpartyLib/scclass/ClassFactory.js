var isc = window.isc ? window.isc : {};
isc._start = new Date().getTime();

isc._$debugModules = "debugModules";
isc._$nonDebugModules = "nonDebugModules";
isc.checkForDebugAndNonDebugModules = function () {
    if (isc.checkForDebugAndNonDebugModules._loggedWarning) return;
    var debugModules = isc['_' + this._$debugModules],
        haveDebugModules = debugModules != null && debugModules.length > 0,
        nonDebugModules = isc['_' + this._$nonDebugModules],
        haveNonDebugModules = nonDebugModules != null && nonDebugModules.length > 0;

    if (haveDebugModules && haveNonDebugModules) {
        isc.logWarn("Both Debug and non-Debug modules were loaded; the Debug versions of '" +
        debugModules.join("', '") + "' and the non-Debug versions of '" + nonDebugModules.join("', '") +
        "' were loaded. Mixing Debug and non-Debug modules is not supported and may lead to " +
        "JavaScript errors and/or unpredictable behavior. " +
        "To fix, ensure that only modules in the modules/ folder or the modules-debug/ " +
        "folder are loaded and clear the browser cache. If using Smart GWT, also clear the " +
        "GWT unit cache and recompile.");
        isc.checkForDebugAndNonDebugModules._loggedWarning = true;
    }
};

isc._optionalModules = {
    SCServer: {present: "false", name: "SmartClient Server", serverOnly: true, isPro: true},
    Drawing: {present: "true", name: "Drawing Module"},
    PluginBridges: {present: "true", name: "PluginBridges Module"},
    RichTextEditor: {present: "true", name: "RichTextEditor Module"},
    Calendar: {present: "true", name: "Calendar Module"},
    Analytics: {present: "false", name: "Analytics Module"},
    Charts: {present: "false", name: "Charts Module"},
    Tools: {present: "${includeTools}", name: "Portal and Tools Module"},
    NetworkPerformance: {present: "false", name: "Network Performance Module"},
    // alias for NetworkPerformance
    FileLoader: {present: "false", name: "Network Performance Module"},
    RealtimeMessaging: {present: "false", name: "RealtimeMessaging Module"},
    // Enterprise Features
    serverCriteria: {present: "false", name: "Server Advanced Filtering", serverOnly: true, isFeature: true},
    customSQL: {present: "false", name: "SQL Templating", serverOnly: true, isFeature: true},
    chaining: {present: "false", name: "Transaction Chaining", serverOnly: true, isFeature: true},
    batchDSGenerator: {present: "false", name: "Batch DS-Generator", serverOnly: true, isFeature: true},
    batchUploader: {present: "false", name: "Batch Uploader", serverOnly: true, isFeature: true},
    transactions: {present: "false", name: "Automatic Transaction Management", serverOnly: true, isFeature: true}    
};
isc.canonicalizeModules = function (modules) {
    if (!modules) return null;

    // canonicalize to Array, split on comma
    if (isc.isA.String(modules)) {
        if (modules.indexOf(",") != -1) {
            modules = modules.split(",");
            var trimLeft = /^\s+/, trimRight = /\s+$/;
            for (var i=0; i<modules.length; i++) {
                modules[i] = modules[i].replace(trimLeft, "").replace(trimRight, "");
            }
        } else modules = [modules];
    }
    return modules;
};
isc.hasOptionalModules = function (modules) {
    // ease of use shortcut, null value means no optional module requirements
    if (!modules) return true;

    modules = isc.canonicalizeModules(modules);

    for (var i = 0; i < modules.length; i++) if (!isc.hasOptionalModule(modules[i])) return false;
    return true;
};
isc.getMissingModules = function (requiredModules) {
    var result = [];
    requiredModules = isc.canonicalizeModules(requiredModules);
    for (var i = 0; i < requiredModules.length; i++) {
        var module = requiredModules[i];
        if (!isc.hasOptionalModule(module)) result.add(isc._optionalModules[module]);
    }
    return result;
};
isc.hasOptionalModule = function (module) {
    var v = isc._optionalModules[module];
    if (!v) {
        if(isc.Log) isc.Log.logWarn("isc.hasOptionalModule - unknown module: " + module);
        return false;
    }
    // has module or devenv
    return v.present == "true" || v.present.charAt(0) == "$";
};
isc.getOptionalModule = function (module) {
    return isc._optionalModules[module];
};

// default to "simple names" mode, where all ISC classes are defined as global variables
isc._useSimpleNames = window.isc_useSimpleNames; 
if (isc._useSimpleNames == null) isc._useSimpleNames = true;


isc._longDOMIds = window.isc_useLongDOMIDs; 

// add a property to global scope.  This property will always be available as "isc[propName]" and
// will also be available as "window[propName]" if we are in "simpleNames" mode.
// NOTE: even in simpleNames mode, where we assume it's OK to put things into global scope, we
// should still think carefully about creating globals.  Eg a variable like "params" which holds the
// current URL parameters (which we used to have) could easily get clobbered by some sloppy global
// JS, causing mysterious crashes.  Consider creating a class method (eg Page.getWidth()) or class
// property (Log.logViewer) instead, or making the variable isc.myMethod() or isc.myProperty.
isc._$iscPrefix = "isc.";
isc.addGlobal = function (propName, propValue) {
    if (propName.indexOf(isc._$iscPrefix) == 0) propName = propName.substring(4);
    isc[propName] = propValue;
    if (isc._useSimpleNames) window[propName] = propValue;
}





//>Offline

//XXX need to determine this flag correctly at load time
isc.onLine = true;

isc.isOffline = function () {
    return !isc.onLine;
};
isc.goOffline = function () { isc.onLine = false; };
isc.goOnline = function () { isc.onLine = true; };
if (window.addEventListener) {
    window.addEventListener("online", isc.goOnline, false);
    window.addEventListener("offline", isc.goOffline, false);
}
//<Offline

/*
 * Isomorphic SmartClient
 * Version v9.0p_2013-11-06 (2013-11-06)
 * Copyright(c) 1998 and beyond Isomorphic Software, Inc. All rights reserved.
 * "SmartClient" is a trademark of Isomorphic Software, Inc.
 *
 * licensing@smartclient.com
 *
 * http://smartclient.com/license
 */

 

// =================================================================================================
// IMPORTANT :If you update this file, also update FileLoader.js that has a subset of these checks
// =================================================================================================





//>	@object	Browser
// Object containing flags indicating basic attributes of the browser.
// @treeLocation Client Reference/Foundation
// @visibility external
//<
isc.addGlobal("Browser", {
	isSupported:false													
});


// ----------------------------------------------------------------
// Detecting browser type 
// ----------------------------------------------------------------

//>	@classAttr	Browser.isOpera		(boolean : ? : R)
//		Are we in Opera ?
//<
isc.Browser.isOpera = (navigator.appName == "Opera" ||
					navigator.userAgent.indexOf("Opera") != -1);

//>	@classAttr	Browser.isNS (boolean : ? : R)
//		Are we in Netscape (including Navigator 4+, NS6 & 7, and Mozilla)
//      Note: Safari also reports itself as Netscape, so isNS is true for Safari.
//<
isc.Browser.isNS = (navigator.appName == "Netscape" && !isc.Browser.isOpera);	

//>	@classAttr	Browser.isIE		(boolean : ? : R)
//		Are we in Internet Explorer?
//<
isc.Browser.isIE = (navigator.appName == "Microsoft Internet Explorer" &&
                    !isc.Browser.isOpera) ||
                   navigator.userAgent.indexOf("Trident/") != -1;

//>	@classAttr	Browser.isMSN		(boolean : ? : R)
//      Are we in the MSN browser (based on MSIE, so isIE will be true in this case)
//<
isc.Browser.isMSN = (isc.Browser.isIE && navigator.userAgent.indexOf("MSN") != -1);


//>	@classAttr	Browser.isMoz		(boolean : ? : R)
//		Are we in any Mozilla-derived browser, that is, a browser based on Netscape's Gecko 
//      engine? (includes Mozilla and Netscape 6+)
//<
isc.Browser.isMoz = (navigator.userAgent.indexOf("Gecko") != -1) &&
    // NOTE: Safari sends "(like Gecko)", but behaves differently from Moz in many ways
     
    (navigator.userAgent.indexOf("Safari") == -1) && 
    (navigator.userAgent.indexOf("AppleWebKit") == -1) &&
    !isc.Browser.isIE;

//>	@classAttr	Browser.isCamino (boolean : false : R)
//  Are we in Mozilla Camino?
//<
isc.Browser.isCamino = (isc.Browser.isMoz && navigator.userAgent.indexOf("Camino/") != -1);

//>	@classAttr	Browser.isFirefox (boolean : false : R)
//  Are we in Mozilla Firefox?
//<
isc.Browser.isFirefox = (isc.Browser.isMoz && navigator.userAgent.indexOf("Firefox/") != -1);


//> @classAttr  Browser.isAIR    (boolean : ? : R)
// Is this application running in the Adobe AIR environment?
//<
isc.Browser.isAIR = (navigator.userAgent.indexOf("AdobeAIR") != -1);

//>	@classAttr	Browser.isWebKit (boolean : ? : R)
// Are we in a WebKit-based browser (Safari, Chrome, mobile Safari and Android, others).
//<
isc.Browser.isWebKit = navigator.userAgent.indexOf("WebKit") != -1;

//>	@classAttr	Browser.isSafari (boolean : ? : R)
// Are we in Apple's "Safari" browser? Note that this property will also be set for other
// WebKit based browsers (such as Google Chrome).
//<
// As far as we know all "true" Safari implementations idenify themselves in the userAgent with
// the string "Safari".
// However the GWT hosted mode browser on OSX is also based on apple webkit and should be treated
// like Safari but is not a Safari browser and doesn't identify itself as such in the useragent
// Reported UserAgent:
//  Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_5; en-us) AppleWebKit/525.18 (KHTML, like Gecko)
isc.Browser.isSafari = isc.Browser.isAIR || navigator.userAgent.indexOf("Safari") != -1 ||
                        navigator.userAgent.indexOf("AppleWebKit") != -1;


//> @classAttr Browser.isChrome (boolean : ? : R)
// Are we in the Google Chrome browser?
//<
// Behaves like Safari in most ways
isc.Browser.isChrome = isc.Browser.isSafari && (navigator.userAgent.indexOf("Chrome/") != -1);


if (!isc.Browser.isIE && !isc.Browser.isOpera && !isc.Browser.isMoz && 
    !isc.Browser.isAIR && !isc.Browser.isWebkit && !isc.Browser.isSafari) 
{
    if (navigator.appVersion.indexOf("MSIE") != -1) {
        isc.Browser.isIE = true;
    }
}

// ----------------------------------------------------------------
// END Detecting browser type 
// ----------------------------------------------------------------


//>	@classAttr Browser.minorVersion		(number : ? : R)
//		Browser version, with minor revision included (4.7, 5.5, etc).
//
// NOTE: In Firefox 16+, Browser.minorVersion will equal Browser.version by design. See
// Firefox +externalLink{https://bugzilla.mozilla.org/show_bug.cgi?id=728831,Bug 728831}.
//<
if (navigator.userAgent.indexOf("Trident/") >= 0 &&
    navigator.userAgent.lastIndexOf("rv:") >= 0)
{
    
    isc.Browser.minorVersion = parseFloat(navigator.userAgent.substring(navigator.userAgent.lastIndexOf("rv:") + "rv:".length));
} else {
    isc.Browser.minorVersion = parseFloat(isc.Browser.isIE
                                      ? navigator.appVersion.substring(navigator.appVersion.indexOf("MSIE") + 5)
                                      : navigator.appVersion );
}
if (!isc.Browser.isIE) (function () {
    

    var needle, pos;
    if (navigator.appVersion) {
        // Safari
        needle = "Version/";
        pos = navigator.appVersion.indexOf(needle);
        if (pos >= 0) {
            isc.Browser.minorVersion = parseFloat(navigator.appVersion.substring(pos + needle.length));
            return;
        }
    }

    var ua = navigator.userAgent;

    needle = "Chrome/";
    pos = ua.indexOf(needle);
    if (pos >= 0) {
        isc.Browser.minorVersion = parseFloat(ua.substring(pos + needle.length));
        return;
    }

    // Handle Camino before Firefox because Camino includes "(like Firefox/x.x.x)" in the UA.
    needle = "Camino/";
    pos = ua.indexOf(needle);
    if (pos >= 0) {
        isc.Browser.minorVersion = parseFloat(ua.substring(pos + needle.length));
        return;
    }

    needle = "Firefox/";
    pos = ua.indexOf(needle);
    if (pos >= 0) {
        isc.Browser.minorVersion = parseFloat(ua.substring(pos + needle.length));
        return;
    }

    if (ua.indexOf("Opera/") >= 0) {
        needle = "Version/";
        pos = ua.indexOf(needle);
        if (pos >= 0) {
            isc.Browser.minorVersion = parseFloat(ua.substring(pos + needle.length));
            return;
        } else {
            // Opera 9.64
            needle = "Opera/";
            pos = ua.indexOf(needle);
            isc.Browser.minorVersion = parseFloat(ua.substring(pos + needle.length));
            return;
        }
    }
})();

//>	@classAttr	Browser.version		(number : ? : R)
//		Browser major version number (integer: 4, 5, etc).
//<
isc.Browser.version = parseInt(isc.Browser.minorVersion);

// actually means IE6 or earlier, which requires radically different optimization techniques
isc.Browser.isIE6 = isc.Browser.isIE && isc.Browser.version <= 6;


//>	@classAttr	Browser.caminoVersion (string : ? : R)
//		For Camino-based browsers, the Camino version number.  
//<
if (isc.Browser.isCamino) {
    // Camino Version is the last thing in the userAgent
    isc.Browser.caminoVersion = 
        navigator.userAgent.substring(navigator.userAgent.indexOf("Camino/") +7);
}

if (isc.Browser.isFirefox) {
//>	@classAttr	Browser.firefoxVersion (string : ? : R)
//		For Firefox-based browsers, the Firefox version number.  
//          - 0.10.1    is Firefox PR 1
//      After this the version numbers reported match those in the about dialog
//          - 1.0       is Firefox 1.0
//          - 1.0.2     is Firefox 1.0.2
//          - 1.5.0.3   is Firefox 1.5.0.3
//<
    var userAgent = navigator.userAgent,
        firefoxVersion = userAgent.substring(userAgent.indexOf("Firefox/")+ 8),
        majorMinorVersion = firefoxVersion.replace(/([^.]+\.[^.]+)\..*/, "$1");
    isc.Browser.firefoxVersion          = firefoxVersion;
    isc.Browser.firefoxMajorMinorNumber = parseFloat(majorMinorVersion);
}

//>	@classAttr	Browser.geckoVersion (integer : ? : R)
//		For Gecko-based browsers, the Gecko version number.  
//      Looks like a datestamp: 
//          - 20011019 is Netscape 6.2
//          - 20020530 is Mozilla 1.0
//          - 20020823 is Netscape 7.0
//          - 20020826 is Mozilla 1.1
//          - 20021126 is Mozilla 1.2
//          - 20030312 is Mozilla 1.3
//          - 20030624 is Mozilla 1.4
//          - 20031007 is Mozilla 1.5
//          - 20031120 is Mozilla 1.5.1 (Mac only release) 
//          - 20040113 is Mozilla 1.6
//          - 20040616 is Mozilla 1.7
//          - 20040910 is Mozilla 1.73
//          - 20041001 is Mozilla Firefox PR1 (-- also see firefox version)
//          - 20041107 is Mozilla Firefox 1.0
//          - 20050915 is Mozilla Firefox 1.0.7
//          - 20051107 is Mozilla Firefox 1.5 RC2   
//          - 20051111 is Mozilla Firefox 1.5 final
//          - 20060426 is Mozilla Firefox 1.5.0.3
//          - 20061010 is Mozilla Firefox 2.0
//          - 20070321 is Netscape 8.1.3 - LIES - really based on Firefox 1.0 codebase
//          - 20071109 is Firefox 3.0 beta 1
//          - 20080529 is Firefox 3.0
//          - 20100101 is Firefox 4.0.1
//<

if (isc.Browser.isMoz) {
    isc.Browser._geckoVIndex = navigator.userAgent.indexOf("Gecko/") + 6;
    // The 'parseInt' actually means we could just grab everything from the
    // end of "Gecko/" on, as we know that even if the gecko version is followed
    // by something, there will be a space before the next part of the UA string
    // However, we know the length, so just use it
    isc.Browser.geckoVersion = parseInt(
        navigator.userAgent.substring(
            isc.Browser._geckoVIndex, isc.Browser._geckoVIndex+8
        )
    );

    
    
    if (isc.Browser.isFirefox) {
        // clamp 1.0.x series to last known pre 1.5 version (1.0.7)
        if (isc.Browser.firefoxVersion.match(/^1\.0/)) isc.Browser.geckoVersion = 20050915;
        // clamp 2.0.x series to one day before near-final FF3 beta
        else if (isc.Browser.firefoxVersion.match(/^2\.0/)) isc.Browser.geckoVersion = 20071108;
    }
    
    
    if (isc.Browser.version >= 17) isc.Browser.geckoVersion = 20121121;
}

// Doctypes
//  Are we in strict standards mode.  This applies to IE6+ and all Moz 1.0+.
//
//  In strict mode, browsers attempt to behave in a more standards-compliant manner.  Of course,
//  standards interpretation varies pretty drastically between browser makers, so this is in effect
//  just another fairly arbitrary set of behaviors which continues to vary across browser makers,
//  and now also across modes within the same browser.
//
// Traditionally, we have essentially 3 cases to consider:
// - BackCompat / Quirks mode. This is the rendering used if docType is not specified, or if
//   specified as 'Transitional' or 'Frameset' / with no URI 
//   (EG: <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">)
//   This is the default mode.
// - Strict. Completely standards complient.
//   Triggered by 
//   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
// - "Almost Strict" (AKA Transitional). 
//   In IE this matches Strict mode completely. 
//   In Moz it matches strict mode except for rendering of images within tables - see
//   http://developer.mozilla.org/en/docs/Images%2C_Tables%2C_and_Mysterious_Gaps
//   Triggered "transitional" doctype with URI
//   Reports document.compatMode as "CSS1Compat" 
// - http://developer.mozilla.org/en/docs/Gecko%27s_%22Almost_Standards%22_Mode
// - http://www.htmlhelp.com/reference/html40/html/doctype.html
// - http://developer.mozilla.org/en/docs/Mozilla%27s_DOCTYPE_sniffing
//
// - we also have the HTML5 doctype to consider - <!DOCTYPE html>. Only applies to modern
//   browsers, and required for some of our more recent features (EG some drawing approaches)
//   We don't explicitly have a flag to differentiate between this and "isStrict"

//> @classAttr  Browser.isStrict    (boolean : ? : R)
//  Are we in strict standards mode.
//<
// HACK: Netscape6 does not report document.compatMode, so we can't tell that a DOCTYPE has been
// specified, but Netscape6 IS affected by a DOCTYPE.  So, in Netscape6, assume we're always in
// strict mode.  At the moment (3/30/03) all strict mode workarounds have identical behavior in
// normal mode.

isc.Browser.isStrict = document.compatMode == "CSS1Compat";
if (isc.Browser.isStrict && isc.Browser.isMoz) {

    isc.Browser._docTypePublicID = document.doctype.publicId;
    isc.Browser._docTypeSystemID = document.doctype.systemId;

}

// See http://developer.mozilla.org/en/docs/Mozilla%27s_DOCTYPE_sniffing
// See Drawing.test.html for some test cases
isc.Browser.isTransitional = /.*(Transitional|Frameset)/.test((document.all && document.all[0] && document.all[0].nodeValue) || (document.doctype && document.doctype.publicId));

isc.Browser.isIE7 = isc.Browser.isIE && isc.Browser.version == 7;

//> @classAttr Browser.isIE8 (boolean : ? : R)
// Returns true if we're running IE8 and we're in IE8 mode
// IE8 has a 'back-compat' type mode whereby it can run using IE7 rendering logic.
// This is explicitly controlled via the meta tags:
//
//    &lt;meta http-equiv="X-UA-Compatible" content="IE=8" /&gt;
// or
//    &lt;meta http-equiv="X-UA-Compatible" content="IE=7" /&gt;
//
// In beta versions IE8 reported itself version 7 and ran in IE7 mode unless the explicit IE8
// tag was present
// In final versions (observed on 8.0.6001.18702) it reports a browser version of 8 and runs
// in IE8 mode by default - but can be switched into IE7 mode via the explicit IE=7 tag.
// 
// We therefore want to check the document.documentMode tag rather than just the standard
// browser version when checking for IE8
//<
isc.Browser.isIE8 = isc.Browser.isIE && isc.Browser.version>=8 && document.documentMode == 8;

//<
//> @classAttr Browser.isIE8Strict (boolean : ? : R)
// Are we in IE8 [or greater] strict mode.
// <P>
// In IE8 when the meta tag is present to trigger IE7 / IE8 mode the document is in
// 
//    &lt;meta http-equiv="X-UA-Compatible" content="IE=8" /&gt;
//    &lt;meta http-equiv="X-UA-Compatible" content="IE=7" /&gt;
//
// If this tag is present, the document is in strict mode even if no DOCTYPE was present.
// The presence of this tag can be detected as document.documentMode being 8 rather than 7.
// document.compatMode still reports "CSS1Compat" as with earlier IE.
//<
// IE9 running in IE9 mode will report as IE8Strict:true. This makes sense since rendering quirks
// introduced in IE8 Strict, such as requiring explicit "overflow:hidden" in addition
// to dataset-layout-fixed in order to clip cells horizontally in tables apply in both places.
// For cases where we really need to distinguish we can check isc.Browser.version or isc.Browser.isIE9

isc.Browser.isIE8Strict = isc.Browser.isIE && 
                            (isc.Browser.isStrict && document.documentMode ==8) ||
                            document.documentMode > 8;

//> @classAttr Browser.isIE9 (boolean : ? : R)
// Returns true if we're running IE9, running as IE9
//<

isc.Browser.isIE9 = isc.Browser.isIE && isc.Browser.version>=9 && document.documentMode >= 9;

isc.Browser.isIE10 = isc.Browser.isIE && isc.Browser.version >= 10;

isc.Browser.isIE11 = isc.Browser.isIE && isc.Browser.version >= 11;

//> @classAttr  Browser.AIRVersion (string : ? : R)
// If this application running in the Adobe AIR environment, what version of AIR is
// running. Will be a string, like "1.0".
//<
isc.Browser.AIRVersion = (isc.Browser.isAIR ? navigator.userAgent.substring(navigator.userAgent.indexOf("AdobeAir/") + 9) : null);


//>	@classAttr	Browser.safariVersion (number : ? : R)
//		in Safari, what is is the reported version number
//<

if (isc.Browser.isSafari) {

    if (isc.Browser.isAIR) {
        
        isc.Browser.safariVersion = 530;
    } else {
        if (navigator.userAgent.indexOf("Safari/") != -1) {
            isc.Browser.rawSafariVersion = navigator.userAgent.substring(
                        navigator.userAgent.indexOf("Safari/") + 7
            );
        } else if (navigator.userAgent.indexOf("AppleWebKit/") != -1) {
            isc.Browser.rawSafariVersion = navigator.userAgent.substring(
                        navigator.userAgent.indexOf("AppleWebKit/") + 12
            );
          
        } else {
            isc.Browser.rawSafariVersion = "530" 
        }
        
        
        
        isc.Browser.safariVersion = (function () {
            var rawVersion = isc.Browser.rawSafariVersion,
                currentDot = rawVersion.indexOf(".");
            
            if (currentDot == -1) return parseInt(rawVersion);
            var version = rawVersion.substring(0,currentDot+1),
                nextDot;
            while (currentDot != -1) {
                // Check AFTER the dot
                currentDot += 1;
                nextDot = rawVersion.indexOf(".", currentDot);
                version += rawVersion.substring(currentDot, 
                                                (nextDot == -1 ? rawVersion.length: nextDot));
                currentDot = nextDot;
            }
            return parseFloat(version);
        })();
    }    
}

// -------------------------------------------------------------------
// Platform information
// -------------------------------------------------------------------

//>	@classAttr	Browser.isWin		(boolean : ? : R)
//		Is this a Windows computer ?
//<
isc.Browser.isWin = navigator.platform.toLowerCase().indexOf("win") > -1;
// NT 5.0 is Win2k, NT5.0.1 is Win2k SP1
isc.Browser.isWin2k = navigator.userAgent.match(/NT 5.01?/) != null;

//>	@classAttr	Browser.isMac		(boolean : ? : R)
//		Is this a Macintosh computer ?
//<
isc.Browser.isMac = navigator.platform.toLowerCase().indexOf("mac") > -1;	

isc.Browser.isUnix = (!isc.Browser.isMac &&! isc.Browser.isWin);

//> @groupDef mobileDevelopment
// SmartClient supports building web applications that can be accessed by mobile devices that
// support modern web browsers, specifically:
// <ul>
// <li> Safari on iOS devices (iPad, iPhone, iPod Touch)
// <li> Android's default (WebKit-based) browser
// <li> Windows Phone 7 (future, for 'Mango' and up)
// <li> Blackberry devices that use a WebKit-based browser (future)
// </ul>
// Via "packaging" technologies such as Titanium and PhoneGap, a SmartClient web application
// can be packaged as an installable native application that can be delivered via the "App Store"
// for the target mobile platform.  Applications packaged in this way have access to phone-specific
// data and services such as contacts stored on the phone, or the ability to invoke the device's camera.
// <P>
// Both Titanium and PhoneGap are open source mobile development frameworks which provide access to the 
// underlying native device APIs such as the accelerometer, geolocation, and UI. Both frameworks enable 
// application development using only JavaScript, CSS and HTML. Additionally they provide development environments 
// that work across a wide variety of devices.
// <P>
// PhoneGap has good support for native device APIs as noted +externalLink{http://www.phonegap.com/about/feature,here}.
// Titanium has similar support. There are differences between the two environments and how they
// expose their APIs, though both provide Xcode-compatible projects that can be compiled and run from the Xcode IDE.
// See +link{titaniumIntegration,Integration with Titanium} and +link{phonegapIntegration,Integration with PhoneGap}
// for more information.
// <P>
// <h3>Finger / touch events</h3>
// <P>
// Mobile and touch devices support "touch events" that correspond to finger actions on the
// screen.  By default, SmartClient simply sends touch events to UI components as normal mouse
// events.  Specifically:
// <ul>
// <li> a finger tap gesture will trigger mouseDown, mouseUp and click events
// <li> a touch-and-slide interaction will trigger drag and drop, firing the normal SmartClient
//      sequence of dragStart, dragMove, and dragStop
// <li> a touch-and-hold interaction will trigger a contextMenu event, and will trigger a hover
//      if no contextMenu is shown
// </ul>
// This means that most applications that are written initially to target desktop computers
// need little or no modification in order be able to run on tablet-sized devices (eg the
// iPad).  For handset-sized devices (phones, iPod touch), conditional logic may need to be
// added to make different use of the screen real estate.
// <P>
// <h3>Mobile look and feel</h3>
// <P>
// The "Mobile" skin should be used whenever mobile devices are detected.  This skin roughly
// mimics the appearance of the iOS default widgets wherever there is an iOS widget that
// corresponds closely to a given SmartClient widget.  It also makes extensive use of CSS3 to
// minimize the use of images while still providing an attractive look and feel.
// <P>
// In addition, this skin also changes the behavior of some SmartClient widgets to match the
// UI idioms common on mobile devices.  For example, the TabSet component switches to
// bottom-oriented tabs, which are flush together (no gaps).  If there are more than a certain
// number of tabs, a special "More" tab appears which lists other remaining tabs.  Among other
// examples, this is the behavior of the "iPad" application on iOS devices, and is an efficient
// use of minimal screen real estate which feels natural when used on a mobile device.
// <P>
// In order to detect whether to use the Mobile skin, because of the rapid proliferation of
// mobile devices, we recommend using server-side detection based on the User-Agent HTTP
// header, and using conditional logic (such as logic in a .jsp) to load the "Mobile" skin
// specifically for these devices.
// <P>
// <h3>Adapting to Screen Size and Orientation Change</h3>
// <P>
// Safari on the Apple iPod/iPhone supports explicitly configuring the viewport as detailed here:
// +externalLink{http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html}.
// Including these meta tags in your bootstrap HTML file will allow you to set 
// a default "zoom level" - how many pixels show up on the screen in landscape or portrait
// mode as well as disabling the user's standard zoom interactions. We also have 
// +link{Page.updateViewport(),an API} to configure the viewport programmatically at runtime.
// <P>
// Note that the +link{Page.getOrientation()} API may be used to determine the current
// orientation of the application, and +link{pageEvent,the page orientationChange event} will fire
// whenever the user rotates the screen allowing applications to directly respond to the user
// pivoting their device.
//
// @title Mobile Application Development
// @treeLocation Concepts
// @visibility external
//<


//> @groupDef titaniumIntegration
// Titanium provides an extensive Javascript API to access a native device's UI, phone, camera, geolocation, etc.
// Documentation, getting started, programming guides are +externalLink{http://developer.appcelerator.com/documentation,here}.
// Titanium provides a consistent API across devices including the ability to mix webviews with native controls.
// <P>
// The Titanium sample application provides an example of accessing a device's Contacts db using SmartClient. 
// The application presents 2 tabs 'Customers' and 'Contacts' and allows the user to import Customer contacts into 
// his/her contacts db resident on the device. Selecting a Customer's Contact address will show a map of the contact.
// Selecting a Customer's phone number will call the customer or prompt to import the contact into the user's 
// contacts. The latter option is default behavior on the iPad. Calling the customer contact is default behavior for 
// devices such as the iPhone or Android. 
// <P>
// The Titanium Contact object holds the following properties:
// <ul>
// <li>URL</li>
// <li>address</li>
// <li>birthday</li>
// <li>created</li>
// <li>date</li>
// <li>department</li>
// <li>email</li>
// <li>firstName</li>
// <li>firstPhonetic</li>
// <li>fullName</li>
// <li>image</li>
// <li>instantMessage</li>
// <li>jobTitle</li>
// <li>kind</li>
// <li>lastName</li>
// <li>lastPhonetic</li>
// <li>middleName</li>
// <li>middlePhonetic</li>
// <li>modified</li>
// <li>nickname</li>
// <li>note</li>
// <li>organization</li>
// <li>phone</li>
// <li>prefix</li>
// <li>relatedNames</li>
// <li>suffix</li>
// </ul>
// <P>
// The following Titanium API's are used:
// <ul>
// <li>Titanium.App.addEventListener</li>
// <li>Titanium.App.fireEvent</li>
// <li>Titanium.Contacts.getAllPeople</li>
// <li>Titanium.Geolocation.forwardGeocoder</li>
// <li>Titanium.Map.STANDARD_TYPE,</li>
// <li>Titanium.Map.createView</li>
// <li>Titanium.UI.createTab</li>
// <li>Titanium.UI.createTabGroup</li>
// <li>Titanium.UI.createWebView</li>
// <li>Titanium.UI.createWindow</li>
// <li>Titanium.UI.setBackgroundColor</li>
// </ul>
// <P>
// The following SmartClient Components are used
// <ul>
// <li>isc.DataSource</li>
// <li>isc.ListGrid</li> 
// </ul>
// <P>
// The following SmartClient Resources are bundled in the Titanium application
// <ul>
// <li>ISC_Containers.js</li>
// <li>ISC_Core.js</li>
// <li>ISC_DataBinding.js</li>
// <li>ISC_Foundation.js</li>
// <li>ISC_Grids.js</li>
// <li>load_skin.js</li>
// <li>skins/Mobile/images/black.gif</li>
// <li>skins/Mobile/images/blank.gif</li>
// <li>skins/Mobile/images/checked.png</li>
// <li>skins/Mobile/images/formula_menuItem.png</li>
// <li>skins/Mobile/images/grid.gif</li>
// <li>skins/Mobile/images/group_closed.gif</li>
// <li>skins/Mobile/images/group_opened.gif</li>
// <li>skins/Mobile/images/headerMenuButton_icon.gif</li>
// <li>skins/Mobile/images/loading.gif</li>
// <li>skins/Mobile/images/loadingSmall.gif</li>
// <li>skins/Mobile/images/opacity.png</li>
// <li>skins/Mobile/images/pinstripes.png</li>
// <li>skins/Mobile/images/row_collapsed.gif</li>
// <li>skins/Mobile/images/row_expanded.gif</li>
// <li>skins/Mobile/images/sort_ascending.gif</li>
// <li>skins/Mobile/images/sort_descending.gif</li>
// <li>skins/Mobile/skin_styles.css</li>
// </ul>
//
// @title Integration with Titanium
// @treeLocation Concepts/Mobile Application Development
// @visibility external
//<

//> @groupDef phonegapIntegration
// <P>
// PhoneGap documentation, quick start information, and programming guides are available at +externalLink{http://www.phonegap.com/,http://www.phonegap.com/}.
// <P>
// PhoneGap exposes a Contacts API which allows one to find, create and remove contacts from the device's contacts database.
// Unlike Titanium, which provides many native UI components, PhoneGap relies on 3rd party frameworks for 
// UI components. Additionally, PhoneGap provides no transitions or other animation effects normally 
// accessible in native applications.
// <P>
// In the following guide, the name "MyMobileApp" refers to a <!--<var class="smartclient">-->SmartClient<!--</var>--><!--<var class="smartgwt">-->Smart&nbsp;GWT<!--</var>-->
// mobile application. The instructions are intended to be general, and applicable to other apps by simply substituting the application name
// and the few other app-specific details.
//
// <h3>General Instructions</h3>
// For each target that PhoneGap supports, there is a special <code>www/</code> folder which contains
// the application JavaScript code and other assets. If the <code>www/</code> folder was created for you,
// the only file that is needed within is <code>cordova-x.x.x.js</code>. All other files can be deleted.
//
// <p>Copy your <!--<var class="smartclient">-->SmartClient<!--</var>--><!--<var class="smartgwt">-->compiled Smart&nbsp;GWT<!--</var>-->
// application into the <code>www/</code> folder. You will need to open the application's main HTML
// file in a text editor to make a few changes:
// <ul>
//   <li>Change the DOCTYPE to the HTML5 DOCTYPE: <code>&lt;!DOCTYPE html&gt;</code></li>
//   <li>Add a <code>&lt;script&gt;</code> tag to the <code>&lt;head&gt;</code> element to load <code>cordova-x.x.x.js</code>:
//       <pre>    &lt;script type="text/javascript" charset="UTF-8" language="JavaScript" src="cordova-x.x.x.js"&gt;&lt;/script&gt;</pre>
//
//       <p><b>NOTE:</b> There is a <code>cordova-x.x.x.js</code> for each target that PhoneGap
//       supports; they are different scripts. To set up a single codebase for multiple
//       targets, see the section titled <b>Multi-Target Codebase</b> below.</li>
//   <li>Ensure that the following <code>&lt;meta&gt;</code> tags are used, also in the <code>&lt;head&gt;</code> element:
//       <pre>    &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
//    &lt;meta name="format-detection" content="telephone=no"&gt;
//    &lt;meta name="viewport" content="user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width"&gt;</pre></li>
// </ul>
//
// <p>After making those changes, you will need to defer starting the application until the
//    <code>+externalLink{http://docs.phonegap.com/en/edge/cordova_events_events.md.html#deviceready,deviceready}</code> event has fired,
//    particularly if your application invokes any PhoneGap API function.
//
//        <!--<var class="smartclient">-->In SmartClient, deferring the application can be accomplished by wrapping all application code within a 'deviceready' listener:
//        <pre class="sourcefile">&lt;script type="text/javascript" language="JavaScript"&gt;
//document.addEventListener("deviceready", function onDeviceReady() {
//    // application code goes here
//}, false);
//&lt;/script&gt;</pre><!--</var>-->
//
//        <!--<var class="smartgwt">-->To accomplish this in Smart&nbsp;GWT, it is helpful to use a utility class together with a bit of JavaScript.
//
// <p>The following utility class can be used to defer the <code>onModuleLoad</code> code until PhoneGap is ready:
//
// <pre class="sourcefile">package com.mycompany.client;
//
//import com.google.gwt.core.client.EntryPoint;
//
//public abstract class CordovaEntryPoint implements EntryPoint {
//
//    &#x40;Override
//    public final native void onModuleLoad() &#x2F;*-{
//        var self = this;
//        if ($wnd.isDeviceReady) self.&#x40;com.mycompany.client.CordovaEntryPoint::onDeviceReady()();
//        else {
//            var listener = $entry(function () {
//                $doc.removeEventListener("deviceready", listener, false);
//                self.&#x40;com.mycompany.client.CordovaEntryPoint::onDeviceReady()();
//            });
//            $doc.addEventListener("deviceready", listener, false);
//        }
//    }-*&#x2F;;
//
//    protected abstract void onDeviceReady();
//}</pre>
//
// <p>The <code>CordovaEntryPoint</code> class is used in conjunction with the following JavaScript,
//        which should be added before the closing <code>&lt/body&gt;</code> tag:
//
//     <pre class="sourcefile">&lt;script type="text/javascript" language="JavaScript"&gt;
//document.addEventListener("deviceready", function onDeviceReady() {
//    window.isDeviceReady = true;
//    document.removeEventListener("deviceready", arguments.callee, false);
//}, false);
//&lt;/script&gt;</pre><!--</var>-->
//
// <h3>iOS Targets (iPhone &amp; iPad)</h3>
// Beginning with PhoneGap / Cordova 2.0.0, special command-line tooling +externalLink{http://phonegap.com/2012/07/20/adobe-phonegap-2-0-released.md/,has been introduced}
// which replaces the custom Xcode project templates. To create a new project, the
// +externalLink{http://docs.phonegap.com/en/edge/guide_command-line_index.md.html#Command-Line%20Usage_ios,<code>create</code> program}
// located at <code>$PHONEGAP_SDK/lib/ios/bin/create</code> is used:
//
// <pre>$PHONEGAP_SDK/lib/ios/bin/create path/to/my_cordova_project com.MyCompany.ProjectName ProjectName</pre>
//
// <ol>
// <li>Open <b>Terminal</b> and run <code>$PHONEGAP_SDK/lib/ios/bin/create MyMobileApp-iOS com.mycompany.MyMobileApp MyMobileApp</code></li>
// <li>Within the newly-created <code>MyMobileApp-iOS/</code> folder, open the Xcode project <code>MyMobileApp.xcodeproj</code>.</li>
// <li>Follow the General Instructions above.</li>
// <li>In Xcode, using the scheme selector toolbar, set the Scheme to <b>MyMobileApp &gt; iPhone 6.0 Simulator</b> or some other simulator destination.
//     Then click the <b>Run</b> button. Xcode will start the iOS Simulator and run the app.</li>
// <li>When you are finished testing the application in the simulator, click the <b>Stop</b> button.</li>
// </ol>
//
// <p>It is helpful to pay attention to the output window when testing the app within iOS Simulator.
// The output window contains all logs to <code>+externalLink{https://developer.mozilla.org/en/DOM/console,window.console}</code> and messages from the Cordova
// framework itself. One common issue is <code>ERROR whitelist rejection: url='SOMEURL'</code>,
// which means that SOMEURL has not been added to <code>&lt;access origin="..."/&gt;</code> in <code>config.xml</code>.
// Refer to the +externalLink{http://docs.phonegap.com/en/edge/guide_whitelist_index.md.html#Domain%20Whitelist%20Guide,Domain Whitelist Guide}
// for more information.
//
// <p>You can make changes to your application and re-run it in the simulator without needing to close Xcode:
// <ol>
// <li>Stop the application if running.</li>
// <li>Select <b>Product -&gt; Clean</b></li>
// <li>Click the <b>Run</b> button.</li>
// </ol>
//
// <p>Once you have completely tested the application within the simulator, you should test the app on
// real hardware. Refer to Apple's +externalLink{https://developer.apple.com/library/ios/#documentation/Xcode/Conceptual/ios_development_workflow/00-About_the_iOS_Application_Development_Workflow/introduction.html,Tools Workflow Guide for iOS} for complete instructions on provisioning the app for testing devices, in particular, the section titled
// +externalLink{https://developer.apple.com/library/ios/#documentation/Xcode/Conceptual/ios_development_workflow/35-Distributing_Applications/distributing_applications.html#//apple_ref/doc/uid/TP40007959-CH10-SW4,Sending Your App to Testers}.
// Note that you will need to set the Scheme destination to <b>MyMobileApp &gt; iOS Device</b> for the <b>Product -&gt; Archive</b> menu option to be available.
// <!-- The previous note should help SC devs get past this common sticking point: http://stackoverflow.com/questions/3087089/xcode-build-and-archive-menu-item-disabled -->
//
// <h3>Android Targets</h3>
// To begin targeting Android devices, follow the instructions on the
// +externalLink{http://docs.phonegap.com/en/edge/guide_getting-started_android_index.md.html#Getting%20Started%20with%20Android,Getting Started with Android guide}.
// After creating the new Android app project, follow the General Instructions above.
//
// <p>It is helpful to monitor the LogCat in Eclipse to verify that your application is working correctly.
// Common errors include:
// <ul>
// <li><code>Application Error The protocol is not supported. (gap://ready)</code>
//     <p>This means that the incorrect <code>cordova-x.x.x.js</code> script is being used. You
//     must use the <code>cordova-x.x.x.js</code> for Android.<!-- http://community.phonegap.com/nitobi/topics/error_starting_app_on_android -->
//     </li>
// <li><code>Data exceeds UNCOMPRESS_DATA_MAX</code>
//     <p>There is a limit to the size of individual Android app assets, typically 1 Megabyte. This
//        error message means that one asset file exceeds this limit. You should see a popup alert
//        dialog containing the name of the problematic file, and then the app will crash.
//     <!--<var class="smartgwt">--><p>The "Data exceeds UNCOMPRESS_DATA_MAX" error can be seen if, for example, the Smart&nbsp;GWT application
//        was compiled in DETAILED or PRETTY mode.<!--</var>-->
//     </li>
// </ul>
//
// <h3>Multi-Target Codebase</h3>
// There is a <code>cordova-x.x.x.js</code> for each target that PhoneGap supports; they are
// different scripts. To target multiple platforms using a single codebase, it can be useful to
// employ a "script changer" to load the correct <code>cordova-x.x.x.js</code>:
//
// <!--<var class="smartclient">--><pre class="sourcefile">&lt;script type="text/javascript" language="JavaScript"&gt;var isomorphicDir="./";&lt;/script&gt;
//&lt;script type="text/javascript" charset="UTF-8" language="JavaScript" src="ISC_Core.js"&gt;&lt;/script&gt;
//&lt;script type="text/javascript" language="JavaScript"&gt;
//    var scriptName;
//    if (isc.Browser.isAndroid) {
//        scriptName = "cordova-2.3.0-android.js";
//    } else if (isc.Browser.isIPad || isc.Browser.isIPhone) {
//        scriptName = "cordova-2.3.0-iOS.js";
//    }
//    if (scriptName) document.write("&lt;script type='text/javascript' charset='UTF-8' " +
//                                   "language='JavaScript' src='" + encodeURI(scriptName) + "'&gt;&lt;" + "/script&gt;");
//&lt;/script&gt;</pre><!--</var>-->
// <!--<var class="smartgwt">--><pre class="sourcefile">&lt;script type="text/javascript" language="JavaScript"&gt;
//    var scriptName;
//    if (navigator.userAgent.indexOf("Android") &gt; -1) {
//        scriptName = "cordova-2.3.0-android.js";
//    } else if (navigator.userAgent.indexOf("iPhone") &gt; -1 || navigator.userAgent.indexOf("iPad") &gt; -1) {
//        scriptName = "cordova-2.3.0-iOS.js";
//    }
//    if (scriptName) document.write("&lt;script type='text/javascript' charset='UTF-8' " +
//                                   "language='JavaScript' src='" + encodeURI(scriptName) + "'&gt;&lt;" + "/script&gt;");
//&lt;/script&gt;</pre><!--</var>-->
//
// <h3>Samples</h3>
// <!--<var class="smartclient">-->
// <p>The SmartClient SDK package has a sample application called MyContacts which demonstrates how
// to work with the PhoneGap API in a SmartClient app. The main SmartClient code is located in
// <code>smartclientSDK/examples/phonegap/MyContacts</code>. An Xcode project used to package the app for iOS
// devices is located at <code>smartclientSDK/examples/phonegap/MyContacts-iOS</code>. An Eclipse project used
// to package the app for Android devices is located at <code>smartclientSDK/examples/phonegap/MyContacts-Android</code>.
//
// <p>This sample application utilizes the script changer technique to load the correct <code>cordova-x.x.x.js</code>.
// <!--</var>--><!--<var class="smartgwt">-->
// <p>The Smart&nbsp;GWT Google Code project has a sample application called +externalLink{http://code.google.com/p/smartgwt/source/browse/#svn%2Ftrunk%2Fsamples%2Fphonegap%2FMyContacts,MyContacts} which demonstrates how
// to work with the PhoneGap API in a Smart&nbsp;GWT app. The main Smart&nbsp;GWT code is located at
// <code>+externalLink{http://code.google.com/p/smartgwt/source/browse/#svn%2Ftrunk%2Fsamples%2Fphonegap%2FMyContacts,trunk/samples/phonegap/MyContacts}</code>. An Xcode project used to package the app for iOS
// devices is located at <code>+externalLink{http://code.google.com/p/smartgwt/source/browse/#svn%2Ftrunk%2Fsamples%2Fphonegap%2FMyContacts-iOS,trunk/samples/phonegap/MyContacts-iOS}</code>. An Eclipse project used
// to package the app for Android devices is located at <code>+externalLink{http://code.google.com/p/smartgwt/source/browse/#svn%2Ftrunk%2Fsamples%2Fphonegap%2FMyContacts-Android,trunk/samples/phonegap/MyContacts-Android}</code>.
//
// <p>This sample application utilizes the script changer technique to load the correct <code>cordova-x.x.x.js</code>.
// Additionally, GWT's +externalLink{http://developers.google.com/web-toolkit/doc/latest/DevGuideCodingBasicsOverlay,JavaScript overlay types}
// feature is used to easily wrap the PhoneGap Contacts API for use by the Smart&nbsp;GWT app.
// <!--</var>-->
//
// @title Integration with PhoneGap
// @treeLocation Concepts/Mobile Application Development
// @visibility external
//<

isc.Browser.isAndroid = navigator.userAgent.indexOf("Android") > -1;


isc.Browser.isRIM = isc.Browser.isBlackBerry = 
    navigator.userAgent.indexOf("BlackBerry") > -1 || navigator.userAgent.indexOf("PlayBook") > -1;


isc.Browser.isMobileWebkit = (isc.Browser.isSafari && navigator.userAgent.indexOf(" Mobile/") > -1
    || isc.Browser.isAndroid
    || isc.Browser.isBlackBerry);

// intended for general mobile changes (performance, etc)
isc.Browser.isMobile = (isc.Browser.isMobileWebkit);

// browser has a touch interface (iPhone, iPad, Android device, etc)

isc.Browser.isTouch = (isc.Browser.isMobileWebkit);

// iPhone OS including iPad.  Search for iPad or iPhone.

isc.Browser.isIPhone = (isc.Browser.isMobileWebkit &&
                        (navigator.userAgent.indexOf("iPhone") > -1 ||
                         navigator.userAgent.indexOf("iPad") > -1));

// iPad.  Checks for "iPhone" OS + "iPad" in UA String.
isc.Browser.isIPad = (isc.Browser.isIPhone &&
                        navigator.userAgent.indexOf("iPad") > -1);

// tablet.  assumes isIPad for now, or non-mobile Android

isc.Browser.isTablet = (isc.Browser.isIPad) || 
                (isc.Browser.isRIM && navigator.userAgent.indexOf("Tablet") > -1) ||
                (isc.Browser.isAndroid && navigator.userAgent.indexOf("Mobile") == -1);

// specifically a handset-sized device, with an assumed screen width of 3-4 inches, implying
// the application will be working with only 300-400 pixels at typical DPI
isc.Browser.isHandset = (isc.Browser.isTouch && !isc.Browser.isTablet);

//> @classAttr  Browser.isBorderBox    (boolean : ? : R)
// Do divs render out with "border-box" sizing by default.
//<
// See comments in Canvas.adjustHandleSize() for a discussion of border-box vs content-box sizing
 
isc.Browser.isBorderBox = (isc.Browser.isIE && !isc.Browser.isStrict);

//>	@classAttr	Browser.lineFeed	(string : ? : RA)
//		Linefeed for this platform
//<
isc.Browser.lineFeed = (isc.Browser.isWin ? "\r\n" : "\r");

//>	@classAttr	Browser._supportsMethodTimeout	(string : ? : RA)
//		setTimeout() requires text string parameter in MacIE or IE 4
//<
isc.Browser._supportsMethodTimeout = false;//!(isc.Browser.isIE && (isc.Browser.isMac || isc.Browser.version == 4));	

//>	@classAttr	Browser.isDOM (string : ? : RA)
//		Whether this is a DOM-compliant browser.  Indicates general compliance with DOM standards,
//      not perfect compliance.
//<
isc.Browser.isDOM = (isc.Browser.isMoz || isc.Browser.isOpera || 
                     isc.Browser.isSafari || (isc.Browser.isIE && isc.Browser.version >= 5));

//> @classAttr Browser.isSupported (boolean : varies by browser : R)
// Whether SmartClient supports the current browser.
// <P>
// Note that this flag will only be available on browsers that at least support basic
// JavaScript.
// 
// @visibility external
//<
isc.Browser.isSupported = (
	// we support all versions of IE 5.5 and greater on Windows only
    (isc.Browser.isIE && isc.Browser.minorVersion >= 5.5 && isc.Browser.isWin) ||
	// Mozilla and Netscape 6, all platforms
    isc.Browser.isMoz ||
    isc.Browser.isOpera ||
    // Safari (only available on Mac)
    isc.Browser.isSafari ||
    isc.Browser.isAIR
);


isc.Browser.nativeMouseMoveOnCanvasScroll = 
    !isc.Browser.isTouch && (isc.Browser.isSafari || isc.Browser.isChrome);

//> @classAttr Browser.seleniumPresent (boolean : varies : R)
// Whether current page has been loaded by Selenium RC/WebDriver.
//<
isc.Browser.seleniumPresent = (function () {
    var match = location.href.match(/[?&](?:sc_selenium)=([^&#]*)/);
    return match && match.length > 1 && "true" == match[1];
})();

//> @type Autotest
// @value Browser.SHOWCASE autotest is targeting SmartClient or SGWT showcases
isc.Browser.SHOWCASE = "showcase";
// @value Browser.RUNNER autotest is targeting TestRunner-based JS tests
isc.Browser.RUNNER = "runner";
isc.Browser.autotest = (function () {
    var match = location.href.match(/[?&](?:autotest)=([^&#]*)/);
    return match && match.length > 1 ? match[1] : null;
})();

isc.Browser.allowsXSXHR = (
    (isc.Browser.isFirefox && isc.Browser.firefoxMajorMinorNumber >= 3.5) ||
    (isc.Browser.isChrome) ||
    (isc.Browser.isSafari && isc.Browser.safariVersion >= 531)
);
var isc_useGradientsPreIE9 = window.isc_useGradientsPreIE9;
isc.Browser.useCSSFilters =
    !isc.Browser.isIE || isc.Browser.isIE9 || isc_useGradientsPreIE9 != false;
var isc_css3Mode = window.isc_css3Mode;
if (isc_css3Mode == "on") {
    isc.Browser.useCSS3 = true;
} else if (isc_css3Mode == "off") {
    isc.Browser.useCSS3 = false;
} else if (isc_css3Mode == "supported" ||
           isc_css3Mode == "partialSupport" ||
           isc_css3Mode === undefined)
{
    isc.Browser.useCSS3 = isc.Browser.isWebKit ||
                          isc.Browser.isFirefox ||
                          (isc.Browser.isIE && (isc.Browser.isIE9 || isc.Browser.version >= 10));
} else {
    isc.Browser.useCSS3 = false;
}
var isc_spriting = window.isc_spriting;
if (isc_spriting == "off") {
    isc.Browser.useSpriting = false;
} else {
    isc.Browser.useSpriting = (!isc.Browser.isIE || isc.Browser.version >= 7);
}
isc.Browser.useInsertAdjacentHTML = !!document.documentElement.insertAdjacentHTML;
isc.Browser.hasNativeGetRect = (!isc.Browser.isIE &&
                                (!isc.Browser.isSafari || !isc.Browser.isMac || isc.Browser.version >= 6) &&
                                !!document.createRange &&
                                !!(document.createRange().getBoundingClientRect));
isc.Browser.useClipDiv = (isc.Browser.isMoz || isc.Browser.isSafari || isc.Browser.isOpera);
isc.Browser._useNewSingleDivSizing = !(isc.Browser.isIE && isc.Browser.version < 10 && !isc.Browser.isIE9);
isc.Browser.useCreateContextualFragment = !!document.createRange && !!document.createRange().createContextualFragment;
isc.Browser.hasTextOverflowEllipsis = (!isc.Browser.isMoz || isc.Browser.version >= 7) &&
                                      (!isc.Browser.isOpera || isc.Browser.version >= 9)
isc.Browser._textOverflowPropertyName = (!isc.Browser.isOpera || isc.Browser.version >= 11 ? "text-overflow" : "-o-text-overflow");
isc.Browser._hasGetBCR = !isc.Browser.isSafari || isc.Browser.version >= 4;
isc.Browser._hasDOMRanges = !!(window.getSelection && document.createRange && window.Range);
isc.Browser._supportsBackgroundSize = "backgroundSize" in document.documentElement.style;

/*
 * Isomorphic SmartClient
 * Version v9.0p_2013-11-06 (2013-11-06)
 * Copyright(c) 1998 and beyond Isomorphic Software, Inc. All rights reserved.
 * "SmartClient" is a trademark of Isomorphic Software, Inc.
 *
 * licensing@smartclient.com
 *
 * http://smartclient.com/license
 */

 

isc.noOp = function () {};
isc.emptyObject = {};
isc._emptyArray = [];
// normal and obfuscatable name
isc.emptyString = isc._emptyString = "";
isc.space = " ";
isc.dot = ".";
isc.semi = ";";
isc.colon = ":";
isc.slash = "/";
isc.star = "*";
isc.auto = "auto";
isc.px = "px";
isc.nbsp = "&nbsp;";
isc.xnbsp = "&amp;nbsp;"; // XHTML
isc._false = "false";
isc._falseUC = "FALSE";
isc._underscore = "_";
isc._dollar = "$";
isc._obsPrefix = "_$observed_";
isc._superProtoPrefix = "_$SuperProto_";

isc.gwtRef = "__ref";
isc.gwtModule = "__module";

//> @classMethod isc.logWarn()
// Same as +link{classMethod:Log.logWarn}.
//
// @param message    (String)  message to log
// @param [category]   (String)  category to log in, defaults to "Log"
//
// @visibility external
//<
isc.logWarn = function (message, category) { isc.Log.logWarn(message, category) }

//> @classMethod isc.echo()
// Same as +link{classMethod:Log.echo}.
//
// @param value    (any)  object to echo
// @return (string) a short string representation of the object
//
// @visibility external
//<
isc.echo = function (value) { return isc.Log.echo(value) }

//> @classMethod isc.echoAll()
// Same as +link{classMethod:Log.echoAll}.
//
// @param value    (any)  object to echo
// @return (string) a short string representation of the object
//
// @visibility external
//<
isc.echoAll = function (value) { return isc.Log.echoAll(value) }

//> @classMethod isc.echoLeaf()
// Same as +link{classMethod:Log.echoLeaf}.
//
// @param value    (any)  object to echo
// @return (string) a short string representation of the object
//
// @visibility external
//<
isc.echoLeaf = function (value) { return isc.Log.echoLeaf(value) }

isc.echoFull = function (value) { return isc.Log.echoFull(value) }

//> @classMethod isc.logEcho()
// Logs the echoed object (using +link{classMethod:isc.echo}) as a warning, prefixed with an
// optional message.
//
//     @param value    (any)  object to echo
//     @param message    (String)  message to log
//
// @see Log.logWarn() for logging info
// @visibility external
//<
isc.logEcho = function (value, message) { 
    if (message) message += ": ";
    isc.Log.logWarn((message || isc._emptyString) + isc.echo(value)) 
}

//> @classMethod isc.logEchoAll()
// Logs the echoed object (using +link{classMethod:isc.echoAll}) as a warning, prefixed with an
// optional message.
//
//     @param value    (any)  object to echo
//     @param message    (String)  message to log
//
// @see Log.logWarn() for logging info
// @visibility external
//<
isc.logEchoAll = function (value, message) { 
    if (message) message += ": ";
    isc.Log.logWarn((message || isc._emptyString) + isc.echoAll(value)) 
}

// OutputAsString / StackWalking / Tracing
// ---------------------------------------------------------------------------------------





isc._makeFunction = function (args, script) {
    var code = script || args;
    
    var returnVal;
    if (script == null) {
        returnVal = new Function(code);
        returnVal._argString = isc._emptyString;
    } else {
        returnVal = new Function(args, code);
    }
    return returnVal;
};


isc.doEval = function (code) {
    // transform code and eval inline
    if (isc.Browser.isMoz) return isc._transformCode(code);
    //return isc._transformCode(code);

    if (!isc._evalSet) isc._evalSet = [];
    isc._evalSet[isc._evalSet.length] = code;
    return null;
}
// called at module end
isc.finalEval = function () {
    //!OBFUSCATEOK        
    if (isc._evalSet) {
        if (isc.Browser.isMoz) {
            for (var i = 0; i < isc._evalSet.length; i++) {
                isc.eval(isc._evalSet[i]);
            }
        }
        var code = isc._evalSet.join("");

        if (isc.Browser.isSafari) code = isc._transformCode(code);
        // uncomment to use catch/rethrow stacks in IE as well
        //else if (isc.Browser.isIE) code = isc._transformCode(code);

        if (isc.Browser.isIE) window.execScript(code, "javascript");
        // Safari 
        else isc.eval(code);

        // Init pipelining: set a timeout to eval so that the module init time takes place
        // while the next module is being downloaded (except for the last module)
        // Can't be used for real until 
        /*
        var evalFunc = function () {
        if (isc.Browser.isIE) window.execScript(code, "javascript");
        // Safari 
        else isc.eval(code);
        }

        if (isc.module_DataBinding != 1) {
            //if (isc.Log) isc.Log.logWarn("delaying eval");
            setTimeout(evalFunc, 0)
        } else {
            evalFunc();
        }
        */
    }
    isc._evalSet = null;
}

//isc._eitherMarker = /\/\/\$[01]/;
isc._startMarker = "//$0";
isc._endMarker = "//$1";
isc._totalTransformTime = 0;
// code transform time, all modules
//    - Moz: about 140ms
//      - NOTE: overall init time rises by about 400ms, the balance is due to slower parsing
//        because of the added try/catch constructs.  This can be demonstrated by doing the
//        split/join, but just restoring the markers
//    - Safari: about 300ms
//    - IE: 266ms
// - NOTE: some key advantages of this approach as compared to server-side generation *aside
//   from* not hosing IE's ability to do full stack traces w/o try/catch:
//    - allows arbitrary start/end code to be added with only client-side changes
//    - can be conditional per load
//    - much smaller code size impact: could ship w/o local vars for production use

isc._addCallouts = true;
isc._transformCode = function (code) {
    // set flag indicating stack walking is enabled so that we will also add try..catch to
    // generated functions
    isc._stackWalkEnabled = true; 

    var start = isc.timeStamp ? isc.timeStamp() : new Date().getTime();

    var startCode = isc._tryBlock, endCode = isc._evalFromCatchBlock;
    if (isc._addCallouts) startCode = isc._methodEnter + startCode;

    var chunks = code.split(isc._eitherMarker),
        finalCode = [];

    var chunks = code.split(isc._startMarker);
    code = chunks.join(startCode);
    chunks = code.split(isc._endMarker);
    code = chunks.join(endCode);

    if (isc._addCallouts) {
        chunks = code.split("//$2");
        code = chunks.join(isc._methodExit);
    }

    /*
    // approach of single split and join to cut down on String churn.
    // Problem is that because of nested functions, markers do not alternate.  Would need to
    // detect which kind of marker is needed for a given slot, by eg checking the next char
    // over, which might be expensive enough to wipe out any advantage; untested.
    var pos = 0;
    for (var i = 0; i < chunks.length; i++) {
        finalCode[pos++] = chunks[i];
        if (i < chunks.length-1) {
            finalCode[pos++] = i % 2 == 0 ? isc._tryBlock : isc._evalFromCatchBlock;
        }
    }
    finalCode = finalCode.join("");

    try {
        window.isc.eval(finalCode);
    } catch (e) {
        //if (!this._alerted) alert(finalCode.substring(0,5000));
        //this._alerted = true;
        document.write("chunks<br><TEXTAREA style='width:760px;height:400px'>" + 
                        chunks.join("\n***") + "</" + "TEXTAREA>");
        document.write("finalCode<br><TEXTAREA style='width:760px;height:400px'>" + 
                        finalCode + "</" + "TEXTAREA>");
        throw e;
    }
    //return finalCode;
    */

    var end = isc.timeStamp ? isc.timeStamp() : new Date().getTime();
    isc._totalTransformTime += (end-start);
    return code;
}

isc._evalFromCatchBlock = "}catch(_e){isc.eval(isc._handleError(";
isc._handleError = function (varList) {
    var code = "var _ = {";
    if (varList != "") {
        var varNames = varList.split(",");
        for (var i = 0; i < varNames.length; i++) {
            var varName = varNames[i];
            code += varName + ":" + varName;
            if (i < varNames.length-1) code += ",";
        }
    }
    code += "};";
    code += "if(isc.Log)isc.Log._reportJSError(_e,arguments,this,_);throw _e;";
    return code;
}



// fillList - utility to concat a number of individual arguments into an array
// ---------------------------------------------------------------------------------------
isc.fillList = function (array, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z) {
    
    if (array == null) array = [];
    else array.length = 0;
        
    var undef;
    // avoid touching the arguments object if possible
    
    if (X === undef && Y === undef && Z === undef) {
        array[0] = A;
        array[1] = B;
        array[2] = C;
        array[3] = D;
        array[4] = E;
        array[5] = F;
        array[6] = G;
        array[7] = H;
        array[8] = I;
        array[9] = J;
        array[10] = K;
        array[11] = L;
        array[12] = M;
        array[13] = N;
        array[14] = O;
        array[15] = P;
        array[16] = Q;
        array[17] = R;
        array[18] = S;
        array[19] = T;
        array[20] = U;
        array[21] = V;
        array[22] = W;
    } else {
        for (var i = 1; i < arguments.length; i++) {
            array[i-1] = arguments[i];
        }
    }
    
    return array;
}



//>	@classMethod isc.addProperties()
//
// Add all properties and methods from any number of objects to a destination object, 
// overwriting properties in the destination object.
// <p>
// Common uses of <code>addProperties</code> include creating a shallow copy of an object:<pre>
//
//     isc.addProperties({}, someObject);
//
// </pre>Combining settings in order of precedence:<pre>
//
//     isc.addProperties({}, defaults, overrides, skinOverrides);
//
// </pre>
// <P>
// <b>NOTE</b>: do not use <code>addProperties</code> to add defaults to an ISC class.  Use
// <code>Class.addProperties()</code>, as in: <i>MyClassName</i><code>.addProperties()</code>.
//
// @see Class.addProperties() 
//
//	@param	destination			(object)	object to add properties to
//	@param	[(arguments 1-N)]	(object)	objects to obtain properties from.  Properties of all 
//											arguments other than destination are applied in turn.
// @return (object) returns the destination object
// @visibility external
//<

/*
// code to count all methods according to what they are added to
isc.methodCount = 0;
isc.classMethodCount = 0;
isc.otherMethods = 0;
isc.otherMethodTargets = [];
*/

isc._sourceList = [];

isc.addGlobal(
"addProperties", function (destination, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z) {
    var undef,
        sourceList = isc._sourceList;
        
    if (X === undef && Y=== undef && Z === undef) {
        isc.fillList(sourceList, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z);
        
    } else {
        sourceList.length = 0;
        for (var i = 1; i < arguments.length; i++) {
            sourceList[i -1] = arguments[i];
        }
    }
    
    var result = isc.addPropertyList(destination, sourceList);
    // reset the sourceList so we don't hang onto the objects in memory unnecessarily
    sourceList.length = 0;
    return result;
    
});


isc._interfaceInstanceProps = {};
isc._interfaceClassProps = {};
isc._getInterfaceProps = function (destination) {
    var className = destination.Class,
        props;
    if (isc.isA.ClassObject(destination)) {
        props = isc._interfaceClassProps[className] = 
                    isc._interfaceClassProps[className] || [];
    } else if (isc.isAn.InstancePrototype(destination)) {
        props = isc._interfaceInstanceProps[className] = 
                    isc._interfaceInstanceProps[className] || [];
    }
    return props;
}

//>	@method ClassFactory.addPropertyList() or isc.addPropertyList()
//
// Add all properties from any number of objects to a destination object.
//
// This differs from addProperties() in that it takes an array as it's second argument,
// applying each object in the array as properties in turn.  
//
//	@param	destination			(object)	object to add properties to
//	@param	sourceList			(array)		array of objects with properties to add
//  @return                     (object)    the object after properties have been added to it
//<
isc.addPropertyList = function (destination, sourceList) {
    // Don't JS error if passed a null destination
    
    if (destination == null) {
        if (isc.Log) isc.Log.logWarn("Attempt to add properties to a null object. " + 
                                     "Creating a new object for the list of properties."
                                     
                                     );
        destination = {};
    }

    var methods,
        // detect functions being added as properties.  Doesn't work until after "isA" has
        // initialized
        checkFunctions = (isc.isA != null),
        // get the registry of string methods on the destination object
        registry = (isc.isAn && isc.isAn.Instance(destination) ? 
                    destination.getClass()._stringMethodRegistry :
                    destination._stringMethodRegistry);
    if (registry == null) registry = isc.emptyObject;
 
    var props = destination._isInterface ? isc._getInterfaceProps(destination) : null;

    var undef;
    for (var i = 0, l = sourceList.length; i < l; i++) {
        
    	// add it's properties to the destination
		var source = sourceList[i];
		// if <code>source</code> is null, skip it.
		if (source == null) continue;
	
		// copy properties from source to destination
		for (var propName in source) {

            var propValue = source[propName];
			// if any of source's properties are functions 
            // or any of the source's properties are registered as stringMethods on the 
            //          destination object
            // use addMethods to copy these properties
            

            var propIsAFunction = checkFunctions && isc.isA.Function(propValue);
            // Check for functions / stringMethods as appropriate.
            
            if (registry[propName] !== undef || propIsAFunction)
            {
                if (methods == null) methods = {};
                methods[propName] = propValue;

			// don't copy an identical property
            // NOTE: unsafe: a subclass may wish to set a property to the same value as the 
            //       default for its superclass, and have the subclass value remain unchanged 
            //       if the superclass default is changed.            
			//} else if (!(source[property] === destination[property])) {
            } else {
                // property is not a function and this slot is not a StringMethod

                // for Interfaces, keep track of all properties added to them
                if (props != null) props[props.length] = propName;

                // check for clobbering a function with a non-function value, eg setting
                // Canvas.enable:false.
                var destinationProp = destination[propName];
                if (!propIsAFunction && destinationProp != null &&
                    isc.isA.Function(destinationProp) && !isc._allowDeleteFuncProperty)
                {
                    if (isc.Log != null) {
                        isc.Log.logWarn("method " + propName + " on " + destination + 
                                        " overridden with non-function: '" + propValue + "'");
                    }
                }
                
                destination[propName] = propValue;

            /*
            } else {

                if (destination.Class && isc.Log &&
                    (!isc.isAn.Instance(destination) || 
                     destination._scPrototype === destination))
                {
                    isc.Log.logWarn("needless override on class: " + destination.Class +
                                    ": " + propName + "->" + propValue);
                }

            */
			}
        }
    }
	if (methods != null) isc.addMethods(destination, methods);
	return destination;
}

//>	@method isc.addMethods()
//
//	Add all named methods from <code>source</code> to <code>destination</code> 
//
//	@see addProperties()
//
//	@param	destination	(object)	object to add methods to
//	@param	source		(object)	object to get methods from
//  @return             (object)    the object after methods have been added to it
//
//<
// NOTE: not externally documented since there is essentially no legitimate reason for author
// code to use this instead of Class.addMethods().

isc._$string = "string";
isc._$function = "function";
isc._$constructor = "constructor";
isc._$object = "object";
isc.addGlobal("addMethods", function (destination, source) {
	if (!destination || !source) return destination;
	
    

    var props = destination._isInterface ? isc._getInterfaceProps(destination) : null;

	if (!isc.__remap) isc.__remap = {};

    for (var name in source) {
        
        if (props != null) props[props.length] = name;
		var method = source[name];
        
    	// if a method was specified as a string or an action-object, see if the 
        // destination defines this as a legal string method.
        // NOTE: check typeof object to support Actions, but check non-null because
        // typeof null == "object" and null specified for a method should wipe it out.
        if (isc.isA.instanceMethodsAdded && method != null &&
            (typeof method == isc._$string || typeof method == isc._$object)) 
        {
            var registry = (isc.isAn.Instance(destination) ? 
                                (destination.getClass != null ? 
                                    destination.getClass()._stringMethodRegistry : null) : 
                            destination._stringMethodRegistry);
            var undefined; // check for undefined rather than null
            if (registry && !(registry[name]===undefined) && 
                
                name != isc._$constructor) 
            {
                method = isc.Func.expressionToFunction(registry[name], source[name]);
            }
            // XXX If it's not a function or a stringMethod, assume it's ok to add it using the 
            // addMethods logic rather than booting back to addProperties
        }
        
        // If someone's observing this method, the actual method will be stored under a different 
        // name
        var observers = destination._observers,
            finalName = (observers != null && observers[name] != null ? isc._obsPrefix + name : name);

        // If the method is already in the correct slot, we're done.
		if (method !== destination[finalName]) {
        
            if (method != null) {
                //>DEBUG take the opportunity to label the function with a name for debug
                // purposes.
                this._nameMethod(method, name, destination) //<DEBUG
    
                

                
            }

            destination[finalName] = method;        
            
            if (method != null) {
    
                
                
    			// if the method was previously assigned an obfuscated name, make sure the function is
    			// available under the obfuscated name in the object it's being mixed into
    			if (isc.__remap[name]) {
                    // same check for observation applies here
                    var finalObfName = (destination._observers != null && 
                                        destination._observers[isc.__remap[name]] != null ?
                                        isc._obsPrefix + isc.__remap[name] : isc.__remap[name]);
                    destination[finalObfName] = method;
                }
            }			
		//} else {
        //    alert("skipped identical assignment in slot: " + finalName + " of " + method);
        }
    }
    
    return destination;
});

// Function naming
// ---------------------------------------------------------------------------------------
//>DEBUG _nameMethod: labels a function with a name for debug purposes.



isc._allFuncs = []
isc._allFuncs._maxIndex = 0;
isc._funcClasses = new Array(5000);

isc._nameMethod = function (method, name, destination) {
    
    if (typeof method != isc._$function) return;

    // if not being added to a class, just use the property name as the function name
    if (destination.Class == null) return method._name = name; 

    // destination is either:
    // - a class Object (eg isc.ListGrid)
    // - an instancePrototype (isc.ListGrid._instancePrototype)
    // - an instance
    // - a handful of other objects on which we've added the Class property, including isc.isA,
    //   ClassFactory, and native prototypes (eg window.Array)

    
    // only for instance prototypes and class objects, not for instances
    if (isc.isA != null && isc.isA.instanceMethodsAdded && 
        (isc.isAn.InstancePrototype(destination) || isc.isA.ClassObject(destination))) 
    {
        var allFuncs = isc._allFuncs;
        // NOTE: functions installed twice, eg interface methods, will appear twice with
        // different classnames, but the first entry will be the one used, so interface methods
        // retain the interface name even when added to other classes.
        allFuncs[allFuncs._maxIndex] = method;
        isc._funcClasses[allFuncs._maxIndex] = destination.Class;
        allFuncs._maxIndex++;
        return;
    }

    // debug: capture all non-Class/Instance methods (eg isA, String extensions, ClassFactory
    // and other bootstrap)
    //if (isc._otherFuncs == null) isc._otherFuncs = [];
    //isc._otherFuncs[isc._otherFuncs.length] = method;

    // special case isA because isA.Class is a method which detects class objects!
    // We need to use a property other than Class for the className.
    var className = (destination == isc.isA ? "isA" : destination.Class);
     
    method._className = className;

    
    if (isc[destination.Class] == null) method._name = name;
      
    if (isc.isA != null && isc.isA.instanceMethodsAdded && isc.isAn.Instance(destination) &&
        !isc.isAn.InstancePrototype(destination)) 
    {
        // instance methods need to be labelled with their name since we don't want to store a
        // list of instance IDs for function name lookups (it would grow indefinitely)
        method._name = name;
        // this method is an instance-specific override (using an instance as an anonymous
        // class).  Mark it as such.
        method._instanceSpecific = true;
        // if there's already a method on the destination with the same name,
        // this is also an override (as opposed to just a method that was added)
        if (destination[name] != null) method._isOverride = true;
    }
    // XXX Note: we could use a check like the following to detect and label class
    // methods vs instance methods
    // if (ClassFactroy.getClass(destination.Class) === destination) {
}

//<DEBUG







   


//> @type Object 
// An ordinary JavaScript as obtained by "new Object()" or via 
// +link{type:ObjectLiteral,Object Literal} syntax.
// <P>
// Methods that return Objects or take Objects as parameters make use of the ability of a
// JavaScript Object to contain an arbitrary set of named properties, without requiring
// declaration in advance.  This capability makes it possible to use a JavaScript Object much
// like a HashMap in Java or .NET, but without the need to call get() or set() to create and
// retrieve properties.
// <P>
// For example if you created an Object using +link{type:ObjectLiteral,Object Literal} syntax
// like so:
// <pre>
//    var request = {
//        actionURL : "/foo.do",
//        showPrompt:false
//    };
// </pre>
// You could then access it's properties like so:
// <pre>
//    var myActionURL = request.actionURL;
//    var myShowPrompt = request.showPrompt;
// </pre>
// .. and you could assign new values to those properties like so:
// <pre>
//    request.actionURL = "<i>newActionURL</i>";
//    request.showPrompt = <i>newShowPromptSetting</i>;
// </pre>
// Note that while JavaScript allows you to get and set properties in this way on any Object,
// SmartClient components require that if a setter or getter exists, it must be called, or no
// action will occur.  For example, if you had a +link{ListGrid} and you wanted to change the
// +link{listGrid.showHeader,showHeader} property:
// <pre>
//     myListGrid.setShowHeader(false); // correct
//     myListGrid.showHeader = false; // incorrect (nothing happens)
// </pre>
// All documented attributes have +link{group:flags,flags} (eg IRW) that indicate when direct
// property access is allowed or not.
//
// @visibility external
//<


// Utility methods for any JavaScript Object
// ---------------------------------------------------------------------------------------

//>	@classMethod isc.getKeys()
//
//	Return all keys (property names) of a given object
//
//	@param	object			(object)	object to get properties from
//	@return					(Array) String names of all properties.  NOTE: never null
// @visibility external
//<
isc.addGlobal("getKeys", function (object) {
	var list = [];
	if (object != null) {
		for (var key in object) {
			list[list.length] = key;
		}
	}
	return list;
});

//> @classMethod isc.firstKey()
// Return the first property name in a given Object, according to for..in iteration order.
//
// @param object (Object) Object to get properties from
// @return (String) first property name, or null if Object has no properties
// @visibility external
//<
isc.addGlobal("firstKey", function (object) {
    for (var key in object) return key;
});

//>	@classMethod isc.getValues()
//
//	Return all values of a given object
//
//	@param	object			(object) object to get properties from
//	@return					(Array) values of all properties.  NOTE: never null
// @visibility external
//<
isc.addGlobal("getValues", function (object) {
	var list = [];
	if (object != null) {
		for (var key in object) {
			list[list.length] = object[key];
		}
	}
	return list;
});

//> @classMethod isc.sortObject()
// Given a simple javascript object, return that object sorted by keys, such that when iterating
// through the properties of the object, they will show up in sorted order.<br>
// Usage example - may be used to sort a +link{FormItem.valueMap, formItem valueMap} defined
// as an object.
// @param object (object) Object to sort
// @param [comparator] (function) Comparator function to use when sorting the objects keys
// @return (object) sorted version of the object passed in.
// @visibility external
//<
isc.addGlobal("sortObject", function (object, sortComparator) {
    if (!isc.isA.Object(object)) return object;
    if (isc.isAn.Array(object)) {
        if (sortComparator != null) return object.sort(sortComparator);
        return object.sort();
    }
    var keys = isc.getKeys(object);
    keys = (sortComparator == null ? keys.sort() : keys.sort(sortComparator));
    var sortedObject = {};
    for (var i = 0; i < keys.length; i++) {
        sortedObject[keys[i]] = object[keys[i]];

    }
    return sortedObject
});

//> @classMethod isc.sortObjectByProperties()
// Given a simple javascript object, return that object sorted by properties, such that when 
// iterating through the properties of the object, values will show up in sorted order.<br>
// Usage example - may be used to sort a +link{FormItem.valueMap, formItem valueMap} defined
// as an object by display value.
// @param object (object) Object to sort
// @param [comparator] (function) Comparator function to use when sorting the object properties
// @return (object) sorted version of the object passed in.
// @visibility external
//<
isc.addGlobal("sortObjectByProperties", function (object, sortComparator) {
    if (!isc.isA.Object(object)) return object;
    if (isc.isAn.Array(object)) {
        if (sortComparator != null) return object.sort(sortComparator);
        return object.sort();
    }
    var values = isc.getValues(object);
    values = (sortComparator == null ? values.sort() : values.sort(sortComparator));
    var sortedObject = {};

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        for (var key in object) {
            if (object[key] === value) {
                sortedObject[key] = object[key];
                continue;
            }
        }
    }
    return sortedObject
});

//> @classMethod isc.addDefaults()
//
// Copy any properties that do not already have a value in destination.  Null and zero values
// are not overwritten, but 'undef' values will be.
//
// @param destination (Object) Object to which properties will be added.
// @param source (Object) Object from which properties will be added.
// @return (Object) The destination object is returned.
// @visibility external
//< 
isc.addGlobal("addDefaults", function (destination, source) {
    if (destination == null) return;
    var undef;
    for (var propName in source) {
        if (destination[propName] === undef) destination[propName] = source[propName];
    }
    return destination;
});


//>	@classMethod isc.propertyDefined()
//
//	Is some property specified on the object passed in?  This will return true if 
//  <code>object[propertyName]</code> has ever been set to any value, and not deleted.<br>
//  May return true even if <code>object[propertyName] === undefined</code> if the property 
//  is present on the object and has been explicitly set to undefined.
//
// @param object (object) Object to test 
// @param propertyName (string) Which property is being tested for?
// @return (boolean) true if property is defined
//  @visibility external
//<
isc.addGlobal("propertyDefined", function (object, propertyName) {
    if (object == null) return false;

    var undefined;
    if (object[propertyName] !== undefined) return true;
    
    
	var properties = isc.getKeys(object);
    return (properties.contains(propertyName));
});

isc.addGlobal("objectsAreEqual", function (object1, object2) {
    // match -> return true
    
    if (object1 === object2) return true;
    
    else if (isc.isAn.Object(object1) && isc.isAn.Object(object2)) {
        if (isc.isA.Date(object1)) {
            return isc.isA.Date(object2) && (Date.compareDates(object1,object2) == 0); 
        } else if (isc.isAn.Array(object1)) {
            if (isc.isAn.Array(object2) && object1.length == object2.length) {
                for (var i = 0; i < object1.length; i++) {
                    if (!isc.objectsAreEqual(object1[i], object2[i])) return false;
                }
                return true;
            }
            return false;
        } else {
            if (isc.isAn.Array(object2)) return false;
            var numProps = 0;
            for (var prop in object1) {
                if (prop == isc.gwtRef || prop == isc.gwtModule) continue;
                if (!isc.objectsAreEqual(object1[prop],object2[prop])) return false;
                numProps ++;
            }
            var numProps2 = 0;
            for (var prop2 in object2) {
                if (prop == isc.gwtRef || prop == isc.gwtModule) continue;
                numProps2++;
                if (numProps2 > numProps) return false;
            }
            if (numProps2 != numProps) return false;

            return true;
        }
    } else {
        return false;
    }
});


// combineObject() - like addProperties() except it handles nested object data structures
// so if an attribute of the source is an object, properties from that object will be
// combined across to the destination, rather than simply clobbering the previous attribute value
// for the field.
// Note the goal here isn't to avoid the destination pointing to the same objects as the source
// (like a duplicate), it's just to merge field values in for nested objects
isc.addGlobal("combineObjects", function (destination, source) {
    if (destination == null || !isc.isAn.Object(destination)) return source;
    if (source == null || !isc.isAn.Object(source)) return destination;

    for (var prop in source) {
        var destProp = destination[prop],
            sourceProp = source[prop];
        // If both the source and destination contain simple objects, iterate through the
        // attributes on the source property object and copy them across to the destination property
        // object
        if (isc.isAn.Object(destProp) && !isc.isAn.Array(destProp) && !isc.isA.Date(destProp) 
            && isc.isAn.Object(sourceProp) && !isc.isAn.Array(sourceProp) && 
            !isc.isA.Date(sourceProp))
        {
            isc.combineObjects(destProp, sourceProp); 
        // Otherwise we can just copy the value across as with standard addProperties
        } else {
            destination[prop] = sourceProp;
        }
        
    }
});


//> @method isc.applyMask()
// Create a copy of an Object or Array of Objects that has been trimmed to a specified set of
// properties.
// <p>
// <code>mask</code> is the list of properties to return.  Can be an array of strings or an object.
// If an object, the properties returned will be those that are present in the object.  NOTE: this
// includes properties that exist because they've been explicitly set to null.
// <p>
// If no mask is specified, returns a duplicate of the input
// If no inputs are specified, returns an empty object.
// 
// @param input   (Object or Array)   object to be masked
// @param mask    (Object or Array)   set of properties to limit output to
// 
//<
// NOTE: not external because behavior is a little odd:
// - returns non-null for null input
// - if mask is null and provided an Array, returns an Object instead of a dup'd Array
// we need to check out the framework uses of applyMask and makes sure changing the behavior is
// OK
//
// XXX if applyMask with the input as an empty Array, you will get an empty Array as output.
// So applyMask cannot be used to filter properties that exist on an Array instance.
isc.applyMask = function (input, mask) {
	var output = {};

	// if no input passed in, return empty output
	if (input == null) return output;

	// if no mask passed in, return all fields from input
	if (mask == null) {
		return isc.addProperties(output, input);
	}

    var inputWasSingle = false;
	if (!isc.isAn.Array(input)) {
        inputWasSingle = true;
        input = [input];
    }

    // convert the mask to an Array of property names if it's an object
    if (!isc.isAn.Array(mask)) mask = isc.getKeys(mask);

    var output = [],
        inputObj, outputObj,
        key, undef;
    for (var i = 0; i < input.length; i++) {
        inputObj = input[i];
        outputObj = output[i] = {};
        // return only the specified properties
        for (var j = 0; j < mask.length; j++) {
            key = mask[j];
            if (inputObj[key] === undef) continue;
            outputObj[key] = inputObj[key];
        }
    }
    return (inputWasSingle ? output[0] : output);
}

isc.getProperties = function (input, propertyList) {
    if (input == null) return null;

    var output = {};
    if (propertyList == null) return output;
    for (var i = 0; i < propertyList.length; i++) {
        var propName = propertyList[i];
        output[propName] = input[propName];
    }
    return output;
}

isc._digits = {};
isc._floor = Math.floor;
isc._$minus = "-";

for (isc._iterator = 0; isc._iterator < 10; isc._iterator++) 
    isc._digits[isc._iterator] = isc._iterator.toString();

isc._fillNumber = function (template, number, startSlot, numSlots, nullRemainingSlots) {
    
    

    var lastSlot = startSlot + numSlots - 1,
        origNumber = number,
        didntFit = false,
        negative;

    if (number < 0) {
        negative = true;
        number = -number;
        template[startSlot] = this._$minus;
        startSlot += 1;
        numSlots -= 1;
    }
    
    while (number > 9) {
        // reduce by 10x, round off last digit and subtract to find what it was
        var newNumber = this._floor(number/10),
            lastDigit = number - (newNumber*10);
        // fill slots last first
        template[lastSlot] = this._digits[lastDigit];
        number = newNumber;
        
        if (lastSlot == (startSlot+1) && number > 9) {
            // number to large for allocated number of slots
            isc.Log.logWarn("fillNumber: number too large: " + origNumber +
                            isc.Log.getStackTrace());
            didntFit = true;
            break;
        }
        lastSlot -= 1;        
    }

    if (didntFit) {
        
        lastSlot = startSlot + numSlots - 1
        template[lastSlot--] = (!negative ? origNumber : -origNumber);
    } else {
        template[lastSlot--] = this._digits[number];
    }
    
    // null out remaining slots
    for (var i = lastSlot; i >= startSlot; i--) {
        template[i] = null;
    }
};
if (!isc.Browser.isIE || isc.Browser.version > 7) {
    
    isc._fillNumber = function (template, number, startSlot, numSlots, nullRemainingSlots) {
        template[startSlot] = number;
        if (nullRemainingSlots) {
            var endI = startSlot + numSlots;
            for (var i = startSlot + 1; i < endI; ++i) {
                template[i] = null;
            }
        }
    };
}


// try to interpolate different types as a boolean
//
// returns default if value is undefined or null
// returns false if value is
//   - the string "false" or "FALSE"
//   - the number 0
//   - the boolean value false
// otherwise returns true
isc.booleanValue = function (value, def) {
    // if the value is unset, return the specified default (so, 
    if (value == null) return def;
    
    if (isc.isA.String(value)) return value != isc._false && value != isc._falseUC;
    return value ? true : false;
}

// isc.objectToLocaleString()
// Centralized, customizable toLocaleString() formatter for objects. 
isc.iscToLocaleString = function (object) {
    if (object != null) {
        return object.iscToLocaleString ? object.iscToLocaleString() :
                    (object.toLocaleString ? object.toLocaleString() :
                        (object.toString ? object.toString() : isc.emptyString + object));
    }
    return isc.emptyString + object;
}

isc._$toolSkinNames = ["ToolSkin","ToolSkinNative"];

isc.setCurrentSkin = function (skinName) {
    // store the current skin so we can detect multiple skins being loaded
    if (isc.currentSkin && !isc._$toolSkinNames.contains(skinName)) {
        isc.logWarn("Detected loading of more than one skin - '" + skinName + "' was loaded " +
            "when '" + isc.currentSkin + "' was already loaded.  See the QuickStart Guide " +
            "for instructions on correctly changing the current skin");
    }
    isc.currentSkin = skinName;
}

isc.addGlobal("isA", {});
isc.addGlobal("isAn", isc.isA);
isc.addGlobal("is", isc.isA);

  //>DEBUG
// give it a class name so that methods added to it get labelled
isc.isA.Class = "isA";
  //<DEBUG 

isc.isA.isc = isc.isA; // so you can do isc.isA.isc.Canvas(object)


Function.__nativeType = 1;
Array.__nativeType = 2;
Date.__nativeType = 3;
String.__nativeType = 4;
Number.__nativeType = 5;
Boolean.__nativeType = 6;
RegExp.__nativeType = 7;
Object.__nativeType = 8;



Function.prototype.__nativeType = 1;


// add methods to determine the type of various simple objects
isc.addMethods(isc.isA, {
    useTypeOf : isc.Browser.isMoz || isc.Browser.isSafari,

	//>	@classMethod isA.emptyString()
	//
	//	Is <code>object</code> the empty string?<br><br>
	//	
	//	NOTE: if you prefer, you can call this as <code>isAn.emptyString()</code>
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a null string
	//	@visibility external
	//<
	emptyString : function (object) {return isc.isA.String(object) && object == isc.emptyString},

	
	//>	@classMethod isA.nonemptyString()
	//
	//	Is <code>object</code> a non-empty String?<br><br>
	//	
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a non-empty string
	//	@visibility external
	//<
	nonemptyString : function (object) {return isc.isA.String(object) && object != isc.emptyString},

	
	//>	@classMethod isA.Object()
	// Returns whether the passed value is a non-null Object.
    // <p>
    // Returns false for values that are Numbers, Strings, Booleans, Functions or are null or
    // undefined.  
    // <p>
    // Returns true for Object, Array, Regular Expression, Date and other kinds of
    // native objects which are considered to extend from window.Object.
	//
	// @param object (any) value to test for whether it's an object
	// @return (boolean) whether passed value is an Object
	// @visibility external
	//<
    //  With the exception of returning false for the null value, this function's return value 
    //  matches the ECMA spec for the typeof operator.  It also seems to be a reasonable expected 
    //  implementation of this method as it guarantees the programmer can work with properties of 
    //  the object as with a standard Object returned by "new Object()".
    _$object:"object",
    _$String :"String",
	Object : function (object) {
        if (object == null) return false;

        
        if (isc.Browser.isIE && typeof object == this._$function) return false;

        
        if (this.useTypeOf) {
            var objType = typeof object;
            return (objType == "object" || objType == "array" || objType == "date" ||
            
                    (isc.Browser.isMoz && objType == "function" && isc.isA.RegularExpression(object)));
        }   
        
        if (object.constructor && object.constructor.__nativeType != null) {
            var type = object.constructor.__nativeType;
            if (type == 1) {
                
            } else {
                // Object, RegExp, Date, Array
                return (type == 8 || type == 7 || type == 3 || type == 2);
            }
        }

        // Workaround for a core GWT bug, fixed as of GWT 2.5.
        // http://code.google.com/p/google-web-toolkit/issues/detail?id=4301
        if (object.Class != null && object.Class == this._$String) return false;

        
        if (typeof object == this._$object) {
            if (isc.Browser.isIE && isc.isA.Function(object)) return false;
            else return true;
        } else return false;
    },
    
	//>	@classMethod isA.emptyObject()
	//
	// Is <code>object</code> an object with no properties (i.e.: <code>{}</code>)?
    // <P>
    // Note that an object that has properties with null values is considered non-empty, eg 
    // <code>{ propName:null }</code> is non-empty.
    // <P>
	// NOTE: if you prefer, you can call this as <code>isAn.emptyObject()</code>
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is the empty object
	//	@visibility external
	//<
    emptyObject : function (object) {
        if (!isc.isAn.Object(object)) return false;
        for (var i in object) {
            // if we have a single property we're non-empty!
            return false;
        }
        return true;
    },
    
	//>	@classMethod isA.emptyArray()
	//
	// Is <code>object</code> an Array with no items?
    //
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is an empty array
	//	@visibility external
	//<
    emptyArray : function (object) {
        return isc.isAn.Array(object) && object.length == 0;
    },

	//>	@classMethod	isA.String()
	//
	//	Is <code>object</code> a String object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a String
	//	@visibility external
	//<
    // ==========================================================================================
    // IMPORTANT: If you update this function, also update its copy in FileLoader.js
    // ==========================================================================================
	String : function (object) {
        if (object == null) return false;

        
        if (this.useTypeOf) {
            return typeof object == "string" || 
                (object.Class != null && object.Class == this._$String);
        }

        
        //if (typeof object == this._$function) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            return object.constructor.__nativeType == 4;
        }

        // Workaround for a core GWT bug
        // http://code.google.com/p/google-web-toolkit/issues/detail?id=4301
        if (object.Class != null && object.Class == this._$String) return true;

        return typeof object == "string";
	},

	//>	@classMethod	isA.Array()
	//
	//	Is <code>object</code> an Array object?<br><br>
	//
	//	NOTE: if you prefer, you can call this as <code>isAn.Array()</code>
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is an Array
	//	@visibility external
	//<
	Array : function (object) {
        if (object == null) return false;

        
        if (this.useTypeOf && typeof object == "array") return true;

        
        if (typeof object == this._$function) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            return object.constructor.__nativeType == 2;
        }

        

        if (isc.Browser.isSafari) {
            var spliceString = "" + object.splice;
            return (spliceString ==  "function splice() {\n    [native code]\n}" ||
                    spliceString == "(Internal function)");
        }
        return ""+object.constructor == ""+Array;
	},

	//>	@classMethod	isA.Function()
	//
	//	Is <code>object</code> a Function object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Function
	//	@visibility external
	//<
    _$function : "function",
	Function : function (object) {
        if (object == null) return false;
        
        
        if (isc.Browser.isIE && typeof object == this._$function) return true;

        // In IE9, attempting to access the "constructor" attribute of a window
        // can lead to an odd crash. If we're passed a native window, return false immediately.
        
        if (isc.Browser.isIE && (
                (object == window) || 
                (object.document != null && (object.toString != null) && 
                    object.toString().contains("Window") )
            )
           )
        {
            return false;
        }
        
        var cons = object.constructor;
        if (cons && cons.__nativeType != null) {
            // eliminate known non-functions from an ISC frame
            if (cons.__nativeType != 1) return false;
            // eliminate functions from this frame
            if (cons === Function) return true;
            
        }

        
        //if (!object.constructor) isc.Log.logWarn("obj without cons: " + isc.Log.echo(object));
//        isc.logWarn("obj:" + object + "cons:" + isc.emptyString + object.constructor);
        
        return isc.Browser.isIE ? (isc.emptyString+object.constructor == Function.toString()) : 
                                  (typeof object == this._$function);
    },

	//>	@classMethod	isA.Number()
	//
	//	Is <code>object</code> a Number object?<br><br>
	//
	//	NOTE: this returns false if <code>object</code> is an invalid number (<code>isNaN(object) == true</code>)
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Number
	//	@visibility external
	//<
	Number : function (object) {
        if (object == null) return false;
        
        
        if (this.useTypeOf && typeof object == "number") {
            // it's a number, now check if it's a valid number
            return !isNaN(object) && 
                object != Number.POSITIVE_INFINITY && 
                object != Number.NEGATIVE_INFINITY;
        }

        if (object.constructor && object.constructor.__nativeType != null) {
            if (object.constructor.__nativeType != 5) return false;
        } else {
            if (typeof object != "number") return false;
        }
        // it's a number, now check if it's a valid number
        return !isNaN(object) && 
            object != Number.POSITIVE_INFINITY && 
            object != Number.NEGATIVE_INFINITY;
    },

	SpecialNumber : function (object) {
        // NOTE: we do need to first determine if it's a number because isNaN({}) is true
        if (object == null) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            if (object.constructor.__nativeType != 5) return false;
        } else {
            if (typeof object != "number") return false;
        }
        return (isNaN(object) || object == Number.POSITIVE_INFINITY ||
                object == Number.NEGATIVE_INFINITY);
    },

	//>	@classMethod	isA.Boolean()
	//
	//	Is <code>object</code> a Boolean object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Boolean
	//	@visibility external
	//<
	Boolean	: function (object) {
        if (object == null) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            return object.constructor.__nativeType == 6;
        }
        return typeof object == "boolean";
    },
	
	//>	@classMethod	isA.Date()
	//
	//	Is <code>object</code> a Date object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Date
	//	@visibility external
	//<
	Date : function (object) {
        if (object == null) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            return object.constructor.__nativeType == 3;
        }
        return (""+object.constructor) == (""+Date) &&
                // if the Date constructor is passed a string it doesn't understand, it returns a
                // sort of pseudo date object, which returns bad values from getYear(), etc.
                object.getDate && isc.isA.Number(object.getDate());
    },
    
	//>	@classMethod	isA.RegularExpression()
	//
	//	Is <code>object</code> a Regular Expression (RegExp) object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Boolean
	//	@visibility external
	//<
	RegularExpression : function (object) {
        if (object == null) return false;
        if (object.constructor && object.constructor.__nativeType != null) {
            return object.constructor.__nativeType == 7;
        }
        return (""+object.constructor) == (""+RegExp);
    },

    
    _$textXML : "text/xml",
    XMLNode : function (object) {
        if (object == null) return false;
        if (isc.Browser.isIE) {
            return object.specified != null && object.parsed != null && 
                   object.nodeType != null && object.hasChildNodes != null;
        }
        var doc = object.ownerDocument;
        if (doc == null) return false;
        return doc.contentType == this._$textXML;
    },
	

	// ---------------------------------------------------------------------------------------
    // NOTE: the following few functions are used strictly in expressionToFunction(), are not
    // i18n-safe, and should not be externally visible
	// ---------------------------------------------------------------------------------------

 	//> @classMethod isA.AlphaChar() 
 	// 
 	//  Is the character passed in an alpha character? 
 	// 
 	//  @param  char    (string)        character to test 
 	//  @return                 (boolean)       true == character is alpha 
 	//< 
 	AlphaChar : function (character) { 
 		// XXX: does not yet deal with unicode characters or extended ASCII characters. 
 		var code = character.charCodeAt(0) 
 		return ((code >= 65 && 
 				 code <= 90) || 
 				(code >= 97 && 
 				 code <= 122)) 
 	}, 
 	
 	//> @classMethod isA.NumChar() 
 	// 
 	//  Is the character passed in a Decimal (0-9) character? 
 	// 
 	//  @param  char    (string)        character to test 
 	//  @return                 (boolean)       true == character is a decimal character 
 	//< 
 	NumChar : function (character) { 
 		// XXX: does not yet deal with unicode characters 
 		var code = character.charCodeAt(0) 
 		return (code >= 48 && 
 				code <= 57) 
 	}, 
 	
 	//> @classMethod isA.AlphaNumericChar() 
 	// 
 	//  Is the character passed in alphanumeric? 
 	// 
 	//  @param  char    (string)        character to test 
 	//  @return                 (boolean)       true == character is alphanumeric 
 	//< 
 	AlphaNumericChar : function (character) { 
        return (isc.isA.AlphaChar(character) || isc.isA.NumChar(character)) 
    }, 
 	
 	//> @classMethod isA.WhitespaceChar() 
 	// 
 	//  Is the character passed in a whitespace character? 
 	//  This method considers any ascii character from 0-32 to be a whitespace character. 
 	// 
 	//  @param  char    (string)        character to test 
 	//  @return                 (boolean)       true == character is a whitespace character 
 	//< 
 	WhitespaceChar : function (character) { 
 		// XXX: does not yet deal with unicode characters 
 		var code = character.charCodeAt(0) 
 		return (code >= 0 && 
    			code <= 32) 
 	},
    
    //>@classMethod isA.color
    //  Is this a valid css color.  Used by the isColor() validator
    //<
    
    color : function (object) {
        if (!isc.isA.String(object)) return false;
            
        if (!this._cssColorRegexp) {
            this._cssColorRegexp = new RegExp( 
                            // hex:         "#D3D3D3", etc                
                            "^(#([\\dA-F]{2}){3}|" +
                            // rgb:         "rgb(255,255,255)", etc.
                            
                                "rgb\\((\\s*[\\d]{1,3}\\s*,\\s*){2}\\s*[\\d]{1,3}\\s*\\)|" +
                            // colorname:   "white", "black", "pink", etc.
                            
                                "[a-z]+)$", 
                                
                            // Case insensitive
                            "i"
            );
        }
            
        return this._cssColorRegexp.test(object);
    },
 
    // Module Dependencies:
    // ResultSet / ResultTree are both defined as part of the Databinding module but are frequently
    // checked for within grids.
    // Implement default isA functions for these classes so we can check isc.isA.ResultSet() without
    // needing an explicit check for the function being present
    ResultSet : function (data) {
        return false;
    },
    ResultTree : function (data) {
        return false;
    },
    
    // Overridding isA.className methods:
    // We provide custom isc.isA implementations for the following class names which we don't
    // want to be clobberred when the class method is defined
    
    _customClassIsA:{
        SelectItem:true,
        Time:true
    },
    
    // SelectItem IsA Overrides   
    // ---------------------------------------------------------------------------------------

    // isc.isA.SelectItem() default implementation would come from the definition of the
    // selectItem class.
    // However we want this method to return true for NativeSelectItems (not a subclass of
    // SelectItem).
    SelectItem : function (item) {
        if (!item || !isc.isA.FormItem(item)) return false;
        var itemClass = item.getClass();
        return (itemClass == isc.SelectItem || itemClass == isc.NativeSelectItem);
    },

    // Support 'isA.SelectOtherItem()' to test for SelectItems or NativeSelectItems where
    // isSelectOther is true.
    SelectOtherItem : function (item) {
        if (!item || !isc.isA.FormItem(item)) return false;
        var itemClass = item.getClass();
        return ((itemClass == isc.SelectItem || itemClass == isc.NativeSelectItem) 
                && item.isSelectOther);
    },
    
    // SmartClient stores Times in JavaScript Date objects so make isA.Time a synonym for isA.Date
    Time : function (object) {
        return isc.isA.Date(object);
    }

});

if (Array.isArray) {
    isc.addMethods(isc.isA, {
        
        Array : Array.isArray
    });
}


//	@end @object isA

isc.addGlobal("ClassFactory", {});

  //>DEBUG
// give it a class name so that methods added to it get labelled
isc.ClassFactory.Class = "ClassFactory"; 
  //<DEBUG 

// ClassFactory defines the notion of an "Instance", "ClassObject" and an "Interface".  Add methods
// to isA for recognizing these objects.
isc.addMethods(isc.isA, {
	//>	@classMethod	isA.Instance()
	//
	//	Is <code>object</code> an instance of some class?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is an instance of some class
	//	@visibility external
	//<
	Instance : function (object) {	return (object != null && object._scPrototype != null)},

	//>	@classMethod	isA.ClassObject()
	//
	//	Is <code>object</code> a class object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Class Object
	//	@visibility external
	//<
	ClassObject : function (object) {	return (object != null && object._isClassObject == true)},

	//>	@classMethod	isA.Interface()
	//
	//	Is <code>object</code> an interface object?
	//
	//	@param	object	(object)	object to test
	//	@return			(boolean)	true == <code>object</code> is a Interface Object
	//	@visibility external
	//<
	Interface : function (object) {	return (object != null && object._isInterface == true)},

    InstancePrototype : function (object) { 
        return (isc.isAn.Instance(object) && object._scPrototype == object)
    }
});


isc.isA.instanceMethodsAdded = true;

//
// add methods to the ClassFactory
//
isc.addMethods(isc.ClassFactory, {
	//>	@classMethod	ClassFactory.defineClass()
	//
	// Create a new SmartClient class, which can then be used to create instances of this
    // object type, via +link{Class.create()}.
    // <P>
    // The new Class is returned by <code>defineClass</code>, is available as
    // <code>isc.<i>ClassName</i></code> and is also available in global scope if not in
    // +link{class:isc,portal mode}.  Typically, +link{classMethod:class.addProperties()} is then
    // called to establish different defaults in the new class, or to add methods.  For
    // example:
    // <pre>
    //    isc.defineClass("MyListGrid", "ListGrid").addProperties({
    //        headerHeight : 40, // change default for listGrid.headerHeight
    //
    //        // override listGrid.recordClick
    //        recordClick : function (viewer, record) { 
    //           isc.say(record.description);
    //        }
    //    })
    //    isc.MyListGrid.create(); // create an instance of the new class
    // </pre>
    // <P>
    // See also +link{class.Super,Super()} for calling superclass methods.
    // <P>
	// NOTE: <code>isc.defineClass()</code> also creates a new function
    // <code>+link{isA,class:isA}.<i>ClassName()</i></code> object for identifying instances of
    // this Class.
    //
	//	@param	className		(string)	Name for the new class.  
	//	@param	[superClass]	(Class)		Optional SuperClass Class object or name
	//	@return					(Class)		Returns the new Class object.
	//
	//	@visibility external
    //<
    // Internal notes:
	//  Every ClassObject has:
	//  {
	//	 Class : [string classname],
	//	 _isClassObject : true,
	//	 _instancePrototype : [instance prototype for class],
	// 
	//	 _superClass : [pointer to superClass ClassObject (if this class is not a root class)]
	// 
	//	 _subClassConstructor : [constructor function that creates subclass ClassObjects]
	//  }
	//
	//  Every InstancePrototype (and Instance) has:
	//  {
	//	 Class : [string classname]
	//	 _instanceConstructor : [constructor function that creates instances]
	//	 _classObject : [ClassObject for this class]
	//	._scPrototype : [the instance prototype (this same object)]
	//  }
	defineClass : function (className, superClass, interfaces, suppressSimpleNames) {
		return this._defineNonRootClass(className, superClass, interfaces, null, suppressSimpleNames);
	},

	//>	@classMethod	ClassFactory.overwriteClass()
	//
	// Intentionally clobber an existing SmartClient Class, if it already exists.  Works 
    // identically to +link{ClassFactory.defineClass}, except that no warning is logged to the
    // console.
    //
    // @visibility external
    //<
    overwriteClass : function (className, superClass, interfaces, suppressSimpleNames) {
		return this._defineNonRootClass(className, superClass, interfaces, null, suppressSimpleNames, true);
	},

	//>	@classMethod	ClassFactory.defineInterface()
	//
	//	An "Interface" is an API definition plus a skeletal implementation of that API.
	//  
	//  Interfaces are "mixed in" to another class in order to allow the target class to "support"
	//  the interface.  Interfaces typically require the target class to provide one or two core
	//  methods, and then the interface itself provides the many convenience methods and method
	//  variations that can be written in terms of the core methods.
	//
	//  For example, a List interface could require only get(index) and getLength() from the target
	//  class, and could provide getRange(), indexOf() and other standard List operations.  If the
	//  target class has a more efficient way of supporting getRange() than the generic
	//  implementation in the List interface, the target class can directly implement getRange(),
	//  and the target class' version of getRange() takes precedence.
	//
	//  Comparison to other languages:
	//  - in Java, an "interface" is just an API definition, with no implementation.  The SmartClient 
	//	notion of interfaces is closer to an "abstract class", except that in Java you can only 
	//	inherit from one abstract class, whereas in SmartClient you can mixin as many Interfaces
	//	as you want.  Also, in SmartClient an Interface can contain both instance and class (aka
	//	"static") methods.
	//  - in Ruby, a Mix-in module corresponds exactly to the SmartClient Interface concept.
	//
	//  Writing Interfaces:
	//  - If you are writing an interface and want to indicate that a method must be implemented in
	//	  the target class in order for your interface to work, use addMethods to add a method with
	//	  the special value ClassFactory.TARGET_IMPLEMENTS.  If the target class does not
	//	  implement the method and it gets called, an error will be logged.
	//  - you can subclass an interface to create another interface, but you can't use Super to
	//	  call superclass methods within the interface inheritance chain
	//  - you can define a special initInterface method and it will be called just prior to the
    //    init method on the class that the interface is mixed into
	//  - you can define a special destroyInterface method and it will be called by the destroy
    //    method on the class that the interface is mixed into.  Note that unlike other
    //    languages, javascript does not have a concept of a destructor.  You have to
    //    explicitly call destroy() in order for this logic to run.  But in many cases you
    //    don't have to worry about this because Canvas subclasses cascade the destroy() call
    //    automatically to all children/members/etc.
	//	- if you declare a method in an interface, and mix the interface into a class, you can't
	//	  call Super() and get the interface method -- the one you place in your instance will
	//	  override the one from the interface.  
	//
	//	  To make this work, you have to create an intermediate class, then subclass that.  Eg:
	//
	//		CF.defineInterface("face1");
	//		face1.addMethods({ foo:function() {} });
	//
	//		CF.defineClass("class1");
	//		CF.mixInInterface("class1", "face1");
	//
	//		class1.addMethods({
	//			foo : function () {
	//				// NOTE: a Super() call here will NOT go to the face1.foo method
	//			}
	//		})
	//
	//		CF.defineClass("class2", "class1");
	//		class2.addMethods({
	//			foo : function () {
	//				// NOTE: a Super() call WOULD go to the face1.foo method
	//				// 			(assuming class1.foo was not present)
	//			}
	//		})
	//
	//<
	defineInterface : function (className, superClass) {
		return this._defineNonRootClass(className, superClass, null, true);
	},
	 
	//>	@classMethod	ClassFactory.defineRootClass()
	//
	// 	Variant of defineClass for creating a root class (a class with no superclass).
	//
	//	@param	className		(string)	Name for the new class
	//<
	defineRootClass : function (className) {
		return this._defineClass(className, null);
	},

	//>	@classMethod	ClassFactory._defineNonRootClass()
	//
	//  Define a class or interface which is assumed not to be a root class, that is, either the
	//  superclass must be valid or there must be a valid ClassFactory.defaultSuperClass.
	//<
	_defineNonRootClass : function (className, superClass, interfaces, asInterface, suppressSimpleNames, overwrite) {
		// if no superClass was specified, use the default rootClass
		superClass = (superClass || isc.ClassFactory.defaultSuperClass);
		// if we didn't find a superClass, something went wrong -- bail
		if (!superClass) {
			//>DEBUG
			isc.Log.logWarn("isc.ClassFactory.defineClass(" + className + ") called with null"
						+ " superClass and no ClassFactory.defaultRootClass is defined.");
			//<DEBUG
			return null;
		}
		return this._defineClass(className, superClass, interfaces, asInterface, suppressSimpleNames, overwrite); 
	},

	//>	@classMethod	ClassFactory._defineClass()
	//
	// Internal method to actually create a class or interface.  <code>superclass</code> must
    // already be valid.
	//<
    _$iscPrefix : "isc.",
    _$Window : "Window",
    _$Selection : "Selection",
    _classTimes : {},
	_defineClass : function (className, superClass, interfaces, asInterface, suppressSimpleNames, overwrite) 
    {
        

        // If we have an ID collision, and the caller didn't pass true for the "overwrite"
        // param, warn the user before clobbering the existing object
        
        var ignoreGlobalOverride = 
            ((isc.Browser.isMoz || isc.Browser.isChrome) && 
                (className == this._$Window || className == this._$Selection)) ||
            ((isc.Browser.isChrome || isc.Browser.isSafari) && className == "DataView");

        var existingObject, inISCSpace,
            useSimpleNames = (isc._useSimpleNames && !suppressSimpleNames);
        existingObject = isc[className];
        if (existingObject != null) inISCSpace = true
        else if (useSimpleNames && !ignoreGlobalOverride)  {
            existingObject = window[className];
        }

        if (existingObject != null 
            
            && className != "IButton"
            && overwrite != true
            ) 
        {
            var errorString = "New Class ID: '" + className + "' collides with ID of existing " +
                                // NOTE: this check is required in case there is a collision on
                                // window.Class.  At that moment, isc.isA.Class is not a
                                // function, but the String "isA"
                                (isc.isA && isc.isA.Function(isc.isA.Class) && isc.isA.Class(existingObject) ? 
                                    "Class object '" : 
                                    "object with value '") +
                                existingObject + "'.  Existing object will be replaced.";
            if (!inISCSpace) errorString += "\nThis conflict would be avoided by disabling " +
                                             "ISC Simple Names mode.  See documentation for " +
                                             "further information."

            // Note: If the Log class hasn't loaded yet, we don't warn about this collision.
            // This should be ok in almost every case as Log loads early during the smartClient
            // libs, but if this proves to be an issue, we could hang onto the error string and 
            // wait until after Log has loaded to log a warning.
            if (window.isc.Log) isc.Log.logWarn(errorString);
        }
        
		// accept superClasses defined as strings rather than references to the class object
		superClass = this.getClass(superClass);

		// create a new instance of the superClass to use as a prototype for this new class
		//	note: instancePrototype.init() is deliberately not called here
		var instancePrototype = 
			(superClass ? new superClass._instancePrototype._instanceConstructor() : {});

		// create the class object for the new class: an object whose lookup pointer is the
		// superclass' ClassObject.
		var classObject = this._makeSubClass(superClass);

		// a constructor function that creates objects whose lookup pointer will be
		// instancePrototype.  These created objects are instances of "subClass"
		instancePrototype._instanceConstructor = 
				this._getConstructorFunction(instancePrototype);

		// setup the class object
		classObject.Class = className;
		classObject._isClassObject = true;
		
		// Is this a core ISC class (defined during standard SmartClient init) or is this
		// a class added after the SC libraries have been loaded?
		// Useful for debugging / AutoTest locator APIs
		
		if (isc.definingFramework == true) classObject.isFrameworkClass = true;
		else classObject.isFrameworkClass = false;
		if (!classObject.isFrameworkClass) {
		    var scClass = superClass;
		    while (scClass && !scClass.isFrameworkClass) {
		        scClass = scClass.getSuperClass();
		    }
		    if (scClass) classObject._scClass = scClass.Class;
		}
		
		if (!classObject._scClass) classObject._scClass = classObject.Class;
		
        // NOTE: important that we always assign _isInterface so that concrete subclasses of
        // interfaces have _isInterface:false
		classObject._isInterface = instancePrototype._isInterface = !!asInterface;
		classObject._superClass = superClass;
		// crosslink the instance prototype and class object
		classObject._instancePrototype = instancePrototype;

		// setup the instance prototype: these properties appear on all instances
		instancePrototype.Class = className;
		// crosslink the instance prototype and class object
		instancePrototype._classObject = classObject;
		// this exists mostly so that instances can reference their prototype
		instancePrototype._scPrototype = instancePrototype;
		
		// copy the scClass information across too
		instancePrototype.isFrameworkClass = classObject.isFrameworkClass;
		instancePrototype._scClass = classObject._scClass;
        
        // put all Classes in the special "isc" object
        isc[className] = classObject;
        // if we're in simple names mode (eg, not worried about name collisions), make the class
        // available as a global variable
        if (useSimpleNames) window[className] = classObject;

        this.classList[this.classList.length] = className

		// create a function in the isA singleton object to tell if an object is an instance of
        // this Class, eg, isA.ListGrid()
        // Exception - the _customClassIsA object is used to track cases where we isc.isA has
        // already been given a custom method which we don't want to clobber
        if (!(isc.isA._customClassIsA[className] && isc.isA[className])) {
            isc.isA[className] = this.makeIsAFunc(className);
        }
    
		// as a convenience, mix in a list of interfaces as part of the class definition
		if (interfaces != null) {
			if (!isc.isAn.Array(interfaces)) interfaces = [interfaces];
			for (var i = 0; i < interfaces.length; i++) {
				//alert("Mixing " + interfaces[i] + " into " + className);
				this.mixInInterface(className, interfaces[i]);
			}
		}

		return classObject;
	},
	
    
    makeIsAFunc : function (className) {
        if (this.isFirefox2 == null) {
            this.isFirefox2 = (isc.Browser.isFirefox && isc.Browser.geckoVersion >= 20061010);
        }
        
        if (this.isFirefox2) {
            return function (object) {
                        if (object==null || object.isA==null || object.isA == isc.isA) return false;
                        return object.isA(className);
                   }
        } else {
            var template = this._isAFuncTemplate;
            template[1] = className;
        
            return new Function (this._objectString, template.join(isc._emptyString));        
        }
    },

    // variables for creating "isA" functions for each class
    _objectString : "object",
    _isAFuncTemplate : [
        
        "if(object==null||object.isA==null||object.isA==isc.isA)return false;return object.isA(isc.",
        null, // className
        ")"
    ],

    // make a class object for a new subclass of superClass
    _makeSubClass : function (superClass) {
        if (!superClass) return {};

    	// get the superClass' subclass constructor.  The subclass constructor creates objects
        // whose lookup pointer will be superClass.  It is created on the fly the first time a
        // class acquires a subclass (otherwise all leaf classes would have unnecessary
        // subclass constructors)
        var superSuperClass = superClass._superClass,
            subClassConstructor = superClass._subClassConstructor;
        if (!
            // if the superClass already has a subClassConstructor that differs from the
            // super-super class, use it
            (subClassConstructor &&
             (superSuperClass == null ||
              subClassConstructor !== superSuperClass._subClassConstructor))
            ) 
        {
            // otherwise we make it
		    subClassConstructor = superClass._subClassConstructor = 
                    this._getConstructorFunction(superClass);
        }
        return new subClassConstructor();
    },

	//>	@classMethod	ClassFactory.getClass()
	//
	//	Given a class name, return a pointer to the Class object for that class
	//
	//	@param	className	(string)	name of a class
	//	@return				(Class)		Class object, or null if not found
	//	@visibility external
	//<
	getClass : function (className) {
		// if it's a string, assume it's a className
		if (isc.isA.String(className)) {
            // see if isc[className] holds a ClassObject or an SGWTFactory
            var classObject = isc[className];
            if (classObject) {
                if (isc.isA.ClassObject(classObject)) return classObject;
                // SGWTFactory might not be defined yet ...
                if (isc.isA.SGWTFactory && isc.isA.SGWTFactory(classObject)) return classObject;
            }
		}
		// if it's a class object or an SGWTFactory, just return it
		if (isc.isA.ClassObject(className)) return className;
        // SGWTFactory might not be defined yet ...
        if (isc.isA.SGWTFactory && isc.isA.SGWTFactory(className)) return className;

        // if it's an instance of some class, return the class object for the class
        if (isc.isAn.Instance(className)) return className._classObject;
        //if (isc.Log) {
        //    isc.Log.logWarn("couldn't find class: " + className + 
        //                    ", defined classes are: " + this.classList);
        //}
		return null;
	},
	
	//>	@classMethod	ClassFactory.newInstance
	//
	// Given the name of a class, create an instance of that class.
	//	
	//		@param	className	(string)		Name of a class.
	//							(ClassObject)	Actual class object to use.
	//		@param	[props]		(object)		Properties to apply to the instance.
	//		@param	[props2]	(object)		More properties to apply to the instance.
	//		@param	[props3]	(object)		Yet more properties to apply to the instance.
	//
	//	@return				(class)		Pointer to the new class.
	//	@visibility external
	//<
    // NOTE: ability to pass _constructor not documented until we have a more reasonable name for
    // this property.
	newInstance : function (className, props, props2, props3, props4, props5) {

		var classObject = this.getClass(className);

		// if we didn't get a classObject from getClass above,
		// and the first parameter is an object,
		// see if any of the properties objects passed have a ._constructor property,
        // which we'll treat as the classname
		if (classObject == null && isc.isAn.Object(className)) {

            var cons;
            for (var i = 0; i < arguments.length; i++) {
                var propsObj = arguments[i];
                // Note: ._constructor is used rather than .constructor to resolve a
                // number of JS issues, as constructor is present by default on native
                // JS objects.
                // In the long run we want to rename this to something more elegant, like 'class'
                // and modify the css class-specific code to look for 'style' or 'baseStyle' rather
                // than className (or even getClass()).
                if (propsObj != null && propsObj._constructor != null) 
                {
                    cons = propsObj._constructor;
                }
            }

			// now fix up the props objects to include the first object 
			//	as a set of properties instead of just the class name
			props5 = props4;
			props4 = props3;
			props3 = props2;
			props2 = props;
			props = className;

			className = cons;

            // Safari and Mozilla both JS Error if the 'constructor' property set to a string
            // (typically because a user is trying to specify the className to use. (it's ok in IE)
            // Note: the 'constructor' property exists as a native function on a number of standard
            // JS objects, so we can't just check for constructor == null
            if (isc.isA.String(props.constructor)) {
                // If we don't yet have a constructor className, make use of this property - then
                // log a warning and remove it.
                if (className == null) className = props.constructor;
                isc.Log.logWarn("ClassFactory.newInstance() passed an object with illegal 'constructor' " +
                             "property - removing this property from the final object. " +
                             "To avoid seeing this message in the future, " +
                             "specify the object's class using '_constructor'.", "ClassFactory");
                props.constructor = null;
            }     

			classObject = this.getClass(cons);                
		}
    
		if (classObject == null) {
			//>DEBUG
			isc.Log.logWarn("newInstance(" + className + "): class not found", "ClassFactory");
            if (isc.isA.String(className) && className.contains(".")) {
                isc.Log.logWarn("Did you make the SmartGWT class reflectable? See http://www.smartclient.com/smartgwt/javadoc/com/smartgwt/client/docs/Reflection.html", "ClassFactory");
            }
			//<DEBUG
			return null;
		}
        
		return classObject.newInstance(props, props2, props3, props4, props5);
	},	
	
	//>	@classMethod	ClassFactory._getConstructorFunction
	//
	//	Given a <code>prototype</code> object, create a new constructor function that will
	//	reference this prototype.  This allows us to say <code>new constructor()</code> to
	//	create a new object that is effectively a subclass of the original <code>prototype</code>.
	//
	//	@param	proto	(object)	Object to use as the prototype for new objects.
	//	@return			(function)	Function that can be used to create new objects
	//								based on the prototype.
	//<
	_getConstructorFunction : function (proto) {
        
        var cons = (isc.Browser.isSafari ? function () {} : new Function());
		cons.prototype = proto;
		return cons;
	},
	


	//>	@classMethod	ClassFactory.addGlobalID()
	//
	// Given an <code>object</code>, declare a unique global variable and link it to object so
    // object can be addressed in the global scope.<br><br>
	// <P>
	// If the object already has an 'ID' property, it will be used. Note that if you pass an
    // object.ID, it's up to you to ensure it is unique in the global scope. If window[<i>ID</i>] 
    // is already assigned to something else a warning will be logged using the developer console,
    // and the existing reference will be replaced.
    // <P>
    // If the object does not have an explicitly specified ID property already, one will be
    // automatically generated. Note that automatically generated global IDs may be reused if
    // the instance they originally referenced has been +link{Class.destroy(),destroyed}.
    // 
	//	@param	object	(object)	Object to add global ID to.
	//<
    _reservedWords:{
        toolbar:true,
        parent:true,
        window:true,
        top:true,
        opener:true,
        event:true // due to window.event in IE
    },
	addGlobalID : function (object, ID, dontWarn) {
		// if an ID was passed, use that
		object.ID = ID || object.ID;

        var wd = this.getWindow();        
    
        // in keepGlobals mode only certain objects are allowed to actually keep their declared
        // global IDs.  Anything else is given the declared global ID temporarily, then retains
        // only its auto-generated global ID after the eval ends.
        if (isc.keepGlobals && object.ID != null) {
            if (!isc.keepGlobals.contains(object.ID) &&
                !(isc.DataSource && isc.isA.DataSource(object))) 
            {
                var tempID = object.ID;
                object.ID = null;
                isc.globalsSnapshot[tempID] = wd[tempID];
                wd[tempID] = object;
            }
        }
    
        if (object.ID == null) {
            object.ID = this.getNextGlobalID(object);
            object._autoAssignedID = true;
        }


        // if the ID is already taken, log a warning
        var isKeyword, checkForKeyword;
        if (wd[object.ID] != null) {
            var instance = isc.isA.Canvas(wd[object.ID]);
        
            if (!dontWarn) {
                isc.Log.logWarn("ClassFactory.addGlobalID: ID:'" + object.ID + 
                                "' for object '" + object +
                                "' collides with ID of existing object '" + wd[object.ID] + "'." +
                                (instance ? " The pre-existing widget will be destroyed." : 
                                            " The global reference to this object will be replaced"));
            }
            if (instance) wd[object.ID].destroy();
            // If the attribute is not a pointer to a widget instance it may be a
            // a reserved browser keyword or native window attribute which may be non overrideable.
            // Catch the cases we know about (stored in an explicit list)
            // Otherwise use a try...catch block when assigning the property to ensure we don't
            // crash
            
            if (!instance) {
                if (this._reservedWords[ID]) isKeyword = true;
                else checkForKeyword = true;
            }
        }
        
		// now assign the object under that ID globally so anyone can call it
        if (!isKeyword) {
            if (checkForKeyword) {
                try {
                    wd[object.ID] = object;
                } catch (e) {
                    isKeyword = true;
                }
                // attempting to override some keywords (for example window.document) will not
                // throw an error but simply fail to pick up the new value - catch this case as
                // well
                if (wd[object.ID] != object) {
                    isKeyword = true;
                }
            } else {
                wd[object.ID] = object;
            }
        }
        // simple mechanism for instrumenting globals capture.  Simply set isc.globalsSnapshot to an
        // array and we'll fill it here.
         
        if (isc.globalsSnapshot) {
            if (isc.isAn.Array(isc.globalsSnapshot)) {
                // just store all globals that are established
                isc.globalsSnapshot.add(object.ID);
            } else {
                // store a mapping from new globals to original value to allow them to be
                // restored
                isc.globalsSnapshot[object.ID] = wd[object.ID];
            }
        }
        
        // refuse to use keywords and log a warning
        if (isKeyword) {
            var newID = this.getNextGlobalID(object);
            isc.logWarn("ClassFactory.addGlobalID: ID specified as:"+  object.ID + 
                         ". This is a reserved word in Javascript or a native property of the" +
                         " browser window object and can not be used as an ID." +
                         " Setting ID to " + newID + " instead."); 
            object.ID = newID;
            object._autoAssignedID = true;
            wd[object.ID] = object;
        }
    
	},
    
    _$isc_OID_ : "isc_OID_",
    _$isc_ : "isc_",
    _$underscore : "_",
    _joinBuffer : [],
    
    _perClassIDs:{},
    
    getNextGlobalID : function (object) {
        var classString = object != null && isc.isA.String(object.Class) ? object.Class : null;
        return this.getNextGlobalIDForClass(classString);
        
    },
    getNextGlobalIDForClass : function (classString) {
        
        if (classString) {
            var freed = this._freedGlobalIDs[classString]
            if (freed && freed.length > 0) {
                var ID = freed[freed.length-1];
                freed.length = freed.length-1;
                return ID;
            }
            var idCount;
            if (this._perClassIDs[classString] == null) this._perClassIDs[classString] = 0;
            idCount = this._perClassIDs[classString]++;
            
            var buffer = this._joinBuffer;
            buffer[0] = this._$isc_;
            buffer[1] = classString;
            buffer[2] = this._$underscore;
            isc._fillNumber(buffer, idCount, 3,5);

            var result = buffer.join(isc.emptyString);
            return result;
        }
        return this._$isc_OID_ + this._globalObjectID++;
    },
    // dereferenceGlobalID()
    // - frees the window[ID] pointer to an object
    // - allows the global ID to be re-used within this page
    dereferenceGlobalID : function (object) {
        // remove the window.ID pointer to the object.
        // NOTE: don't destroy the global variable if it no longer points to this widget
        // (this might happen if you create a new widget with the same ID)
        if (window[object.ID] == object) {
            window[object.ID] = null;
            
            if (object.Class != null && object._autoAssignedID) {
                this.releaseGlobalID(object.Class, object.ID);
            }
            
            // Don't actually delete the object.ID property - This method is typically called
            // as part of destroy() and if for some reason we have a pointer to a destroyed object
            // it's helpful to know the ID for debugging.
        }
    },

    // Maintain a pool of global IDs that are no longer in use due to destroy() calls
    // and reuse them rather than creating new IDs where possible
      
    
    // GlobalIDs are of the form isc_ClassName_int (isc_StaticTextItem_24, etc)
    // We maintain a cache of previously used global IDs indexed by className, set up each time we
    // call dereferenceGlobalID(). Then autoAssignGlobalID() can re-use IDs from the cache for
    // the appropriate object className
    reuseGlobalIDs:true,
    globalIDClassPoolSize:1000,
    _freedGlobalIDs:{
    },
    releaseGlobalID : function (className, ID) {
        
        if (!this.reuseGlobalIDs) return;
        var freed = this._freedGlobalIDs[className];
        if (!freed) this._freedGlobalIDs[className] = [ID];
        else if (freed.length <= this.globalIDClassPoolSize) {
            if (!freed.contains(ID)) freed[freed.length] = ID;
        }
    },

    _domIDCount:0,
    _$isc_:"isc_",
    _simpleDOMIDTemplate:[null, "_", null],
    
    // DOM ID Cacheing logic
    
    // Maintain a cache of generated DOM ID strings that are no longer in use and re-use them when
    // we need a new arbitrary DOM ID.
    // Canvii may notify us when DOM IDs are no longer in use by calling releaseDOMID()
    // Behavior may be disabled by setting reuseDOMIDs to false
    // Note that reuseDOMIDs may also be set to false on individual Canvii - see
    // Canvas._releaseDOMIDs
    reuseDOMIDs:false,
    DOMIDPoolSize:10000,
    _freedDOMIDs:[],
    releaseDOMID : function (ID) {
        if (!this.reuseDOMIDs || this._freedDOMIDs.length > this.DOMIDPoolSize) return;
        this._freedDOMIDs[this._freedDOMIDs.length] = ID;
    },
    
    // getDOMID() - return a unique string to be used as a DOM Id.
    // 
    // Has 2 modes:
    // If isc._longDOMIds is false (production mode), the returned IDs are arbitrary short
    // strings
    // If isc._longDOMIds is true (development mode), the IDs will be generated based on the
    // ID and suffix passed into this method - useful for debugging as the DOM IDs obviously relate
    // to the canvases that created them.
    getDOMID  : function (ID, suffix) {
        
        // By default we return a unique but uninformative ID like "isc_1A"
        
        if (!isc._longDOMIds || !ID || !suffix) {

            // by preference we'll reuse a DOM ID we know has been freed
            var freedIDs = this._freedDOMIDs.length 
            if (freedIDs > 0) {        
                var ID = this._freedDOMIDs[freedIDs-1];
                this._freedDOMIDs.length = freedIDs-1;
                return ID;
            }
            
            var number = this._domIDCount++;
            return this._convertToBase36(number, this._$isc_);
        }
        
        
        
        // In simpleDOMIDMode, create an ID that incorporates the ID / suffix passed to us
        // We're making an assumption that the ID / suffix passed in is already unique
        
        this._simpleDOMIDTemplate[0] = ID;
        this._simpleDOMIDTemplate[2] = suffix;
        return this._simpleDOMIDTemplate.join(isc.emptyString);
    },
    
    _base36Digits:["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K",
                   "L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    _base36Arr:[],
    _convertToBase36 : function (number, prefix) {
        var digits = this._base36Digits,
            resultsArr = this._base36Arr;

        resultsArr.length = 0;

        // We use this to prefix with "isc_"
        if (prefix) resultsArr[0] = prefix;
        
        var totalDigits = 3;
        
        if (number > 46655) {
            while (Math.pow(36,totalDigits) <= number) totalDigits += 1;
        }
        
        // convert number to base 36
        while (number >= 36) {
            var remainder = number % 36;
            // always add to the end slot, so we get 100 rather than 001
            resultsArr[totalDigits-(prefix ? 0 : 1)] = digits[remainder];
            totalDigits -=1;
            
            number = Math.floor(number / 36);
        }
        resultsArr[totalDigits-(prefix ? 0 : 1)] = digits[number];
        return resultsArr.join(isc.emptyString);
    },
    
	//>	@classMethod	ClassFactory.mixInInterface()	(A)
	//
	// Add the methods of a given Interface to a Class so the class implements the methods.
    // If the class has already defined a method with the same name as the one specified
	// in the interface, the class' method will be retained.
	//
	//	@param	className		(String)	Name of the Class to add methods to.
	//	@param	interfaceName	(String)	Name of the Interface to get methods from.
	//<
	mixInInterface : function (className, interfaceName) {
		var theInterface = this.getClass(interfaceName),
			theClass = this.getClass(className)
		;
		if (!theInterface || !theClass) return null;
	
		if (!theInterface._isInterface) {
			//>DEBUG
			isc.Log.logWarn("ClassFactory.mixInInterface asked to mixin a class which was not"
						+ " declared as an Interface: "+interfaceName+ " onto "+className);
			//<DEBUG
            return;
		}

		// mark the class as implementing the interface
		if (!theClass._implements) theClass._implements = [];
        // ensure the interface doesn't apply to a superClass
        else theClass._implements = theClass._implements.duplicate();

        // install all properties and methods added to this interface, and any superInterfaces
        while (theInterface) {
    		// mix in class properties and methods
	    	this._mixInProperties(theInterface, theClass, true);
    		// mix in instance properties and methods
	    	this._mixInProperties(theInterface, theClass);

		    theClass._implements[theClass._implements.length] = interfaceName;

            theInterface = theInterface.getSuperClass();
            if (theInterface && !theInterface._isInterface) break;
        }
	},

    _initInterfaceMethodName: "initInterface",
    _destroyInterfaceMethodName: "destroyInterface",
	_mixInProperties : function (source, destination, asClassProperties) {
        var props,
             destinationClass = destination
        ;
		if (asClassProperties) { 
            props = isc._interfaceClassProps[source.Class];
		} else {
            props = isc._interfaceInstanceProps[source.Class];
			source = source.getPrototype();
			destination = destination.getPrototype();
        }

        if (props == null) return;

        for (var i = 0; i < props.length; i++) {
            var propName = props[i];

			// skip any properties already defined in the target
			if (destination[propName] != null) continue;
    
            var propValue = source[propName];

			// the interface declared that the target class must implement a method, and it's not
			// there
			if (isc.isA.String(propValue) && propValue == this.TARGET_IMPLEMENTS) {
				//>DEBUG
				var message = (asClassProperties ? "Class" : "Instance") + " method " 
					+ propName + " of Interface " + source.Class + " must be implemented by "
					+ "class " + destination.Class;
                // Don't complain about interface methods not being implemented b/c it's
                // perfectly normal to mix in interfaces before adding properties to the
                // class.  In fact that may be the case most of the time b/c showing the
                // interfaces at class definition is very useful 
                // (e.g: defineClass("Foo", "Bar", "SomeInterface")
				//
				//isc.Log.logWarn(message + ", is not yet implemented"); 

				// but it will be an error if this method is ever called, so install a function
                // that will complain
				destination[propName] = new Function('this.logError("' + message + '")');
				//<DEBUG 
			} else if (propName == this._initInterfaceMethodName && !asClassProperties) {
                // patch any initInterface() methods onto a special array on the classObject to
                // be called at class creation.
                if (destinationClass._initInterfaceMethods == null) destinationClass._initInterfaceMethods = [];
                destinationClass._initInterfaceMethods[destinationClass._initInterfaceMethods.length] = propValue;
			} else if (propName == this._destroyInterfaceMethodName && !asClassProperties) {
                // patch any destroyInterface() methods onto a special array on the classObject to
                // be called at class destruction.
                if (destinationClass._destroyInterfaceMethods == null) destinationClass._destroyInterfaceMethods = [];
                destinationClass._destroyInterfaceMethods[destinationClass._destroyInterfaceMethods.length] = propValue;
            } else {
                //isc.Log.logWarn("adding property " + propName + 
                //                " from interface " + source.Class);
				destination[propName] = propValue;
            }
        }
	},

	//>	@classMethod	ClassFactory.makePassthroughMethods()	(A)
	//
    // Create methods that call through to a related object stored under property
    // <code>propName</code>.  This enables easy implementation of the Delegate design
    // pattern, where one object implements part of its APIs by having another object respond
    // to them.
    // 
	//	@param	methodNames	(array of strings)	list of methods names
	//	@param	propName    (string)		    Property name where the target object is stored.
	//<
    _$argList : "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p",
    makePassthroughMethods : function (methodNames, propName, addNullCheck, nullCheckWarning,
                                       inheritedProperty)
    {
        if (!propName) propName = "parentElement";
        
        var funcTemplate;
        if (!addNullCheck) {
            funcTemplate = this._funcTemplate;
            if (funcTemplate == null) {
                funcTemplate = this._funcTemplate = ["return this.",,".",,"("+this._$argList+")"];
            }
        } else {
            funcTemplate = this._nullCheckFuncTemplate;
            if (funcTemplate == null) {
                funcTemplate = this._nullCheckFuncTemplate = 
                    ["if(this.",,"==null){\n",
                     ,// optionally log a warning
                     "return;}\n",,"return this.",,".",,"("+this._$argList+")"];
            }
        }

        var methods = {};

		for (var i = 0; i < methodNames.length; i++) {
			var methodName = methodNames[i];
    
			// create a function that routes a function call to the target object
            if (addNullCheck) {
                funcTemplate[1] = propName;
                if (nullCheckWarning != null) {
                    var messageArgs = {
                        methodName:methodName,
                        propName:propName
                    };
                    var warning = nullCheckWarning.evalDynamicString(this, messageArgs);
                    
                    funcTemplate[3] = "isc.logWarn(\"" + warning + "\");";
                }
                if (inheritedProperty != null) {
                    funcTemplate[5] = "this." + propName + "." + inheritedProperty + "=" +
                                      "this." +                  inheritedProperty + ";\n";
                }
                funcTemplate[7] = propName;
                funcTemplate[9] = methodName;
            
            } else {
                funcTemplate[1] = propName;
                funcTemplate[3] = methodName;
            }
			methods[methodName] = 
                new Function(this._$argList, funcTemplate.join(isc.emptyString));
		}
        
        return methods;
    },

	//>	@classMethod	ClassFactory.writePassthroughFunctions()	(A)
    //
    // Install methods in <code>destinationClass</code> which will call the same-named function
    // on a related object stored under the property name <code>memberName</code> on instances
    // of <code>destinationClass</code>.
    //
	//	@example	<code>ClassFactory.writePassthroughFunctions(
	//					ListGrid, "selection", ["select","selectAll",..."]
	//				);</code>
	//
	//				after this, you can call
	//					listGrid.selectRecord()
	//				rather than
	//					listGrid.selection.selectRecord()
    //<
	writePassthroughFunctions : function (destinationClass, memberName, methodNames) {
        var methods = this.makePassthroughMethods(methodNames, memberName);
        destinationClass.addMethods(methods);
    }

});	// END isc.addMethods(isc.ClassFactory)

//
// add properties to the ClassFactory object
//
isc.addProperties(isc.ClassFactory, {
	// when defining interfaces, use this constant as a marker value indicating that a method
    // must be implemented by any class your interface is mixed in to
	TARGET_IMPLEMENTS : "TARGET_IMPLEMENTS",

	//>	@attr	ClassFactory.defaultSuperClass  (Class : null : [IA])  
    // Class to use as the default superClass if none is specified
    //<
		
	// Counter which is used to generate unique object IDs
	_globalObjectID : 0,

	// Classes created with ClassFactory.defineClass
	classList : []
});

//> @classMethod isc.defineClass
// Shortcut for <code>isc.ClassFactory.defineClass()</code>.
// @include classMethod:ClassFactory.defineClass
// @see ClassFactory.defineClass()
// @visibility external
//<
isc.defineClass = function (className, superClass, interfaces, suppressSimpleName) {
    return isc.ClassFactory.defineClass(className, superClass, interfaces, suppressSimpleName);
}

//> @classMethod isc.overwriteClass
// Shortcut for <code>isc.ClassFactory.overwriteClass()</code>.
// @include classMethod:ClassFactory.overwriteClass
// @see ClassFactory.overwriteClass()
// @visibility external
//<
isc.overwriteClass = function (className, superClass, interfaces, suppressSimpleName) {
    return isc.ClassFactory.overwriteClass(className, superClass, interfaces, suppressSimpleName);
}

isc.defineInterface = function (className, superClass) {
    return isc.ClassFactory.defineInterface(className, superClass);
}

//> @type SCClassName
// Name of a SmartClient Class, that is, a Class that has been created via
// +link{classMethod:isc.defineClass()}, including Classes built into SmartClient, such as "ListGrid".
// 
// @visibility external
//<

isc.defer = function (code) {
    var lastClass = isc.ClassFactory.getClass(isc.ClassFactory.classList.last()),
        existingCode = lastClass._deferredCode;
    isc.Log.logWarn("deferred code being placed on class: " + lastClass);
    // first time
    if (!existingCode) lastClass._deferredCode = [code];
    // more times
    else existingCode.add(code);
}


/*
 * Isomorphic SmartClient
 * Version v9.0p_2013-11-06 (2013-11-06)
 * Copyright(c) 1998 and beyond Isomorphic Software, Inc. All rights reserved.
 * "SmartClient" is a trademark of Isomorphic Software, Inc.
 *
 * licensing@smartclient.com
 *
 * http://smartclient.com/license
 */

 



if (!isc.Browser.isSafari) {
    isc._window = window;
    isc._document = window.document;
}


if (window.isc_enableCrossWindowCallbacks && isc.Browser.isIE) {
   isc.enableCrossWindowCallbacks = true;
   Object._window = window;
}



//>	@class	Class
//	
// The Class object is root of the Isomorphic SmartClient inheritance tree -- it includes
// functionality for creating instances, adding methods and properties, getting prototypes,
// etc.<br><br>
//
// To add functionality to ALL classes, add them to Class.<br><br>
//
// To create a Class, call <code>ClassFactory.defineClass("MyClass", "MySuperClass")</code>
// <P>
// <code>defineClass</code> will return the created class, and make it available as
// <code>isc.MyClass</code>, and as the global variable <code>MyClass</code> if not in
// +link{class:isc,portal mode}.
// <P>
// You can then:
// <UL>
//		<LI>add class-level (static) properties and methods to the class:
//				<code>MyClass.addClassProperties()</code>	
//			these methods and properties are accessed through the Class variable itself, eg:
//				<code>MyClass.someStaticMethod()</code> or <code>MyClass.someStaticProperty</code>
//
//		<LI>add default instance properties and methods to the class:
//				<code>MyClass.addProperties()</code>
//			these methods and properties are accessed through a class instance, eg:
//				<code>var myInstance = MyClass.create();</code>
//				<code>myInstance.someInstanceMethod()</code>
//
//		<LI>create new instances of this class:
//				<code>var myInstance = MyClass.create()</code>
// </UL>
// NOTE: as a convention, all class names begin with a capital letter and all instances begin
// with a lower case letter.
//
//  @treeLocation Client Reference/System
//	@visibility external
//<
isc.ClassFactory.defineRootClass('Class');

//
// set Class as the default superclass for classes defined by ClassFactory.defineClass()
//
isc.ClassFactory.defaultSuperClass = isc.Class;

//
//	add static methods to all classes defined with our system
//
//	call on the Class object itself, as:   Class.method()
//

//  First we install the methods that allow us to addMethods to a class as a method call on the
//  class (eg Class.addClassMethods(methods) rather than addMethods(Class, methods);.
isc.addMethods(isc.Class, {

	//>	@classMethod	Class.addClassMethods()
	//
	//	Add static (Class-level) methods to this object.<br><br>
	//
	//	These methods can then be called as MyClass.method().  The value for "this" will be the
    //	class object for the class.
	//
	//	@param	[arguments 0-N] (object)	objects with methods to add (think named parameters).
	//										all the methods of each argument will be applied
	//										as class-level methods.
	//	@visibility internal
	//<
        
	addClassMethods : function () {
		for (var i = 0; i < arguments.length; i++)
			isc.addMethods(this, arguments[i]);
	}
    
});

isc.Class.addClassMethods({

	//>	@classMethod Class.create()
	//
	// Create an instance of this class.  
    // <P>
    // All arguments passed to this method are passed on to the +link{Class.init()} instance 
    // method.  Unless +link{class.addPropertiesOnCreate} is set to <code>false</code>, all
    // arguments passed to this method must be Objects and all properties on those
    // objects will be copied to the newly created instance before +link{Class.init()} is
    // called.  If there are overlapping properties in the passed arguments, the last wins.
    // <p>
    // Any return value from +link{Class.init()} is thrown away.
	// <p>
    // Note: Generally, you would not override this method.  If you want to specify a
    // constructor for your class, provide an override for +link{Class.init()} for generic
    // classes or +link{canvas.initWidget()} for any subclasses of UI components
    // (i.e. descendants of +link{Canvas}.
	//
	//	@param	[arguments 0-N]	(any)
    //      Any arguments passed will be passed along to the init() routine of the instance.
    //      Unless +link{class.addPropertiesOnCreate} is set to false, any arguments passed to
    //      this method must be of type Object.
	//	@return			 		(object)	
    //      New instance of this class, whose init() routine has already been called
	//
	//	@example	<code>var myInstance = MyClass.create()</code>
    //  @example    create
	//	@visibility external
	//<
    create : function (A,B,C,D,E,F,G,H,I,J,K,L,M) {
        var newInstance = this.createRaw();

        newInstance = newInstance.completeCreation(A,B,C,D,E,F,G,H,I,J,K,L,M);
    
		// return the new instance
		return newInstance
    },

    
    _initializedClasses : {},
    createRaw : function () {
        if (!this.initialized()) this.init();

		// create a new instance based on the class's instanceProtoype
		var newInstance = new this._instancePrototype._instanceConstructor();

        // install the appropriate namespace on the instance
        newInstance.ns = this.ns;
        
        return newInstance;
    },

    // class-level init
    init : function () {
        //this.logWarn("uninitialized class");

        // init superclass chain
        var superClass = this.getSuperClass();
        if (superClass && !superClass.initialized()) superClass.init();

        // execute any deferred class definition
        var deferredCode = this._deferredCode;
        if (deferredCode) {
            //this.logWarn("eval'ing deferred code");
            this._deferredCode = null;
            deferredCode.map(eval);
        }

        

        if (this.autoDupMethods) { 
            isc.Class.duplicateMethods(this, this.autoDupMethods); 
        }

        this._initializedClasses[this.Class] = true;
    },

    // to get around native browser limitations with stack traces being unable to proceed
    // through recursively called methods, create duplicates of certain key functions on every
    // class and instance.  
    
    duplicateMethods : function (target, methodNames) {
        // skip certain ultralight classes
        if (target.Class && this.dontDup[target.Class]) return;

        for (var i = 0; i < methodNames.length; i++) {
            var methodName = methodNames[i];

            this.duplicateMethod(methodName, target);
        }
    },
    duplicateMethod : function (methodName, target) {
        if (!target) target = this;

        var method = target[methodName];

        if (method == null) return;

        // avoid duplicating a duplicate, which would force Super() to follow multiple
        // _originalMethod links to discover the true original method.
        if (method._originalMethod) {
            while (method._originalMethod) method = method._originalMethod;
            //this.logWarn("double dup: " + methodName + " on target: " + target);
        }

        //!DONTOBFUSCATE
        var dup;
        if (method.toSource == null) { // IE, Safari
            dup = eval("dup = " + method.toString());
        } else {
            dup = eval(method.toSource());
        }

        // figure out the method's name
        if (!method._fullName) isc.Func.getName(method, true);
            /*
            name = (isc.isA.ClassObject(target) ? "[c]" : "") +
                    (target.Class ? target.Class : "") + 
                    "." + methodName + "[d]";
            */
        dup._fullName = method._fullName + "[d]";

        // to allow Super() to do correct comparisons with superclass implementations
        dup._originalMethod = method;

        target[methodName] = dup;

        return dup;
    },
    dontDup : {
        StringBuffer : true,
        Action : true,
        MathFunction : true,
        JSONEncoder : true
    },
    // class-level auto-dups
    //autoDupMethods: [ "fireCallback" ],

    // NOTE: we have to use a structure like this instead of just checking a property on the
    // class object (eg this._initialized) because any property would be inherited from
    // superclass class objects.
    initialized : function () { return this._initializedClasses[this.Class] },

	//>	@classMethod Class.getClassName()
	//
	//	Gets the name of this class as a string.
	//
	//	@return (string)	name of the class
	//	@visibility external
	//<
	getClassName : function () { 
		return this.Class;
	},

    //> @classMethod Class.getScClassName()
    //  
    //  Gets the name of this class as a string, if the class is a SmartClient Framework class.
    //  Otherwise, gets the name of the SmartClient Framework class which this class extends.
    //
    //  @return (string) name of the SmartClient Framework class
    //<
    getScClassName : function () {
        return this.isFrameworkClass ? this.Class : this._scClass;
    },

	//>	@classMethod Class.getSuperClass()
	//	
	//	Gets a pointer to the superClass' Class object.
	//
	//	@return (Class)		Class object for superclass.
	//	@visibility external
	//<
    getSuperClass : function () {
        return this._superClass;
    },

	//>	@classMethod Class.getPrototype
	//
	//	Gets a pointer to the prototype object for this class.
	//
	//	This is the object that you should install methods/properties into
	//	to have them apply to each instance.  Generally, you should use
    //	+link{Class.addProperties()} to do this
	//	rather than affecting the prototype directly
	//
	//	@return	(object)	Prototype for all objects instances.
	//<
    // NOTE: not external because customers shouldn't muck with the prototype directly
	getPrototype : function () {
		return this._instancePrototype;
	},

	//> @classMethod Class.addMethods()
	//
	// Helper method for adding method definitions to all instances of this class.<P>
	//
	// The added methods can be called as myInstance.method().<P>
    //
    // Functionally equivalent to +link{class.addProperties}, which works with both properties
    // and methods.
	//
	// @param [arguments 0-N] (object) objects with methods to add (think named parameters).
	//                                  all the methods of each argument will be applied
	//                                  as instance-level methods.
    // @return (object) the class after methods have been added to it
	// @visibility external
	//<
    
	addMethods : function () {
        if (this._isInterface) {
            this.logWarn("Use addInterfaceMethods() to add methods to interface " + this);
        }
		for (var i = 0; i < arguments.length; i++)
			isc.addMethods(this._instancePrototype, arguments[i]);
        return this._instancePrototype;
	},
    
	addInterfaceMethods : function () { 
		for (var i = 0; i < arguments.length; i++)
			isc.addMethods(this._instancePrototype, arguments[i]);
    },
    addInterfaceProperties : function () {
		isc.addPropertyList(this._instancePrototype, arguments);
    },

    
	//>	@classMethod Class.registerStringMethods()
	//
	//	Register a method, or set of methods, that can be provided to instances of this class as
    //	Strings (containing a JavaScript expression) and will be automatically converted into
    //	functions.
    //  <p>
    //  For example:
    //  <pre>
    //  isc.MyClass.registerStringMethods({
    //      myStringMethod: "arg1, arg2"
    //  });
    //  </pre>
	//
	//	@param	methodName (object)	    If this is a string, name of the property to register
    //                                  If this is an object, assume passing in a set of name/value
    //                                  pairs to register
    //  @param  argumentString (string) named arguments for the property in a comma separated string
    //                                  (not used if methodName is an object)
    // @see group:stringMethods
	//	@visibility external
	//<
	registerStringMethods : function (methodName, argumentString) {
    
        // If we haven't already done so, override the method argument registry
        // from the super class (otherwise we'll affect other classes with our changes)
        var registry = this._stringMethodRegistry;
        if (!this.isOverridden("_stringMethodRegistry")) {
            
            //if (registry._entries != null) {
            //    this.logWarn("Methods being registered on: " + this.Class + 
            //                 " causing copy of superclass " + this._superClass.Class +
            //                 " registry");
            //}
            var registryClone = {},
                entries = registryClone._entries = (registry._entries ?
                                                    registry._entries.duplicate() : []);
            for (var i = 0; i < entries.length; i++) {
                registryClone[entries[i]] = registry[entries[i]];
            }
            this._stringMethodRegistry = registry = registryClone;
        }        

        // If it's an object, rather than a string, assume it's a list of multiple methodName
        // to argument mappings to register at once.
        if (!isc.isA.String(methodName)) {
            var newMethods = methodName;

            // if it's not an object, bail - we don't know how to deal with this
            if (!isc.isAn.Object(newMethods)) {
                this.logWarn("registerStringMethods() called with a bad argument: " +
                             methodName);
                return false;
            }
            
            for (var methodName in newMethods) {
                registry[methodName] = newMethods[methodName]
                registry._entries.add(methodName);
            }
            
        } else {    
            // in the registry, the distinction between null and undefined is important.
            // If the second parameter is currently undefined, set it to null
            // (this allows the second param. to be optional).
            if (argumentString == null) argumentString = null;

            registry[methodName] = argumentString;
            registry._entries.add(methodName);
        }
        
        // return true for success
        return true;
	},

	//> @classMethod Class.registerDupProperties() [A]
	// A common requirement in SmartClient development is to the ability have an attribute
	// be set to a "standard" type of object or array for every instance of a class.
	// <P>
	// An example might be a special subclass of TabSet which always shows a particular set
	// of tabs.<br>
	// In this case the most convenient approach would be to simply call 
	// <P>
	// <code>setProperties({  tabs: <i>[array of standard tab object]</i> });</code>
	// <P>
	// However the developer does not want each instance he creates to point to <b>the same</b>
	// array of objects - instead each instance should have a separate array containing separate
	// objects with the same set of standard attributes.
	// <P>
	// This method provides an easy way to handle this case. By calling
	// +link{registerDupProperties()} the developer is notifying a class that every time
	// a new instance is generated via a call to +link{Class.create()}, the attribute
	// in question should be cloned onto the generated instance.
	// <P>
	// The <code>AutoChild</code> subsystem also respects registered properties for duplication.
	// When +link{class.addAutoChild()} or +link{class.createAutoChild()} is called, if
	// a property is set in the <code><i>autoChild</i>Defaults</code> block for the auto child,
	// that property will be cloned onto the instance rather than copied over by reference if
	// it's registered as a property for duplication via this method.
	// <P>
	// NOTE: This subsystem will only handle cloning simple javascript objects and arrays.
	// If an attribute name has been registered via this method, calling 
	// <code>addProperties()</code> on the class object and passing in a live SmartClient
	// widget is not supported. If you need a standard SmartClient component to show up
	// in a class we recommend you use the +link{group:autoChildUsage,AutoChild subsystem} to
	// define a constructor and defaults for the widget and then set the attribute to
	// <code>"autoChild:<i>&lt;autoChildName&gt;</i>"</code>.
	//
	// @param attributeName (string)
	//    attribute name to register for duplication on instance creation for this class
	// @param [subAttributes] (Array of string)
	//    This parameter allows targetted support for deeper cloning.    
	//    The issue is that for some attributes - for example sectionStack.sections, we know
	//    certain properties will also need cloning (sectionStack section.items).
	//    We want to use 'shallowClone()' to duplicate the objects on init rather than clone
    //    as clone is dangerous and can lead to stack overflow errors if the target happens
    //    to point to certain objects.
    //    Therefore allow developers to register properties of an attr value to also be
    //    cloned.
    //    To use this feature a developer would pass in an array of sub-properties
    //    as a second param (EG registerDupProperties("sections", ["items"]);
    // @visibility dupProperties
	//<
	registerDupProperties : function (attributeName, subAttributes) {
	   
	    
	    if (this._dupAttrs == null || this._dupAttrs._className != this.getClassName()) {
	        if (this._dupAttrs != null) {
	            var dupAttrs = this._dupAttrs;
	            this._dupAttrs = this._dupAttrs.duplicate();
	            if (dupAttrs._subAttrs != null) {
	                this._dupAttrs._subAttrs = isc.shallowClone(dupAttrs._subAttrs);
	            }
	        } else {
	            this._dupAttrs = [];
	        }
	        
	        this._dupAttrs._className = this.getClassName();
	    }
	    if (!this._dupAttrs.contains(attributeName)) {
	        this._dupAttrs.add(attributeName);
	    }
	    
	    // support targetted deep-cloning.
	    // (See JS Doc for subAttributes param)
	    //
	    // When given a sub attribute to explicitly dup, store it directly on the
	    // registered dupAttrs array in an object of the format:
	    // {attributeName:[ Array of sub attributes for cloning ] }
	    if (subAttributes != null) {
	        
	        //this.logWarn("sub attribute! " + subAttr);
	        
	        var dupSubAttrs = this._dupAttrs._subAttrs || {};
	        dupSubAttrs[attributeName] = subAttributes;
	        
            this._dupAttrs._subAttrs = dupSubAttrs;
	    }
	    
	},
	
	//> @classMethod Class.isDupProperty()
	// Returns true if the specified attribute was registered as a property for duplication
	// at the instance level via +link{Class.registerDupProperties()}
	// @param attributeName
	// @visibility dupProperties
    //<
	isDupProperty : function (attributeName) {
	    return this._dupAttrs != null && this._dupAttrs.contains(attributeName);
	},
	
	cloneDupPropertyValue : function (attributeName, value) {
	    
	    // We want to warn if the property is set to a Canvas instance which we can't readily
	    // clone.
	    // Explicitly catch arrays and run each entry through this method to also warn in the
	    // case where we have an array containing live canvii.
	    

	    if (isc.isA.Array(value)) {
	        var newArr = [];
	        for (var i = 0; i < value.length; i++) {
	            newArr[i] = this.cloneDupPropertyValue(attributeName, value[i]);
	        }
	        return newArr;
	    }
	    
	    if (isc.Canvas && isc.isA.Canvas(value)) {
	        this.logWarn("Default value for property '" + attributeName 
	            + "' is set to a live Canvas (with ID '"+value.getID()+"') at the Class or AutoChild-defaults level. "
	            + "SmartClient cannot clone a live widget, so each instance of this "
	            + "class may end up pointing to the same live component. "
	            + "To avoid unpredictable behavior and suppress this warning, use the " 
	            + "AutoChild subsystem to set up re-usable default properties for sub-components.");
	        return value;
	    }
	    
	    var clonedVal = isc.shallowClone(value);

        // Support also cloning certain attribute values - see 'subAttrs' param of 
        // registerDupProperties	    
	    var dupArr = this._dupAttrs;
	    if (dupArr._subAttrs != null && dupArr._subAttrs[attributeName] != null && 
	        clonedVal != null) 
	    {
	        //this.logWarn("iteratin?:" + dupArr._subAttrs[attributeName]);
	        
	        for (var i = 0; i < dupArr._subAttrs[attributeName].length; i++) {
	            var subAttrName = dupArr._subAttrs[attributeName][i];
	            //this.logWarn("Name:" + subAttrName + ", val:" + clonedVal[subAttrName]);
	            if (clonedVal[subAttrName] != null) {
	                clonedVal[subAttrName] = isc.shallowClone(clonedVal[subAttrName]);
	            }
	        }
	    }
	    return clonedVal;
	},
	
	
	
	//>	@classMethod Class.evaluate()
    // Evaluate a string of script and return the result.    
    // <P>
    // This method is a wrapper around the native javascript method <code>eval()</code>. It
    // papers over some native issues to ensure evaluation of script behaves consistently across
    // browsers
    //
	// @param expression (string) the expression to be evaluated
    // @param evalArgs (object) Optional mapping of argument names to values - each key will
    //      be available as a local variable when the script is executed.
    // @return (any) the result of the eval
    // @visibility external
	//<
    
    evaluate : function (expression, evalArgs, globalScope, hiddenIFrameEval, strictJSON, reviverFunction) {
        //!OBFUSCATEOK
        
        
        if (strictJSON) {
            //this.logWarn("is strict");        
            return this.parseStrictJSON(expression, reviverFunction);
        }
        
        // Set a flag so we know an eval is executing
        
        if (!isc._evalRunning) isc._evalRunning = 0;
        isc._evalRunning ++;
        var returnVal;
        
        if (hiddenIFrameEval && isc.Browser.isIE && !globalScope && isc.Page.isLoaded()) {
        
            returnVal = this.evalInIFrame(expression, evalArgs);
        } else {
            //this.logWarn("args and stuff");    

            
            if (evalArgs) {
                with (evalArgs) {
                    if (globalScope) returnVal = window.eval(expression)
                    else returnVal = eval(expression);
                }
            } else {
                if (globalScope) returnVal = window.eval(expression)
                else returnVal = eval(expression);
            }
        }
        
        // Decrement / clear the evalRunning flag 
        
        if (isc._evalRunning != null) isc._evalRunning --;        
        if (isc._evalRunning == 0) delete isc._evalRunning;        
        return returnVal;
	},
	
	
    parseStrictJSON : function (script, reviverFunction, suppressNativeMethod, allowLoose) {
        
        var parseFunc;
        if (suppressNativeMethod || allowLoose || 
            window.JSON == null || window.JSON.parse == null) 
        {
            parseFunc = this.getJSONParseFunc();
        } else {
            parseFunc = window.JSON.parse;
        }
        return parseFunc(script, reviverFunction, allowLoose);
    },


	// Helper - create a JSON parsing function for browsers that don't natively 
    // have support for JSON.parse
    // Note that this has the same restrictions on format as true JSON.parse() - otherwise
    // we'd have browser inconsistency over whether strict JSON response format was
    // required. We also will need to use the "reviver" function if specified to handle
    // custom conversions.
    _cx:/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,

    
    useHiddenFrameInJSONParseFunction:true,
    getJSONParseFunc : function () {

        if (this._jsonParseFunc) return this._jsonParseFunc;
        
        this.logInfo("No native JSON.parse() available in this browser." +
            " Creating strict JSON parsing function.", "jsonEval");
        
        
        var _this = this,
            cx = this._cx;

        this._walkFunc = function (holder, key, reviver, objRefs, objPath) {
            
            // The walk method is used to recursively walk the resulting structure so
            // that modifications can be made.

            var k, v, value = holder[key];
            // Don't drill into objects we know aren't simple JSON
            // window
            // isc
            // instance or class objects
            if (value && typeof value === 'object' && value != window &&
                value != window.isc && !isc.isA.Class(value) && !isc.isAn.Instance(value))
            {

                // Infinite loops can of course cause a crash here.
                // We already have logic to avoid this in the JSONEncoder class
                // so let's use the same approach.
                
                var alreadySeen = false;
            	var prevPath = isc.JSONEncoder._serialize_alreadyReferenced(objRefs, value);
                if (prevPath != null && objPath.contains(prevPath)) {
                    var nextChar = objPath.substring(prevPath.length, prevPath.length+1);
                    //this.logWarn("backref: prevPath: " + prevPath + ", current: " + context.objPath +
                    //             ", char after prevPath: " + nextChar);
                    if (nextChar == "." || nextChar == "[" || nextChar == "]") {
                        alreadySeen = true;
                    }
                }
                if (!alreadySeen) {

                    isc.JSONEncoder._serialize_remember(objRefs, value, objPath);

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            
                            var objPath = isc.JSONEncoder._serialize_addToPath(objPath, k);
                            v = _this._walkFunc(value, k, reviver, objRefs, objPath);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        };

        this._jsonParseFunc = function (text, reviver, loose) {
        //!OBFUSCATEOK        

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.
            
            // Skip this if we're not enforcing script JSON format
            
            var invalidExpression = false;
            if (loose == null) loose = isc.Class._useLooseJSONParsePatch;
            if (!loose) {
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                // In the second stage, we run the text against regular expressions that look
                // for non-JSON patterns. We are especially concerned with '()' and 'new'
                // because they can cause invocation, and '=' because it can cause mutation.
                // But just to be safe, we want to reject all unexpected forms.
                
                // Also skip this for the mode where we're not enforcing script JSON Format
    
                // We split the second stage into 4 regexp operations in order to work around
                // crippling inefficiencies in IE's and Safari's regexp engines. First we
                // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                // replace all simple value tokens with ']' characters. Third, we delete all
                // open brackets that follow a colon or comma or that begin the text. Finally,
                // we look to see that the remaining characters are only whitespace or ']' or
                // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
                if (!(/^[\],:{}\s]*$/
                        .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) )
                {
                    invalidExpression = true;
                }
            }
            if (invalidExpression) {
                // If the text is not JSON parseable, then a SyntaxError is thrown.
                throw new SyntaxError('JSON.parse error');                
            }

            // In the third stage we use the eval function to compile the text into a
            // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
            // in JavaScript: it can begin a block or an object literal. We wrap the text
            // in parens to eliminate the ambiguity.
            
            // Note - we're evaluating in a hidden frame by default to avoid
            // IE9's memory leaks.
            // This should never lead to the classic "Can't execute code from a freed script"
            // javascript error since strict JSON will never directly create any
            // Date or function objects. (See comments around isc.RPCManager.allowIE9Leak
            // for more on that error).
            // 
            // Exceptions
            // - In "loose" mode we may be parsing code which includes method calls etc, so
            //   don't attempt to evaluate in an iframe.
            // - Have a flag to disable trying to eval in an iframe in case we hit any
            //   edge cases that trip the JS error (or other issues such as performance
            //   concerns, etc)
            j = isc.eval('(' + text + ')',
                         !loose && isc.Class.useHiddenFrameInJSONParseFunction);

            // In the optional fourth stage, we recursively walk the new structure, passing
            // each name/value pair to a reviver function for possible transformation.
            return typeof reviver === 'function'
                ? _this._walkFunc({'':j}, '', reviver, {obj:[],path:[]}, "")
                : j;
        }
        
        return this._jsonParseFunc;
    },
    
	
	evalFrameResetInterval: 100,
	evalInIFrame : function (expression, evalArgs) {
        if (this.logIsDebugEnabled("iframeEval")) {
	        this.logDebug("Using iframe for evaluation:\n" + expression, "iframeEval");
	    }
        
        if (this.evalFrame == null || this._domain != document.domain) {
            this.makeEvalFrame();
	    }
        
        if (this.evalFrame.evalCount > this.evalFrameResetInterval ||
            this.evalFrame.frame == null) {
            this.resetEvalFrame();
        }
        
        if (this.evalFrame.frame == null) this.logInfo("Temporarily unable to " +
            "evaluate in a HiddenFrame for domain " + document.domain + "; " +
            "falling back to a simpler evaluate that may leak memory");                                 
        return this.evalFrame.frame == null ? this.evaluate(expression, evalArgs) :
                                      this.evalFrame.doEval(expression, evalArgs);
	},
	
	makeEvalFrame : function () {
	    this.evalFrame = isc.HiddenFrame.create(this.evalFrameDefaults);
        // we'll rebuild if document.domain mismatches
        this._domain = document.domain;
	    // Draw should be synchronous (not loading any content)
	    this.evalFrame.draw();
        
        if (document.domain == location.hostname && this.evalFrame.getFrameDocument() == null) 
        {
            var props = isc.addProperties({ location: isc.Page.getURL("[HELPERS]empty.html")},
                                          this.evalFrameDefaults);
	        this.evalFrame = isc.HiddenFrame.create(props);
            this.evalFrame.draw();
        }
	},

    evalFrameDefaults: {
        useHtmlfile: false,
        doEval : function (expression, evalArgs) {
	        this.evalCount++;
	        return this.getHandle().doEval(expression, evalArgs);
        }
    },

    evalFrameHTML: [
                  "<html><body><script>" +
                  // Apply native object class extensions
                  "var nativeObjTypes = ['Array', 'String', 'Date'];",
                  "for (var i = 0; i < nativeObjTypes.length; i++) {" +
                    "var proto = window[nativeObjTypes[i]].prototype," +
                        "sourceProto = window.parent[nativeObjTypes[i]].prototype;" +
                  // Only attributes we've added are iterable, so just copy them
                  // across.
                    "for (var attr in sourceProto) {" +
                        "proto[attr] = sourceProto[attr];" +                        
                    "}" +
                    
                  "}" +
                  // Copy ISC across so anything called directly from there is available
                  // here too.
                  "window.isc = window.parent.isc;" +

                  // Eval function to actually evaluate expression.
                  "function doEval(exp, args) {" +
                    "try{" +
                        // Use a try...catch block - if the eval fails, attempt in the main
                        // frame - there may have been an issue with scoping after all.
                        "if (args) {" +
                            "with (args) { " +
                                "return eval(exp);" +
                            "}" +
                        "} else {" +
                            "return eval(exp);" +
                        "}" +
                    "} catch (e) {" +
                        "window.parent.isc.Log.logInfo(" +
                            "'Attempt to evaluate in eval-frame threw error:' + e " +
                            "+ '. Attempting eval in main window.'," +
                            "'iframeEval');" +
                        "if (args) {" +
                            "with (args) { " +
                                "return window.parent.eval(exp);" +
                            "}" +
                        "} else {" +
                            "return window.parent.eval(exp);" +
                        "}" +
                    "}" +
                  "}" +
                  "</script></body></html>"
    ],

	resetEvalFrame : function () {
        if (this.logIsInfoEnabled("iframeEval")) {
	        this.logInfo("Using iframe for evaluation - resetting iframe.", "iframeEval");
	    }
	    this.evalFrame.evalCount = 0;

        
        var frame = this.evalFrame.frame = this.evalFrame.getFrameDocument();
        if (frame != null) {
            frame.open();
            var domainString = this.evalFrame._domain ? 
                "document.domain = '" + this.evalFrame._domain + "';" : "";
            frame.write(this.evalFrameHTML[0] + domainString + this.evalFrameHTML[1]);
            frame.close();
        } else {
            this.evalFrame._domain = document.domain;
        }
    },	
    
	//>	@classMethod Class.addClassProperties()
	//
	//	Add static (Class-level) properties and methods to this object<br><br>
	//
	//	These properties can then be accessed as MyClass.property, or for functions, called as
    //  MyClass.methodName()
	//
	//	@param	[arguments 0-N] (object)	objects with properties to add (think named parameters).
	//										all the properties of each argument will be applied
	//										as class-level properties.
    //  @return                 (object)    the class after properties have been added to it
	//	@visibility external
	//<
	addClassProperties : function () {
		isc.addPropertyList(this, arguments);
        return this;
	},
	
	
	//> @classAttr Class.isFrameworkClass (boolean : varies : RWA)
	// Is this a core SmartClient class (part of the SmartClient framework)?
	// This attribute may be used for debugging, and by the AutoTest subsystem to 
	// differentiate between SmartClient classes (part of the smartClient framework) and
	// subclasses created by specific applications
	// @setter Class.markAsFrameworkClass()
    // @visibility external
    // @group autoTest
    //<
	// Usually set at init time as part of ClassFactory.defineClass but we need to be able
	// to also set this at runtime for the cases where we replace core smartclient classes - 
	// for example IButton
	
	//>	@classMethod Class.markAsFrameworkClass()
	// Mark this class as a framework class (member of the SmartClient framework).
	// Sets +link{Class.isFrameworkClass}. May be used in debugging and by the
	// AutoTest subsystem
    // @visibility external
    // @group autoTest
    //<
	markAsFrameworkClass : function () {
	    this.isFrameworkClass = true;
	    this._instancePrototype.isFrameworkClass = true;
	    this._scClass = this.Class;
	    this._instancePrototype._scClass = this.Class;
	},

	//>	@classMethod Class.addProperties()
	//
	//	Add default properties and methods to all instances of this class.<br><br>
	//
	//	These properties can then be accessed as <code>myInstance.property</code>, 
    //  and methods can be called via <code>myInstance.methodName()</code>
	//
	//	@param	[arguments 0-N] (object)	objects with properties to add (think named parameters).
	//										all the properties of each argument will be applied
	//										as instance-level property defaults.
    //  @return                 (object)    the class after properties have been added to it
	//	@visibility external
	//<
    _deferredDefaults : {},
	addProperties : function () {
        
        if (this._isInterface) {
            this.logWarn("Use addInterfaceProperties() to add methods to interface " + this);
        }
		isc.addPropertyList(this._instancePrototype, arguments);
        return this;
	},
	
	//>	@classMethod Class.addPropertyList()
	//
	//	Add default properties to all instances of this class
	//
	//	@param	list (object[])		array of objects with properties to add
    //  @return      (object)       the class after properties have been added to it
	//
	//	@visibility external
	//<
	addPropertyList : function (list) {
		isc.addPropertyList(this._instancePrototype, list);
        return this;
	},

    //> @classMethod Class.changeDefaults() (A)
    // 
    // Changes a set of defaults defined as a JavaScript Object.  For these kind of properties,
    // simply calling +link{Class.addProperties()} would replace the original Object
    // with yours, wiping out settings required for the basic functionality of the component.
    // This method instead applies your overrides over the existing properties, without
    // destroying non-overridden properties.
    // <p>
    // For example let's say you have a component that's defined as follows
    // <pre>
    // isc.defineClass("MyComponent");
    // isc.MyComponent.addProperties({
    //     simpleProperty: "some value",
    //     propertyBlock : {
    //       foo: "bar",
    //       zoo: "moo"
    //     }
    // }
    // </pre>
    // If you wanted to override simpleProperty, you can just call +link{Class.addProperties()}
    // like this:
    // <pre>
    // isc.MyComponent.addProperties({
    //     simpleProperty: "my override"
    // });
    // </pre>
    // If you want to override the value of <code>propertyBlock.moo</code> above,
    // but you don't want to clobber the value of <code>propertyBlock.zoo</code>.  If you use
    // the above pattern like so:
    // <pre>
    // isc.MyComponent.addProperties({
    //     propertyBlock: {
    //         foo: "new value",
    //         zoo: "moo"
    //     }
    // });
    // </pre>
    // You need to re-specify the value of <code>propertyBlock.zoo</code> which you didn't want
    // to override.  Failing to re-specify it would destroy the value.
    // <p>
    // Instead of re-specifying the value, you can use this method to modify the value of
    // <code>foo</code> - like this:
    // <pre>
    // isc.MyComponent.changeDefaults("propertyBlock", {
    //     foo: "new value"
    // });
    // </pre>
    // <p>
    // See also the +link{AutoChild} system for information about standard sets of defaults
    // that are available for customization.
    //
    // @param defaultsName (String) name of the property to change
    // @param newDefaults (Object) overrides for defaults
    // 
    // @visibility external
    //<
    changeDefaults : function (defaultsName, newDefaults) {
        // get existing defaults
        var defaults = this._getDefaults(defaultsName),
            mustAssign = false;

        // if we have a superclass with the same defaults, copy them so the superclass is not
        // affected
        var mySuper = this.getSuperClass();
        if (mySuper) {
            var superDefaults = mySuper._getDefaults(defaultsName);
            if (superDefaults != null && superDefaults == defaults) {
                //this.logWarn("copying defaults for property: " + defaultsName +
                //             " on class: " + this);
                defaults = isc.addProperties({}, defaults);
                mustAssign = true;
            }
        }
         
        // if defaults don't exist, create an empty object for them
        if (defaults == null) {
            defaults = newDefaults || {};
            mustAssign = true;
        } else {
            // otherwise add the specified defaults to the existing defaults
            isc.addProperties(defaults, newDefaults);
        }

        // if we created a new defaults object (because there were no existing defaults, or we
        // had to duplicate a superclass' defaults) override the slot on this class
        if (mustAssign) {
            //this.logWarn("had to assign when overriding property: " + defaultsName + 
            //             " on class: " + this);
            var props = {};
            props[defaultsName] = defaults;
            this.addProperties(props);
        }
    },
    
    _getDefaults : function (defaultsName) {
        var deferredDefaults = this._deferredDefaults[this.Class],
            defaults = this.getInstanceProperty(defaultsName) || 
                        (deferredDefaults ? deferredDefaults[defaultsName] : null);
        return defaults;
    },
    
    // backcompat: briefly exposed as visibility external in 5.5 beta builds
    replaceDefaults : function (defaultsName, newDefaults) {
        this.changeDefaults(defaultsName, newDefaults);
    },

	//>	@classMethod Class.setProperties()
	//	Apply a set of properties to a class object, calling the appropriate setter class methods if
    //	any are found.
	//
	//	@param	[arguments 0-N] (object)	objects with properties to add (think named parameters).
	//										all the properties of each argument will be applied one after another
	//										so later properties will override
    //	@visibility external
	//<
	setProperties : function () {

        var propertyBlock;

        // If passed multiple arguments, combine them down to a single object.
        // (Step required as setProperties() on this instance prototype doesn't take an array,
        // and we don't know how many arguments we have).
        if (arguments.length == 1) {
            propertyBlock = arguments[0];
        } else {
            propertyBlock = {};
                
            for (var i = 0; i < arguments.length; i++) {
                isc.addProperties(propertyBlock, arguments[i]);
            }
        }        
        
        // set properties on the instance prototype
        this._instancePrototype.setProperties(propertyBlock);
	},

	//>	@classMethod Class.isOverridden()
	//	Determine whether we've overridden a specified class property or method from our superClass
	//
	//	@param	property    (string)	property to check
    //    
    //  @return             (boolean)   true if the property has been overridden
	//<
    isOverridden : function (property) {
        // XXX Note - need another function to check for a class overriding the properties of the 
        // instance prototype
        return (!(this[property] === this._superClass[property]));
    },

    //> @classMethod Class.isA()
    //
    // Returns whether this class object is the provided class or is a subclass of the provided
    // class, or implements the provided interface.
    //
    // @param  className (string)        Class name to test against
    //
    // @return           (boolean)       true == this Class is a subclass of the provided classname
	// @visibility external
    //<
    isA : function (className) {
        if (className == null) return false;

        // handle being passed Class Objects and instances of classes
        if (!isc.isA.String(className)) {
            className = className.Class;
            if (!isc.isA.String(className)) return false;
        }

        if (isc.startsWith(className, isc.ClassFactory._$iscPrefix)) {
            className = className.substring(4);
        }
        // walk the class object inheritance chain
        var superClass = this;
        while (superClass) {
            if (superClass.Class == className) return true;
            superClass = superClass._superClass;
        }

        // walk the interface inheritance chain
        if (this._implements) {
            for (var i = 0; i < this._implements.length; i++) {
                var superInterface = isc.ClassFactory.getClass(this._implements[i]);
                while (superInterface) {
                    if (superInterface.Class == className) return true;
                    superInterface = superInterface._superClass;
                }
            }
        }

        return false;
    },

    _getNextImplementingSuper : function (methodCallingSuper, superClassProto, methodName,
                                          staticSuper) 
    {
        var superClassImpl;
		for (;;) {
            if (superClassProto == null) {
                // no superclass provides a differing implementation - error
                superClassImpl = null;
                break;
            }

            
            var superClassImpl = isc.Class._getOriginalMethod(methodName, superClassProto);

            // function is not defined in any superclass further up the chain - error
            if (superClassImpl == null) break;

            // found a superclass implementation that differs - success!
            if (methodCallingSuper != superClassImpl) {
                //this.logWarn("found differing superClass implementation: " +
                //             this.echoLeaf(superClassImpl) +    
                //             " on prototype: " + superClassProto);
                break; 
            }

			// go up the chain to the prototype of the superClass
            if (staticSuper) {
    			superClassProto = superClassProto._superClass;
            } else {
    			superClassProto = superClassProto._classObject._superClass._instancePrototype;
            }
		}
        if (superClassImpl != null) return superClassProto;
        return null;
    },

	//>	@classMethod Class.Super()
	//
	//	Call the SuperClass implementation of a class method.
	//
	//	@param methodName   (string)	name of the superclass method to call
	//	@param args         (arguments or Array) native "arguments" object, or array of
    //                                           arguments to pass to the Super call
	//	@param [nativeArgs] (arguments) native "arguments" object, required if an Array is
    //                                  passed for the "args" parameter in lieu of the native
    //                                  arguments object
	//
	//	@return					(any)		return value of the superclass call
	//
	// @visibility external
	//<
	//	@param 	[nativeArguments] (Arguments) native "arguments" object.  Required only if
    //                                        calling Super() with a substitute set of
    //                                        arguments
    
	Super : function (methodName, args, nativeArguments) {
        if (isc._traceMarkers) arguments.__this = this;

        // see Class.duplicateMethods() - Super is dup'd once at init, then dup'd on the fly
        // each time it's called so that recursive super calls on the same instance can be
        // traced through
        if (this.autoDupMethods && isc.isAn.Instance(this)) {
            this.duplicateMethod("Super");
        }
    
        // if args is clearly not an Array or Arguments object, make it an Array.  NOTE: you
        // can still fool us by passing an object with a .length property which is neither an
        // Array or Arguments object - to avoid this we'd have to be able to reliably
        // cross-platform tell the difference between an Arguments object and a normal Object.
        // The simplest way to do this would probably be to check the callee property, which is
        // very unlikely to be set to a function on some random object being passed as params.
        if (args != null && (args.length == null || isc.isA.String(args))) args = [args];

        if (args == null) args = isc._emptyArray;

        
        this._nativeArguments = nativeArguments || args;
        this._argsToSuper = args;
        //if (nativeArguments == null && nativeArguments != false && args && args.constructor && 
        //    args.constructor.nativeType == 2) 
        //{
        //    this.logWarn("substitute arguments passed, but native arguments object " +
        //                 "not passed as third parameter");
        //}

		// overall plan: look through the inheritance chain for a method that differs from the
        // implementation in this instance, and call that

        // get the prototype for the last method of this name that called Super().  Null for
        // the first call to Super 
        this._lastProto = isc.Class._getLastProto(methodName, this);
        // set flag to tell invokeSuper it's being called by external Super and needs to pick
        // up extra arguments from instance flags
        this._externalSuper = true;
    
        return this.invokeSuper(null, methodName);
    },

    
    _delayedSuper : function (methodName, args, nativeArguments, delay, delayUnits) {
        if (args != null && (args.length == null || isc.isA.String(args))) args = [args];

        if (args == null) args = isc._emptyArray;

        nativeArguments = nativeArguments || args;
        var argsToSuper = args;
        var lastProto = isc.Class._getLastProto(methodName, this);

        var self = this;
        return isc.Timer.setTimeout(function () {
            if (isc._traceMarkers) arguments.__this = self;

            if (self.autoDupMethods && isc.isAn.Instance(self)) {
                self.duplicateMethod("Super");
            }

            self._nativeArguments = nativeArguments;
            self._argsToSuper = argsToSuper;
            self._lastProto = lastProto;
            self._externalSuper = true;

            self.invokeSuper(null, methodName);
        }, delay, delayUnits);
    },

    // observation and timers may replace a function with a generated function, storing the
    // original function in another slot.  We need to find the original function because
    // otherwise, when we look up the superclass chain to find a differing implementation, we'd
    // be using the auto-generated function, and so think all superclasses had differing
    // implementations.
    // Note that both observation and timing indirects can be installed on classes as well as
    // instances.
    _getOriginalMethod : function (methodName, theProto) {
        var method = theProto[methodName];

        while (method != null && method._origMethodSlot) {
            //this.logWarn("indirect installed on: " + theProto + ": " + this.echoLeaf(method));
            method = theProto[method._origMethodSlot];
        }

        
        if (method != null && method._originalMethod != null) method = method._originalMethod;

        return method;
    },

    // high speed implementation of Super used by internal callers, where the class and method
    // of the calling function are directly passed in.  Calls to external Super can be freely
    // mixed with calls to invokeSuper because they store the same state.
    //
    // Extremely critical path code sometimes calls Super like so:
    //    isc.StatefulCanvas._instancePrototype.initWidget.call(this);
    // This is safe only if there are no calls to external Super() in any superclass
    // implementations.  If there are, with the lack of any stored lastProto, inter-recursion
    // will be falsely detected and the leaf implementation will be called.
    invokeSuper : function (clazz, methodName, a,b,c,d,e,f,g,h) {

        if (this.autoDupMethods && isc.isAn.Instance(this)) {
            this.duplicateMethod("invokeSuper");
        }

        // static mode (class methods calling Super)
        var staticSuper = this._isClassObject;

        
        var externalSuper = this._externalSuper;
        this._externalSuper = null;
        var nativeArguments = this._nativeArguments;
        this._nativeArguments = null;
        var argsToSuper = this._argsToSuper;
        this._argsToSuper = null;

        
        var lastProto;
        if (externalSuper) {
            lastProto = this._lastProto;
            this._lastProto == null;
        } else {
            // for framework code calling invokeSuper, null indicates instance override
            if (clazz != null) {
                // in static mode, protos are class objects
                lastProto = staticSuper ? clazz : clazz._instancePrototype;
            }
        }

        // figure out the method that is calling Super in order to compare the implementation
        // against superclass implementation to find out when a superclass implementation differs
        var methodCallingSuper, nextProto;
        if (lastProto == null) {
            
            methodCallingSuper = isc.Class._getOriginalMethod(methodName, this);

            // in static mode, there's no such thing as an instance override
            nextProto = staticSuper ? this : this.getPrototype();
            //if (methodName == "draw") {
            //    this.logWarn("new Super call, method calling super: " +
            //                 this.echoLeaf(methodCallingSuper));
            //}
        } else {
            
            methodCallingSuper = isc.Class._getOriginalMethod(methodName, lastProto);

            if (staticSuper) {
                // static mode - get superclass classObject 
                nextProto = lastProto._superClass; 
            } else {
                // instance mode - get superclass instancePrototype
                nextProto = lastProto._classObject._superClass._instancePrototype;
            }

            
            if (nativeArguments && nativeArguments.callee != null && 
                nativeArguments.callee != methodCallingSuper) 
            {
                //this.logWarn("recursion detected: to continue current super chain caller" +
                //             " should be: " + this.echoLeaf(methodCallingSuper) + 
                //             " but caller is: " + this.echoLeaf(nativeArguments.callee));
                methodCallingSuper = isc.Class._getOriginalMethod(methodName, this);
                nextProto = staticSuper ? this : this.getPrototype();
            }
        }

        // count all calls to externalSuper
        //if (externalSuper) {
        //    var callCounts = isc._superCallCount = isc._superCallCount || [],
        //        fullName = isc.Func.getName(methodCallingSuper);
        //
        //    var record = callCounts.find("fullName", fullName);
        //    if (record) record.callCount++;
        //    else callCounts.add({fullName:fullName, callCount:1});
        //}

        //this.logWarn("methodCallingSuper: " + this.echoLeaf(methodCallingSuper) +
        //             ", lastProto: " + lastProto +
        //             ", nextProto: " + nextProto);

        // find the next superclass implementation
        nextProto = isc.Class._getNextImplementingSuper(methodCallingSuper, nextProto,
                                                        methodName, staticSuper);

        if (nextProto == null) {
            // failed to find a superclass implementation
            if (isc.Log) isc.Log.logWarn("Call to Super for method: " + methodName + 
                                         " failed on: " + this + 
                                         ": couldn't find a superclass implementation of : " +
                                         (lastProto ? lastProto.Class : this.Class) + 
                                         "." + methodName +
                                         this.getStackTrace());
            return null;
        }

        // we found a superclass implementation
        var superClassImpl = nextProto[methodName];

        //if (methodName == "draw") {
        //    this.logWarn("about to call: " + this.echoLeaf(superClassImpl) +    
        //                 ", call chain: " + superCallChains);
        //}

        
        isc.Class._addProto(methodName, nextProto, this);

        // NOTE: it's normal that we're invoke an indirect (an observation or timer for
        // instance), which will invoke the original method for us - it's just when comparing
        // methods that we have to avoid using the indirects
        //if (superClassImpl._origMethodSlot) {
        //    this.logWarn("invoking indirect: " + this.echoLeaf(superClassImpl) +
        //                 " found on prototype: " + nextProto);
        //}

		// call the superclass implementation on "this"
        var returnVal;
        if (externalSuper) {
            // for external callers, use apply() in order to preserve arguments.length just in
            // case external code contains a function that uses arguments.length and gets
            // called as Super
            if (argsToSuper != null || nativeArguments != null) {
                returnVal = superClassImpl.apply(this, argsToSuper == null ? 
                                                       nativeArguments : argsToSuper);
            } else {
                returnVal = superClassImpl.apply(this);
            }
        } else {
            returnVal = superClassImpl.call(this, a,b,c,d,e,f,g,h);
        }

        isc.Class._clearLastProto(methodName, this);

		// and return the value returned from the apply
		return returnVal;
	},

    _getLastProto : function (methodName, obj) {
        var superCalls = obj._superCalls,
            protoList = superCalls == null ? null : superCalls[methodName];

        //this.logWarn("for method: " + methodName + " chain is: " + protoList);

        if (isc.isAn.Array(protoList)) return protoList.last();
        return protoList;
    },

    _clearLastProto : function (methodName, obj) {
        var superCalls = obj._superCalls,
            protoList = superCalls[methodName];
        if (protoList == null) {
            
            return;
        }
        // clear single item
        if (!protoList.__isArray) {
            
            superCalls[methodName] = null;
        } else {
            // shorten array, then remove if zero length
            protoList.length = Math.max(0, protoList.length-1);
            if (protoList.length == 0) superCalls[methodName] = null;
        }
    },

    _addProto : function (methodName, newProto, obj) {
        var superCalls = obj._superCalls = obj._superCalls || {},
            protoList = superCalls[methodName];
        if (protoList == null) {
            superCalls[methodName] = newProto;
        } else {
            if (isc.isAn.Array(protoList)) protoList.add(newProto);
            else {
                superCalls[methodName] = [protoList, newProto];
                
                superCalls[methodName].__isArray = true;
            }
        }
    },

	//>	@classMethod Class.map()
	//
    // Call <code>method</code> on each item in <code>argsList</code> and return the Array of results.
    //
	//	@param	methodName (string)	
    //      Name of the method on this instance which should be called on each element of the Array
	//	@param	items      (Array)	
    //      Array of items to call the method on 
    //
	//	@return            (Array) Array of results, one per element in the passed "items" Array
	// @visibility external
    //<
    map : function (methodName, items, arg1, arg2, arg3, arg4, arg5) {
        if (methodName == null) return items;
        var results = [];
        for (var i = 0; i < items.length; i++) {
            results.add(this[methodName](items[i], arg1, arg2, arg3, arg4, arg5));
        }
        return results;
    },
    
	//>	@classMethod Class.getInstanceProperty()
	//
	//	Gets a named property from the instance defaults for this object.
	//
	//	@param property	(string)	name of the property to return
	// @visibility external
	//<
	getInstanceProperty : function (property) {
        var value = this._instancePrototype[property];
        
		return value;
	},

	//>	@classMethod Class.setInstanceProperty()
	//
	//	Sets a named property from the instance defaults for this object.
	//
	//	@param property	(string)	name of the property to return
	//	@param value	(any)		value to set to
	// @visibility external
	//<
	setInstanceProperty : function (property, value) {
		this._instancePrototype[property] = value;
	},

    getArgString : function (methodName) {
        // check for a string method definition
        var argString = this._stringMethodRegistry[methodName];
        var undef;
        if (argString !== undef) return argString || isc.emptyString;

        // get the arguments from the method definition (very very slow!)
        var method = this.getInstanceProperty(methodName);
        //if (method == null || !isc.isA.Function(method)) return "";
        if (method == null) return "";
        return isc.Func.getArgString(method);
    },
    
    // Callbacks and eval()ing
    // ---------------------------------------------------------------------------------------

    //> @type Callback
    // A <code>Callback</code> is an arbitrary action to be fired - usually passed into a 
    // method to be fired asynchronously as a notificaction of some event.<br>
    // The <code>callback</code> can be defined in the following formats:<ul>
    // <li>a function</li>
    // <li>A string containing an expression to evaluate</li>
    // <li>An object with the following properties:<br>
    //     - target: fire in the scope of this target - when the action fires,
    //       the target will be available as <code>this</code>.<br>
    //     - methodName: if specified we'll check for a method on the target object with this 
    //       name.<br>
    //  </li></ul>
    // <code>Callbacks</code> are fired via the +link{classMethod:Class.fireCallback()} method, which allows
    // named parameters to be passed into the callback at runtime. If the Callback was specified
    // as a string of script, these parameters are available as local variables at eval time.<br>
    // For specific SmartClient methods that make use of <code>Callback</code> objects, see
    // local documentation for information on parameters and scope.
    // @visibility external
    //<
    
    
    //>	@classMethod	Class.fireCallback()
	//
    // Fire some arbitrary action specified as a +link{type:Callback}.
    // Returns the value returned by the action.
    // 
	// @param callback (Callback) Action to fire.
    // @param [argNames] (string) Comma separated string of variable names. If the callback
    //                            passed in was a string of script, any arguments passed to the
    //                            callback will be available as local variables with these names.
    // @param [args] (array)    Array of arguments to pass to the method. Note that the number 
    //                          of arguments should match the number of argNames.
    // @param [target] (object) If specified the callback will be evaluated in the scope of this
    //                          object - the <code>this</code> keyword will be a pointer to this
    //                          target when the callback is fired.
    // @return (any)   returns the value returned by the callback method passed in.    
    // @visibility external
    //<
        
    fireCallback : function (callback, argNames, args, target, catchErrors) {
        arguments.__this = this;
        if (callback == null) return;
        
        
        var undef;
        if (argNames == null) argNames = undef;
        
        var method = callback;
        if (isc.isA.String(callback)) {
            // callback specified as the name of a method on a known target
            if (target != null && isc.isA.Function(target[callback])) method = target[callback];
            // callback is a String expression
            else method = this._makeCallbackFunction(callback, argNames);

        } else if (isc.isAn.Object(callback) && !isc.isA.Function(callback)) {
            // Object containing (possibly) target, and either methodName or action to fire

            if (callback.caller != null) target = callback.caller;
            else if (callback.target != null) target = callback.target;

            // Pick up arguments from the callback directly, if passed that way.
            if (callback.args) args = callback.args;
            if (callback.argNames) argNames = callback.argNames;
            
            if (callback.method) method = callback.method;

            
            else if (callback.methodName && target != null) method = target[callback.methodName];
            else if (callback.action) 
                method = this._makeCallbackFunction(callback.action, argNames);
        }

        // At this point the target (if one was passed in) is available under 'target', and
        // we've converted the callback to a function, if possible.
        if (!isc.isA.Function(method)) {
            this.logWarn("fireCallback() unable to convert callback: " + this.echo(callback) + 
                         " to a function.  target: " + target + ", argNames: " + argNames + 
                         ", args: " + args);
            return;
        }

        // If no target was specified, fire it in the global scope
        
        if (target == null) target = window;
        // If the target has been destroyed, abort!
        else if (target.destroyed) {    
            // NOTE: this isn't a warning scenario: destruction is normal, and callbacks are
            // commonly timers to do visual refreshes which don't matter if a component is
            // destroyed
            if (this.logIsInfoEnabled("callbacks")) {
                this.logInfo("aborting attempt to fire callback on destroyed target:"+ target + 
                             ". Callback:"+ isc.Log.echo(callback) +
                              ",\n stack:" + this.getStackTrace());
            }
            return;
        }

        // this causes anonymous callback functions to be labelled "callback" in stack traces.
        // Non-anonymous callbacks still show their usual name
        method._isCallback = true;

        if (args == null) args = [];

        
        
        if (isc.enableCrossWindowCallbacks && isc.Browser.isIE) {
            var targetWindow = target.constructor ? target.constructor._window : target;
            if (targetWindow && targetWindow != window && targetWindow.isc) {  
                var newArgs = targetWindow.Array.newInstance();
                for (var i = 0; i < args.length; i++) newArgs[i] = args[i];
                args = newArgs;
            }
        }

        var returnVal;
        
        if (!catchErrors || isc.Log.supportsOnError) {
            returnVal = method.apply(target, args);             
        } else {
            try {
                returnVal = method.apply(target, args);
            } catch (e) {
                isc.Log._reportJSError(e);
                
                throw e;;
            }
        }
        
        return returnVal;
    },        

    //> @classMethod Class.delayCall()
    //  This is a helper to delay a call to a method on some target by a specified
    //  amount of time.  Can be used to delay a call to a static method on this class by 
    //  omitting the <code>target</code> parameter.
    // @param methodName (string) name of the method to call
    // @param [arrayArgs] (array) array of arguments to pass to the method in question
    // @param [time] (number) Number of ms to delay the call by - defaults to zero (so just pulls
    //                        execution of the method out of the current execution thread.
    // @param [target] (object) Target to fire the method on - if unspecified assume this is
    //                          a call to a classMethod on this Class.
    // @return (string) Timer ID for the delayed call - can be passed to 
    //                      +link{Timer.clear()} to cancel the call before it executes
    // @visibility external
    //<
    delayCall : function (methodName, arrayArgs, time, target) {            
        if (target == null) target = this;
        if (time == null) time = 0;

        return isc.Timer.setTimeout({target:target, methodName:methodName, args:arrayArgs}, time);
    },


    _makeCallbackFunction : function (callback, argNames) {
        
         
        //return isc.Func.expressionToFunction(argNames, callback);
        
        if (argNames == null) { 
            var undef;
            argNames = undef;
        }
        var func = isc._makeFunction(argNames, callback);
        func._showBodyInTrace = true;
        return func;
    },
    
    // Fire on Pause
    // ---------------------------------------------------------------------------------------
 
    //> @classMethod Class.fireOnPause()
    // Given some repeatedly performed event (EG keypress, scroll, etc), set up an action
    // to fire when the events have stopped occurring for some set period.
    // @param id (string) arbitrary identifier for the action
    // @param callback (callback) action to fire on quiescence
    // @param [delay] (number) delay in ms - defaults to 200ms
    // @param [target] (object) if passed, the callback will be fired in this target's scope
    //<
    // additional instanceID parameter passed from instance method to support instance-level IDs
    fireOnPauseDelay:200,
    _$_fireActionsOnPause:"_fireActionsOnPause",
    _actionsOnPause:{},
    _actionOnPauseTimers:{},
    fireOnPause : function (id, callback, delay, target, instanceID) {

        if (!id) return;
        if (!delay) delay = this.fireOnPauseDelay;
        

        // Note: If we have two separate instances calling the fireOnPause instance method with
        // the same ID, both actions need to fire -- the ID is essentially unique within the
        // instance only.
        // We use the instanceID parameter to create separate callbacks for the same ID used
        // on different instances.
        // If unset, default to this.getClassName() [not legal to have any instance with the
        // same ID as a SmartClient class].
        if (instanceID == null) instanceID = this.getClassName();
        
        if (!this._actionsOnPause[id]) {
            this._actionsOnPause[id] = {};
        }

        this._actionsOnPause[id][instanceID] = 
            {fireTime:delay, callback:callback, target:target};
        
        var stamp = isc.timeStamp(),
            elapsed = this._lastFireOnPause ? stamp - this._lastFireOnPause : null;
        this._lastFireOnPause = stamp;

        // If we're going to fire queue of actions before the delay passed in, we're done
        // Check for this._fireActionsOnPauseRunning -- if a callback from an existing
        // 'fireOnPause' sets up a new 'fireOnPause' we need to set a timer to execute it
        // as a separate flow.
        if (!this._fireActionsOnPauseRunning && 
            elapsed && this._fireOnPauseDelay != null && 
            delay >= (this._fireOnPauseDelay - elapsed)) 
        {
            return;
        }        
        if (this._fireOnPauseTimer) isc.Timer.clearTimeout(this._fireOnPauseTimer);
        this._fireOnPauseTimer = this.delayCall(this._$_fireActionsOnPause,null, delay);
        
        this._fireOnPauseDelay = delay;
    },
    
    _fireActionsOnPause : function () {
        this._fireActionsOnPauseRunning = true;
        var fireAgainTime;
        // In theory this._fireOnPausedDelay ms have elapsed since the call to fireOnPause
        // (or the last call to this method).
        // In practice it's probably more accurate to check the elapsed time by comparing
        // timestamps
        var elapsed = isc.timeStamp() - this._lastFireOnPause,
            fireAgainTime;
        for (var id in this._actionsOnPause) {
            var actions = this._actionsOnPause[id];
            // Get the timer-id's now so if any callback sets up a new fireOnPause
            // and changes the 'actions' object we won't worry about it as part of this flow
            var iids = isc.getKeys(actions);
            for (var i = 0; i < iids.length; i++) {
                var iid = iids[i];
                var action = actions[iid];           
                if (action.fireTime <= elapsed) {
                    // Wipe the action off the actions object before firing the callback
                    // in case the callback sets up a new fireOnPause with the same ID.
                    delete this._actionsOnPause[id][iid];
                    this.fireCallback(action.callback, null, null, action.target);
                } else {
                    action.fireTime -= elapsed;
                    if (fireAgainTime == null) fireAgainTime = action.fireTime;
                    else fireAgainTime = Math.min(fireAgainTime, action.fireTime);
                }
            }
            if (isc.isAn.emptyObject(this._actionsOnPause[id])) delete this._actionsOnPause[id];
        }
        if (fireAgainTime != null) {
            this._fireOnPauseDelay = fireAgainTime;
            this._lastFireOnPause = isc.timeStamp();
            this.delayCall(this._$_fireActionsOnPause, null, fireAgainTime);
        } else {
            this._fireOnPauseDelay = null;
            this._lastFireOnPause = null;
        }
        this._fireActionsOnPauseRunning = null;

    },

    // Eval() wrappers including globals capture
    // ---------------------------------------------------------------------------------------

    //>	@classMethod	Class.evalWithVars()
	//
    // Evaluates the given string with an arbitrary number of arguments on the specified target.
    // evalVars and target are optional.
    // 
    // @param   evalString  the string to evaluate
    // @param   evalVars    Map of key-value pairs.  The keys are treated as argument names that are
    //                      then made available inside the eval body as variables.  The values of
    //                      these variables are the values assigned to the keys in evalVars.
    // @param   target      the target on which to apply the eval - it will be available as the
    //                      'this' variable inside the eval block.  If not specified, the evalString
    //                      is evaluated in global context.
    // @return  (any)       returns the result of eval(evalString)
    //<
    useFastEvalWithVars : isc.Browser.isMoz && isc.Browser.geckoVersion >= 20061010,
    evalWithVars : function (evalString, evalVars, target) {
        //!OBFUSCATEOK
        // if no target specified, eval in global scope
        if (!target) target = window;
    
        
        if (this.useFastEvalWithVars) {
            return this.evaluate.call(target, evalString, evalVars);
        }

        // create two arrays of the keys and values of the evalVars map
        var evalStringVarName = "_1";
        // Ensure that we don't step on any of the vars passed in in the evalVars object
        while (evalVars && isc.propertyDefined(evalVars, evalStringVarName)) {
            evalStringVarName += "1"
        }
        var argNames = [evalStringVarName];
        var argValues = [evalString];
        if (evalVars) {
            for (var argName in evalVars) {
                argNames.push(argName);
                argValues.push(evalVars[argName]);
            }
        }
        
        // make a function with argNames as arguments that evals evalString
        
        var theFunc = isc._makeFunction(argNames.join(","), 
                                        "return eval(" + evalStringVarName + ")");

        // call the function on the target
        return theFunc.apply(target, argValues);
    },

    // calls evalWithVars(jsSrc, evalVars, target), and returns all globals created via
    // addGlobalID().  All other non-explicit globals are captured by the function body that's
    // created around the jsSrc.
    evalWithCapture : function (jsSrc, evalVars, target) {
        var globals = isc.globalsSnapshot = [];
        //
        // we need to create a function with the jsSrc as the body to avoid creating extraneous
        // globals - conveniently evalWithVars already does this for us.
        this.evalWithVars(jsSrc, evalVars, target);
        isc.globalsSnapshot = null;
        return globals;
    },

    // takes a list of global IDs and destroys them
    destroyGlobals : function (globals) {
        if (!isc.isAn.Array(globals)) globals = [globals];

        for (var i = 0; i < globals.length; i++) {
            var global = globals[i];
    
            // call destroy() on the gloabl if it's defined
            if (window[global] && isc.isA.Function(window[global].destroy)) window[global].destroy();
            else window[global] = null; // otherwise just null out the global ref
        }
    },

    // Provides 'true' global eval - i.e. global vars actually stick to the window object when
    // eval'd in this manner vs a plain eval() which does not do that.  
    //
    // Note: the eval logic here (separate approaches to actually perform the eval per browser)
    // duplicates FileLoader.delayedEval() - if you change this code, be sure to update that 
    // method.
    // reportErrors optional param defaults to true
    globalEvalWithCapture : function (evalString, callback, evalVars, reportErrors) {
        if (reportErrors == null) reportErrors = true;
        //!OBFUSCATEOK 

        // store these on these object - really for Safari's benefit, since it's the only one
        // requiring async execution.  This makes the Safari case below easier.
        this._globalEvalVars = evalVars;
        this._globalEvalCallback = callback;

		
        /*if ((isc.Browser.isSafari && isc.Browser.safariVersion<533.16) || (isc.Browser.isChrome && isc.Browser.safariVersion<537.4)) {
            
			evalString = "isc.Class._globalEvalWithCaptureStart();try {\n"
                         + "eval(" + evalString.asSource() + 
                            ");\n} catch (e) { window._evalError = e; }\n"
                         +"isc.Class._globalEvalWithCaptureEnd(" 
                         +"window._evalError," + !!reportErrors + ");";
            window.setTimeout(evalString,0);
            return;
        }*/

        this._globalEvalWithCaptureStart();

        // If an error occurs during eval, capture it and pass it to the completion block to be
        // provided to the user callback.  
        var error;
        try {
            if (isc.Browser.isIE) {
                // Special IE only function that exports to global scope - can also be used to
                // execute VBScript code - no other mechanism is known to work
                window.execScript(evalString, "javascript");
            } else {          
                // pass in the 'globalScope' parameter so any defined vars get retained in global
                // scope after the eval
                isc.Class.evaluate(evalString, null, true);
            }
        } catch (e) {
            // If we have been asked to report errors, do so - also hang onto the error so
            // the callback can make use of it if necessary
            if (reportErrors) isc.Log._reportJSError(e, null, null, null, 
                                                     "Problem during global eval()");
            error = e;
        }

        return this._globalEvalWithCaptureEnd(error);
    },

    _globalEvalWithCaptureStart : function (evalVars, keepGlobals) {
        // evalVars must go onto the window object - make sure we don't overwrite existing
        // values by holding on to any conflicting refs so we can restore later
        var undef, evalVars = this._globalEvalVars;
        this._restoreGlobals = {};
        if (evalVars) {
            for (var evalVar in evalVars) {
                var globalValue = window[evalVar];
                // need to be careful to preserve nulls, zeroes - so check that the value is
                // actually undefined.
                if (globalValue !== undef) this._restoreGlobals[evalVar] = globalValue;
                window[evalVar] = evalVars[evalVar];
            }
        }

        // start globals capture.  See globalEvalAndRestore for 'keepGlobals' purpose
        isc.globalsSnapshot = isc.keepGlobals ? {} : [];
    },

    _globalEvalWithCaptureEnd : function (error, reportErrors) {
        //!OBFUSCATEOK 
        if (error != null && reportErrors) isc.Log._reportJSError(error, null, null, null, 
                                                 "Problem during global eval()");
        // restore any conflicting globals and undefine any evalVars we set on the window object
        var undef, evalVars = this._globalEvalVars;
        if (evalVars) {
            for (var evalVar in evalVars) {
                var globalValue = this._restoreGlobals[evalVar];
                if (globalValue !== undef) window[evalVar] = this._restoreGlobals[evalVar];
                else window[evalVar] = undef; // can't delete window[evalVar] in IE!
            }
        }
        var callback = this._globalEvalCallback;
        var globals = isc.globalsSnapshot;        

        isc.globalsSnapshot = this._globalEvalCallback = this._globalEvalVars =
            this._restoreGlobals = window._evalError = null;
        this.fireCallback(callback, "globals,error", [globals, error]);

        return {globals: globals, error: error}
    },

    // eval code in the global scope, where only the listed IDs are allowed to become global.
    // Other widgets obtain a global ID only for the duration of the eval(), then become no
    // longer global.  
    // 
    // This allows widgets that interlink by global ID (eg layout.members) to find each other,
    // specifically, any inter-reference that is resolved either directly when the code eval()s
    // or by the time init()/initWidget() completes will work.
    //
    // Any code that tries to resolve an ID reference sometime after init, or stores the global
    // ID of a component during init (rather than a live reference) won't work with
    // globalEvalAndRestore().
    //
    // globalEvalAndRestore() does not prevent DataSources from registering such that they are
    // available from DataSource.get(), so in effect, all DataSources behave as if
    // dataSource.addGlobalId were false.
    // 
    // Likewise globalEvalAndRestore() does not prevent other global registrations not related
    // to global IDs, such as SimpleType registration or WSDL / XML schema registrations by
    // namespace.
    
    globalEvalAndRestore : function (evalString, keepGlobals, callback, evalVars, reportErrors, updateLocalIds)
    {
        if (keepGlobals == null) keepGlobals = [];
        isc.keepGlobals = keepGlobals;

        return this.globalEvalWithCapture(evalString, function (globals, error) {

            isc.keepGlobals = null;

            
            var suppressedGlobals = {},
                topLevel = isc.Canvas._getTopLevelWidget(globals);

            // restore all captured globals to their original values, except the keepGlobals
            for (var globalId in globals) {
                if (keepGlobals.contains(globalId)) continue;

                // save the object temporarily ocuppied this global id, so we can pass it later
                // to the callback
                suppressedGlobals[globalId] = window[globalId];

                if (updateLocalIds) {
                    var obj = window[globalId];

                    if (obj && isc.isA.Canvas(obj)) {

                        if (topLevel) {
                            if (!topLevel._localIds) {
                                topLevel._localIds = {};
                            }
                            topLevel._localIds[globalId] = obj;
                            obj.setProperty("_screen", topLevel);
                        } else {
                            // Could happen in case of potential error in evaluated code. For
                            // example if topElement or masterElement was explicitely defined
                            // for object that otherwise should be topLevel object or overridden
                            // Canvas class were used which sets topElement or masterElement
                            // property during init method.
                            if (obj.topElement || obj.masterElement) {
                                isc.logWarn("Cannot find top level of " + obj);
                            }
                        }
                    }
                }

                window[globalId] = globals[globalId];
            }

            isc.Class.fireCallback(callback, "globals,error,suppressedGlobals",
                                   [globals, error, suppressedGlobals]);

        }, evalVars, reportErrors);
    },

    // ---------------------------------------------------------------------------------------

    // _notifyFunctionComplete
    // Static method called when the notification function for some observed method completes.
    _notifyFunctionComplete : function (object, methodName, queue) {
        // Decrement the 'notifyStack' flag.
        // This flag tracks whether the observed function is currently being run.  We implement
        // this as a number indicating the depth of stacked calls to this method.
        
        queue._notifyStack -= 1;
        // if the notifyStack is greater than zero the top level notificationFunction hasn't
        // yet exited, so don't proceed to modify observers.
        if (queue._notifyStack) return;

        for (var i = 0; i < queue.length; i++) {
            var q = queue[i];
            // Clear any items that were 'ignored' while the notification function was running
            if (q._removedWhileNotificationRunning) {
                queue.removeItem(i);
                i--;
                continue;
            }

            // Clear any temp flags denoting observations set up while the notification function
            // was firing.
            if (q._addedWhileNotificationRunning) {
                delete q._addedWhileNotificationRunning;
            }
        }
    },

    // Arrays of definitions (TabBar tabs, Layout members, SectionStack sections, Wizard pages..)
    // ---------------------------------------------------------------------------------------
    _$ID : "ID",
    getArrayItem : function (id, array, idProperty) {
        if (array == null) return null;

        

        // Number: assume index.  
        if (isc.isA.Number(id)) return array[id];

        // Object: return unchanged
        if (isc.isAn.Object(id)) return id;

        // String: assume id property of section descriptor object
        if (isc.isA.String(id)) return array.find(idProperty || this._$ID, id);


        // otherwise invalid
        return null;
    },

    getArrayItemIndex : function (id, array, idProperty) {
        if (isc.isA.Number(id)) return id;

        var item = isc.Class.getArrayItem(id, array, idProperty);
        
        return array.indexOf(item);
    },
 
    // Getting DOM objects (going through these APIs makes cross-frame installation possible)   
    // ---------------------------------------------------------------------------------------
    
    getWindow : (
        isc.Browser.isSafari ? function () {
            return window; 
        } : function () {
            return this.ns._window;
        }
    ),
    getDocument : (
        isc.Browser.isSafari ? function () {
            return window.document;
        } : function () {
            return this.ns._document;
        }
    ),
    
    
    getDocumentBody : function (suppressDocElement) { 
        var getDocElement = (!suppressDocElement && isc.Browser.isIE && isc.Browser.isStrict);
        var body = (getDocElement ? this.ns._documentElement : this.ns._documentBody);
        if (body != null) return body;

        var doc = this.getDocument();
        if (getDocElement) {
            this.ns._documentElement = doc.documentElement;
            return this.ns._documentElement;
        }
        
        if (isc.Browser.isIE) {
            body = doc.body;
        } else {
            if (doc.body != null) body = doc.body;
            else {
                // XHTML: body not available via document.body (at least in FF 1.5)
                // Using the documentElement namespace future proofs us against future XHTML
                // versions
                var documentNS = doc.documentElement.namespaceURI;
                body = doc.getElementsByTagNameNS(documentNS, "body")[0];
                if (body == null) {
                    // XHTML: body not available via getElementsByTagNameNS() before page load
                    // in FF 1.5 (possibly others), but is available via DOM navigation
                    body = doc.documentElement.childNodes[1];
                    if (body != null && body.tagName != "body") body = null;
                }
                //this.logWarn("fetching body element: " + body);
                // don't cache failure to retrieve body, it should be available later until the
                // document is completely hosed
                if (!body) return null;
            }
        }
        this.ns._documentBody = body;
        return body;
    },
    getActiveElement : function () {
        
        try {
            return this.getDocument().activeElement;
        } catch (e) {
            this.logWarn("error accessing activeElement: " + e.message);
        }
        return null;
    },

    //> @classMethod class._makeNotifyFunction() (A)
    // Make a function to call the original method, then each recipient in turn.
    // @param methodName (string) name of the method to observe
    // @return (function) new function to call when method is fired
    // @group observation
    //<
    _actionRunnerCache: {},
    _makeNotifyFunction : function (methodName) {
        var notifyFunc = function observation() {
            if (isc._traceMarkers) arguments.__this = this;

            var returnVal = this[arguments.callee._origMethodSlot].apply(this, arguments);

            var queue = this._observers[methodName];

            // HACK: avoid crashing if we end up with an observation installed on an object
            // without the corresponding list of observers.  This can happen when we trace a
            // method on an entire class, in which case we install the observation method on
            // the instance prototype, but when the observation fires, it fires with each
            // individual instance's list of observers.
            if (!queue) return returnVal;

            queue._notifyStack = queue._notifyStack ? queue._notifyStack + 1 : 1;

            // call each observer
            var q,
                action;
            for (var i = 0, len = queue.length; i < len; ++i) {
                q = queue[i];

                // skip if the observer was added while this notify function is running.
                if (q._addedWhileNotificationRunning) continue;

                action = q.action;
                action._observer = q.target;
                action._observed = this;
                action._returnVal = returnVal;
                try {
                    action.apply(q.target, arguments);
                } finally {
                    action._observer = null;
                    action._observed = null;
                    action._returnVal = null;
                }
            }

            // Fire the 'complete' function - this will update any changes to observation made while
            // the notification function was running.
            
            if (isc.Browser.isSafari) {
                arguments.callee._ns.Class._notifyFunctionComplete(this, methodName, queue);
            } else {
                isc.Class._notifyFunctionComplete(this, methodName, queue);
            }

            // return the value returned by the original function
            return returnVal;
        };

        notifyFunc._isObservation = true;
        notifyFunc._fullName = methodName + "Observation";
        notifyFunc._origMethodSlot = isc._obsPrefix + methodName;

        // hang a pointer to the correct isc object onto the function in Safari.
        if (isc.Browser.isSafari) notifyFunc._ns = isc;

        return notifyFunc;
    },

    _makeThunkFunction : function (argString, action) {
        if (argString == null) argString = isc._emptyString;

        var code = "var observer = arguments.callee.caller._observer, it = observer, observed = this, returnVal = arguments.callee.caller._returnVal;\n";
        code += action;

        var cache = isc.Class._actionRunnerCache[argString];
        if (cache == null) cache = isc.Class._actionRunnerCache[argString] = {};
        var actionRunner = cache[action];
        if (actionRunner == null) {
            actionRunner = cache[action] = isc._makeFunction(argString, code);
            actionRunner._argString = argString;
        }

        return function thunk() {
            actionRunner.apply(arguments.callee._observed, arguments);
        };
    },

    _assert : function (b, message) {
        if (!b) {
            throw (message || "assertion failed");
        }
    }

});	// END addClassMethods(isc.Class)

isc.Class.addClassMethods({
    // synonym for backwards compatibility
    newInstance : isc.Class.create
});

// make the isc namespace available on all Class objects
isc.Class.ns = isc;

// retrofit the ClassFactory
isc.addProperties(isc.ClassFactory, {
    ns : isc,
    getWindow : isc.Class.getWindow,
    getDocument : isc.Class.getDocument
});

//
//	add methods to all instances of any Class or subclass
//
isc.Class.addMethods({
	//>	@method	class.init()	(A)
	//	
	// Initialize a new instance of this Class.  This method is called automatically by
    // +link{Class.create()}.  
    // <p>
    // Override this method to provide initialization logic for your class.  If your class is
    // a subclass of a UI component (i.e. descendant of +link{Canvas}), override
    // +link{canvas.initWidget()} instead. 
    //
    // @param	[arguments 0-N] (any)	All arguments initially passed to +link{Class.create()}
	//										
	// @visibility external
	//<
	init : function () {},

    // class-level destructor - call via Super() from any subclass
    destroy : function (A,B,C,D,E,F,G,H,I,J,K,L,M) { 
        var classObj = this.getClass();

        // call destroyInterface() on any member interfaces that define the method
        if (classObj._destroyInterfaceMethods) {
            for (var i = 0; i < classObj._destroyInterfaceMethods.length; i++) {
                classObj._destroyInterfaceMethods[i].call(this, A,B,C,D,E,F,G,H,I,J,K,L,M);
            }
        }

        // destroy any SGWT object wrapping this JS object
        
        var sgwtDestroy = this.__sgwtDestroy;
        if (sgwtDestroy) {
            delete this.__sgwtDestroy;
            sgwtDestroy.apply(this);
        }
    },

    //> @attr class.addPropertiesOnCreate (Boolean : undefined : RA)
    // Controls whether arguments passed to +link{classMethod:Class.create()} are assumed to be
    // Objects containing properties that should be added to the newly created instance.  This
    // behavior is how <code>create()</code> works with almost all SmartClient widgets and
    // other components, allowing the convenient shorthand of setting a batch of properties via
    // an +link{type:ObjectLiteral,JavaScript Object Literal} passed to create().
    // <P>
    // The setting defaults to true if unset.  To disable this behavior for a custom class,
    // such that <code>create()</code> works more like typical constructors found in Java and
    // other languages, use:
    // <pre>
    //     isc.[i]ClassName[/i].addProperties({ addPropertiesOnCreate:false })
    // </pre>
    // <P>
    // Note that it is not valid to disable this behavior for any subclass of +link{Canvas}
    // (Canvas relies on this property).
    // <p>
    // Regardless of the setting for <code>addPropertiesOnCreate</code>, all arguments passed to
    // +link{Class.create()} are still passed on to +link{Class.init()}.
    // 
    // @visibility external
    //<


    completeCreation : function (A,B,C,D,E,F,G,H,I,J,K,L,M) {
        //!OBFUSCATEOK     
        if (this.addPropertiesOnCreate != false) {
            //>EditMode capture clean initialization data, and don't construct the actual
            // instance.  This is used to load a set of components for editing.  NOTE:
            // currently only applies to classes that addPropertiesOnCreate (which includes
            // all Canvas subclasses)
            if (isc.captureInitData) {
                var component = {
                    className : this.Class,
                    defaults : isc.addProperties({}, A,B,C,D,E,F,G,H,I,J,K,L,M)
                }
                if (!isc.capturedComponents) isc.capturedComponents = [];
                isc.capturedComponents.add(component);
                if (component.defaults.ID) {
                    isc.ClassFactory.addGlobalID(component, component.defaults.ID);
                    //isc.Log.logWarn("adding global component: " + component.defaults.ID);
                }
                return component;
            }
            //<EditMode

            isc.addProperties(this, A,B,C,D,E,F,G,H,I,J,K,L,M);
        }
        
        var classObj = this.getClass(),
            dupProps = classObj._dupAttrs || [];
        for (var i = 0; i < dupProps.length; i++) {
            var prop = dupProps[i];
            if (this[prop] == classObj._instancePrototype[prop]) 
            {
                this[prop] = classObj.cloneDupPropertyValue(prop, this[prop]);
            }
        }

        // call initInterface() on any member interfaces that define the method
        if (classObj._initInterfaceMethods) {
            for (var i = 0; i < classObj._initInterfaceMethods.length; i++) {
                classObj._initInterfaceMethods[i].call(this, A,B,C,D,E,F,G,H,I,J,K,L,M);
            }
        }

		// call the init() routine on the new instance
	    this.init(A,B,C,D,E,F,G,H,I,J,K,L,M);
    
        if (this.autoDupMethods) { 
            isc.Class.duplicateMethods(this, this.autoDupMethods); 
        }
        return this;
    },
    
    // instance-level auto-dups
    //autoDupMethods: [ "fireCallback", "Super", "invokeSuper", "getInnerHTML" ],
    duplicateMethod : function (methodName) {
        isc.Class.duplicateMethod(methodName, this);
    },

	//>	@method	class.getUniqueProperties
	//
	//	Gets all non-internal properties that are the different between this object and its
    //  prototype and returns a new object with those properties.
	//
	//	NOTE: this will also skip an object ID (object.ID) 
	//		if it starts with our auto-generated ID string ("isc_OID_")
	//
	//	NOTE: if your object points to some complex object, the clone will pick that up... :-(
	//
	//	@param	[returnProperties]	(object)	If passed in, properties will be added to this object.
	//											If not passed, a new object will be created.
	//	@return (Object)	unique properties for this object
	//<
    // NOTE: not external because lots of random state is picked up, and lots of important
    // state is discarded.
	getUniqueProperties : function (returnProperties) {
		if (returnProperties == null) returnProperties = {};
        
		var proto = this.getPrototype();
		
		for (var property in this) {
            // ignore internal properties
			if (property.startsWith("_")) continue;

            // ignore the namespace pointer installed on every instance
			if (property == "ns") continue;

            // ignore ID if it's auto-generated
			if (property == "ID" && this.ID.startsWith("isc_OID_")) continue;
            
            var value = this[property];

            // don't pick up functions (NOTE: we probably don't want to try to serialize
            // functions in general, or at least, that would be a very advanced and separate
            // serialization system.  Also, note that if we don't ignore functions, we'd pick
            // up observations since observations replace the original function)
            if (isc.isA.Function(value)) continue;

            // if the property still has the default value for the class, ignore it
			if (value != proto[property]) {
                /*
                if (proto[property] != null) {
                    this.logWarn("property: " + property + ": value " +
                                 this.echoLeaf(this[property]) + 
                                 " !== proto value " + 
                                 this.echoLeaf(proto[property]));
                }
                */
				returnProperties[property] = this[property];
			}
		}
		return returnProperties;
	},

	//>	@method	class.clone
	//
	// Make a clone of this instance.
	// Gets all non-internal properties that are the different between this object and its
    // prototype and creates a new instance with those properties
	//
	//	NOTE: if your object points to some complex object, the clone will pick that up... :-(
	//
	//	@return (Class)	clone of this class
	//<
    // NOTE: not external because this doesn't work for almost all widgets and has many issues
    // before it could be supported (eg what to do with shared data models?)
	clone : function () {
		return this.getClass().create(this.getUniqueProperties());
	},

    // NOTE: not external.  Need to define what this should do, eg, just a dump of state for
    // debugging vs recreate component in current state / transmit between browsers
	serialize : function (indent) {
		return isc.Comm.serialize(this, indent);
	},

	xmlSerialize : function (indent) {
		return isc.Comm.xmlSerialize(this.getClassName(), this, indent);
	},

	// get the fields 
	getSerializeableFields : function (removeFields, keepFields) {
		// see if we can obtain a schema for this class.  If a schema is available,
        // we'll use it to filter the set of fields that are serializeable.
        var schema = isc.DS ? isc.DS.getNearestSchema(this) : null;
		
		var uniqueProperties = this.getUniqueProperties();

		// instead of bailing out limit to simple types only?
		if (schema == null) {
			this.logDebug("No schema available for class" + this.getClassName());
			return uniqueProperties;
		} else {
			this.logDebug("Constraining serializeable fields for class: " + this.getClassName()
						  + " with schema : " + schema.ID);
		}

		// the list of valid fields is the intersection of datasource-declared fields and unique
		// properties.  This ensures that we don't pick up fields that are really internal
		// (e.g. starting with underscore)
		var serializeableFields = isc.applyMask(uniqueProperties, schema.getFields());
	
        // removeFields and keepFields are Arrays of fieldNames that subclasses can modify
        // before calling Super in order to suppress or keep fields
        removeFields = removeFields || [];
        keepFields = keepFields || [];

		// strip removeFields from the set of serializeable fields.
		removeFields.map(function(arg) { delete serializeableFields[arg]; });
		
		// ensure that the fields that specifically requested are in
		for (var i = 0; i < keepFields.length; i++) {
            serializeableFields[keepFields[i]] = this[keepFields[i]];
        }

		return serializeableFields;
	},

	//>	@method	class.getID()
	//			Return the global identifier for this object.
	//
	//		@return	(string)	global identifier for this canvas
	// @visibility external
	//<
	getID : function () {
		return this.ID;
	},

	//>	@method	class.getClass()
	//	
	//	Gets a pointer to the class object for this instance
	//
	//	@return (Class)		Class object that was used to construct this object
	// @visibility external
	//<
	getClass : function () {
		return this._classObject;
	},


	//>	@method	class.getSuperClass()
	//	
	//	Gets a pointer to the class object for this instance's superclass.
	//
	//	@return (Class)		Class object for superclass.
	// @visibility external
	//<
	getSuperClass : function () {
		return this._classObject._superClass;
	},


	//>	@method	class.getClassName()
	//	
	//	Gets the name of this class as a string.
	//
	//	@return	(string)	String name of this instance's Class object.
	// @visibility external
	//<
	getClassName : function () {
		return this.getClass().getClassName();
	},

    //> @method Class.getScClassName()
    //  
    //  Gets the name of this class as a string, if the class is a SmartClient Framework class.
    //  Otherwise, gets the name of the SmartClient Framework class which this class extends.
    //
    //  @return (string) name of the SmartClient Framework class
    //<
    getScClassName : function () {
        return this.getClass().getScClassName();
    },
	
	//>	@method	class.getPrototype()	(A)
	//
	//	Gets a pointer to the prototype of this instance.
	//
	//	@return (object)	prototype object for this instance
	//<
	getPrototype : function () {
		return this._scPrototype;
	},
	
	
	//>	@method	class.getGlobalReference()	(A)
	//
	//	Evaluate a reference in the global scope.  Within the eval,
	//		"this" will be a pointer to this instance.
	//
    //	@param	reference	(string)	String to get the reference from.  If anything other than
    //									 a string is passed in, simply returns reference.
	//	@return (reference)		reference to evaluate
	//<
	getGlobalReference : function (reference) {
        //!OBFUSCATEOK
		if (typeof reference == "string") return this.evaluate(reference);
		return reference;
	},
	
	//>	@method	class.addMethods()
	//
	//	Add methods to this specific instance.  These can either be completely new methods or can
	//	have the same name as existing methods, in which case the new methods will override the
	//	existing methods.
	//	
	// @param [arguments 0-N] (object)	Object containing name:method pairs to be added to this object
    // @return                (object)  the object after methods have been added to it
	// @visibility internal
	//<
        
	addMethods : function () {
        
		for (var i = 0; i < arguments.length; i++) {
            // call global addMethods()
			return isc.addMethods(this, arguments[i]);
        }
	},

	//>	@method	class.addProperties()
	//	
	// 	Add properties or methods to this specific instance.  
	//	Properties with the same name as existing properties will override.
	//
	//	@param	[arguments 0-N] (object)	Object containing name:value pairs to be added to this object
    //  @return                 (object)    the object after properties have been added to it
	// @visibility external
	//<
	addProperties : function () {
		return isc.addPropertyList(this, arguments);
	},
	
	//>	@method	class.addPropertyList()
	//
	//	Add properties to this instance.
	//
	//	@param	list (object[])		array of objects with properties to add
    //  @return                 (object)    the object after properties have been added to it
	// @visibility external
	//<
	addPropertyList : function (list) {
		return isc.addPropertyList(this, list);
	},

    // Get / Set with automatic getter/setter
    // ---------------------------------------------------------------------------------------
	
	//>	@method	class._getSetter()	(A)
	//
	//	Get the setter for a particular property, if one exists
	//
	//	@param	propertyName (string)	name of the property to find the setter for
	//									eg: if propertyName == "contents", setter == "setContents"
	//
	//	@return	(string)				name of the setter for the property, or null if none found
	//
	//<
	_getSetter : function (propertyName) {
		var functionName = "set" + propertyName.substring(0,1).toUpperCase() + propertyName.substring(1);
		return (isc.isA.Function(this[functionName]) ? functionName : null);
	},
	
	//>	@method	class._getGetter()	(A)
	//
	//	Get the getter for a particular property, if one exists
	//
	//	@param	propertyName (string)	name of the property to find the getter for
	//									eg: if propertyName == "contents", getter == "getContents"
	//
	//	@return	(string)				name of the getter for the property, or null if none found
	//
	//<
	_getGetter : function (propertyName) {
		var functionName = "get" + propertyName.substring(0,1).toUpperCase() + propertyName.substring(1);
		return (isc.isA.Function(this[functionName]) ? functionName : null);
	},
	
	//>	@method	class.setProperty()
    // Set a property on this object, calling the setter method if it exists.
    // <p>
    // Whenever you set a property on an ISC component, you should call either the specific setter
    // for that property, or <code>setProperty()/setProperties()</code> if it doesn't have one.
    // This future-proofs your code against the later addition of required setters.  
    //
    // @param propertyName (String) name of the property to set
    // @param newValue (any) new value for the property 
    // @see method:class.setProperties()
    // @visibility external
    //<
    setProperty : function (propertyName, newValue) {
        // NOTE: this is inefficient but unlikely to be called very often, and doing it this way
        // means subclasses can override just setProperties()
        var props = {};
        props[propertyName] = newValue;
        this.setProperties(props);
    },

	//>	@method	class.setProperties()
	// Set multiple properties on an object, calling the appropriate setter methods if any are
    // found.
    // <p>
    // Whenever you set a property on an ISC component, you should call either the specific setter
    // for that property, or <code>setProperty()/setProperties()</code> if it doesn't have one.
    // This future-proofs your code against the later addition of required setters.  
    // <p>
    // With <code>setProperties()</code> in particular, some classes may be able to take shortcuts
    // and be more efficient when 2 or more related properties are set at the same time.
    //
	//	@param	[arguments 0-N] (object)	objects with properties to add (think named parameters).
	//										all the properties of each argument will be applied one
    //										after another so later properties will override
    // @see method:class.setProperty()    
    //  @visibility external
	//<
	setProperties : function () {

        var isA = isc.isA,
            propertyBlock,
            additionalProps = {};

        // if not passed any properties arguments, just bail
        if (arguments.length < 1) return;
    
        // Iterate through the (possibly just one) properties, combining them into a single
        // object.  We do this to avoid duplicate calls to setters, although another approach
        // would be to keep a mask of the properties we've set, starting from the last argument
        // to the first.
        if (arguments.length == 1) {
            propertyBlock = arguments[0];
            if (propertyBlock == null) return;
        } else {
            propertyBlock = {};
                
            for (var i = 0; i< arguments.length; i++) {
                isc.addProperties(propertyBlock, arguments[i]);
            }
        }
        
        for (var propertyName in propertyBlock) {
            var value = propertyBlock[propertyName],
                setter = this._getSetter(propertyName);
            if (isc.isA.StringMethod(value)) value = value.getValue();
            //this.logWarn("setting property: " + propertyName + 
            //             " to value: " + this.echoLeaf(value) + 
            //             " via setter: " + this.echoLeaf(setter));
            if (setter) {
                this[setter](value);
                if (this.propertyChanged) this.propertyChanged(propertyName, value);
            } else {
                additionalProps[propertyName] = value;
            }      
        }
        // add any remaining properties via addProperties (will fall through to addMethods if
        // necessary)
        this.addProperties(additionalProps)
        
        // Fire the notification function for any properties that didn't have an explicit 
        // setter
        if (this.propertyChanged) {
            for (var propertyName in additionalProps) {
                this.propertyChanged(propertyName, additionalProps[propertyName]);
            }
        }
        
        // Fire any "doneSettingProperties()" - allows the instance to respond to multiple
        // related properties being set without having to respond to each one.
        if (this.doneSettingProperties) this.doneSettingProperties(propertyBlock);
	},
	
    getProperty : function (propName) {
        var getter = this._getGetter(propName);
        if (getter) return this[getter]();
        return this[propName];
    },

    //> @type Properties
    // When the type for a parameter mentions "properties" as in "ListGrid Properties" or
    // "RPCRequest Properties", it means that the expected value is a JavaScript Object
    // containing any set of properties generally legal when creating an object of that type.
    // <P>
    // For example, the first parameter of +link{RPCManager.sendRequest()} is of type
    // "RPCRequest Properties".  This means it should be called like:
    // <pre>
    //    isc.RPCManager.sendRequest({
    //        actionURL : "/foo.do",
    //        showPrompt:false
    //    });</pre>
    // +link{rpcRequest.actionURL,actionURL} and +link{rpcRequest.showPrompt,showPrompt} are 
    // properties of +link{RPCRequest}.  
    // <P>
    // Note that the notation shown above is an example of a
    // +link{type:ObjectLiteral,JavaScript object literal}.
    //
    // @visibility external
    //<

    //> @type ObjectLiteral
    // An "Object literal" is JavaScript shorthand for defining a JavaScript Object with a set
    // of properties.  For example, code like this:
    // <pre>
    //    var request = {
    //        actionURL : "/foo.do",
    //        showPrompt:false
    //    };</pre>
    // .. is equivalent to ..
    // <pre>
    //    var request = new Object();
    //    request.actionURL = "/foo.do";
    //    request.showPrompt = false;</pre>
    // In situations where a set of +link{type:Properties,properties} may be passed to a
    // method, the Object literal notation is much more compact.  For example:
    // <pre>
    //    isc.RPCManager.sendRequest({
    //        actionURL : "/foo.do",
    //        showPrompt:false
    //    });</pre>
    // <b>NOTE:</b> if you have a 'trailing comma' in an object literal, like so:
    // <pre>
    //    var request = {
    //        actionURL : "/foo.do",
    //        showPrompt:false, // TRAILING COMMA
    //    };</pre>
    // This is considered a syntax error by Internet Explorer, but not by Firefox.  This is by
    // far the #1 cause of Internet Explorer-specific errors that do not occur in other
    // browsers.  Pay special attention to this error, and, if you can, install the
    // JSSyntaxScannerFilter into your development environment (as described in the
    // +link{group:iscInstall,deployment instructions}).
    //
    // @visibility external
    //<

    // ---------------------------------------------------------------------------------------

    // useful for cascading defaults where 0 or "" is allowed so the pattern of 
    // "value1 || value2 || value3" won't work.
    
    _firstNonNull : function (a,b,c,d,e,f) {
        return a != null ? a : 
                (b != null ? b : 
                    (c != null ? c : 
                        (d != null ? d : 
                            (e != null ? e : f)
                        )
                    )
                );
    },   
	
	//>	@method	class.isA()
	//
	//	Returns whether this object is of a particular class by class name, either as a direct
	//	instance of that class or as subclass of that class, or by implementing an interface
    //  that has been mixed into the class.<br><br>
	//
	//	NOTE: this only applies to ISC's class system, eg:  <code>myInstance.isA("Object")</code> will be
    //	false.
	//
	//	@param	className	(string)	Class name to test against
	//
	//	@return				(boolean)	whether this object is of that Class 
    //                                  or a subClass of that Class
	// @visibility external
	//<
    isA : function (className) {
        return this.getClass().isA(className);
    },
    
    

    //> @groupDef stringMethods
    //
    // A method flagged as a String Method can be specified as a String containing a valid
    // JavaScript expression.  This expression will automatically be converted to a function with a
    // return value matching the value of the last statement.  Providing a String is not required -
    // you may use a real function instead.
    // <p>
    // For example - suppose you wanted to override the <code>leafClick()</code> method on
    // the TreeGrid.  Normally you would do so as follows:<br>
    //
    // <pre>
    // TreeGrid.create({
    //     ...
    //     leafClick : function(viewer, leaf, recordNum) { 
    //         if(leaf.name == 'zoo') { 
    //             alert(1); 
    //         } else {
    //             alert(2);
    //         }
    //     }
    // });
    // </pre>
    //
    // Since leafClick is a stringMethod, however, you can shorten this to:<br>
    // <pre>
    // TreeGrid.create({
    //     ...
    //     leafClick : "if(leaf.name == 'zoo') { alert(1); } else { alert(2); }";
    // });
    // </pre>
    //
    // @title String Methods Overview
    // @treeLocation Client Reference/System
    //<
    
    //> @groupDef flags
    //
    // <ul>
    // <li> <b>I</b>: property can be initialized (provided in constructor block)
    // <li> <b>R</b>: property can be read.  If a getter method exists, it must be called.
    // <li> <b>W</b>: property can be written to after initialization.  If a setter method
    // exists, it must be called.  If no setter method exists,
    // +link{Class.setProperty,setProperty()} must be called.
    // </ul>
    //
    // @title Flag Abbreviations
    //<
    


    // Observation
    // ---------------------------------------------------------------------------------------

    //> @groupDef observation
    // Observation is the ability to take an action whenever a method is called.
    // @title Observation
    //<
    
	//>	@method		class.observe()
	// Take an arbitrary action whenever a method is called on an instance.<br><br>
    //
	// When you observe some method of another object, eg:<br>
	//			<code>thisObject.observe(thatObject, "someMethod", "observer.foo()")</code><br><br>
	//
	// When <code>thatObject.someMethod()</code> is called,<br>
	//			<code>thisObject.foo()</code> <br>
	// will be called automatically, after the observed method completes.<br><br>
    //
    // Action is typically a string expression.  Available variables:
    // <ul>
    //    <li> observed: target of the observation, that is, object passed to observe()
    //    <li> observer: object that observes, that is, object that observe() was called on
    //    <li> returnVal: return value of observed function
    // </ul>
	//
	// An unlimited number of observers can observe any message, they will all be notified
	// automatically in the order that the observations were set up.<br><br>
    //
	// NOTES: 
    // - observation also works on JavaScript Array objects
    // - a method may trigger an observation of itself by another object, either through code 
    //   within the method itself or within an observer's action.  In this case the observation
    //   will be set up, but the new observation action will not fire as part of this thread.
    //   When the method is called again in the future the newly added observer will be fired.
    //
	//
	//		@param	object		(object)	object to observe
	//		@param	methodName	(string)	name of the method to observe
	//		@param	[action]	(string)	String for the function to call.
	//										In this string, 
	//											<code>observer</code> is the object that is observing, 
	//											<code>this</code> is the object that is being observed
	//
	//										If <code>action</code> is not specified, 
	//											<code>observer.methodName()</code> will be called.
	//
	//		@return	(boolean)	true == observation set up, false == observation not set up
    //      @see Class.ignore()
	//		@group	observation
	// @visibility external
	//<
    
    
    
	observe : function (object, methodName, action) {
        // if the object doesn't exist or doesn't implement a method with this name, return false to
		// indicate that the observation isn't going to work
		if (object == null) {
            //>DEBUG
            this.logWarn("Invalid observation: Target is not an object.  target: " + object + 
                         ", methodName: " + methodName + ", action: '" + action + "'");
            //<DEBUG
            return false;
        }
        
        // If this property is not a method, or a methodString, log a warning and return false
        //  Note: we're calling the static isc.Func.convertToMethod(...) as we know this 
        //  function exists and will return false if the object's class, and the object have 
        //   no methodStringRegistry.
        if (!isc.Func.convertToMethod(object, methodName)) {
            //>DEBUG
            this.logWarn("Invalid observation: property: '" + methodName + 
                         "' is not a method on " + object);
            //<DEBUG
            return false;
        }
        //this.logWarn("observing: " + methodName + " on " + object + " with action: " + action);
        
		// If this function has an obfuscated version, observe that also
		var obName = isc.__remap[methodName];
		if (object[obName]) this.observe(object, obName, action)

        // Now we're definitely working with a method
		var oldMethod = object[methodName], argStr;
        if (isc.isAn.Instance(object) && object.getClass().getInstanceProperty(methodName)) {
            argStr = object.getClass().getArgString(methodName);
        // NOTE: currently, there's no such thing as a classMethod that is a stringMethod
        } else {
            // this code path is needed for two cases:
            // * methods set in autoChildDefaults (caught by getInstanceProperty)
            // * class methods (caught by isAn.Instance())
            argStr = isc.Func.getArgString(oldMethod);
        }
        var args = argStr.split(",");

        // if no action was defined, set it to call the method on the target
        if (action == null || isc.is.emptyString(action)) {
            if (!this[methodName] || !this.convertToMethod(methodName)){
                //>DEBUG
                this.logWarn("Invalid Observation - no action specified, and observer: " + this + 
                            " has no method '" + methodName + "', ignoring");
                //<DEBUG
                return false;
            }
            action = "it." + methodName + "(" + argStr + ")";
        }

        if (!isc.isA.Function(action)) {
            action = isc.Class._makeThunkFunction(argStr, action);
        }

        action._argString = argStr;

		//
		// add the observer and action to the object's observers list
		//
		
		// if there is no observers registry set up, create it.  
		// object._observers is { methodName : 
		//                           [{target:observingObject, action:codeString}]
		//                      }
		if (!object._observers) object._observers = {};

		// if there is not an observer queue for the method, create it
		if (!object._observers[methodName]) {
			var queue = object._observers[methodName] = [];
			if (args.length > 0) {
				// remember the args to the function for later
				queue.argStr = argStr;
			}
		// otherwise
		} else {
			// get the observer queue: the list of existing observers of this method
			var queue = object._observers[methodName];
			// see if this object is already observing this method
			for (var i = 0, len = queue.length; i < len; i++) {
                var q = queue[i];
				// if this object is found in the queue, return false since we're already observing
				// this method
                if (q.target == this) {
                    if (q._removedWhileNotificationRunning) {
                        // special case: this observation was already ignored, but a re-
                        // observation is being done from inside the notified function.
                        // Disable _removedWhileNotificationRunning and update the
                        // action.
                        q._removedWhileNotificationRunning = false;
                        q._addedWhileNotificationRunning = true;
                        q.action = action;
                        return true;
                    }
                    //>DEBUG
                    this.logWarn("Observer: " + this + " is already observing method '" + 
                                 methodName + "' on object '" + object + "', ignoring");
                    //<DEBUG
                    return false;
                }
			}
		}

        // Note whether we're currently running the notification function.
        
        var notificationRunning = !!queue._notifyStack;

		// add a reference to the observer to the observer queue for the method
        var q = {
            target: this,
            action: action,
            // Track whether this method was added while the notification function was
            // running - this allows us to avoid running this observer action until
            // after the method has completed.
            _addedWhileNotificationRunning: notificationRunning
        };
        queue.add(q);

		// get the name we're going to hide the original method under.  NOTE: important to name
        // this with a leading underscore, so getUniqueProperties ignores it.
        var saveMethodName = isc._obsPrefix + methodName;
		// if the object already has a method by that name, the same method we're trying to
        // observe is being observed by someone else.  We'll both call the original method by
        // the same name.
        if (object[saveMethodName] == null) {
            object[saveMethodName] = oldMethod;

		// If we are already observing the method, 
		// if the slot contains a method that isn't a notification method, log a warning and
		// copy the new method into the 'saveMethodName' slot. This will happen if a developer
		// does someObject.methodName = function () {...} rather than using addProperties on 
		// a method that is already being observed.
        } else if (!object[methodName]._isObservation) {
            this.logWarn("Observation error: method " + methodName
                + " is being observed on object " + object + " but the function appears to have "
                + "been directly overridden. This may lead to unexpected behavior - to avoid " 
                + "seeing this message in the future, ensure the addMethods() or addProperties() " 
                + "API is used to modify methods on live SmartClient instances, rather than simply "
                + "reassigning the method name to a new function instance.");
            object[saveMethodName] = object[methodName];
        }

		// replace the observed method with a new function that will call the original method
        // then call all the observers
        if (!notificationRunning && !object[methodName]._isObservation) {
            object[methodName] = isc.Class._makeNotifyFunction(methodName);
        }

		// return true that everything went OK
		return true;
	},

	//>	@method		class.ignore()	(A)
	//		Stop observing a method on some other object.
    //
	//		@param	object		(object)	object to observe
	//		@param	methodName	(string)	name of the method to ignore
	//
	//		@return	(boolean)	true == observation stopped, false == no change made
    //      @see Class.observe()
	//		@group	observation
	// @visibility external
	//<
	ignore : function (object, methodName) {
        var undef;
		// also ignore the obfuscated version if present
		var obName = isc.__remap[methodName];
		if (obName !== undef && object[obName]) this.ignore(object, obName);
		
		// get the name we would have squirreled the original method under
		var saveMethodName = isc._obsPrefix+methodName;
		// and if we can't find a method with that name, or the object has no observers
		//	return false to indicate that the object isn't currently being observed on this method
		if (!object[saveMethodName] || !object._observers) return false;
        
		// get a pointer to the message queue for the method
		var queue = object._observers[methodName],

            // Note: if the the observed function is currently being run, we want the observer
            // action to fire as normal in response to this thread, but not for subsequent 
            // calls to the observed method.
            // To achieve this, we flag the observer action, then clear it out of the queue 
            // when the observed method (actually the notification method) completes.
            
            notificationRunning = queue._notifyStack;
            

		// remove the object in the queue that points to this object
        var q;
		for (var i = 0, len = queue.length; i < len; i++) {
            q = queue[i];
			if (q.target == this) {
                if (notificationRunning) {
                    q._removedWhileNotificationRunning = true;
                } else {
                    queue.removeAt(i);
                }

				break;	
			}
		}

		// if we've removed everything from the queue
		// restore the original method

        // Note - if the slot contains a non-notification function we're in an invalid state.
        // Basically this implies the developer clobbered the notification function by going
        //  someObject.methodName = function () {...} 
        // on a method that was currently being observed.
        // Warn when we see this case, and assume the current function should be preserved if
        // possible.
        if (!object[methodName] || !object[methodName]._isObservation) {
            this.logWarn("Observation error caught in ignore(): Method " + methodName
                + " was being observed on object " + object + " but the function appears to have "
                + "been directly overridden. This may lead to unexpected behavior - to avoid " 
                + "seeing this message in the future, ensure the addMethods() or addProperties() " 
                + "API is used to modify methods on live SmartClient instances, rather than simply "
                + "reassigning the method name to a new function instance.");
            object[saveMethodName] = object[methodName];
        }

		if (queue.length == 0) {
			// restore the original function to its original name
			object[methodName] = object[saveMethodName];
			// clear the new method slot
			delete object[saveMethodName];
            // remove the observer queue
            delete object._observers[methodName];
		}

		// return true that everything went OK
		return true;
	},
	
	//>	@method		class.getObserversOf()	(A)
	//		@group	observation
	//			Return all targets observing a message of this object
	//
	//		@param	methodName	(string)	name of the method to observed
	//
	//		@return	(object[])	array of observing objects
	//<
	getObserversOf : function (methodName) {
		if (!this._observers || !this._observers[methodName]) return null;
		var queue = this._observers[methodName];
		for (var observers = [], i = 0; i < queue.length; i++) {
			observers[i] = (queue[i] ? queue[i].target : null);
		}
		return observers;
	},
	
	//>	@method		class.isObserving()	(A)
	//		@group	observation
	//		Return true if this object is already observing a method of another object
	//
	//		@param	object		(object)	object we may be observing
	//		@param	methodName	(string)	name of the method to observed
	//
	//		@return	(boolean)	true == already observing that method
	// @visibility external
	//<
	isObserving : function (object, methodName) {
		// if nothing is being observed on the object at all, forget it
		if (!object._observers) return false;
		
		// get the queue of observers of that method, bailing if none found
		var queue = object._observers[methodName];
		if (!queue) return false;
		
		// return true if we are one of the observers
		for (var i = 0; i < queue.length; i++) {
			if (queue[i].target == this) return true;
		}
		// otherwise return false 'cause we're not observing
		return false;
	},
    
	//>	@method	class.convertToMethod()
	//
	//	This takes the name of an instance property as a parameter, and (if legal) attempts to 
    //  convert the property to a function.
    //  If the property's value is a function already, or the property is registered via 
    //  class.registerStringMethods() as being a legitimate target to convert to a function, 
    //  return true.
    //  Otherwise return false
	//
	//	@param	functionName 	(string)	name of the property to convert to a string.
	//
	//	@return					(boolean)   false if this is not a function and cannot be converted
    //                                      to one
	//
	//<
    convertToMethod : function (methodName) {
        // accessor for isc.Func.convertToMethod, rather than duplicating that code
        return isc.Func.convertToMethod(this, methodName);
    },   
    
    //> @method class.evaluate()
    // 
    // Evaluate a string of script in the scope of this instance (so <code>this</code>
    // is available as a pointer to the instance).
    //
    // @param expression (string) the expression to be evaluated
    // @param evalArgs (object) Optional mapping of argument names to values - each key will
    //      be available as a local variable when the script is executed.
    // @return (any) the result of the eval
    // @see classMethod:Class.evaluate
    // @visibility external
    //<
    evaluate : function (expression, evalVars) {
        return isc.Class.evaluate.apply(this, [expression, evalVars]);
    },
    
    
	//>	@method	class.fireCallback()
	//
	//	Method to fire a callback. Callback will be fired in the scope of the object on 
    //  which this method is called.<br>
    //  Falls through to +link{classMethod:Class.fireCallback()}
	//
	//	@param	callback    (Callback) Callback to fire
    //  @param  [argNames]        (string)    comma separated string of variables
    //  @param  [args]            (array)     array of arguments to pass to the method
    //
    //  @return (any)   returns the value returned by the callback method passed in.
    //  @visibility external
	//<
    
    fireCallback : function (callback, argNames, args, catchErrors) {
        
        return this.getClass().fireCallback(callback, argNames, args, this, catchErrors);
    },
    
    //> @method class.delayCall()
    //  This is a helper to delay a call to some method on this object by some specified
    //  amount of time.
    // @param methodName (string) name of the method to call
    // @param [arrayArgs] (array) array of arguments to pass to the method in question
    // @param [time] (number) Number of ms to delay the call by - defaults to zero (so just pulls
    //                        execution of the method out of the current execution thread.
    // @return (string) Timer ID for the delayed call - can be passed to 
    //                      +link{Timer.clear()} to cancel the call before it executes
    // @visibility external
    //<
    delayCall : function (methodName, arrayArgs, time) {
        return this.getClass().delayCall(methodName, arrayArgs, time, this);
    },

    
    //> @method Class.fireOnPause()
    // Given some repeatedly performed event (EG keypress, scroll, etc), set up an action
    // to fire when the events have stopped occurring for some set period.
    // @param id (string) arbitrary identifier for the action
    // @param callback (callback) action to fire on quiescence
    // @param [delay] (number) delay in ms - defaults to 200ms
    //<
    fireOnPause : function (id, callback, delay) {
        return this.getClass().fireOnPause(id, callback, delay, this, this.getID());
    },

    //> @method Class.pendingActionOnPause()
    // Returns true iff an action has been scheduled by fireOnPause() to fire when
    // events have stopped occurring for some set period, 
    // @param id (string) arbitrary identifier for the action
    //<
    pendingActionOnPause : function (id) {
        var actions = this.getClass()._actionsOnPause[id];
        return actions ? !!actions[this.getID()] : false;
    },

    //>	@method	class.evalWithVars()
	//
    // Same as the class method evalWithVars, but implicitly assigns the class on which this method
    // is called as the target.
    //
    // @see classMethod:Class.evalWithVars()
    //<
    evalWithVars : function (evalString, evalVars) {
        return isc.Class.evalWithVars(evalString, evalVars, this);
    },

    getWindow : (
        isc.Browser.isSafari ? function () {
            return window; 
        } : function () {
            return this.ns._window;
        }
    ),
    getDocument : (
        isc.Browser.isSafari ? function () {
            return window.document;
        } : function () {
            return this.ns._document;
        }
    ),
    getDocumentBody : function () { return isc.Class.getDocumentBody(); },
    getActiveElement : function () { return isc.Class.getActiveElement(); },
          
    // Auto Generated Named Children
    // ---------------------------------------------------------------------------------------
    // Subsystem for handling automatically creating the standard children of a compound widget
    // like a Window, which must create header, resizer, etc components.
    //  
    // Not fully worked out or mechanisms not documented:
    // - dynamic defaults
    //   - creation via Arrays of String like (window.headerControls) prevents dynamic defaults
    //     from being passed
    //     - could be solved by a registerDynamicDefaults(autoChildName, defaults)
    //   - no way for subclasses to override dynamically provided defaults
    //     - could be solved by a registerDynamicDefaults(autoChildName, defaults, this.Class), 
    //       where addAutoChild would traverse registered defaults in className order?
    //   - passthrough properties that are just renames should be declarative, not dynamic
    //     defaults.  Could have a special syntax, valid only for defaults, like:
    //        blahDefaults : {
    //           dataSource:"$creator.hiliteDS"
    //        }
    //     .. these defaults could be "compiled" to speed this up (cache prop names and
    //     assignment function).
    //   - super high-speed (createRaw()) creation
    //     - needs to be overridable (as with other dynamicDefaults), so not just a method in
    //       autoChildDefaults()
    //     - when overriding, don't want to have call Super
    //     - could use a pattern like [className]_configure_autoChildName(autoChild)?
    //     - _completeCreationWithDefaults() is an imperfect implementation of this.  
    // - tabs and sections
    //   - "autoChild:blah" achieves lazy creation, but not lazy creation of a hierarchy of
    //     components
    //     - NOTE: edge case: when a tabSet sees "autoChild:blah", the use case may be:
    //       - subclassing TabSet and adding autoChildren, in which case the defaults are found
    //         on the TabSet itself OR
    //       - using a TabSet as one of your autoChildren and creating tab.panes as other
    //         autoChildren, in which case the defaults are on the TabSet's creator.
    //       The TabSet tries to "guess" by looking at whichever widget has [autoChild]Defaults
    //   - tabs, fields, items, sections etc out of reach of autoChild-based configuration
    // - plug-ins
    //   - want
    // - requirement of calling changeDefaults() awkward
    //   - class.init would keep changeDefaults() calls from having to be done in global scope
    //   - could have a specially interpreted property like autoChildDefaults
    // - default way of adding children
    //   - we could have a property like "defaultAutoParent" in order to allow eg Window to
    //     specify that autoChildren are added to the body instead.  If so, we'd need
    //     autoParent:"creator" to mean add to creator despite defaultAutoParent.
    // - for high performance creation of many similar objects, need an API that you can call
    //   that collapses properties and then re-uses then, or possibly even dynamically creates
    //   an ISC Class
    // 
    // Internal (for now) usages
    // - providing dynamic properties via an override of
    //   getDynamicDefaults(autoChildName) in order to avoid manual calls to addAutoChild()
    // - widget.autoChildren can be an Array of autoChildren which will be created and added
    //   after initWidget().  This can be handy, but doesn't cleanly allow further subclassing
    //   as is
    //
    // - other best practices:
    //   - when defaults objects get very large consider replacing them with a class definition.
    //     This makes code faster since less properties are added on create(), however, it does
    //     make it less likely that application or patch code that tries to use a different
    //     constructor for that autoChild will succeed.  Splitting skinning-related properties
    //     into a class while retaining behavioral properties (like method overrides) is a good
    //     hedge.
    //
    // - cleanup
    //   - autoChildParentMap is obsoleted by autoParent setting and should be removed
    //   - _autoMaker functionality is probably obsoleted by getDynamicDefaults() and needs to
    //     be removed
    //   - several classes used the autoChild system before it was fully complete, and so have
    //     manual calls to createAutoChild() which are probably unnecessary
    //
    // - notes on design of this system
    //   - considered accepting just simple Strings as autoChild names anywhere Canvii are
    //     normally expected, eg tab.pane and section.items, but:
    //     - this conflicts with allowing globals to be specified as just a String in these
    //       spots.  Specifying strings for globals is actually useful for out-of-order
    //       creation, and when coming from XML, and is a likely newbie error when attempting
    //       to specify a global reference.  If we try to disambiguate via a check for eg
    //       [childName]Defaults and/or whether there is a global Canvas by that name, we still
    //       end up with weird cases where a global might surpress an autoChild or vice versa,
    //       like finding "footer" in window.items 
    //     - the String isn't a complete definition of the autoChild anwyay, as in the case of
    //       section.items, the appropriate creator may be the SectionStack or some yet higher
    //       level parent

    //> @groupDef autoChildUsage
    // An AutoChild is an automatically generated subcomponent that a parent component creates to
    // handle part of its presentation or functionality.  An example is the +link{Window} component and
    // its subcomponent the +link{Window.header,header}.
    //
    // <!--<var class="smartclient">-->
    // <p>
    // AutoChildren support a standard set of properties that can be used to customize or skin
    // them.  The names of these properties are derived from the name of the AutoChild itself.
    // These properties will generally not be separately documented for every AutoChild unless
    // there are special usage instructions; the existence of the properties is implied whenever
    // you see an AutoChild documented.
    // <P>
    // The properties affecting AutoChildren are:
    // <dl>
    //
    // <dt> <b>"show" + name</b> (eg showHeader)
    // <dd> Controls whether the AutoChild should be created and shown at all. Note that the
    // first letter of the AutoChild name is uppercased for this property ("header" -> "Header").
    //
    // <dt> <b>name + "Properties"</b> (eg headerProperties)
    // <dd> Properties to apply to the autoChild created by this particular instance of the
    // parent component.  For example:
    // <pre>
    //        isc.Window.create({
    //            ID: "myWindow",
    //            headerProperties: { layoutMargin: 10 }
    //        });
    // </pre>
    // The above applies a +link{layout.layoutMargin,layoutMargin} of 10 to the header of <code>myWindow</code>,
    // increasing the empty space around the subcomponents of the header (buttons, title label,
    // etc).
    // <P>
    // Generally, *Properties is null.  <b>Do not</b> use the *Properties mechanism for
    // skinning.  See *Defaults next.
    //
    // <dt> <b>name + "Defaults"</b> (eg headerDefaults)
    // <dd> Defaults that will be applied to the AutoChild created by any instance of the
    // parent class.  *Defaults is used for skinning.  This property should never be set when
    // creating an instance of the parent component, as it will generally wipe out defaults
    // required for the component's operation.  Use +link{class.changeDefaults,changeDefaults()}
    // to alter defaults instead. This is generally as part of a custom skin and/or custom component
    // creation - see the +link{group:autoChildren,overview of AutoChildren for component development}
    // for details and examples.
    //
    // <dt> <b>name + "Constructor"</b> (eg headerConstructor)
    // <dd> SmartClient Class of the component to be created.  An advanced option, this
    // property should generally only be used when there is documentation encouraging you to do
    // so.  For example, +link{ListGrid} offers the ability to use simple CSS-based headers or
    // more complex +link{StretchImg} based headers via +link{listGrid.headerButtonConstructor}.
    // The constructor can also be specified using the <code>_constructor</code> property in the
    // defaults for the AutoChild.
    // </dl>
    // <!--</var>--><!--<var class="smartgwt">-->
    // <p>
    // AutoChildren support four standard configuration mechanisms that can be used to customize or skin
    // them. Note, however, that configuring AutoChildren in Smart&nbsp;GWT is advanced usage.
    // <p>
    // To determine which AutoChildren exist for a particular component type, search the class' Javadocs
    // for "AutoChild" as there is a getter for each AutoChild that is supported. In the case
    // of a +link{group:multiAutoChildren,MultiAutoChild}, the getter is non-functional (always
    // returns null) and exists only to make you aware that the MultiAutoChild exists.
    // <p>
    // The four different ways to configure AutoChildren in Smart&nbsp;GWT are:
    // <dl>
    // <dt> <b>Visibility</b>
    // <dd> Controls whether the AutoChild should be created and shown at all.  The
    // {@link com.smartgwt.client.widgets.Canvas#setAutoChildVisibility(String, boolean)} or
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#setAutoChildVisibility(String, boolean)} API
    // as appropriate is used to change this property for the named AutoChild.
    //
    // <dt> <b>Properties</b>
    // <dd> Properties to apply to the AutoChild created by a particular instance of the
    // parent component. In the case of a +link{MultiAutoChild}, the properties are applied to each
    // instance created by the parent.
    // <P>
    // To change the properties of an AutoChild of a widget, the
    // {@link com.smartgwt.client.widgets.Canvas#setAutoChildProperties(String, Canvas)} or
    // {@link com.smartgwt.client.widgets.Canvas#setAutoChildProperties(String, FormItem)} API
    // is used. To change the properties of an AutoChild of a form item, the
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#setAutoChildProperties(String, Canvas)} or
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#setAutoChildProperties(String, FormItem)}
    // API is used. For example:
    // <pre>
    //        final Window myWindow = new Window();
    //        final Layout headerProperties = new Layout();
    //        headerProperties.setLayoutMargin(10);
    //        myWindow.setAutoChildProperties("header", headerProperties);
    // </pre>
    // The above applies a +link{layout.layoutMargin,layoutMargin} of 10 to the header of <code>myWindow</code>,
    // increasing the empty space around the subcomponents of the header (buttons, title label,
    // etc).
    // <P>
    // <b>Do not</b> use the Properties mechanism for skinning.  See Defaults next.
    //
    // <dt> <b>Defaults</b>
    // <dd> Defaults that will be applied to the AutoChild created by any instance of the
    // parent class.  Changing the defaults is used for skinning.  The <code>changeAutoChildDefaults()</code>
    // static method of the target Smart&nbsp;GWT class is used to change the defaults for all
    // instances of the class.  For example, to change the +link{Window.header,Window.header}
    // defaults, the {@link com.smartgwt.client.widgets.Window#changeAutoChildDefaults(String, Canvas)}
    // API is used passing "header" for the <code>autoChildName</code>.
    // <p>
    // <code>changeAutoChildDefaults()</code> must be called before any
    // components are created, and will generally be the first thing in your module's
    // <code>onModuleLoad()</code> function.  Alternatively, you can use the JavaScript equivalent
    // <code>Class.changeDefaults()</code> inside of a load_skin.js file - see <i>Skinning
    // AutoChildren</i> below.
    //
    // <dt> <b>Constructor</b>
    // <dd> &#83;martClient Class of the component to be created.  An advanced option, the
    // AutoChild constructor should generally only be changed when there is documentation encouraging
    // you to do so.  For example, +link{ListGrid} offers the ability to use simple CSS-based headers or
    // more complex +link{StretchImg} headers via
    // <code>listGridInstance.setAutoChildConstructor("headerButton", "StretchImg")</code>.
    // To change the constructor of AutoChildren, the
    // {@link com.smartgwt.client.widgets.Canvas#setAutoChildConstructor(String, String)} or
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#setAutoChildConstructor(String, String)}
    // API is used.
    // <p>
    // For some drastic customizations of an AutoChild where the constructor is changed, the
    // signature of the <code>get[AutoChild]()</code> method may have too specific a return type and the
    // {@link com.smartgwt.client.widgets.Canvas#getCanvasAutoChild(String)},
    // {@link com.smartgwt.client.widgets.Canvas#getFormItemAutoChild(String)},
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#getCanvasAutoChild(String)}, or
    // {@link com.smartgwt.client.widgets.form.fields.FormItem#getFormItemAutoChild(String)} API
    // as appropriate would need to be used instead to retrieve the AutoChild instance.
    // </dl>
    // <p>
    // <b>NOTE:</b> When setting Properties or Defaults in Smart&nbsp;GWT, attributes and event
    // handlers can be set, but override points are not supported.
    // <!--</var>-->
    //
    // <p>
    // The AutoChild system can be used to create both +link{canvas.children,direct children} 
    // and indirect children (children of children).  For example, the
    // +link{window.minimizeButton,minimizeButton} of the Window is also an autoChild, even
    // though it is actually located within the window header.
    // <P>
    // <h4>Skinning AutoChildren</h4>
    // <P>
    // Skinning AutoChildren by changing the AutoChild defaults is typically done for two purposes:
    // <ul>
    // <li> Changing the default appearance or behavior of a component, for example, making all
    // Window headers shorter
    // <li> Creating a customized variation of an existing component <i>while retaining the
    // base component unchanged</i>.  For example, creating a subclass of Window called
    // "PaletteWindow" with a very compact appearance, while leaving the base Window class
    // unchanged so that warning dialogs and other core uses of Windows do not look like
    // PaletteWindows.
    // </ul>
    // The best code examples for skinning are in the load_skin.js file for the "&#83;martClient"
    // skin, in <code>isomorphic/skins/&#83;martClient/load_skin.js</code>.
    // <P>
    // <h4>Passthroughs (eg window.headerStyle)</h4>
    // <P>
    // In many cases a component will provide shortcuts to skinning or customizing its
    // AutoChildren, such as +link{window.headerStyle}, which becomes header.styleName.  When
    // these shortcuts exist, they must be used instead of the more general AutoChild skinning
    // system.
    // <P>
    // <h4>Safe Skinning</h4>
    // <P>
    // Before skinning an AutoChild consider the +link{group:safeSkinning,safe skinning guidelines}.
    // <P>
    // <h4>Accessing AutoChildren Dynamically</h4>
    // <P>
    // For a component "Window" with an AutoChild named "header", if you create a Window
    // called <code>myWindow</code>, the header AutoChild is available 
    // <var class="smartclient">as <code>myWindow.header</code></var>
    // <var class="smartgwt">via <code>myWindow.getHeader()</code></var>.
    // <P>
    // Unless documented otherwise, an AutoChild should be considered an internal part of a
    // component.  Always configure AutoChildren by APIs on the parent component when they
    // exist.  It makes sense to access an AutoChild for troubleshooting purposes or for
    // workarounds, but in general, an AutoChild's type, behavior, and internal structure are
    // subject to change without notice in future SmartClient versions.
    // <P>
    // Accessing an AutoChild may give you a way to make a dynamic change to a component that
    // is not otherwise supported by the parent component (for example, changing a text label
    // where there is no setter on the parent).  Before using this approach, consider whether
    // simply recreating the parent component from scratch is a viable option. This approach
    // is more than fast enough for most smaller components, and will not create a reliance on
    // unsupported APIs.
    //
    // @title Using AutoChildren
    // @treeLocation Concepts
    // @visibility external
    //<

    //> @type AutoChild
    // An autoChild is an automatically generated subcomponent that a component creates to
    // handle part of its presentation or functionality.  An example is the Window component and
    // its subcomponent the "header".
    // <P>
    // See +link{autoChildUsage,Using AutoChildren} for more information.
    //
    // @group autoChildren
    // @visibility external
    //<

    //> @type MultiAutoChild
    // @see group:multiAutoChildren
    // @visibility external
    //<

    // NOTE: the following groupDef appears only in SmartClient, not SmartGWT.
    //> @groupDef autoChildren
    // An autoChild is an automatically generated subcomponent that a component creates to
    // handle part of its presentation or functionality.
    // <P>
    // An example is the Window component and its subcomponent the "header".
    // <P>
    // AutoChildren support a standard set of properties that can be used to customize or skin
    // them.
    // <P>
    // This topic explains how to use the autoChild system when creating custom components in
    // order to create maximum flexibility.  To learn how to use the autoChild system with 
    // pre-existing components, +link{group:autoChildUsage,go here}.  
    // <P>
    // Before reading this topic, be sure you have read the +docTreeLink{QuickStart Guide}
    // material on creating custom components and have reviewed the provided examples.
    // <P>
    // <h3>Basics</h3>
    // <P>
    // The following is an example of creating subcomponents <b>without</b> using the AutoChild
    // pattern.  In this case a fictitious "Portlet" class is being created, which uses an
    // instance of isc.Label to serve as it's header.
    // <pre>
    // isc.defineClass("Portlet", "VLayout").addProperties({
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         this.headerLabel = isc.Label.create({
    //             autoDraw:false,
    //             contents: this.title, 
    //             styleName: this.titleStyleName,
    //             portlet:this,
    //             click : function () { this.portlet.bringToFront() },
    //             wrap:false,  
    //             overflow:"hidden", 
    //             width:"100%"
    //         });
    //         this.addMember(this.headerLabel);
    //         ...
    // </pre>
    // While straightforward, this approach provides limited flexibility to someone using the
    // "Portlet" class.  There is no way to:
    // <ol>
    // <li> avoid creating the headerLabel, for a "headerless" portlet
    // <li> use a different, more advanced class as a header (eg, StretchImgButton or a custom 
    // class)
    // <li> skin the headerLabel, other than CSS (rounded corners, animations, etc, wouldn't be
    // possible)
    // <li> change it's layout behavior (eg enable autoSize)
    // <li> add or override event handlers
    // </ol>
    // Let's imagine we wanted to add some of the above features.  We could change the code
    // like so:
    // <P>
    // <pre>
    // isc.defineClass("Portlet", "VLayout").addProperties({
    //     <b>showHeaderLabel:true,</b>
    //     <b>headerLabelConstructor:isc.Label,</b>
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         <b>if (this.showHeaderLabel) {</b>
    //             this.headerLabel = this.headerLabelConstructor.create({
    //                 autoDraw:false,
    //                 contents: this.title, 
    //                 styleName: this.titleStyleName,
    //                 portlet:this,
    //                 click : function () { this.portlet.bringToFront() },
    //                 wrap:false,  
    //                 overflow:"hidden", 
    //                 width:"100%"
    //             }<b>, this.headerLabelProperties</b>);
    //             this.addMember(this.headerLabel);
    //         <b>}</b>
    //         ...
    // </pre>
    // Our additions solve our initial concerns:
    // <ul>
    // <li> <code>showHeaderLabel:false</code> can be set to suppress the header label
    // <li> <code>headerLabelConstructor</code> allows you to switch to a different class
    // <li> <code>headerLabelProperties</code> give you a means to add arbitrary properties
    // (skinning properties, sizing properties, event handlers, etc)
    // </ul>
    // However, the code is becoming more verbose and repetitive, and we've created a few
    // additional properties that now need documentation and testing.  This extra work is going
    // to be multiplied by every subcomponent we create where we want this kind of flexibility.
    // <P>
    // Enter the AutoChild system: the purpose of the AutoChild system is to define a standard
    // pattern for creating subcomponents with maximum flexibility.  This means:
    // <ul>
    // <li> developers creating custom components write less code, have less to test and less
    // to document
    // <li> developers can more easily understand each other's code for custom components,
    // because it follows a standard pattern
    // <li> developers <b>using</b> custom components have a standard pattern for
    // customization, instead of learning customization APIs for every component separately
    // </ul>
    // The code below uses the autoChild system to create the "headerLabel" subcomponent.  This
    // version of the code would still respect all of the customization properties from earlier
    // examples (<code>headerLabelProperties</code> et al) and offers several additional degrees
    // of flexibility still to be explained, yet it's significantly shorter.  More importantly,
    // this code is less redundant; the "boilerplate" code is gone and what's left is just the
    // actual settings for the headerLabel subcomponent.
    // <pre>
    // isc.defineClass("Portlet", "VLayout").addProperties({
    //     headerLabelDefaults : {
    //         _constructor:isc.Label,
    //         click : function () { this.creator.bringToFront() },
    //         wrap:false,  
    //         overflow:"hidden", 
    //         width:"100%"
    //     },
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         this.addAutoChild("headerLabel", {
    //             contents: this.title, 
    //             styleName: this.titleStyleName
    //         });
    //         ...
    // </pre>
    // <P>
    // The documentation for +link{class.addAutoChild,addAutoChild()} explains why this code
    // will still respect the <code>showHeaderLabel</code> flag and other customization
    // properties even though they aren't mentioned specifically.
    // <P>
    // <h3>AutoChildren lifecycle</h3>
    // <P>
    // By default any auto-children created by +link{class.addAutoChild()} or 
    // +link{class.createAutoChild()} will be +link{canvas.destroy(),destroyed} when the
    // canvas that created them is destroyed. You can suppress this behavior by setting
    // <code>dontAutoDestroy</code> to <code>true</code> on the auto child. To do this you
    // could add the property to the defaults or properties block for the autoChild, or
    // pass it into the creating method in the dynamic set of properties.
    // <p>
    // <h3>Subclassing a component with autoChildren</h3>
    // <P>
    // If you are subclassing a component that has an autoChild and you want to change
    // defaults for that autoChild, the correct way to do so is to use
    // +link{Class.changeDefaults,changeDefaults()}:
    // <pre>
    // isc.defineClass("MyWindow", "Window");
    // isc.MyWindow.changeDefaults("headerDefaults", { layoutMargin:10 });
    // isc.MyWindow.addProperties({ 
    //    ...
    // </pre>
    // <P>
    // <code>changeDefaults()</code> creates a copy of the superclass defaults and applies your
    // changes, which is important because you want to inherit the superclass behavior without
    // affecting the superclass, and yet apply overrides.
    // <P>
    // The following code sample indicates two common 
    // <span style="color:red;font-weight:bold">incorrect</span> patterns for working with
    // defaults, and the consequences of each: 
    // <pre>
    // isc.defineClass("MyWindow", "Window").addProperties({
    //     // NO.  Superclass behavior / settings for autoChild
    //     // won't be inherited.  Use changeDefaults() instead.
    //     headerDefaults : { ... },
    // 
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         // NO.  "headerDefaults" object is shared across the class,
    //         // changing it affects all instances created from here on.
    //         // Pass dynamic defaults to addAutoChild() instead
    //         this.headerDefaults.myProperty = this.newValue;
    //         ...
    // });
    // </pre>
    // <b>defaults vs properties</b>
    // <P>
    // For AutoChildren, defaults and properties both provide similar means of adding
    // properties to an AutoChild, and the distinction between them is primarily one of
    // convention: a class that uses AutoChildren should never define a default value for
    // <i>autoChildName</i>Properties, so that instances can freely specify
    // <i>autoChildName</i>Properties without overriding built-in behavior.
    // <pre>
    // isc.defineClass("MyWindow", "Window").addProperties({
    //     // NO.  Any further use of "headerProperties", in
    //     // instances or in subclasses, would wipe out behavior
    //     headerProperties : { ... },
    // </pre>
    // <P>
    // By consistently using +link{Class.changeDefaults()} whenever you override autoChild
    // defaults in a subclass, you ensure that your classes can in turn be subclassed and
    // extended uniformly.
    // <P>
    // <h3>autoParents and creation order</h3>
    // <P>
    // The AutoChild pattern can create an entire hierarchy of generated subcomponents.  For
    // example, the +link{Window} class included with SmartClient uses several AutoChildren as
    // part of the overall header structure: separate autoChildren for the minimize button,
    // close button, and then the header itself, a Layout-derived class that contains all other
    // header controls. 
    // <P>
    // To facilitate construction of hierarchies of autoChildren, the special
    // <code>autoParent</code> property may appear in either defaults or properties for an
    // autoChild, and indicates the name of another autoChild that should used as a parent.
    // For example, to create a "closeButton" autoChild that will be a member of the "header"
    // autoChild:
    // <P>
    // <pre>
    // isc.defineClass("Portlet", "VLayout").addProperties({
    //     headerDefaults : {
    //         _constructor:isc.HLayout,
    //         ...
    //     },
    //     closeButtonDefaults : {
    //         <b>autoParent:"header",</b>
    //         _constructor:isc.ImgButton,
    //         ...
    //     },
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         this.addAutoChild("header");
    //         this.addAutoChild("closeButton");
    //         ...
    // </pre>
    // <P>
    // In addition to cutting down on code and making inter-autoChild relationships clearer,
    // using <code>autoParent</code> rather than manual calls to addMember() allows a
    // subclass of your component to potentially completely rearrange the autoChildren you have
    // defined, while retaining their behavior.
    // <P>
    // When using <code>autoParent</code> to arrange autoChildren, create parents first, then
    // children.
    // <P>
    // <b>Tip:</b> if you want all of the behaviors of
    // +link{class.addAutoChild(),addAutoChild()} <i>except</i> automatically adding the
    // autoChild to a parent, set <code>autoParent:"none"</code>.
    // <P>
    // <b>special case: TabSets and SectionStacks</b>
    // <p>
    // An autoChild that appears as a +link{tab.pane} or
    // +link{SectionStackSection.items,section item} does not have a clear way to refer to it's
    // tab or section via the <code>autoParent</code> property.  For this special case, the
    // TabSet and SectionStack components allow tab.pane / section.items to contain the special
    // string "autoChild:<i>autoChildName</i>".  This will cause the corresponding autoChild to be
    // automatically created when the tab is selected or section expanded.
    // <P>
    // For example:
    // <pre>
    // isc.defineClass("Portlet", "VLayout").addProperties({
    //     ...
    //     mainTabsDefaults : {
    //         _constructor:isc.TabSet,
    //         tabs : [
    //             { title:"First Pane", pane:"autoChild:firstPane" }
    //         ]
    //     },
    //     firstPaneDefaults : {
    //         ...
    //     },
    //     initWidget : function () {
    //         this.Super("initWidget", arguments);
    //
    //         // this automatically creates firstPane as an autoChild
    //         this.addAutoChild("mainTabs");
    //         ...
    // </pre>
    //
    // @visibility external
    //<

    //> @groupDef multiAutoChildren
    // A MultiAutoChild is an +link{AutoChild} where the creating component usually creates more than
    // one, hence, unlike a normal AutoChild, the AutoChild is not accessible as <code>creator.[autoChildName]</code>.
    // <P>
    // See +link{autoChildUsage,Using AutoChildren} for more information on configuring a
    // MultiAutoChild.
    // @see Class.createAutoChild()
    // @visibility external
    //<

    // break this discussion into safe skinning (visuals only) and safe customization
    // (subclasses and autoChildren)?
    //> @groupDef safeSkinning
    // The skinning mechanism is extremely powerful and gives you the ability to change
    // internal functionality of components.  While this is useful for workarounds, you should
    // think through any properties you override, considering what will happen with future
    // versions of SmartClient, where the defaults may change or be expanded.
    // <P>
    // The following kinds of overrides are generally very safe:
    // <ul>
    // <li> Change +link{canvas.styleName,styleName} or +link{button.baseStyle,baseStyle} to
    // provide a custom CSS style or series of styles
    // <li> Change a media path such as the +link{Img.src,src} of the 
    // +link{Window.minimizeButton}.
    // <li> Change the size of any part of the UI that has a fixed pixel size, such as
    // the height and width of the +link{Window.minimizeButton}, especially when this is done
    // to match the size of media you have created
    // <li> Set properties such as +link{button.showRollOver} that cause a component to
    // visually react to more or fewer UI states (disabled, over, down, etc)
    // </ul>
    // The following should be very carefully considered:
    // <ul>
    // <li> Adding custom behaviors by passing in event handlers such as 
    // (eg +link{canvas.showContextMenu,showContextMenu()}).  If future versions of the
    // component add more functionality, you may prevent new features from functioning, cause
    // them to function only partially, or break.
    // <P>
    // If you want to ensure that you do not break new functionality added in future SmartClient
    // versions, be sure to call +link{class.Super,Super()} for methods you override, and do not
    // prevent events from bubbling.
    // <P>
    // If you want to ensure that <b>only</b> your custom behavior is used if a future version
    // of a SmartClient component adds functionality, override all methods involved in the
    // interaction, even if your methods do nothing.  For example, for a custom drop
    // interaction, override dropOver, dropMove, dropOut and drop, even if you do nothing on
    // dropMove().  Then, do not call Super() if there is no superclass behavior required for
    // the interaction you've implemented.  Also, for any event handlers (such as drop())
    // return false if you consider your code to have completely handled the event (no
    // parent component should react).
    // </ul>
    // The following are not recommended:
    // <ul>
    // <li> Providing a global +link{Canvas.ID,ID} to a subcomponent (only works once).
    // <li> Overriding +link{canvas.backgroundColor}, +link{canvas.border,border},
    // +link{canvas.margin,margin}, +link{canvas.padding,padding}, or in general any single
    // attribute otherwise controlled by CSS.  Future SmartClient versions may change the base
    // CSS style, rendering your single-property customization senseless.  Change the entire
    // CSS style via +link{canvas.styleName,styleName} instead.
    // </ul>
    //
    // @title Safe Skinning
    // @visibility external
    //<

    addAutoChildren : function (children, parent, position) {
        if (children == null) return;
        if (!isc.isAn.Array(children)) children = [children];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (isc.isA.Canvas(child)) {
                parent = parent || this;
                this._addAutoChildToParent(child, parent, position);
                continue;
            }
            // string name, or block of properties specifying an autoChild
            this.addAutoChild(child, null, null, parent, position);
        }
    },

    //> @method class.addAutoChild()
    // Creates a component according to the "AutoChild" pattern, and adds it to this component.
    // <P>
    // See the +link{group:autoChildren,AutoChild usage overview} to understand the general
    // purpose and usage of this method.
    // <P>
    // <code>addAutoChild()</code> takes the following actions:
    // <ol>
    // <li> checks whether this.<i>autoChildName</i> is already populated, and returns it if so
    // <li> checks when there is a show<i>AutoChildName</i> with the value false, and if so
    // returns without creating a component  
    // <li> calls +link{createAutoChild()} to create the component
    // <li> sets this.<i>autoChildName</i> to the created component
    // <li> adds the component either to this component, or to some other parent, specified
    // by the "autoParent" property in the autoChild's defaults.  The "autoParent" property may
    // be "none" indicating the autoChild should not be automatically added.
    // </ol>
    // <P>
    // When adding an autoChild to a +link{Layout} subclass,
    // +link{layout.addMember,addMember()} will be called instead of the normal
    // +link{Canvas.addChild,addChild()}.  To prevent this behavior,
    // <code>addAsChild:true</code> can be set in the autoChild defaults.  Similarly,
    // <code>addAsPeer:true</code> may be set to add an autoChild as a peer.
    // <P>
    // <b>Tip:</b> because <code>addAutoChild()</code>
    // checks specifically for show<i>AutoChildName</i>:false, you do not have to add
    // show<i>AutoChildName</i>:true in order for an autoChild to be shown by default; leaving
    // the property undefined is sufficient.
    // <P>
    // Note that by default the child created by this method will be destroyed when
    // +link{canvas.destroy(),destroy()} is called on this instance. To disable this behavior,
    // set <code>dontAutoDestroy</code> to true on the auto child.
    // 
    // @param childName (String) name of the autoChild
    // @param defaults (Properties) dynamic properties for the autoChild
    // @return (Class) created autoChild
    //
    // @group autoChildren
    // @visibility external
    //<
    _$maker:"_autoMaker",
    addAutoChild : function (childName, dynamicProperties, defaultConstructor, parent, position) {
        var childValue = this[childName];
        // already created
        if (isc.isAn.Instance(childValue)) return childValue;
        
       
        // allow a properties object with autoChildName etc
        if (isc.isAn.Object(childName) && childName.autoChildName) {
            dynamicProperties = childName;
            defaultConstructor = dynamicProperties._constructor || defaultConstructor;
            childName = dynamicProperties.autoChildName;
        }

        // check to see if the value of the childName property is a string that is the global
        // ID of an existing instance (like { header : "myPreviouslyCreatedHeader" })
        if (isc.isA.String(childValue) && window[childValue]) {
            this[childName] = window[childValue];
            return this[childName];
        }

        // check flags, and existence of parents, before proceeding to create the child
        // NOTE: null check allows constructor blocks for unnamed autoChildren (automatically
        // created, but not skinnable)
        if (childName != null && !this.shouldCreateChild(childName)) return;

        // create the child
        // XXX autoMaker functionality is considered legacy; getDynamicDefaults() is believed
        // to handle all cases for which autoMaker was intended, and more cleanly
        // If this[childName]_autoMaker() is defined, call that to make the child, rather than 
        // 'createAutoChild()'
        
        var child,
            makerName = childName + this._$maker;
    
        if (childName != null && this[makerName]) child = this[makerName](dynamicProperties);
        else {
            child = this.createAutoChild(childName, dynamicProperties, defaultConstructor, true);
        }      
        // createAutoChild() may return null if we're not configured to create this child.
        // A custom maker function may return null if it wants to handle adding the child to
        // the appropriate parent itself (and assinging the child to the appropriate property
        // name)
        if (!child) return; 

        // If we went through createAutoChild with the assignToSlot parameter, this is unnecessary
        // but if we ran the maker method, we have to actually assign this[childName] to the
        // generated object
        this[childName] = child;

        this._addToParent(childName, child, parent, position);

        return child;
    },

    _$creator:"creator",
    _addToParent : function (childName, child, parent, position) {
        // ways of specifying parent, in order of preference
        // - pass into addAutoChild / createAutoChild (becomes parent param here)
        // - as child.autoParent, for any source of properties
        // - define this.autoChildParentMap
        // - finally, "this" assumed
        if (parent == null) {
            parent = child.autoParent || this.getAutoChildParent(childName);
        }
        if (isc.isA.String(parent)) {
            // constant meaning no parent, eg, pop-up dialog
            if (parent == isc.Canvas.NONE) {
                if (this.isDrawn()) child.draw();
                return; 
            }
        
            var canvasParent = this[parent] || window[parent] || parent;
            if (!isc.isA.Canvas(canvasParent)) {
                this.logWarn("no valid parent could be found for String '" + parent + "'");
            } else parent = canvasParent;
        }

        // do nothing if the created child is not a Canvas or derived parent isn't a canvas.
        if (!isc.isA.Canvas(child) || !isc.isA.Canvas(parent)) return;
    
        this._addAutoChildToParent(child, parent, position);
    },

    _addAutoChildToParent : function (child, parent, position) {
        // add to parent, as member or child
		if (child.addAsPeer || child.snapEdge) parent.addPeer(child);
        else if (isc.isA.Layout(parent) && !child.addAsChild && !child.snapTo) parent.addMember(child, position);
        else if (isc.TileLayout && isc.isA.TileLayout(parent) && !child.addAsChild && !child.snapTo) parent.addTile(child, position);
        
        else parent.addChild(child);
    },

    // defaults to creating child if this.show[ChildName] isn't explicitly set to false.  If the
    // child is declared to have a named parent, checks that the parent will be created too
    _$show : "show", 
    shouldCreateChild : function (childName) {
        var showProperty = this._$show + childName.charAt(0).toUpperCase() + childName.substring(1);
        if (this[showProperty] != null && this[showProperty] == false) return false;

        // check whether the parent will be created
        var parentName = this._getAutoChildParentName(childName);
        if (parentName == null) return true;
        return (this.shouldCreateChild(parentName));
    },

    _$Constructor: "Constructor",
    // Determine what class the child should be.
    // - If there is an explicit [childName]Constructor property, use that specified class
    // - If the properties include an _constructor attribute, use that class
    // - Otherwise use the defaultConstructor passed in 
    // - (back off to canvas if we failed to find a class)
    getAutoChildClass : function (childName, dynamicProperties, defaultConstructor,
                                  childDefaultsName, childPropertiesName) {
        // use childDefaultsName if passed, so it doesn't have to be recalc'd
        childDefaultsName = childDefaultsName || this._getDefaultsName(childName);
        var childDefaults = this[childDefaultsName];
        
        childPropertiesName = childPropertiesName || this._getPropertiesName(childName);
        var childProperties = this[childPropertiesName];

        return this[childName + this._$Constructor] || 
               (dynamicProperties ? dynamicProperties._constructor : null) || 
               (childProperties ? childProperties._constructor : null) || 
               (childDefaults ? childDefaults._constructor : null) || 
               defaultConstructor || isc.Canvas;
    },

    // get defaults for all auto children
    applyBaseDefaults : function (child, childName, dynamicDefaults) {
        child.autoDraw = false;
        child._generated = true;

        // special "creator" property obviates the need to pass "window:this" et al dynamically
        child.creator = this;
        // ability to rename the "creator" pointer for clarity
        var creatorName = this.creatorName;
        if (creatorName) child[creatorName] = this;

        // generate an ID for the autoChild based on it's name.  NOTE: can be suppressed by
        // passing ID:null in dynamicProperties
        var undef;
        if (dynamicDefaults == null || dynamicDefaults.ID === undef) {
            child.ID = this.getID() + isc._underscore + childName;
            // if the defaultID collides, uniquify it.  This allows createAutoChild() to be
            // called multiple times on the same config block
            if (window[child.ID]) {
                child.ID = child.ID + isc._underscore + isc.ClassFactory.getNextGlobalID();
            }
        }
    },

    getDynamicDefaults : function () {},

    _$Defaults: "Defaults",
    _getDefaultsName : function (childName) {
        var cache = isc.Class._defaultsCache;
        if (!cache) isc.Class._defaultsCache = cache = {};
    
        if (cache[childName]) return cache[childName];
        
        var defaultsName = childName + this._$Defaults;
        if (this[defaultsName]) cache[childName] = defaultsName;
        return defaultsName;
    },

    _$Properties: "Properties",
    _getPropertiesName : function (childName) {
        var cache = isc.Class._propertiesCache;
        if (!cache) isc.Class._propertiesCache = cache = {};
    
        if (cache[childName]) return cache[childName];
        
        var propertiesName = childName + this._$Properties;
        if (this[propertiesName]) cache[childName] = propertiesName;
        return propertiesName;
    },

    //> @method class.createAutoChild()
    // Unconditionally creates and returns a component created according to the "AutoChild"
    // pattern.
    // <P>
    // In addition to applying defaults and properties as described under the
    // +link{group:autoChildUsage,AutoChild overview}, the created autoChild:
    // <ul>
    // <li> is automatically <code>autoDraw:false</code> 
    // <li> has a <code>creator</code> property that points to this component, for easy
    // authoring of event handlers (eg click:"this.creator.doSomething()")
    // </ul>
    // <P>
    // Unlike +link{addAutoChild()}, <code>createAutoChild()</code> does not create a
    // this.<i>autoChildName</i> reference to the component, check a show<i>AutoChildName</i>
    // flag, or automatically add the autoChild via +link{Canvas.addChild()}.  
    // <P>
    // General you use <code>createAutoChild</code> rather than addAutoChild when:
    // <ul>
    // <li> you are going to create several autoChildren with a common set of defaults (for
    // example the +link{columnTree.column,column} autoChild of the +link{ColumnTree}).
    // <li> children need to be created before their parents (eg, for layout/auto-sizing
    // reasons)
    // </ul>
    // <P>
    // Note that by default the child created by this method will be destroyed when
    // +link{canvas.destroy(),destroy()} is called on this instance. To disable this behavior,
    // set <code>dontAutoDestroy</code> to true on the auto child.
    //
    // @param childName (String) name of the autoChild
    // @param defaults (Properties) dynamic properties for the autoChild
    // @return (Class) created autoChild
    //
    // @group autoChildren
    // @visibility external
    //<
    createAutoChild : function (childName, passedDynamicDefaults, defaultConstructor,
                                assignToSlot) 
    {
        var dynamicDefaults = this.getDynamicDefaults(childName);

        // NOTE: dynamicDefaults: generally, you will *either* pass dynamic defaults to
        // addAutoChild() *or* implement getDynamicDefaults() for cases where you don't call
        // addAutoChild directly.  It would be weird to do both, so we make sure it works, but
        // it's not as fast.
        if (dynamicDefaults != null && passedDynamicDefaults != null) {
            dynamicDefaults = isc.addProperties({}, dynamicDefaults, passedDynamicDefaults);
        } else {
            dynamicDefaults = passedDynamicDefaults || dynamicDefaults;
        }

        // standard name for defaults (eg bodyDefaults)
        var childDefaultsName = this._getDefaultsName(childName),
            childDefaults = this[childDefaultsName],
            childPropertiesName = this._getPropertiesName(childName),
            childProperties = this[childPropertiesName],
            // pass childDefaultsName so it doesn't have to be recalc'd
            childClassName = this.getAutoChildClass(childName, dynamicDefaults,
                                                    defaultConstructor, childDefaultsName, childPropertiesName),
            childClass = isc.ClassFactory.getClass(childClassName)
        ;
        if (childClass == null) {
            this.logWarn("Unable to create autoChild '"+childName
                         +"' of type '"+childClassName+"' - no such class in runtime.");
            if (isc.isA.String(childClassName) && childClassName.contains(".")) {
                this.logWarn("Did you make the SmartGWT class reflectable? See http://www.smartclient.com/smartgwt/javadoc/com/smartgwt/client/docs/Reflection.html");
            }
            return null;
        }
        
        dynamicDefaults = this.applyDuplicateAutoChildDefaults(
                            childClass, 
                            childDefaultsName, 
                            dynamicDefaults
                          );

        var child = childClass.createRaw();
        
        // autoPassthroughs: mechanism for declaring that certain properties on an autoParent
        // should be passed-through to the same-named properties on children
        // DO NOT USE, this will probably be renamed
        var passthroughs = this.autoPassthroughs,
            passthroughValues,
            undef;
        if (passthroughs) {
            for (var propName in passthroughs) {                
                var targetChildName = passthroughs[propName];
                if (childName == targetChildName && this[propName] !== undef) {
                    child[propName] = this[propName];
                }
            }
        }

        this.applyBaseDefaults(child, childName, passedDynamicDefaults);

        isc.addProperties(child,
                          this.autoChildDefaults,
                          childDefaults, 
                          passthroughValues,
                          dynamicDefaults);

        // call configure methods if available.  These allow maximum speed dynamicDefaults
        // through direct property assignment on the half-created autoChild.  Different
        // autoChildren can be quickly identified (eg child == this.newButton), and sharing
        // defaults across different autoChildren is easier.  These APIs are very advanced
        // because caller needs to understand the half-initialized "raw" state.
        
        if (assignToSlot) this[childName] = child;
        if (child.autoConfigure) child.autoConfigure(this, childName);
        if (this.configureAutoChild) this.configureAutoChild(child, childName);
        isc.addProperties(child, this[childPropertiesName]);

        // call initInterface() on any member interfaces that define the method
        if (childClass._initInterfaceMethods) {
            for (var i = 0; i < childClass._initInterfaceMethods.length; i++) {
                childClass._initInterfaceMethods[i].call(child);
            }
        }

        child.init();

        // Possibly extract from a config block -- will return the child itself
        // if this isn't a SmartGWT config block
        child = isc.SGWTFactory.extractFromConfigBlock(child);
        // Re-assigning to slot in case we extracted the child from an SGWT config block
        if (assignToSlot) this[childName] = child;
        
        // Maintain a mapping between child name and generated auto children IDs
        // This allows us to auto-destroy autochildren on destroy
        // Also used by the AutoTest locator APIs
        if (!this._createdAutoChildren) this._createdAutoChildren = {};
        var ID = child.getID ? child.getID() : null;
        if (ID != null) {
            
            if (!isc.isAn.Array(this._createdAutoChildren[childName])) {
                if (this._createdAutoChildren[childName] != null) {
                    isc.logWarn(this + ".createAutoChild(): Creating auto child named:" + childName
                        + " appears to be replacing autoChild with same name...");
                }
                this._createdAutoChildren[childName] = [ID];

            } else {
                this._createdAutoChildren[childName].add(ID);
            }
        }
        
        return child;
    },
    
    // When creating an autoChild, clone attributes registered for duplication
    // from the class level defaults block (or the special 'autoChildDefaults' object) and 
    // apply cloned versions to dynamic defaults
    // Returns dynamicDefaults passed in - may be null or a new object if the
    // dynamicDefaults were unset originally
    applyDuplicateAutoChildDefaults : function (childClass, childDefaultsName, dynamicDefaults) {
          // clone attributes from class level defaults block that are registered for duplication
        var dupProps = childClass._dupAttrs;
        if (dupProps && dupProps.length > 0) {
            
            var childDefaults = this[childDefaultsName];
            
            if (childDefaults != null || this.autoChildDefaults != null) {
                for (var i = 0; i < dupProps.length; i++) {
                    var attr = dupProps[i],
                        undef;
                    
                    if (childDefaults != null && childDefaults[attr] != null) {
                    
                        if (dynamicDefaults == null) dynamicDefaults = {};
                        if (dynamicDefaults[attr] === undef) {
                            dynamicDefaults[attr] = childClass.cloneDupPropertyValue(
                                                        attr, childDefaults[attr]
                                                    );
                        }
                    } else if (this.autoChildDefaults != null &&
                                this.autoChildDefaults[attr] != null) 
                    {
                        if (dynamicDefaults == null) dynamicDefaults = {};
                        if (dynamicDefaults[attr] === undef) {
                            dynamicDefaults[attr] = childClass.cloneDupPropertyValue(
                                                        attr, this.autoChildDefaults[attr]
                                                    );
                        }
                    }
                }
            }
        }
        return dynamicDefaults;
    },

    
    _completeCreationWithDefaults : function (childName, child, dynamicDefaults) {
        this.applyBaseDefaults(child, childName, dynamicDefaults);

        var childDefaultsName = this._getDefaultsName(childName),
            childPropertiesName = this._getPropertiesName(childName)
        ;

        // duplicate properties from the defaults to the dynamicDefaults block if necessary
        var childClass = child.getClass();
        
        // Note that this won't do anything for SGWT config blocks. But that's OK,
        // because the proper properties will eventually be duplicated when the
        // real Smartclient object is created.
        dynamicDefaults = this.applyDuplicateAutoChildDefaults(
                                childClass,
                                childDefaultsName,
                                dynamicDefaults
                          );

        child.completeCreation(
            // defaults for all named children
            this.autoChildDefaults,
            // instance defaults (for skinning) (eg bodyDefaults)
            this[childDefaultsName],
            // dynamic defaults
            dynamicDefaults,
            // user-provided instance properties
            this[childPropertiesName]
        );
    },

    // parents of named children can be declared as a map "autoChildParentMap" from child name
    // to parent name, on the assumption the parent is also a named child.
    _getAutoChildParentName : function (childName) {
        var parentMap = this.autoChildParentMap;
        if (parentMap) return parentMap[childName];
    },

    getAutoChildParent : function (childName) {
        var parentName = this._getAutoChildParentName(childName);
        if (parentName) return this[parentName];
        return this;
    },

    // set a named child: normally, just evaluates or re-evaluates the show flag in order to create
    // or destroy the component.  Can also be used to replace a named child with a specified
    // component.
    setAutoChild : function (childName, dynamicProperties) {
        
        if (!this.shouldCreateChild(childName)) {
            if (this[childName]) this[childName].destroy();
            // clear our pointer to the destroyed child
            delete this[childName];
        } else {
            // If we're passed a widget, apply it directly (unless shouldCreateChild() returns 
            // false in which case we ignore the widget) 
            if (isc.isA.Canvas(dynamicProperties)) {
                var child = dynamicProperties;
                // set the child to a custom-provided widget
                if (this[childName]) this[childName].destroy();
                this[childName] = child;
                this._addToParent(childName, child);
                return;
            }

            return this.addAutoChild(childName, dynamicProperties);
        }
    },

    

	//>	@method	class.map()
	//
    // Call <code>method</code> on each item in <code>argsList</code> and return the Array of results.
    //
	//	@param	methodName (string)	
    //      Name of the method on this instance which should be called on each element of the Array
	//	@param	items      (Array)	
    //      Array of items to call the method on 
    //
	//	@return            (Array) Array of results, one per element in the passed "items" Array
	// @visibility external
    //<
    map : isc.Class.map,
    
	//>	@method	class.Super()
	//
	// Call the SuperClass implementation of an instance method.  For example:
    // <pre>
    //    isc.defineClass("MyButton", "Button").addProperties({
    //        // this override causes no change in behavior because it just 
    //        // calls Super and returns whatever the superclass would return
    //        getTitle : function () {
    //            return this.Super("getTitle", arguments);
    //        },
    //
    //        // this override would add "foo" to the titles of all buttons
    //        getTitle : function () {
    //            // add code here to take actions before the superclass method is invoked
    //
    //            var superResult = return this.Super("getTitle", arguments);
    //
    //            // add code here to take action after the superclass method is invoked
    //
    //            return superResult + "foo";
    //        }
    //
    //    })
    // </pre>
    // Note that Super is always called with the name of the current method.  You cannot call
    // the Super class implementation of another method directly.
    // <P>
    // It is <b>required</b> to always pass the native 'arguments' object to Super.  Arguments
    // is a JavaScript builtin that is available within any JavaScript function - see any
    // JavaScript Reference for details.
    // <P>
    // See also +link{ClassFactory.defineClass,defineClass()} and
    // +link{classMethod:class.addProperties,addProperties} for the basics of creating classes
    // and overriding methods.
	//
	//	@param methodName   (string)	name of the superclass method to call
	//	@param args         (arguments or Array) native "arguments" object, or array of
    //                                           arguments to pass to the Super call
	//	@param [nativeArgs] (arguments) native "arguments" object, required if an Array is
    //                                  passed for the "args" parameter in lieu of the native
    //                                  arguments object
    //
	//	@return					(any)		return value of the superclass call
	//
	// @visibility external
	//<
	//	@param 	[nativeArguments] (Arguments) native "arguments" object.  Required only if
    //                                        calling Super() with a substitute set of
    //                                        arguments
    Super : isc.Class.Super,
    _delayedSuper : isc.Class._delayedSuper,
    invokeSuper : isc.Class.invokeSuper,

    _assert : isc.Class._assert

});

// NOTE: toString functions CANNOT be added by addMethods, because a property named "toString"
// will not be enumerated by for..in.  This is actually part of the ECMAScript standard!

//>	@classMethod	Class.toString()
//
//  The default toString() for a ClassObject reports that you have a ClassObject and what class
//  it is.
// @visibility external
//<
isc.Class.toString = function () {
    return "[Class " + this.Class + "]";
}

//>	@method	class.toString()
//
//  The default toString() for instances reports that you have an instance of a class and prints
//  the instance ID if present.
// @visibility external
//<
isc.Class.getPrototype().toString = function () {
    return "[" + this.Class + " ID:" + this.ID + "]";
}

//
//  Add Class properties (useful static properties to be referenced by other code)
//
isc.Class.addClassProperties({
    

    // make the isc namespace available on all Class objects
    ns : isc,

    //>	@classAttr  Class.NO_OP	(function : {} : IA)
    //      An empty (no-op) function.  Used as a default setting for event 
    //      handlers to allow observation to occur.
    //      Added as a class constant rather than class method, since this will not be directly
    //      called on the Class object (as in "Class.NO_OP()"), so does not need the logic
    //      usually required for methods.
    //      
    // @group	events
    // 
    //<
    NO_OP : function() {},

    RET_TRUE : function () {
        return true;
    },

    //>	@classAttr  Class._stringMethodRegistry (object : {} : IA)
    //      This object is a map of method names to strings of arguments.
    //      It serves a dual purpose
    //      1 - Any properties listed in here are instance methods of this class which can legally
    //          be assigned string values to eval.
    //      2 - Allows you to get at the set of parameter names used in the string value (for
    //          converting the string to a function).
    //      
    //<
    _stringMethodRegistry: {}

});     // END isc.Class addClassProperties()

//
// add the observation methods to the ClassFactory as well so we can use 'em there
//
isc.addMethods(isc.ClassFactory, {
    observe : isc.Class.getPrototype().observe,
    ignore : isc.Class.getPrototype().ignore
});


//> @classMethod isc.eval()
// Evaluate a string of script and return the result. Falls through to
// +link{classMethod:Class.evaluate(),Class.evaluate()}
//
// @param expression (string) Expression to evaluate
// @return (any) Result of evaluating the expression passed in
// @visibility external
//<
// Additional 'hiddenIFrameEval' param indicating that we're evaluating a JSON block
// rather than executing arbitrary script.
// Note: this differs from a straight call to the native eval function in that you lose scope.
// You can workaround this by using the instance method 'evaluate()', and passing in a mapping
// of variable names to values to be available when the string executes.
 
isc.eval = function (expression, hiddenIFrameEval) {
    return isc.Class.evaluate(expression, null, false, hiddenIFrameEval);
}