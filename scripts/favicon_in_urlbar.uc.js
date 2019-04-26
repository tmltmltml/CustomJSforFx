// 'Favicon in urlbars identity box' script for Firefox 60+ by Aris
//
// This script restores current pages favicon inside urlbar (aka location bar, address bar or awesome bar).
// [!] If a page does not offer a favicon, browser branches default icon is shown.
// [!] In a multi-window environment pages without favicons might show wrong icons.


var FaviconInUrlbar = {
 init: function() {
   try {
	// update script every time tab attributes get modified (switch/open tabs/windows)
	document.addEventListener("TabAttrModified", updateIcon, false);
	document.addEventListener('TabSelect', updateIcon, false);
	document.addEventListener('TabOpen', updateIcon, false);
	document.addEventListener('TabClose', updateIcon, false);
	document.addEventListener('load', updateIcon, false);
	document.addEventListener("DOMContentLoaded", updateIcon, false);

	function updateIcon() {
		
	 setTimeout(function(){ // timeout fixes wrong icon detection in some cases
	  
	  // get current tabs favicon
	  var favicon_in_urlbar = gBrowser.selectedTab.image;
	  
	  // if current tab offers no icon, use default branch icon
	  if(!gBrowser.selectedTab.image || gBrowser.selectedTab.image == null)
		favicon_in_urlbar = 'chrome://branding/content/identity-icons-brand.svg';
	  
	  document.querySelector('#identity-icon').style.listStyleImage = "url("+favicon_in_urlbar+")";
	  
	 },100);

	}
	
	/* restore icon badge for websites with granted permissions */
	var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
	var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(' \
		\
		.grantedPermissions::before { \
		  content: "" !important; \
		  display: block !important; \
		  width: 6px !important; \
		  height: 6px !important; \
		  position: absolute !important; \
		  -moz-margin-start: 11px !important; \
		  margin-top:-8px !important; \
		  background: Highlight !important; \
		  border-radius: 100px !important; \
		} \
		\
	'), null, null);

	// remove old style sheet
	if (sss.sheetRegistered(uri,sss.AGENT_SHEET)) sss.unregisterSheet(uri,sss.AGENT_SHEET);
	
	sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

  } catch(e) {}
 }
};

// initiate script after DOM/browser content is loaded
document.addEventListener("DOMContentLoaded", FaviconInUrlbar.init(), false);
