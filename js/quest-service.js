var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const KEY = 'Quests';

function createQuestsTree() {
  gQuestsTree = loadFromStorage(KEY);
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    _saveCarsToStorage();
  }
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  //  update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  var newQuest = createQuest(newQuestTxt);
  var newGuess = createQuest(newGuessTxt);

  newQuest.yes = newGuess;
  newQuest.no = gCurrQuest;
  gPrevQuest[lastRes] = newQuest;
  _saveCarsToStorage();
  // Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
  return gCurrQuest;
}

function _saveCarsToStorage() {
  saveToStorage(KEY, gQuestsTree);
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}
