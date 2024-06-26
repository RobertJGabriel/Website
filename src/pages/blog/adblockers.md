---
hideHeader: false
layout:  templates/blog.html
title: Problems Posed by Ad-blockers
description: Discover the history and the problems posed by ad-blockers. Includes the in-depth research papers. Dated 2017.
keywords: HTML,CSS,XML,JavaScript,Robert James Gabriel,award winning, php , experienced,Galen, angular, HTML, HTML5, JavaScript, Node, PHP and SQL developer,golang,web design
url: blog/adblockers/
tags: blog
blog_cat: Blog
youtubeId: PfILiWebkuc
cardTitle: Problems Posed by Ad-blockers
blog_snip: Discover the history and the problems posed by ad-blockers. Includes the in-depth research papers.
dated: April 1st 2015
cat: Blog
img: /assets/images/blog/adblockers.png

---

<h1 class="mt-4 mb-4 text-2xl" id="introduction">Introduction</h1>
<p class="mt-8 mb-8 text-xl">
  Ad blocking, one of the fastest-growing phenomena in internet usage [1], is a
  type of software that removes or alters advertising content on a web page,
  most commonly in the form of browser extensions. It allows users to disable
  the ad blocker on websites by whitelisting them, which is a list of sites where
  ads are allowed to run. Ad blocking has existed for the past 15 years, initially gaining popularity on Firefox and later becoming more prevalent on other
  systems and browsers such as Google's Chrome and Kali Linux.
</p>

<p class="mt-8 mb-8 text-xl">
  Desperate times call for desperate measures. Publishers and ad-dependent
  websites have attempted to fight back against the growing adoption of
  ad-blockers. In response, they've employed various methods, from introducing
  paywalls and limiting content access to fully blocking users of ad blockers.
</p>

<p class="mt-8 mb-8 text-xl">
  Ad-blocking is experiencing a popularity explosion, posing a challenging,
  universal issue across the global publishing industry. While ad-blocking is
  most common among video game and technology sites (30-50 percent) [2], the
  use of ad blockers on other sites, such as business news, entertainment, and
  sports news, is also on the rise, according to PageFair [3].
</p>

<p class="mt-8 mb-8 text-xl">
  The challenges posed by ad blockers for publishers are quite concerning. However, it is easy to understand why people frequently resort to ad blockers, as they offer improvements in performance and speed, enhanced privacy and security, and a distraction-free browsing experience. It's crucial to comprehend these reasons so that solutions can be developed to address the rise in ad blocker usage. This increase has already had a significant impact on many websites and is likely to influence the future of internet advertising. Both the methods used to combat ad blockers and the necessary changes in revenue models will be affected by this new challenge. Given that advertising is a central part of international economies, the increasing use of ad blockers could have far-reaching effects on our society as a whole.
</p>


<h1 class="mt-4 mb-4 text-2xl" id="what-is-ad-blocking">What is Ad Blocking</h1>
<p class="mt-8 mb-8 text-xl">
  Ad blocking, in this context, is a term not limited to a specific platform or device; it is a general term for software designed solely to remove advertisements from websites or web applications. Many modern web browsers, such as Google's Chrome and Mozilla Firefox, automatically block pop-up adverts by default. The use of browser extension ad blockers to prevent ads from loading is also common. It has been estimated that 9% of all website views come from browsers with ad-blocking extensions installed [4], and for some publishers, 40% or more of their visitors are using ad blockers [3].
</p>

<p class="mt-8 mb-8 text-xl">
  Several ad blockers are available, with the most popular being Adblock Plus.
  Adblock Plus itself has no functionality, meaning it does not block anything
  until instructed to do so. However, the ad blocker comes bundled with
  pre-selected lists of what to block, known as filter lists. Filter lists are
  extensive sets of rules that instruct Adblock Plus on which parts of a website
  to block. Users can also add any filter lists they want, such as those for
  blocking tracking or malware. Almost all filters are open source, and many
  are created and maintained by a large online community of users [5].
</p>
<p class="mt-8 mb-8 text-xl">
  <img
    src="/assets/img/talks/graphAdblocker.webp"
    alt="Graph illustrating the growth of Adblocker"
  />
