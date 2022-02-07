'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start section

  var $elStart = $('.game-start');
  $elStart.hide();

  renderQuest();
  //  show the quest section
  var $elQuest = $('.quest');
  $elQuest.show();
}

function renderQuest() {
  //  select the <h2> inside quest and update
  // its text by the currQuest text
  var $elQues = $('.quest h2');
  console.log($elQues);
  $elQues.text(gCurrQuest.txt);
}

function onUserResponse(ev) {
  console.log('you are here');
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      onRestartGame();

      // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      //  hide and show new-quest section
      var $elNewQuest = $('.new-quest');
      var $elQuest = $('.quest');
      $elQuest.hide();
      $elNewQuest.show();
    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  console.log(newGuess);
  //  Get the inputs' values
  //  Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  console.log($('.new-quest'));
  $('.game-start').show();
  gLastRes = null;
  gCurrQuest = gQuestsTree;
}
