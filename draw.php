<meta name="viewport" content="width=device-width" />

<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-storage.js"></script>

<style>
<?php include 'main.css'; ?>
</style>
<title>Draw a Character</title>

<script type="text/javascript" src="drawCode.js"></script>

<p class="header">Your character is: </p>
<p class="subheader" id="character">_</p>
<hr>
<div>
  <input class="text" type="submit" onclick="document.location='index.php'" value="Back to Main Page" id="mainRedirect"></input>
  <input class="text" type="submit" onclick="document.location='draw.php'" value="Draw Another Character" id="newCharacter"></input>
</div>
<br>
<canvas id="drawing" class="drawing" width="500" height="500"></canvas>

<br>
<br>

<form>
<select id="inputSize" class="text" onchange="return changeSize()">
  <option value="tiny">Tiny</option>
  <option value="small">Small</option>
  <option value="medium" selected>Medium</option>
  <option value="large">Large</option>
  <option value="huge">Huge</option>
  <option value="reallyhuge">Really Huge</option>
</select>
<select id="tool" class="text" onchange="return changeTool()">
  <option value="pen" selected>Pen</option>
  <option value="eraser">Eraser</option>
</select>
<select id="style" class="text" onchange="return changeStyle()">
  <option value="round" selected>Round</option>
  <option value="square">Square</option>
</select>
</form>

<form onsubmit="return upload()">
  <input type="text" class="text" id="author"> Artist's Name</input>
  <br>
  <br>
  <input type="submit" class="text" id="uploadButton" value="Upload">
</form>

<p id="lineSize"></p>
<p id="colorDisplay"></p>
<p id="shapeDisplay"></p>

<p id="warnings"></p>