</p>
<p class="mt-8 mb-8 text-xl">
  Ad blocking as a whole has experienced a 41% growth from 2014 to the end of
  2015, showcasing its significant increase in popularity [3]. In the US alone,
  it grew by 48% over a 12-month period from June 2014 to June 2015, reaching
  45 million active users in the U.S. as of January 2016 for both mobile and
  desktop users [3].
</p>


<h2 class="mt-4 mb-4 text-2xl" id="benefits-to-the-user">
  Benefits to the User
</h2>
<p class="mt-8 mb-8 text-xl">
  Ad blockers offer several useful benefits to the user. They block or hide offensive material and other unpleasant elements, and they can also prevent malicious code from running. While ads on the web can be irritating and intrusive, some users choose not to block every ad as they understand that websites rely on advertising to generate income, enabling them to provide free content.
</p>
<p class="mt-8 mb-8 text-xl">
  However, even for users who prefer not to block ads, installing an ad blocker can be worthwhile. It allows web pages to load more quickly, providing cleaner-looking pages that are easier to read, especially for those with reading disabilities. Ad-free web pages consume fewer resources, leading to extended battery life on mobile phones and substantial energy savings. Filtering ads before they load also has financial benefits for users who pay for total transferred bandwidth, like many mobile users worldwide. Additionally, ad blockers enhance security, as online advertising poses a higher risk of infecting devices compared to surfing pornographic sites [6]. These benefits are discussed in further detail below.
</p>


<h1 class="mt-4 mb-4 text-2xl" id="performance-issues">Performance Issues</h1>
<p class="mt-8 mb-8 text-xl">
  Using an ad blocker significantly impacts loading speeds [7]. However, improved loading comes with some side effects, such as memory or RAM consumption [5]. According to Mozilla Firefox engineer Nicholas Nethercutt, running Adblock Plus in the background on Firefox 40 results in an increase in RAM usage ranging from 80-100MB. The primary issue arises from the process by which Adblock Plus blocks ads [8]. Adblock Plus inserts a substantial CSS stylesheet, consuming approximately 4MB of RAM, into every web page visited. This stylesheet removes ads and overrides existing stylesheets.
</p>
<p class="mt-8 mb-8 text-xl">
  In the modern era of the web, known as web 2.0, it is common for a web page to have multiple iframes and various website elements loading through API calls. These iframes represent separate web pages loaded and embedded within the page the user is viewing. An example is the feature-loaded social sharing widgets on platforms like Facebook.
</p>
<p class="mt-8 mb-8 text-xl">
  When you add a widget to your site, it consists of an iframe containing a separate web page hosted on Facebook's servers. As web pages become more complex, having an ad blocker that consumes 4MB of RAM per tab may not be sustainable.
</p>
<p class="mt-8 mb-8 text-xl">
  In Nethercote’s testing, TechCrunch served as an example. The site utilized around 194MB of RAM without Adblock Plus (ABP) enabled, but that figure doubled to 417MB with ABP enabled, particularly after triggering all the social widgets and plugins.
</p>
<p class="mt-8 mb-8 text-xl">
  Intrigued by these results, I replicated the experiment using the Los Angeles Times website. Employing Google’s PageInsider development tools, I measured the machine's resources when loading the Los Angeles Times website with and without Adblock Plus [9]. The impact on RAM use in Chrome was comparable to Nethercote’s findings, yielding very similar results.
</p>
<p class="mt-8 mb-8 text-xl">
  Despite the unfortunate effect ad blocking has on RAM, the reduction in loading ads (pre-rendering the page and injecting the CSS) leads to a significant performance improvement, particularly in loading time. The test results below showcase the homepage of the popular website, The Los Angeles Times [10].
</p>
<table class="mt-8 mb-8">
  <tr>
    <th class="text-xl">The Los Angeles Times</th>
    <th class="text-xl">With Adblock</th>
    <th class="text-xl">Without Adblock</th>
  </tr>
  <tr>
    <td class="text-xl">Loading Times (seconds)</td>
    <td class="text-xl">11</td>
    <td class="text-xl">4</td>
  </tr>
  <tr>
    <td class="text-xl">Size of page (MB)</td>
    <td class="text-xl">5.7</td>
    <td class="text-xl">1.4</td>
  </tr>
