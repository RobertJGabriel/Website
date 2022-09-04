/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "06a3a4c0459539031f350a7cb90871b5"
  },
  {
    "url": "404.png",
    "revision": "385a8ecb6e3e2805a6ca9c4f1573c13e"
  },
  {
    "url": "apps/index.html",
    "revision": "112f6511ea9e221f721e0b9dca888363"
  },
  {
    "url": "apps/index.png",
    "revision": "d5dad45ff1399ac3bd1b98dd034a1e49"
  },
  {
    "url": "assets/css/blog.css",
    "revision": "ee7c1673f5dce3c32e8da8729faed551"
  },
  {
    "url": "assets/css/help.css",
    "revision": "038c63ab6cb35811940314d495377eb0"
  },
  {
    "url": "assets/css/styles.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/images/apps/editor.webp",
    "revision": "22881ddf28866f61610763b21a025ca8"
  },
  {
    "url": "assets/images/apps/firefox.webp",
    "revision": "2d03947c7e2e8d4b4bd81f1137612de6"
  },
  {
    "url": "assets/images/apps/helperbird.webp",
    "revision": "6276eca5833aca9c00569477a7633f7f"
  },
  {
    "url": "assets/images/apps/opendyslexic.webp",
    "revision": "10c651f386966e4af83d21bb013ff158"
  },
  {
    "url": "assets/images/apps/seo.webp",
    "revision": "3210b06b203a8e3355aafc0f3abdb7b4"
  },
  {
    "url": "assets/images/apps/sync.webp",
    "revision": "478ac388ced94cf6e31de054000f1c33"
  },
  {
    "url": "assets/images/bag/bag.webp",
    "revision": "bffe9b60b6bd651d23642c05828deb9c"
  },
  {
    "url": "assets/images/me-two.png",
    "revision": "1b5499c9c7b03568c13eb731492655a0"
  },
  {
    "url": "assets/images/RobertGabriel-Av1.png",
    "revision": "3d80352af493a762eaa185f1741de926"
  },
  {
    "url": "assets/images/RobertGabriel-Av2.png",
    "revision": "e3ab115be041db34a3da6884b0c906c8"
  },
  {
    "url": "assets/images/RobertGabriel-Av3.png",
    "revision": "b691218ab600bd77decfb7f9cc31a0ab"
  },
  {
    "url": "assets/images/RobertGabriel-Av4.png",
    "revision": "fc1899ce2448660f1d823601a0b075bc"
  },
  {
    "url": "assets/images/RobertGabriel-Av5.png",
    "revision": "9ad6b2beb829bd83e6aaaea5d7c24730"
  },
  {
    "url": "assets/images/RobertGabriel-Av6.png",
    "revision": "49b6a7505e367f3b7f4a86b8c1465403"
  },
  {
    "url": "assets/images/RobertGabriel-Av7.png",
    "revision": "56d4a90b2d030a5fca3d70d5a9288baa"
  },
  {
    "url": "assets/images/social/android-chrome-192x192.png",
    "revision": "69c60878b46f3fd8721d6e95da3370f5"
  },
  {
    "url": "assets/images/social/android-chrome-384x384.png",
    "revision": "9cb7a521b86d78d2585754f8cf534440"
  },
  {
    "url": "assets/images/social/android-chrome-512x512.png",
    "revision": "24c64a0a5f542ccbaff81b8672707fad"
  },
  {
    "url": "assets/images/social/apple-touch-icon-precomposed copy.png",
    "revision": "888ac7670681aeb413d3b4426a0ef2e6"
  },
  {
    "url": "assets/images/social/apple-touch-icon-precomposed.png",
    "revision": "562340ffc912d888e3cc1561037abcf1"
  },
  {
    "url": "assets/images/social/apple-touch-icon.png",
    "revision": "4ea5fa364b6440220963185907a27da0"
  },
  {
    "url": "assets/images/social/favicon-16x16.png",
    "revision": "17158b8efbb1f5432886f58eaa0bee05"
  },
  {
    "url": "assets/images/social/favicon-32x32.png",
    "revision": "d32c531128566514677505a690baa69f"
  },
  {
    "url": "assets/images/social/favicon.ico",
    "revision": "0c86ead95372643b3b9ee1b328f8d2e3"
  },
  {
    "url": "assets/images/social/mstile-150x150.png",
    "revision": "36965f55e6deabf19d04768438d0ce93"
  },
  {
    "url": "assets/images/social/safari-pinned-tab.svg",
    "revision": "aac90eeaba968d2f723b3655f832527f"
  },
  {
    "url": "assets/images/story/IMG_0336.webp",
    "revision": "08bea5296eeea4325122065f4ab4cf89"
  },
  {
    "url": "assets/images/story/IMG_0641.webp",
    "revision": "7df2746f82b479bb4ea3332bd69292ef"
  },
  {
    "url": "assets/images/story/map.webp",
    "revision": "a0e9abae9337fd0680660e509eae4dff"
  },
  {
    "url": "assets/images/story/paris.webp",
    "revision": "f69b7c17c0c7db734f3146b690d26b9c"
  },
  {
    "url": "assets/images/story/spain (1).webp",
    "revision": "80befe29952ff101b316dcc272e089d8"
  },
  {
    "url": "assets/images/story/spain.webp",
    "revision": "80befe29952ff101b316dcc272e089d8"
  },
  {
    "url": "assets/images/story/UNADJUSTEDNONRAW_thumb_100e.webp",
    "revision": "b055b59bd7db1c4498a151727d183435"
  },
  {
    "url": "assets/images/story/UNADJUSTEDNONRAW_thumb_1696.webp",
    "revision": "76723e184d07bd907302b642b2a34166"
  },
  {
    "url": "assets/images/websites/blog.webp",
    "revision": "eff96bf3f1753578dc1d0107d3a06d4b"
  },
  {
    "url": "assets/images/websites/clare.webp",
    "revision": "6027de5c0f08b575a235e337dd388d22"
  },
  {
    "url": "assets/images/websites/clean.webp",
    "revision": "7b77882fddb01c07b9c921a368ef3be2"
  },
  {
    "url": "assets/images/websites/court.webp",
    "revision": "c552e7a9a0594de195f2c4a6f185eae8"
  },
  {
    "url": "assets/images/websites/desk.webp",
    "revision": "f88f6cb3bdf1f279607c56a7c15fc882"
  },
  {
    "url": "assets/images/websites/deskapi.webp",
    "revision": "24f0a27c6be0b5c4e1e412a32baa2810"
  },
  {
    "url": "assets/images/websites/jacks.webp",
    "revision": "1664cca11dcc98fc5e6cb44543b6fc0a"
  },
  {
    "url": "assets/images/websites/teamwork.webp",
    "revision": "98406c7ef6aca3b9f9aaa6c3b01dfb28"
  },
  {
    "url": "assets/images/websites/vectorpm.webp",
    "revision": "fa07d312307dc0d617a26ba62cef1306"
  },
  {
    "url": "assets/images/websites/yaa.webp",
    "revision": "c6fb7f6b1004587127a5779ade1d51bc"
  },
  {
    "url": "assets/js/core/app.js",
    "revision": "9471d06970ab6b164fcdf115de7c310a"
  },
  {
    "url": "assets/js/core/worldmap.js",
    "revision": "5b40d23971eb06c680032e0dbd4b4305"
  },
  {
    "url": "assets/js/core/youtube.js",
    "revision": "01c5fa9ef1159467c6823c275882179f"
  },
  {
    "url": "assets/js/index.js",
    "revision": "9c4909346822294493f76ae9436e2847"
  },
  {
    "url": "assets/js/main.bundle.js",
    "revision": "d224cb328d3e21f77391d1b99bde5fb7"
  },
  {
    "url": "assets/js/main.css",
    "revision": "ce5ede510915cba7fb3b764705949f7e"
  },
  {
    "url": "assets/videos/HBmenu1.png",
    "revision": "811e05d43e9c331f752dd97e9c271dd1"
  },
  {
    "url": "assets/videos/HBmenu2.png",
    "revision": "d6fa4c050eacc3df39edfa231363031d"
  },
  {
    "url": "awards/index.html",
    "revision": "401441c50af0aea1d69cad2c2407132d"
  },
  {
    "url": "awards/index.png",
    "revision": "e78bd6a22dde3673090cf975c697574e"
  },
  {
    "url": "blog/adblockers/index.html",
    "revision": "f42c11818a5e728c7b7e6971ed381dc3"
  },
  {
    "url": "blog/adblockers/index.png",
    "revision": "44bf1f7fc049b98a64151b784757e5a5"
  },
  {
    "url": "blog/bag/index.html",
    "revision": "ac2610d72fe4ec82dfa8bcb51dd6da17"
  },
  {
    "url": "blog/bag/index.png",
    "revision": "9701b70d60a0bf353b69c91198904efa"
  },
  {
    "url": "blog/index.html",
    "revision": "3a5ab031dfa51d3cc0be43545cad00bb"
  },
  {
    "url": "blog/index.png",
    "revision": "89969ea7f9c1acc12c4f5e867645e822"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.html",
    "revision": "2848bd0b52e32bc10891305a30f99cef"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.png",
    "revision": "5ef0b12de29f5c6c3f37005dfd315dd6"
  },
  {
    "url": "cailin/index.html",
    "revision": "efe21a71a6e7eb14c76f37bb0ca499a3"
  },
  {
    "url": "cailin/index.png",
    "revision": "89969ea7f9c1acc12c4f5e867645e822"
  },
  {
    "url": "contact/index.html",
    "revision": "e0b6fbe186c7f3c39e04356d0d869f3d"
  },
  {
    "url": "contact/index.png",
    "revision": "cfafa168fe87f7cfb7e875ac2ffb7059"
  },
  {
    "url": "css/chrome-dino/index.html",
    "revision": "0cf583f62a3459a6116fe80fa5ab6721"
  },
  {
    "url": "css/chrome-dino/index.png",
    "revision": "ef8460eabf6743d820f8969417288a3c"
  },
  {
    "url": "css/imac/index.html",
    "revision": "db0f95ad733a20bdeb8930359f650e98"
  },
  {
    "url": "css/imac/index.png",
    "revision": "857969c0d46b919519209c71c25130ee"
  },
  {
    "url": "index.html",
    "revision": "a0280227acfe3e2bc82342a1bf354f73"
  },
  {
    "url": "index.png",
    "revision": "20590ace41836b629307b56cae2eb0aa"
  },
  {
    "url": "sitemap/index.html",
    "revision": "1640adfcd21d06154310513e2299beab"
  },
  {
    "url": "sitemap/index.png",
    "revision": "2ab5caf85945eb1c9841111ea3361595"
  },
  {
    "url": "talks/index.html",
    "revision": "271d79ce7d35cee644bcc248244ff41e"
  },
  {
    "url": "talks/index.png",
    "revision": "4a5118555059926e650245ef62737f9b"
  },
  {
    "url": "websites/index.html",
    "revision": "7117692a008ffcdb940f9a8bf34e8d7f"
  },
  {
    "url": "websites/index.png",
    "revision": "4e1fbfe031cb8e62d3a81459c96ff617"
  },
  {
    "url": "work/index.html",
    "revision": "a13771582adbf4cec57530ceeda4eb7e"
  },
  {
    "url": "work/index.png",
    "revision": "89969ea7f9c1acc12c4f5e867645e822"
  },
  {
    "url": "worldmap/index.html",
    "revision": "d85f9b328bc30b3bd9bf1a0e4d20e347"
  },
  {
    "url": "worldmap/index.png",
    "revision": "cc52d1c4e412bc7d3b9fbd90c13246e9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
