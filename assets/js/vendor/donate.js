function isProbablyMobileAndNonViewport() {
  var appVersion = navigator.appVersion;
  var isAndroid = (/android/gi).test(appVersion);
  var isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
  return (isAndroid || isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
};

// this function is giving domain from provided URL
var donorbox  = {
  nonViewportMessageCount: 0,
  get_iframe_domain : function (url){
      var arr = url.split("/");
      var result = arr[0] + "//" + arr[2];
      return result;
  },
  get_iframe_by_src : function (src){
      var all_iframe = document.getElementsByTagName("iframe");
      var target;
      for(var i = 0, max = all_iframe.length; i < max; i++) {
          if (all_iframe[i].src === src) {
              target = all_iframe[i];
              break;
          }
      }
      return target;
  },
  donorbox_resize : function (event) {
      console.log(event.data);
      if (event.data.destination_iframe == undefined){
          return;
      }
      console.log("message is valid")
      var donorbox_iframe = donorbox.get_iframe_by_src(event.data.destination_iframe);
      if (donorbox_iframe == null || donorbox_iframe == undefined) {
          donorbox_iframe = document.querySelector('iframe[name=donorbox]');
      }
      if (donorbox_iframe != null && donorbox_iframe != undefined) {
          if (isProbablyMobileAndNonViewport()) {
              donorbox_iframe.contentWindow.postMessage('non-viewport', '*');
              console.log('success to send message' + donorbox.nonViewportMessageCount.toString());
              donorbox.nonViewportMessageCount++;
          }
          var donorbox_domain = donorbox.get_iframe_domain(donorbox_iframe.src);
          console.log("domain is valid")
          console.log(event.origin !== donorbox_domain)
          console.log(event.origin);
          console.log(donorbox_domain);
          if (event.origin !== donorbox_domain) {
              return;
          }
          var windowWidth;
          if (donorbox_domain) {
              //console.log(event.data);
              //donorbox_iframe.style.height = (event.data) + "px";
              if(event.data.scrollIntoView) {
                // Scroll to view if the ifrom top is not within the current viewport
                if(donorbox_iframe.offsetTop < window.pageYOffset || donorbox_iframe.offsetTop > window.pageYOffset + window.innerHeight)
                  donorbox_iframe.scrollIntoView();
              } else {
                if(donorbox_iframe && parseInt(event.data.height) > 0){
                    donorbox_iframe.style.height = (event.data.height) + 3 + "px";
                }
                windowWidth = window.innerWidth;
                if (windowWidth < 350) {
                    donorbox_iframe.style.minWidth = 'initial';
                }
              }
          }
      }
  }
};
//This function resize the height for "dbox-form-embed" iframe when any message receive
// its also validate if incoming message comes from origin domain then only change height

// this is add event listener to window when any message receive then its call resize method
if (window.addEventListener) {
  window.addEventListener("message", donorbox.donorbox_resize, false);
} else if (window.attachEvent) {
  window.attachEvent("onmessage", donorbox.donorbox_resize);
}