</table>
<h1 class="mt-4 mb-4 text-2xl" id="speed">Speed</h1>
<p class="mt-8 mb-8 text-xl">
  Download speed and rendering of websites and content are critical issues for users, with the average load time expected to be under 5 seconds. It would make sense for developers to be committed to increasing loading speed and reducing rendering time; however, that does not seem to be the case. I conducted informal research on developers' attitudes toward ad loading to confirm my suspicions. In my poll, I asked developers whether they optimize the loading of ads on their web pages, using tools such as asynchronous loading [11].
</p>
<p class="mt-8 mb-8 text-xl">
  In computer programs, asynchronous operation means that a process operates independently of other processes [12]. According to my results, the majority of web developers do not prioritize this, making it easy to understand why users would opt for ad blockers. Developers often do not consider the time taken for loading ads in their apps or websites.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="security">Security</h1>
<p class="mt-8 mb-8 text-xl">
  Third-party advertisements can pose a serious threat to computer security. For example, in a high-profile case, malware was distributed through advertisements provided to YouTube by a malicious customer using Google's Doubleclick network [13]. In August 2015, a 0-day exploit in Firefox browsers was discovered in an advertisement running on a website [14]. The website Forbes requires users to disable ad blocking before viewing their website. However, in one incident, some of the website’s users were served with pop-under malware once they had disabled their ad blockers [15]. These examples demonstrate that ad blockers not only make surfing the internet more comfortable for the user but also safer.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="privacy">Privacy</h1>
<p class="mt-8 mb-8 text-xl">
  Users employ ad blockers because some advertisements abuse privacy by adding features in the website's code to track users online. This can be easily exploited to gain access to users’ cookies, which may contain sensitive information. Advertising platforms take advantage of tracking user behavior based on the sites they visit. Ad blockers are popular among users who do not want their browsing history sold to advertisers and advertising networks, making Adblock Plus particularly popular among users who prioritize privacy.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="problems-posed-by-ad-blockers">Problems Posed by Ad Blockers</h1>
<p class="mt-8 mb-8 text-xl">
  The economic consequences of ad blocking for online businesses were reported by Adobe/PageFair, estimating the cost to publishers in 2016 alone could be as much as €22 billion [3]. If an ad is running on a website but is snubbed by the user because their ad-blocker is hiding it, this ad provides no value to the website owner. Advertisers perceive little value in putting brands in front of users who ignore advertisements. As a result, sites are rarely paid “per click” anymore, with the standard metric for selling web display ads being “CPM” or “cost per mille” – the cost for a thousand views [16].
</p>
<p class="mt-8 mb-8 text-xl">
  The majority of websites on the internet would not exist without advertising. Websites, from personal WordPress sites to online magazines like Wired, depend on advertising revenues to keep running. Apple endorsing ad blockers, allowing people to produce ad-blocking technology for their app store [17], is significant news. With Apple's user base of 1.2 billion [18], this will introduce ad blocking to a whole new set of users on a larger scale.
</p>
<p class="mt-8 mb-8 text-xl">
  According to data from Adobe and PageFair, the adoption of desktop ad blockers has risen from approximately 21 million users in 2010 to more than 181 million users in January 2016 [19]. The report states that the growth of ad-blocking will cost advertisers more than $40 billion by 2016 [24], although other reports have given much lower estimations.
</p>
<p class="mt-8 mb-8 text-xl">
  It is inevitable that the rise of ad blockers will affect advertisers. Some advertisers may notice a huge impact on the performance of their price per click campaigns, while others won’t notice any change at all. This development can be compared to Google’s algorithm updates [7], during which some sites get badly affected by changes in the ordering and display of search results.
</p>
<p class="mt-8 mb-8 text-xl">
  Text-based and price per click ads used by advertising networks such as Google AdWords are universally affected by ad blockers. An increase in ad blocker usage would negatively impact many advertising campaigns. For example, if a website owner is running a price per click campaign targeting mobile users on devices such as Apple’s, and they have an ad blocker installed, the users won’t see your ads.
</p>
<p class="mt-8 mb-8 text-xl">
  On the other hand, it is important to note that the majority of people browsing the web don't have any ad blocker installed at all. Just because the option is there and growing in popularity does not mean that all users are going to completely alter their behavior and install ad blockers.
