const keyBoard = {
  lang: localStorage.getItem('lang') || "en",
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
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 46,
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38,  16,
    17, 91, 18, 32, 18, 37, 40, 39, 17
  ],
  buttonsSigns: [
    ["`", "~", ""], ["1", "!", ""], ["2", "@", ""], ["3", "#", ""], ["4", "$", ""], ["5", "%", ""], ["6", "^", ""], ["7", "&", ""], ["8", "*", ""], ["9", "(", ""], ["0", ")", ""], ["-", "_", ""], ["=", "+", ""], ["Backspace", ""], 
    ["Tab", "", ""], ["q", "", "й"], ["w", "", "ц"], ["e", "", "у"], ["r", "", "к"], ["t", "", "е"], ["y", "", "н"], ["u", "", "г"], ["i", "", "ш"], ["o", "", "щ"], ["p", "", "з"], ["[", "{", "х"], ["]", "}", "ъ"], ["Enter", "", ""], 
    ["Caps Lock", "", ""], ["a", "", "ф"], ["s", "", "ы"], ["d", "", "в"], ["f", "", "а"], ["g", "", "п"], ["h", "", "р"], ["j", "", "о"], ["k", "", "л"], ["l", "", "д"], [";", ":", "ж"], ["'", "\"", "э"], ["\\", "|", ","], ["Del", "", ""],
    ["Shift", "", ""], ["z", "", "я"], ["x", "", "ч"], ["c", "", "с"], ["v", "", "м"], ["b", "", "и"], ["n", "", "т"], ["m", "", "ь"], [",", "<", "б"], [".", ">", "ю"], ["/", "?", "."],  ["Up", "", ""], ["Shift", "", ""],
    ["Ctrl", "", ""] , ["Wn", "", ""], ["Alt", "", ""], ["Space", "", ""], ["Alt", "", ""], ["Left", "", ""], ["Down", "", ""], ["Right", "", ""], ["Ctrl", "", ""]
  ],

  renderKeyboard: function () {
    let body = document.querySelector('body');
    let fragment = document.createDocumentFragment();
    let keyboardArea = document.createElement('div');
    let textArea = document.createElement('input');
    let button = '';
    let langIndex = this.langCode[this.lang];

    for (let i = 0; i < keyBoard.buttonsCodes.length; i++) { 
      button = `<div class="button" id="${this.buttonsCodes[i]}">${langPanel(i, langIndex)}</div>`;
      keyboardArea.innerHTML += button;
    }

    textArea.setAttribute("autofocus",'true');
    textArea.setAttribute("cols", 50);
    textArea.setAttribute("rows", 10);

    keyboardArea.appendChild(textArea).classList.add('text-area');
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

    this.setListeners(body,keyboardArea, textArea);
    this.shift.keyboardArea = keyboardArea;
  }, 
  setListeners: function (body, keyboardArea, textArea) {
    let button;

    keyboardArea.addEventListener('keydown', (e)=>{
      e.preventDefault();
      button = keyboardArea.querySelector(`[id ="${e.keyCode}"]`);
      this.onPress( button, e, textArea, keyboardArea); 
    })

    keyboardArea.addEventListener("keyup", (e) => {
      button = keyboardArea.querySelector(`[id ="${e.keyCode}"]`); 
      if (e.keyCode !== 20 ) this.outPress( button, e);
    })

    body.addEventListener('keydown', () => {
      textArea.focus(); 
    })
       
    keyboardArea.addEventListener('mousedown', (e) => {       
      button = e.target;      
      this.onPress(button, e, textArea, keyboardArea);
    })

    keyboardArea.addEventListener('mouseup', (e) => {       
      button = e.target;      
      this.outPress(button, e, textArea);
    })
  },
  onPress: function ( button, e, textArea, keyboardArea) {  
    button.classList.add('active');

    if ( e.shiftKey || button.id === "16") {
      this.shiftPress = true;
      this.compare();
    }   
    if ( e.keyCode === 17 || button.id === "17" ) this.ctrlPress = true;
    if ( e.keyCode === 20 || button.id === "20" ) {
      if ( this.capsLock === false ) { 
        this.capsLock = true;
        this.compare()
       } else { 
         this.capsLock = false;
         this.compare();   
         button.classList.remove('active');      
       }
    }

    if ( e.keyCode === 18 && e.ctrlKey ) {
      console.log(e.ctrlKey)
      this.lang = ( this.lang === "ru") ?  "en" : "ru";
      this.changeLang(keyboardArea);
    }
  
    if ( e.keyCode === 8 || button.id === "8" ) textArea.value = textArea.value.slice(0, -1);     
    if ( e.keyCode === 32 || button.id === "32" ) textArea.value += " ";
    if ( button.textContent.length < 2 ) textArea.value += button.textContent;     
  },  
  outPress: function ( button, e ) {
    if ( e.shiftKey === false || button.id === "16" ) {
       this.shiftPress = false;      
       this.shift(false);
       this.compare();
      }                  
      if ( e.keyCode === 17 || button.id === '17' ) this.ctrlPress = false;    
      button.classList.remove('active');
  },
  compare: function (){
    if ( this.capsLock === false && this.shiftPress === false )  this.shift(false);
    if ( this.capsLock === true && this.shiftPress === true )  this.shift(false);
    if ( this.capsLock === false && this.shiftPress === true )  this.shift(true);
    if ( this.capsLock === true && this.shiftPress === false )  this.shift(true);

  },
  changeLang: function ( keyboardArea ) {
    
    let text;
    for (let i = 0; i < this.buttonsSigns.length; i++) {
      if ( this.lang === "ru" ) {
        if (this.buttonsSigns[i][2]) {
          text = this.buttonsSigns[i][2];
          keyboardArea.querySelector(`[id ="${this.buttonsCodes[i]}"]`).textContent = text;
        }
      }
      if ( this.lang === "en" ) {
        if (this.buttonsSigns[i][2]) {
          text = this.buttonsSigns[i][0];
          keyboardArea.querySelector(`[id ="${this.buttonsCodes[i]}"]`).textContent = text;        
        }
      }
    }
    localStorage.setItem("lang", this.lang);
  },
  shift: function (condition) { 
      let text;

      if (keyBoard.lang === "ru") {
        for (let i = 0; i < keyBoard.buttonsSigns.length; i++) {
  
          if ( keyBoard.buttonsSigns[i][2] ) {
            if (condition) {
              text = this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent.toUpperCase();
            } else { text = this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent.toLowerCase();
            }        
            this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = text;
          } else if ( keyBoard.buttonsSigns[i][1] ) {
            if(condition) {
              this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = keyBoard.buttonsSigns[i][1];
            } else {
              this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = keyBoard.buttonsSigns[i][0];
            }          
          }
        }
      }
      if (keyBoard.lang === "en") {
        for (let i = 0; i < keyBoard.buttonsSigns.length; i++) {
  
          if ( keyBoard.buttonsSigns[i][1] ) {
            if (condition) {
              this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = keyBoard.buttonsSigns[i][1]; 
            } else {
              this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = keyBoard.buttonsSigns[i][0]; 
            }
              
          } else if ( keyBoard.buttonsSigns[i][0] >= "a" &&  keyBoard.buttonsSigns[i][0] <= "z") {
            if(condition){ 
              text =this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent.toUpperCase();
            } else {
              text = this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent.toLowerCase();
            }          
            this.shift.keyboardArea.querySelector(`[id ="${keyBoard.buttonsCodes[i]}"]`).textContent = text;
          } 
        }
      }
  }
}
keyBoard.renderKeyboard();

