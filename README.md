<div style = "padding : 20px">

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li><a href="#about-the-project">About the Project</a><ul>
<li><a href="#built-with">Built With</a></li>
</ul>
</li>
<li><a href="#getting-started">Getting Started</a><ul>
<li><a href="#installation">Installation</a></li>
</ul>
</li>
<li><a href="#usage">Usage</a></li>
<li><a href="#license">License</a></li>
<li><a href="#contact">Contact</a></li>
</ul>
<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project">About The Project</h2>
<p><img src="/images/logo.png" width="10%" height="10%" alt="로고"></img></p>
<p>이 챗봇은 현재 날씨를 기반으로 식사 메뉴를 추천해주고, 해당 메뉴를 먹을 수 있는 음식점을 소개한다.</p>
<p>이 챗봇을 이용한다면 지도 어플리케이션에 들어가서 일일이 검색할 필요없이 간단한 작업으로 음식점을 소개받을 수 있다.</p>
<h3 id="built-with">Built With</h3>
<ul>
<li><a href="https://github.com/expressjs/express">Express</a></li>
<li><a href="https://developers.kakao.com/">Kakao map API</a></li>
<li><a href="https://developers.line.biz/en/">Line messaging API</a></li>
<li><a href="https://openweathermap.org/">Openweather Map API</a></li>
</ul>
<!-- GETTING STARTED -->
<h2 id="getting-started">Getting Started</h2>
<p>간단한 작업 후에 실행시킬 수 있다.</p>
<h3 id="installation">Installation</h3>
<ol>
<li><p>다음 링크에 접속하여 무료 API를 이용한다.</p>
<ul>
<li><a href="https://developers.line.biz/en/">https://developers.line.biz/en/</a></li>
<li><a href="https://developers.kakao.com/">https://developers.kakao.com/</a></li>
<li><a href="https://openweathermap.org/">https://openweathermap.org/</a></li>
</ul>
</li>
<li><p>이 레파지토리를 Clone한다.</p>
<pre><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">http</span>://khuhub.khu.ac.kr/<span class="hljs-number">2018102205</span>/meal-recommender.git
</code></pre></li>
<li><p>NPM packages를 설치한다.</p>
<pre><code>npm <span class="hljs-keyword">install</span>
</code></pre></li>
<li><p><code>app.js</code> 파일에 받은 API 값을 입력한다.</p>
<pre><code><span class="hljs-attribute">const TOKEN</span> = <span class="hljs-string">'Line Messege API 얻은 Channel access token'</span>;
<span class="hljs-attribute">const KAKAOKEY</span> = <span class="hljs-string">'Kakao Developers에서 얻은 API Key'</span>;
<span class="hljs-attribute">const WEATHERKEY</span> = <span class="hljs-string">'Openweathermap에서 얻은 API Key'</span>;
</code></pre></li>
</ol>
<!-- USAGE EXAMPLES -->
<h2 id="usage">Usage</h2>
<p>먼저 라인에서 &quot;오늘의 메뉴&quot; 챗봇을 친구 추가해야 한다. @453qrzxr를 검색하여 아이디로 친구로 추가하거나 아래의 QR코드로 친구 추가한다.</p>
<p><img src="/images/QRcode.png" width="10%" height="10%" alt="QR CODE"></img></p>
<p>기본 중심값은 경희대학교 국제캠퍼스로 설정되어있다. 중심값을 바꾸고 싶다면 &quot;내위치&quot;를 전송한다. 전송 후에는 라인에서 지원하는 Quick Reply 메세지로 원하는 중심값을 전송할 수 있다. 앞으로 설정한 중심값 주변의 음식점을 추천해준다.</p>
<p>&quot;날씨추천&quot;을 전송한다면 날씨를 기반으로 추천된 메뉴를 확인할 수 있다. 그 외에도 사용자는 자신이 입력한 키워드를 통해 음식점을 제공받을 수 있다.</p>
<p><img src="/images/screenshot1.png" width="20%" height="20%" alt="Screenshot1"></img>
<img src="/images/screenshot2.png" width="20%" height="20%" alt="Screenshot2"></img></p>
<!-- LICENSE -->
<h2 id="license">License</h2>
<p>MIT 라이센스에 따라 배포되었다. 자세한 내용은 <code>LICENSE</code>를 참조하십시오.</p>
<!-- CONTACT -->
<h2 id="contact">Contact</h2>
<p>엄상은 | sangeun99@khu.ac.kr</p>
<p><a href="http://khuhub.khu.ac.kr/2018102205/meal-recommender.git">http://khuhub.khu.ac.kr/2018102205/meal-recommender.git</a></p>

</div>