</p>
<p class="mt-8 mb-8 text-xl">
  In an official blog post on September 30th, 2015, Google (Alphabet) announced they will no longer charge advertisers for impressions that are not viewable to users [20] [21]. If an ad isn't seen by the user, whether in another tab, out of view on the screen, or if the ad is being blocked by an ad blocker, the advertiser won’t be charged. This move is likely a reaction to concerns about the adoption of ad blockers in both iOS and browser extensions, as the problems stated in the blog post have been an issue for advertisers for some time.
</p>
<p class="mt-8 mb-8 text-xl">
  There are still many potential problems caused by ad blockers. Reports suggest that they will force sites to stop providing free content or decrease the quality of content while increasing the quantity, as seen in clickbait articles. This means that not only will users have access to incomplete information, as in the case of paywalls, but because the sites can no longer track users, this will also result in a loss of revenue and the inability to understand the customer because of their anonymity. These issues stem from ad blockers because publishers are being forced to try other means to increase revenue, such as paywalls and by publishing more low-quantity articles.
</p>
<h1 class="mt-4 mb-4 text-2xl" id="possible-solutions-and-the-future-of-advertising">
  Possible Solutions and the Future of Advertising
</h1>
<p class="mt-8 mb-8 text-xl">
  When Apple announced last September that it would allow ad blocking in Safari
  for iOS 9.3, it brought a conflict that had been building in the web community. Many of the possible solutions included:
</p>

<h2 class="mt-4 mb-4 text-2xl" id="the-freemium-model-paywall-">
  The Freemium Model (Paywall)
</h2>
<p class="mt-8 mb-8 text-xl">
  Freemium model pricing strategy is in which a product or service, such as games
  or web services, is free of charge, but money is charged for proprietary
  features, functionality, and extra content.
</p>

<h2 class="mt-4 mb-4 text-2xl" id="subscription-model">
  Subscription Model
</h2>
<p class="mt-8 mb-8 text-xl">
  The subscription model is where a customer must pay a subscription price to
  have access to the product/service. The model is now used by many businesses,
  websites, and magazines.
</p>

<h2 class="mt-4 mb-4 text-2xl" id="go-native">
  Go Native
</h2>
<p class="mt-8 mb-8 text-xl">
  Native advertising is a form of paid media where the ad experience follows the
  natural form and function of the user experience in which it is placed [22].
  Native ads look a lot like that of the content produced by web publishers, but
  they usually carry some kind of design or banner feature to distinguish it
  from non-sponsored content, normally at the end of the article. Mobile video is
  proving so popular as an ad format because it is engaging if done correctly.
  Mobile video will account for 87% of global advertising spend by 2018,
  according to ZenithOptimedia [23].
</p>

<h2 class="mt-4 mb-4 text-2xl" id="pay-the-ad-blockers">
  Pay the Ad Blockers
</h2>
<p class="mt-8 mb-8 text-xl">
  Where the publisher pays the ad blocker companies, such as Adblock Plus, to
  not run the ad blocker on their website.
</p>

<h2 class="mt-4 mb-4 text-2xl" id="ask-audiences-for-sympathy">
  Ask Audiences for Sympathy
</h2>
<p class="mt-8 mb-8 text-xl">
  This method involves asking the visitor, using a popup, if they will consider
  whitelisting the site they’re visiting or disabling ad blockers on it and
  describing how the use of ad blockers can negatively affect them. For example,
  on the New York Times website [23], users with ad blockers enabled are shown
  the following message: “The best things in life aren’t free. You currently
  have an ad blocker installed. Advertising helps fund our journalism. To
  continue to enjoy The New York Times, please support us in one of the
  following ways.”
</p>

<p class="mt-8 mb-8 text-xl">
  Wired.com, which will not let users view their website if they are using an
  ad blocker of some kind, offers the following alternative:
</p>

<p class="mt-8 mb-8 text-xl">
  “You can simply add WIRED.com to your ad blocker’s whitelist so you can view ads.
  When you do, we will keep the ads as ‘polite’ as we can, and you will only see
  standard display advertising.”
</p>

<p class="mt-8 mb-8 text-xl">
  They also offer the user the opportunity to subscribe to a brand-new Ad-Free
  version of WIRED.com. For $1 a week, they can get complete access to their
  content, with no display advertising or ad tracking.
</p>

