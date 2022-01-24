<meta name="viewport" content="width=device-width" />

<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-storage.js"></script>

<style>
<?php include 'main.css'; ?>
</style>
<title>Times Newer Roman</title>

<p class="header">Times Newer Roman</p>
<p class="subheader">Make me a font</p>
<hr>
<p class="subheader2">An Introduction</p>
<p class="text">1931. The Empire State Building had just opened. The Japanese Imperial Army had stepped foot in Chinese Manchuria, arguably
   starting the Pacific theater of World War II. US unemployment reached 8 million as an effect of a global economic depression that wouldn't
   end until decades later. While 1931 seems like distant period that we could all look back on, there is still one surviving remnant of this
   bygone era. I'm not talking about the Queen of England. I'm talking about Times New Roman. For nearly 100 years it's been unchanged, unscathed
   by the sands of time. The font has survived an entire world war, the fall of a world superpower, a space race, and the advent of the information age.
    While many may say that Times New Roman is perfect as it is and no change can make it better. They are wrong. It's time for an upgrade. </p>
<br>
<p class="text">Introducing Times Newer Roman, a font made by the people, for the people. Each person creates a letter of the font and votes on
  drawings they deem the best. <br>This is the font of the modern era.</p>
<hr>

<p class="subheader2">The Letter Exhibit</p>

<script type="text/javascript" src="introCode.js"></script>

<p class="boldText" id="letter1"></p>
<p class="text" id="artist1">Drawn by: </p>
<div>
  <input class="text" id="downvote1" type="submit" onclick="return downvote(1);" value="↓"></input>
  <p class="compacttext" id="vote1">Votes: 0</p>
  <input class="text" id="upvote1" type="submit" onclick="return upvote(1);" value="↑"></input>
</div>
<img src="" id="character1" width="250" height="250" class="center">


<p class="boldText" id="letter2"></p>
<p class="text" id="artist2">Drawn by: </p>
<div>
  <input class="text" id="downvote2" type="submit" onclick="return downvote(2);" value="↓"></input>
  <p class="compacttext" id="vote2">Votes: 0</p>
  <input class="text" id="upvote2" type="submit" onclick="return upvote(2);" value="↑"></input>
</div>
<img src="" id="character2" width="250" height="250" class="center">


<p class="boldText" id="letter3"></p>
<p class="text" id="artist3">Drawn by: </p>
<div>
  <input class="text" id="downvote3" type="submit" onclick="return downvote(3);" value="↓"></input>
  <p class="compacttext" id="vote3">Votes: 0</p>
  <input class="text" id="upvote3" type="submit" onclick="return upvote(3);" value="↑"></input>
</div>
<img src="" id="character3" width="250" height="250" class="center">

<br>
<div>
  <input class="text" id="previous" type="submit" onclick="return previousPage();" value="←"></input>
  <p class="compacttext" id="page">Page 1</p>
  <input class="text" id="next" type="submit" onclick="return nextPage();" value="→"></input>
</div>
<br>
<button class="text" onclick="document.location='draw.php'" id="drawRedirect">Draw a character</button>
