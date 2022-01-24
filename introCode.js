//fill in your credentials here
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
//initalizes google firebase application
firebase.initializeApp(firebaseConfig);
//firebase database reference
var refr = firebase.database().ref('data');
//firestore reference
var storage = firebase.storage().ref();
//store persistant data for display page
var previousCharacters = [];
var hasUpvoted = [];
var hasDownvoted = [];
var pageNumber = 0;
var drawingAmount = 0;
//since you cant have some characters in file names, translate to english
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
    default:
      return s;
  }
}
//downloads image from firestore image database, displays them randomly
function displayCharacter(x){
  refr.once("value").then(function(snapshot) {
    drawingAmount = snapshot.child("id").val();
    var randomInt = Math.floor(Math.random() * parseInt(drawingAmount-1)) + 1;
    var pageLocation = parseInt(x) - 3*pageNumber;

    if(x > previousCharacters.length){
      while(previousCharacters.includes(randomInt)){
        randomInt = Math.floor(Math.random() * parseInt(drawingAmount-1)) + 1;
      }

      previousCharacters.push(randomInt);
      hasUpvoted.push(0);
      hasDownvoted.push(0);

      document.getElementById("upvote" + pageLocation).disabled = false;
      document.getElementById("downvote" + pageLocation).disabled = false;
    }else{
      randomInt = previousCharacters[x-1];
      if(hasUpvoted[x-1] == "0"){
        document.getElementById("upvote" + pageLocation).disabled = false;
      }else{
        document.getElementById("upvote" + pageLocation).disabled = true;
      }

      if(hasDownvoted[x-1] == "0"){
        document.getElementById("downvote" + pageLocation).disabled = false;
      }else{
        document.getElementById("downvote" + pageLocation).disabled = true;
      }
    }

    var character = snapshot.child(randomInt + "/letter").val();
    var artist = snapshot.child(randomInt + "/author").val();
    var votes = snapshot.child(randomInt + "/votes").val();
    var usableChar = charToUsable(character);

    var fileName = randomInt + usableChar;


    storage.child(fileName + ".png").getDownloadURL().then(function(url) {
        var test = url;
        document.getElementById("character" + pageLocation).src = test;
    }).catch(function(error) {
        console.log("killer error!");
    });

    document.getElementById("letter" + pageLocation).innerHTML = "\"" + character + "\"";
    document.getElementById("artist" + pageLocation).innerHTML = "Drawn by: " + artist;
    document.getElementById("vote" + pageLocation).innerHTML = "Votes: " + votes;
  });
}
//on load, display three example characters
window.addEventListener("load", () => {
  displayCharacter("3");
  displayCharacter("2");
  displayCharacter("1");
  document.getElementById("previous").disabled = true;
});
//upvotes an image, going into the database and incrementing the image (gets the display order id to get database id and then increments the vote value)
function upvote(x){
  var fileName = previousCharacters[x-1 + 3*parseInt(pageNumber)];
  var voteRefr = firebase.database().ref("data/" + fileName);

  voteRefr.on('value', function(snapshot) {
    var votes = snapshot.child("votes").val();
    voteRefr.off();
    voteRefr.child("votes").set(parseInt(votes) + 1);
    document.getElementById("vote" + x).innerHTML = "Votes: " + (parseInt(votes) + 1);
  });

  document.getElementById("upvote" + x).disabled = true;
  hasUpvoted[x-1 + 3*parseInt(pageNumber)] = 1;
  return false;
}
//same as above but decrements
function downvote(x){
  var fileName = previousCharacters[x-1 + 3*parseInt(pageNumber)];
  var voteRefr = firebase.database().ref("data/" + fileName);

  voteRefr.on('value', function(snapshot) {
    var votes = snapshot.child("votes").val();
    voteRefr.off();
    console.log(votes);
    voteRefr.child("votes").set(parseInt(votes) - 1);
    document.getElementById("vote" + x).innerHTML = "Votes: " + (parseInt(votes) - 1);
  });

  document.getElementById("downvote" + x).disabled = true;
  hasDownvoted[x-1 + 3*parseInt(pageNumber)] = 1;
  return false;
}
//load three new characters, all randomly selected (if the next page hasnt been visited)
function nextPage(){
  pageNumber = parseInt(pageNumber) + 1;
  displayCharacter(3*parseInt(pageNumber) + 3);
  displayCharacter(3*parseInt(pageNumber) + 2);
  displayCharacter(3*parseInt(pageNumber) + 1);
  document.getElementById("page").innerHTML = "Page " + (parseInt(pageNumber) + 1);
  document.getElementById("previous").disabled = false;
  if((parseInt(pageNumber)+2)*3 >= parseInt(drawingAmount)){
    document.getElementById("next").disabled = true;
  }
}

function previousPage(){
  pageNumber = parseInt(pageNumber) - 1;
  displayCharacter(3*parseInt(pageNumber) + 3);
  displayCharacter(3*parseInt(pageNumber) + 2);
  displayCharacter(3*parseInt(pageNumber) + 1);
  document.getElementById("page").innerHTML = "Page " + (parseInt(pageNumber) + 1);
  document.getElementById("next").disabled = false;

  if(pageNumber == "0"){
    document.getElementById("previous").disabled = true;
  }
}