<h2 class="mt-4 mb-4 text-2xl" id="block-content-from-people-who-use-ad-blockers">
  Block Content from People Who Use Ad Blockers
</h2>
<p class="mt-8 mb-8 text-xl">
  Blocking content from people who use ad blockers is becoming more and more
  popular; this involves removing content or links from the user and displaying
  an ad about it. For example, Forbes.com is one of many sites that does not
  allow access to the site without disabling the extension or whitelisting the
  website, but not everyone is convinced by this method. Johnny Ryan of PageFair
  believes ad-blocking walls are relatively easy to bypass [24], and he is right.
  "Often publishers only update their code, forcing the ad-blocking
  community to get working again. It is a coding tug of war," he stated.
</p>

<h2 class="mt-4 mb-4 text-2xl" id="offer-ads-free-versions">
  Offer Ads Free Versions
</h2>
<p class="mt-8 mb-8 text-xl">
  Offer Ads Free Versions allow the user to support the website or web
  application. It removes adverts while supporting the services.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="designated-apps">
  Designated Apps
</h1>
<p class="mt-8 mb-8 text-xl">
  Another approach to the war on ad blockers is exemplified by former Mozilla
  co-founder Brendan Eich, who launched a browser called Brave [25]. This
  browser replaces ads on websites with safe, non-tracking ones that do not
  take users’ data or slow downloading speeds. Brendan Eich stated that the
  company plans to pay publishers a higher proportion of ad revenues generated by
  not going through a third-party middleman.
</p>
<p class="mt-8 mb-8 text-xl">
  Privacy app Ghostery shows users which ad-serving technologies a website or
  web app is using and offers the option to blacklist (block) or whitelist
  those ad-serving technologies. This is significant because it offers the user
  the choice of seeing the ads rather than hiding them automatically, as many ad
  blockers do.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="redesigning-ads">
  Redesigning Ads
</h1>
<p class="mt-8 mb-8 text-xl">
  As the methods of fighting ad blockers are not particularly successful, it
  would be better to change the adverts themselves so that they are less
  irritating and harmful to users. It would be possible to improve the use of ad
  blockers by optimizing the delivery of ads on websites using an asynchronous tag,
  as stated earlier in this report, or by integrating them into the site in
  such a way that it is not annoying to the user.
</p>
<p class="mt-8 mb-8 text-xl">
  As stated by Google’s former senior vice president of advertising, Susan
  Wojcicki [26], the future of ads depends on whether advertisers choose to
  follow the suggestions, which would encourage users not to rely on ad blockers.
  She stated that ad views will be voluntary; users will participate in the
  ecosystem if we provide enough value and control. Ads will be more interactive
  and beautiful at scale, and ads will help people live their lives on the
  go. For example, PageFair, among other sites, has been employing more user-friendly
  methods of circumventing ad blockers. They enable publishers to
  display "respectful and unobtrusive ads" that do not get blocked by
  ad blockers.
</p>
<p class="mt-8 mb-8 text-xl">
  Similar to what Susan Wojcicki said in 2013, an online organization called
  acceptableads.org [27] formed in late 2015 with the manifesto of following on
  from Wojcicki's idea because major sites and the organization
  understand that advertising is the backbone that drives the Internet and gives
  us web content for free. As click rates on adverts continue to decline, many
  online advertisements/publishers have become obnoxious and annoying in an
  effort to be heard. Many popular websites have signed the manifesto, such as
  Reddit, DuckDuckGo, and Google.
</p>
<p class="mt-8 mb-8 text-xl">
  Some websites have adopted these futuristic, interactive ad formats, with a
  great deal of success, such as with engagement ads, which show standard ad
  formats; when users hover their mouse over the ad, more features come up. This
  gives users an opportunity to be more creative and involved in the advertising
  process, making them more popular.
</p>
<p class="mt-8 mb-8 text-xl">
  This method has been used very effectively by companies such as Samsung, who
  live-streamed their 90-minute Galaxy S4 launch event via multiple channels,
  including ads [28]. Susan Wojcicki also advocates advertising where the user
  is choosing to view an ad, so that publishers are paid on a cost-per-click
  basis. It’s up to the ad network and the publisher/developer to show the right
  ad at the right time to the user.
