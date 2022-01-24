
//fill in your firebase credentials here
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

firebase.initializeApp(firebaseConfig);
//set of usable characters stored on firebase database
function loadCharacterList(){
  return firebase.database().ref('data/characters').once("value");
}
//see how many characters have been created to assign the drawing a new id
function loadCharacterAmount(){
  return firebase.database().ref('data/id').once("value");
}
//translates special characters to english (cant have these in a file name!)
function charToUsable(s){
  switch(s){
    case ".":
      return "dot";
    case "_":
      return "underscore";
    case "-":
      return "hyphen";
    case "/":
      return "forwardslash";
    case ":":
      return "colon";
    case "*":
      return "asterisk";
    case "?":
      return "question";
    case "<":
      return "lessthan";
    case ">":
      return "greaterthan";
    case "\"":
      return "quotation";
    case "\\":
      return "backslash";
    default:
      return s;
  }
}
//check to see if the user submits a blank drawing (spam prevention)
function isCanvasBlank(canvas) {
  const context = canvas.getContext('2d');

  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );

  return !pixelBuffer.some(color => color !== 0);
}
//takes the blob created on the html canvas and converts it to a png, storing it in the firestore image hosting database
function upload(){
  var canvas = document.getElementById("drawing");

  if(isCanvasBlank(canvas)){
    document.getElementById("warnings").innerHTML = "Cannot upload an empty drawing!";
    return false;
  }

  var character = document.getElementById("character").innerHTML.slice(-1);
  if(character == ";"){
    if(document.getElementById("character").innerHTML.slice(-2) == "p;"){
      character = "&";
    }else if(document.getElementById("character").innerHTML.slice(-3) == "lt;"){
      character = "<";
    }else if(document.getElementById("character").innerHTML.slice(-3) == "gt;"){
      character = ">";
    }else if(document.getElementById("character").innerHTML.slice(-3) == "ot;"){
      character = "\"";
    }else if(document.getElementById("character").innerHTML.slice(-3) == "os;"){
      character = "\'";
    }
  }
  var usableCharacter = charToUsable(character);
  var authorName = document.getElementById("author").value;
  if(authorName == ""){
    authorName = "anonymous"
  }
  var charAmount;
  loadCharacterAmount().then((snapshot) => {
    var charAmount = snapshot.val();

    var storageRef = firebase.storage().ref(charAmount+usableCharacter+".png");
    canvas.toBlob(function(blob){
      var uploadTask = storageRef.put(blob).then(function(snapshot){
        document.getElementById("warnings").innerHTML = "Submission has been sent!";
      }).catch(function(error) {
        document.getElementById("warnings").innerHTML = "Submission error!";
      });
    })

    firebase.database().ref('data/id').set(parseInt(charAmount) + 1);
    firebase.database().ref("data/"+charAmount+"/letter").set(character);
    firebase.database().ref("data/"+charAmount+"/votes").set(0);
    firebase.database().ref("data/"+charAmount+"/author").set(authorName);

  });

  document.getElementById("uploadButton").disabled = true;


  return false;
}
//html drawing canvas stuff, default settings
var lineSize = 20;
var tool = "marker";
var color = "black";
var shape = "round";
//changes line size
function changeSize(){
  var size = document.getElementById("inputSize").value;
  switch(size){
    case "tiny":
      lineSize = 5;
      break;
    case "small":
      lineSize = 10;
      break;
    case "medium":
      lineSize = 20;
      break;
    case "large":
      lineSize = 40;
      break;
    case "huge":
      lineSize = 80;
      break;
    case "reallyhuge":
      lineSize = 160;
      break;
    default:
      lineSize = 20;
      break;
  }
  document.getElementById("lineSize").innerHTML = lineSize;
  return false;
}
//changes color
function changeTool(){
  var tool = document.getElementById("tool").value;
  if(tool == "eraser"){
    color = "white";
  }else{
    color = "black";
  }
  document.getElementById("colorDisplay").innerHTML = color;
  return false;
}
//changes shape
function changeStyle(){
  var style = document.getElementById("style").value;
  if(style == "square"){
    shape = "square";
  }else{
    shape = "round";
  }
  document.getElementById("shapeDisplay").innerHTML = shape;
  return false;
}

var characterList;
var character;
//randomizes the character chosen from the character list
function loadCharacter(){
  var refr = firebase.database().ref('data/characters');
  refr.off();
  refr.on('value', function(snapshot) {
      characterList = snapshot.val();
      character = characterList[Math.floor(Math.random() * characterList.length)];
      document.getElementById("character").innerHTML = character;
      refr.off();
  });
  console.log(character);
}
//creating the canvas and its functions, having certain routines called on mouse/touchscreen input
window.addEventListener("load", () => {
  var canvas = document.getElementById("drawing");
  var context = drawing.getContext("2d");

  loadCharacter();
  var painting = false;

  function startPosition(e){
    painting = true;
    draw(e);
  }

  function startPositionTouch(e){
    painting = true;
    drawTouch(e);
  }

  function endPosition(){
    painting = false;
    context.beginPath();
  }

  function draw(e){
    if(!painting){
      return;
    }
    context.lineWidth = lineSize;
    context.lineCap = shape;
    context.strokeStyle = color;

    console.log(e.offsetX);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
    e.preventDefault();
  }

  function drawTouch(e){
    if(!painting){
      return;
    }
    context.lineWidth = lineSize;
    context.lineCap = shape;
    context.strokeStyle = color;

    var rect = canvas.getBoundingClientRect();
    var x = e.targetTouches[0].pageX - rect.left - document.body.scrollLeft;
    var y = e.targetTouches[0].pageY - rect.top - document.body.scrollTop;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
    e.preventDefault();
  }
  //event listeners to call functions during user input
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mouseout", endPosition);
  canvas.addEventListener("mousemove", draw);

  canvas.addEventListener("touchstart", startPositionTouch);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchcancel", endPosition);
  canvas.addEventListener("touchmove", drawTouch);

});
