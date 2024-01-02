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
    "revision": "e2eef4e992ac1589cbc74dd5d9f10592"
  },
  {
    "url": "404.png",
    "revision": "cd79f164a6d3ae7bf9ef902914e20aac"
  },
  {
    "url": "apps/index.html",
    "revision": "5f0616f1c582cc921c1e6fa503ec3c3c"
  },
  {
    "url": "apps/index.png",
    "revision": "45c021cbf46f228cd0c30c1824220b87"
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
    "url": "assets/images/apps/coffee.png",
    "revision": "835aae9ca06f8e91251903e222b94d3c"
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
    "url": "assets/images/work/coffee-and-fun.png",
    "revision": "835aae9ca06f8e91251903e222b94d3c"
  },
  {
    "url": "assets/images/work/helperbird.png",
    "revision": "f6f3b6a69cf6cead4e27ae79547fd51e"
  },
  {
    "url": "assets/images/work/markdown.png",
    "revision": "b4ecd19b03666fd7a61e8ac11b04354c"
  },
  {
    "url": "assets/images/work/simple.webp",
    "revision": "7826acae36a1c3771503f7265e87bbc4"
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
    "revision": "aa6ba33f6a55ed1260db60ba19a316bd"
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
    "revision": "dd51507f3b33afc11608ade2ea0764c9"
  },
  {
    "url": "awards/index.png",
    "revision": "d64dbf7ed6cb512916d9a1e8ba4298dc"
  },
  {
    "url": "blog/adblockers/index.html",
    "revision": "4a01225ec8c1f86572d45dfc25a00e9a"
  },
  {
    "url": "blog/adblockers/index.png",
    "revision": "6b1e4fd7839371289f071842ac8b312a"
  },
  {
    "url": "blog/bag/index.html",
    "revision": "b0685e4bb32c4defe0e1af67068dc856"
  },
  {
    "url": "blog/bag/index.png",
    "revision": "52385888d47a1fbb4a0fde4dbcf9c10e"
  },
  {
    "url": "blog/favourite-apps-of-2023/index.html",
    "revision": "36c93bd0cd58d947ea94e55417ec1df7"
  },
  {
    "url": "blog/favourite-apps-of-2023/index.png",
    "revision": "dd3624b340cc7efd5ad3697b1684db46"
  },
  {
    "url": "blog/index.html",
    "revision": "df6362552dd3999aa5ff5d1ac16f08be"
  },
  {
    "url": "blog/index.png",
    "revision": "b3946e80a136d472c519d90ca0f6fe88"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.html",
    "revision": "44baecd71d4757ba90a6ddfaea5e2991"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.png",
    "revision": "dab9510b8175d5b2cee7569547d3fec1"
  },
  {
    "url": "cailin/index.html",
    "revision": "d46169149db502c1e45cddbefefdfc4c"
  },
  {
    "url": "cailin/index.png",
    "revision": "b3946e80a136d472c519d90ca0f6fe88"
  },
  {
    "url": "css/chrome-dino/index.html",
    "revision": "a15c6bc9d6b3e533c7d0ef081ae79037"
  },
  {
    "url": "css/chrome-dino/index.png",
    "revision": "5224a03eb5c512740b29b912326026f2"
  },
  {
    "url": "css/imac/index.html",
    "revision": "2f7d7b36eac325793e908a934f87232c"
  },
  {
    "url": "css/imac/index.png",
    "revision": "b223afac04b6e37833ea02bdf36d3842"
  },
  {
    "url": "index.html",
    "revision": "06b28ea69eac723d8cd221f543679596"
  },
  {
    "url": "index.png",
    "revision": "e7cb9fdfce0f5bdb3966650127add68a"
  },
  {
    "url": "sitemap/index.html",
    "revision": "075dcb13e1a543fc5f9390776cecc590"
  },
  {
    "url": "sitemap/index.png",
    "revision": "78dcec035e62523ff9710cd70f5992c5"
  },
  {
    "url": "talks/index.html",
    "revision": "59ca503f73e22040c80479972a79ab08"
  },
  {
    "url": "talks/index.png",
    "revision": "d7123412abe8b99c4ab1fc51a56fbe63"
  },
  {
    "url": "websites/index.html",
    "revision": "fc567e5aa11466069104d24f4e10255e"
  },
  {
    "url": "websites/index.png",
    "revision": "ce04ea32d1822ab7b44f2bab0948c306"
  },
  {
    "url": "work/index.html",
    "revision": "973eb9173df20999da61fe19adc0b134"
  },
  {
    "url": "work/index.png",
    "revision": "39efe508285e39e4f08ecbff6acd8f0c"
  },
  {
    "url": "worldmap/index.html",
    "revision": "d6fb28b302e540f6339468762344ccdd"
  },
  {
    "url": "worldmap/index.png",
    "revision": "4832e7efdcc87e7515efdb204d717822"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