</p>
<p class="mt-8 mb-8 text-xl">
  TrueView ads on YouTube follow this model. About 70% of ads on YouTube are now
  classified as TrueView, which has led to a reduction of 40% in the drop-off of ad
  viewing. One ad on YouTube got 33 million views, an ad by Pepsi featuring
  NASCAR car driver Jeff Gordon, going undercover to buy a car. It got 33
  million views even though it was four minutes long because it was entertaining
  and relevant [29].
</p>
<p class="mt-8 mb-8 text-xl">
  According to common guidelines, a good advert on a website should not be
  annoying and should not disrupt or distort the page content the user is trying
  to read. It should also be transparent with the user about being an ad; it
  must be effective without shouting at the user and it must be appropriate to
  the site that the user is on.
</p>
<p class="mt-8 mb-8 text-xl">
  Unfortunately, many websites do not follow these rules, and with the ever-changing
  landscape of the internet, it remains impossible to predict what
  exactly ads should be in the future.
</p>

<h1 class="mt-4 mb-4 text-2xl" id="conclusion">
  Conclusion
</h1>
<p class="mt-8 mb-8 text-xl">
  While it is difficult to determine what exactly the future of advertising on
  the internet should be, all the evidence discussed in this report indicates
  that steps must be taken to make web advertising less invasive and more user-friendly
  if the internet economy is to survive.
</p>
<p class="mt-8 mb-8 text-xl">
  In the ever-changing landscape of web advertising and the ad-blocking world,
  it is up to both the developers and the advertisers to better understand their
  target audience and to improve their engagement with the user, thus making
  them more likely to click on the ad than to be annoyed. Ideally, advertisers
  should follow the guidelines suggested by Susan Wojcicki. However, different
  sites host different content and therefore should employ different methods, be
  that a request for whitelisting, a paywall, or native apps.
</p>
<p class="mt-8 mb-8 text-xl">
  At the end of the day, it is impossible to prevent people from using ad
  blockers; therefore, publishers and advertisers must make it worth the user’s
  while to surf the web without this software, by creating entertaining,
  non-invasive adverts tailored to their needs and interests and follow the
  manifests and guidelines set out by recognized organizations like
  acceptableads.org.
</p>
<p class="mt-8 mb-8 text-xl">
  On the other hand, users need to be aware that they cannot expect free content
  if they do not also accept a certain amount of advertising. Therefore, the
  future of web advertising hinges on the willingness of both sides to
  compromise. Fortunately, users can whitelist websites and ad networks that
  follow the acceptable ads manifest and want to support. This means that users
  can use ad blockers selectively to tip the balance in favor of ads that truly
  inform them and send a message to the publishers.
</p>
<p class="mt-8 mb-8 text-xl">
  In our modern world, the internet economy has become such a fundamental part
  of our society that the world economy has come to depend on it. The internet
  economy is mostly dependent on advertising for revenue; therefore, the uptick
  in the usage of ad blockers poses a considerable threat to that system. If
  users continue to avoid advertising, the foundation of the web economy will be
  shaken, which could lead to a global economic crisis bigger than anything ever
  seen before. With that in mind, it is vital that we change advertising to make
  it appeal to users so that the web economy may continue to grow and flourish.
