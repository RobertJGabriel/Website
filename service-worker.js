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
    "revision": "44c87906129c06331c4b50f0d5aa3708"
  },
  {
    "url": "404.png",
    "revision": "6349399459909e36d88b072b9d3eff74"
  },
  {
    "url": "about/index.html",
    "revision": "111b4cdf9f89fb762bf7657b090bce8f"
  },
  {
    "url": "about/index.png",
    "revision": "3e472ac0724048db27e9775b01648629"
  },
  {
    "url": "apps/index.html",
    "revision": "b5b1c11bd220dfd3cb3a4a46c2845052"
  },
  {
    "url": "apps/index.png",
    "revision": "59c5c0050c02230e5bbb4be80adbbc88"
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
    "url": "assets/images/apps/banned.png",
    "revision": "e6c8c92534c4e62e09ef0eca2f68f799"
  },
  {
    "url": "assets/images/apps/bear.png",
    "revision": "2bbb51bed83c4b102dcf895967c185f2"
  },
  {
    "url": "assets/images/apps/beard.png",
    "revision": "a9cdd57de4d643dd733bfdcb1189ab4a"
  },
  {
    "url": "assets/images/apps/coffee.png",
    "revision": "e5c3db28251623046817aae3cadfde0a"
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
    "url": "assets/images/apps/flash.png",
    "revision": "a58401282ece9199e3d3eb7748f2f0e8"
  },
  {
    "url": "assets/images/apps/flashcards.png",
    "revision": "b7c462081c51f438512c70801859922f"
  },
  {
    "url": "assets/images/apps/google.png",
    "revision": "6868fe1c3f04798214bd1b25b9abe8e1"
  },
  {
    "url": "assets/images/apps/helperbird.png",
    "revision": "90dc1616791ecd12d6faf91b765f9909"
  },
  {
    "url": "assets/images/apps/helperbird.webp",
    "revision": "6276eca5833aca9c00569477a7633f7f"
  },
  {
    "url": "assets/images/apps/instant-incognito.png",
    "revision": "797b5f271c51677f741f2914a5c1bda0"
  },
  {
    "url": "assets/images/apps/markdown.png",
    "revision": "56fd268030efb56aaccd22354d3ff4c8"
  },
  {
    "url": "assets/images/apps/netflix.png",
    "revision": "fc0a3cf92204bfbfa951580401e67101"
  },
  {
    "url": "assets/images/apps/opendyslexic.webp",
    "revision": "10c651f386966e4af83d21bb013ff158"
  },
  {
    "url": "assets/images/apps/pii.png",
    "revision": "b460f66f8d61c64330694e6a8707e5d6"
  },
  {
    "url": "assets/images/apps/screenshot.png",
    "revision": "51929f98c1f979bf8e908196e161d233"
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
    "url": "assets/images/blog/adblockers.png",
    "revision": "06a641ce85acead48eb60de6b5168e74"
  },
  {
    "url": "assets/images/blog/attacks.png",
    "revision": "28ddbee097ab48f398095d56f5c6ace3"
  },
  {
    "url": "assets/images/blog/bag.png",
    "revision": "3fe96fdc246a302bede68fa4e9d20ea0"
  },
  {
    "url": "assets/images/blog/banned.png",
    "revision": "6f195054687ebc71fa0c243c406d1b22"
  },
  {
    "url": "assets/images/blog/beard.png",
    "revision": "9f674c878cf87b89699b21bd4883cf95"
  },
  {
    "url": "assets/images/blog/coffee.png",
    "revision": "dd72967ec9fe4a988a30f2cb476b6268"
  },
  {
    "url": "assets/images/blog/eye.png",
    "revision": "b6068cc572e1e243eb1e76413a4b6164"
  },
  {
    "url": "assets/images/blog/fav.png",
    "revision": "f3199b35bb35a71bfb142869382be253"
  },
  {
    "url": "assets/images/blog/flashcards.png",
    "revision": "a135512f8ef0d93d2919d7d5f91cb2ea"
  },
  {
    "url": "assets/images/blog/google.png",
    "revision": "03f15f4c7f8ca17e82d9ced2c4c4b40a"
  },
  {
    "url": "assets/images/blog/helperbird.png",
    "revision": "2c48c4760a98eb3ad7d9bc656116f12b"
  },
  {
    "url": "assets/images/blog/markdown.png",
    "revision": "2cf027bc5b50f72101ee06638da04e88"
  },
  {
    "url": "assets/images/blog/netflix.png",
    "revision": "3091498e75a1914b9d95a72c98674ec7"
  },
  {
    "url": "assets/images/blog/opendyslexic.png",
    "revision": "d7f1fcc68975809f8f65ec023d78bdfe"
  },
  {
    "url": "assets/images/blog/panic-attacks-and-anxiety/index.png",
    "revision": "c0da0d837c079b620cc884967bc22d65"
  },
  {
    "url": "assets/images/blog/pokemon.png",
    "revision": "bcf35bfdb07a8e505201f27f8889e7f4"
  },
  {
    "url": "assets/images/blog/reddit.webp",
    "revision": "b1ef4883b243b20ff1d2379a96ed57c6"
  },
  {
    "url": "assets/images/blog/screenshot.png",
    "revision": "c1720c722b0852b1cc239ede4f870bb2"
  },
  {
    "url": "assets/images/blog/tumor.png",
    "revision": "7f2febc8bc4bfbfe1981f5786bdfbba8"
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
    "revision": "3f7227a4c8381e5bb400e173cc776408"
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
    "revision": "85ecd42be8a5762af5e4f4f90614dff6"
  },
  {
    "url": "awards/index.png",
    "revision": "d7a30ccafa93ecacffa2bdf8d4d2cd5c"
  },
  {
    "url": "blog/ my-rare-eye-teratoma-tumor-story/index.html",
    "revision": "10ba011ded676b567b15ca9645c93507"
  },
  {
    "url": "blog/ my-rare-eye-teratoma-tumor-story/index.png",
    "revision": "e798a3a75e5f3cc2d5e28c7050724335"
  },
  {
    "url": "blog/adblockers/index.html",
    "revision": "165381c9258d1b50ef3d67641137226b"
  },
  {
    "url": "blog/adblockers/index.png",
    "revision": "d1e245300c7622abb9e8a886609a278c"
  },
  {
    "url": "blog/bag/index.html",
    "revision": "42b5300d9f497dc25e80915e7289ef20"
  },
  {
    "url": "blog/bag/index.png",
    "revision": "c15312dda7e4dcc4509bed39ef0e0664"
  },
  {
    "url": "blog/favourite-apps-of-2023/index.html",
    "revision": "a69ab490be84cb908f65ebe41bc0edd6"
  },
  {
    "url": "blog/favourite-apps-of-2023/index.png",
    "revision": "146cfade23989d6e9ddf7589445256ed"
  },
  {
    "url": "blog/finding-an-exploit-and-annoying-the-xbox-dev-team/index.html",
    "revision": "b7d1b2038300e00f83cda25dc53af74e"
  },
  {
    "url": "blog/finding-an-exploit-and-annoying-the-xbox-dev-team/index.png",
    "revision": "6a2d53da023803a55b9286623ba5619a"
  },
  {
    "url": "blog/index.html",
    "revision": "91d3dc7929fe43d53b594e7290c7ba0e"
  },
  {
    "url": "blog/index.png",
    "revision": "2ee84fe6f53a02e9e3beb5e52f2f7c04"
  },
  {
    "url": "blog/panic-attacks-and-anxiety/index.html",
    "revision": "0ef7021ef242f7e092f77f2b322c4ab4"
  },
  {
    "url": "blog/panic-attacks-and-anxiety/index.png",
    "revision": "8e2074bcd1d91af34af60076787f69b8"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.html",
    "revision": "c6825637af8c12d442e5918c267ff2e1"
  },
  {
    "url": "blog/research-into-web-accessibility-for-dyslexics/index.png",
    "revision": "bcc0c77672e13851386b4565f513a3ca"
  },
  {
    "url": "blog/the-timeless-magic-of-pokemon-crystal-and-its-legacy-for-future-generations/index.html",
    "revision": "9e639c7cbb5858e6063be4b48d0e3ce7"
  },
  {
    "url": "blog/the-timeless-magic-of-pokemon-crystal-and-its-legacy-for-future-generations/index.png",
    "revision": "fcfb718a9d6d55afad2b3e7a970c5c2d"
  },
  {
    "url": "cailin/index.html",
    "revision": "2f52fe0619e3c49d319013e0bfe69f3b"
  },
  {
    "url": "cailin/index.png",
    "revision": "60aab097334725ba2449f40aa3f104f3"
  },
  {
    "url": "css/chrome-dino/index.html",
    "revision": "ebab9bbdc7e626f10140e55c04737919"
  },
  {
    "url": "css/chrome-dino/index.png",
    "revision": "83b134372c354ee8a27b3ff428f36163"
  },
  {
    "url": "css/imac/index.html",
    "revision": "bc931dca5215cd3e68d87a821cfdb291"
  },
  {
    "url": "css/imac/index.png",
    "revision": "7473b75cc89613a2ffdecb52745ee489"
  },
  {
    "url": "index.html",
    "revision": "65d3f7affdee3845b571b6acf2a34370"
  },
  {
    "url": "index.png",
    "revision": "3e472ac0724048db27e9775b01648629"
  },
  {
    "url": "sitemap/index.html",
    "revision": "f12033713f0168181daef9f3eed392f2"
  },
  {
    "url": "sitemap/index.png",
    "revision": "56234f7083e253d953dbde1dc7712c12"
  },
  {
    "url": "talks/index.html",
    "revision": "14f6e20f39fa44856c380e30ed398681"
  },
  {
    "url": "talks/index.png",
    "revision": "e270c0dc4c99791bb3864c81b7833e5b"
  },
  {
    "url": "websites/index.html",
    "revision": "957aad29c7e0850ae9fa71077471f589"
  },
  {
    "url": "websites/index.png",
    "revision": "081fabbf8473425a9218b39ce3420646"
  },
  {
    "url": "work/index.html",
    "revision": "f188aeec952249cc56008f6f262ffcfd"
  },
  {
    "url": "work/index.png",
    "revision": "d9598d91d85e62518a3cc8f9ff64e17a"
  },
  {
    "url": "worldmap/index.html",
    "revision": "b1c811e5e63b8a2a1c3c9b2fe74c344b"
  },
  {
    "url": "worldmap/index.png",
    "revision": "72c890038033097bdd8c86cc07ec8951"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
