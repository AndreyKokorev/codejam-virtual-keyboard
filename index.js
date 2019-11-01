
const keyBoard = {
  lang: "ru",
  langCode: {
    "ru": 2,
    "en": 0
  },
  shiftPress: false,
  ctrlPress: false,
  capsLock: false,
  buttonsCodes: [
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 13,
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220,
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16, 38,
    17, 91, 18, 32, 18, 17, 37, 40, 39
  ],
  buttonsSigns: [
    ["`", "~", ""], ["1", "!", ""], ["2", "@", ""], ["3", "#", ""], ["4", "$", ""], ["5", "%", ""], ["6", "^", ""], ["7", "&", ""], ["8", "*", ""], ["9", "(", ""], ["0", ")", ""], ["-", "_", ""], ["=", "+", ""], ["Backspace", ""], 
    ["Tab", "", ""], ["q", "", "й"], ["w", "", "ц"], ["e", "", "у"], ["r", "", "к"], ["t", "", "е"], ["y", "", "н"], ["u", "", "г"], ["i", "", "ш"], ["o", "", "щ"], ["p", "", "з"], ["[", "{", "х"], ["]", "}", "ъ"], ["Enter", "", ""], 
    ["Caps Lock", "", ""], ["a", "", "ф"], ["s", "", "ы"], ["", "d", "в"], ["f", "", "а"], ["g", "", "п"], ["h", "", "р"], ["j", "", "о"], ["k", "", "л"], ["l", "", "д"], [";", "", "ж"], ["'", "", "э"], ["\\", "|", "\\"], 
    ["Shift", "", ""], ["z", "", "я"], ["x", "", "ч"], ["c", "", "с"], ["v", "", "м"], ["b", "", "и"], ["n", "", "т"], ["m", "", "ь"], [",", "<", "б"], [".", ">", "ю"], ["/", "?", "."], ["Shift", "", ""], ["Up", "", ""],
    ["Ctrl", "", ""] , ["Wn", "", ""], ["Alt", "", ""], ["Space", "", ""], ["RAlt", "", ""], ["RCtrl", "", ""], ["Left", "", ""], ["Down", "", ""], ["Right", "", ""]
  ],
  renderKeyboard: function () {
    let body = document.querySelector('body');
    let fragment = document.createDocumentFragment();
    let keyboardArea = document.createElement('div');
    let button = '';
    let langIndex = keyBoard.langCode[keyBoard.lang];
    for (let i = 0; i < keyBoard.buttonsCodes.length; i++) { 
      button = `<div class="button" id="${keyBoard.buttonsCodes[i]}">${langPanel(i, langIndex)}</div>`;
      keyboardArea.innerHTML += button;
    }
    fragment.appendChild(keyboardArea).classList.add('keyboard-area');
    body.appendChild(fragment);   
    function langPanel(i, langIndex) {
       if (keyBoard.langCode !== "en") { 
         if (keyBoard.buttonsSigns[i][langIndex]) { 
          return keyBoard.buttonsSigns[i][langIndex];
         } else {
          return keyBoard.buttonsSigns[i][0];
         }
          
      } else {
          return keyBoard.buttonsSigns[i][0]
      }
    }
    keyBoard.input(body,keyboardArea);
  }, 
  
}
keyBoard.renderKeyboard();

//console.log(String.fromCharCode(keyBoard.buttonsCodes[3]))