</p>
<h1 class="mt-4 mb-4 text-2xl" id="bibliography">Bibliography</h1>
<ol>
  <li class="mt-8 mb-8 text-lg">
    B. Insider, "PageFair and Adobe 2015 ad blocking report," Business
    Insider, 2016 Augsut 2015. [Online]. Available:
    <a class="link link-secondary" href="https://www.businessinsider.com/pagefair-and-adobe-2015-ad-blocking-report-2015-8" title="Link to reference in article">Business Insider</a>. [Accessed 9 May 2016]
  </li>
  <li class="mt-8 mb-8 text-lg">
    K. Hill, "Use Of Ad Blocking Is On The Rise," 21 August 2015.
    [Online]. Available:
    <a class="link link-secondary" href="https://www.forbes.com/sites/kashmirhill/2013/08/21/use-of-ad-blocking-is-on-therise/#5b2eae07496bFQjCNHxRqxnzge7RFxDCcMw6kN543u4-w&amp;sig2=kX3AEhuUzMP8XC2dE5Mhg" title="Link to reference in article">Forbes</a>. [Accessed 24 April 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    Adobe, "Adobe," Adobe, 2 July 2015. [Online]. Available:
    <a class="link link-secondary" href="https://blog.pagefair.com/2015/ad-blocking-report/" title="Link to reference in article">Adobe</a>. [Accessed 3 May 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    I. Yablonka, "What is the percentage of Internet users that
    employ," Ido Yablonka, 25 Sepetmeber 2015. [Online]. Available:
    <a class="link link-secondary" href="https://www.quora.com/What-is-the-percentageof-Internet-users-that-employ-AdBlock-Plus-or-similar-ad-blocking-plugins" title="Link to reference in article">Quora</a>. [Accessed 22 April 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    A. Plus, "About Adblock Plus.," 21 December 2009. [Online].
    Available:
    <a class="link link-secondary" href="https://adblockplus.org/about" title="Link to reference in article">Adblock Plus</a>. [Accessed 25 Feburay 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    A. Khetarpal, "The Top Ten Most Dangerous Things You Can Do
    Online.," 10 October 2010. [Online]. Available:
    <a class="link link-secondary" href="https://gizmodo.com/5614047/the-top-ten-most-dangerousthings-you-can-do-online" title="Link to reference in article">Gizmodo</a>. [Accessed 28 March 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    D. Shewan, "The Rise of Ad Blockers: Should Advertisers Be Panicking
    ..," 10 October 2015. [Online]. Available:
    <a class="link link-secondary" href="https://www.wordstream.com/blog/ws/2015/10/02/ad-blockers" title="Link to reference in article">WordStream</a>. [Accessed 28 March 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    N. Nethercote, "Firefox 41 will use less memory when running AdBlock
    Plus ...," 1 July 2015. [Online]. Available:
    <a class="link link-secondary" href="https://blog.mozilla.org/nnethercote/2015/07/01/firefox-41-will-use-less-memory-when-running-adblock-plus/" title="Link to reference in article">Mozilla Blog</a>. [Accessed 22 March 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
    Google, "PageSpeed Insights - Google Developers." 2012. 9 May.
    2016," Google, 2 09 2012. [Online]. Available:
    <a class="link link-secondary" href="https://developers.google.com/speed/pagespeed/insights/" title="Link to reference in article">Google Developers</a>. [Accessed 3 May 2016].
  </li>
  <li class="mt-8 mb-8 text-lg">
   S. Anthony, "extremetech," 14 March 2014. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.extremetech.com/computing/182428-ironic-iframes-adblock-plus-isprobably-the-reason-firefox-and-chrome-are-such-memory-hogs">
     https://www.extremetech.com/computing/182428-ironic-iframes-adblock-plus-isprobably-the-reason-firefox-and-chrome-are-such-memory-hogs
   </a>. [Accessed 28 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   R. J. Gabriel, "Adblocker Survery Results," 22 Feburay 2016. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.projectbird.com/problems-posed-by-ad-blockers">
     https://www.projectbird.com/problems-posed-by-ad-blockers
   </a>. [Accessed 11 April 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   M. Rouse, "What is asynchronous? - SearchNetworking - TechTarget," 20 March 2012. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://searchnetworking.techtarget.com/definition/asynchronous">
     https://searchnetworking.techtarget.com/definition/asynchronous
   </a>. [Accessed 18 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   M. Navaraj, "labs.bromium.com," 21 Feburay 2014. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://labs.bromium.com/2014/02/21/the-wild-wild-web-youtube-ads-serving-malware/">
     https://labs.bromium.com/2014/02/21/the-wild-wild-web-youtube-ads-serving-malware/
   </a>. [Accessed 26 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   D. Goodin, "arstechnica," 7 August 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://arstechnica.com/security/2015/08/0-day-attack-on-firefox-users-stole-passwordand-key-data-patch-now/">
     https://arstechnica.com/security/2015/08/0-day-attack-on-firefox-users-stole-passwordand-key-data-patch-now/
   </a>. [Accessed 20 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   T. Geigner, "Forbes Site, After Begging You Turn Off Adblocker, Serves Up," 11 Januray 2016. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.techdirt.com/articles/20160111/05574633295/forbes-site-after-beggingyou-turn-off-adblocker-serves-up-steaming-pile-malware-ads.shtml">
     https://www.techdirt.com/articles/20160111/05574633295/forbes-site-after-beggingyou-turn-off-adblocker-serves-up-steaming-pile-malware-ads.shtml
   </a>. [Accessed 18 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   investopedia, "Cost Per Thousand - CPM," 20 July 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.investopedia.com/terms/c/cpm.asp">
     https://www.investopedia.com/terms/c/cpm.asp
   </a>. [Accessed 10 April 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   J. MARSHALL, "apples-ad-blocking-is-potential-nightmare-for-ad-sellers/," 28 August 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://blogs.wsj.com/cmo/2015/08/28/apples-ad-blocking-ispotential-nightmare-for-ad-sellers/">
     https://blogs.wsj.com/cmo/2015/08/28/apples-ad-blocking-ispotential-nightmare-for-ad-sellers/
   </a>. [Accessed 02 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   S. Ranger, "zdnet," zdnet, 20 Januray 2016. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.zdnet.com/article/ios-versus-android-apple-app-store-versus-google-playhere-comes-the-next-battle-in-the-app-wars/">
     https://www.zdnet.com/article/ios-versus-android-apple-app-store-versus-google-playhere-comes-the-next-battle-in-the-app-wars/
   </a>. [Accessed 13 April 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   D. Shewan, "wordstream," 10 October 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.wordstream.com/blog/ws/2015/10/02/ad-blockers">
     https://www.wordstream.com/blog/ws/2015/10/02/ad-blockers
   </a>. [Accessed 18 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   J. Kahn, "Google says it won’t make advertisers pay unless ads are 100% viewable," 10 October 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://9to5google.com/2015/09/30/google-displayads-viewable/">
     https://9to5google.com/2015/09/30/google-displayads-viewable/
   </a>. [Accessed 10 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   Google, "<a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://adwords.blogspot.ie/">
     https://adwords.blogspot.ie/
   </a>," 30 September 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://adwords.blogspot.ie/2015/09/Enhancing-the-google-display-network">
     https://adwords.blogspot.ie/2015/09/Enhancing-the-google-display-network
   </a>. [Accessed 16 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   sharethrough, "sharethrough," 10 June 2014. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.sharethrough.com/nativeadvertising/">
     https://www.sharethrough.com/nativeadvertising/
   </a>. [Accessed 13 April 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   T. Mogg, "NY Times starts fighting ad blockers with plea to users," 8 March 2016. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.digitaltrends.com/mobile/ny-times-fights-ad-blockers/">
     https://www.digitaltrends.com/mobile/ny-times-fights-ad-blockers/
   </a>. [Accessed 29 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   PageFair, "Inside PageFair | Monitoring adblock and the future of the ..," 10 June 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://blog.pagefair.com/">
     https://blog.pagefair.com/
   </a>. [Accessed 2 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   G. Keeley, "GitHub - brave/browser-ios: Brave iOS Browser.," 20 October 2015. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://github.com/brave/browser-ios">
     https://github.com/brave/browser-ios
   </a>. [Accessed 28 March 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   R. H. & S. Wojcicki, "Here's The Future Of Advertising, According To Google," 10 April 2013. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.forbes.com/sites/roberthof/2013/04/10/heres-thefuture-of-advertising-according-to-google/#22de1749687a">
     https://www.forbes.com/sites/roberthof/2013/04/10/heres-thefuture-of-advertising-according-to-google/#22de1749687a
   </a>. [Accessed 01 Feburay 2016]
 </li>
 <li class="mt-8 mb-8 text-lg">
   A. A. Org, "Acceptable Ads Manifest," 1 May 2016. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://acceptableads.org/">
     https://acceptableads.org/
   </a>. [Accessed 2 May 2016].
 </li>
 <li class="mt-8 mb-8 text-lg">
   R. Hof, 10 August 2013. [Online]. Available:
   <a class="decoration-pink-500 underline hover:underline hover:text-gray-900 hover:decoration-wavy hover:decoration-blue-500 decoration-wavy" title="Link to reference in article" href="https://www.forbes.com/sites/roberthof/2013/04/10/heres-the-future-of-advertisingaccording-to-google/">
     https://www.forbes.com/sites/roberthof/2013/04/10/heres-the-future-of-advertisingaccording-to-google/
   </a>. [Accessed 10 March 2016]
 </li>
</ol>
