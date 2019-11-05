const keyBoard = {
  lang: localStorage.getItem('lang') || 'en',
  langCode: {
    ru: 2,
    en: 0
  },
  shiftPress: false,
  ctrlPress: false,
  capsLock: false,
  buttonsCodes: [
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 13,
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 46,
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16,
    17, 91, 18, 32, 18, 37, 40, 39, 17
  ],
  buttonsSigns: [
    ['`', '~', ''], ['1', '!', ''], ['2', '@', ''], ['3', '#', ''], ['4', '$', ''], ['5', '%', ''], ['6', '^', ''], ['7', '&', ''], ['8', '*', ''], ['9', '(', ''], ['0', ')', ''], ['-', '_', ''], ['=', '+', ''], ['Backspace', ''],
    ['Tab', '', ''], ['q', '', 'й'], ['w', '', 'ц'], ['e', '', 'у'], ['r', '', 'к'], ['t', '', 'е'], ['y', '', 'н'], ['u', '', 'г'], ['i', '', 'ш'], ['o', '', 'щ'], ['p', '', 'з'], ['[', '{', 'х'], [']', '}', 'ъ'], ['Enter', '', ''],
    ['Caps Lock', '', ''], ['a', '', 'ф'], ['s', '', 'ы'], ['d', '', 'в'], ['f', '', 'а'], ['g', '', 'п'], ['h', '', 'р'], ['j', '', 'о'], ['k', '', 'л'], ['l', '', 'д'], [';', ':', 'ж'], ['\'', '"', 'э'], ['\\', '|', ','], ['Del', '', ''],
    ['Shift', '', ''], ['z', '', 'я'], ['x', '', 'ч'], ['c', '', 'с'], ['v', '', 'м'], ['b', '', 'и'], ['n', '', 'т'], ['m', '', 'ь'], [',', '<', 'б'], ['.', '>', 'ю'], ['/', '?', '.'], ['Up', '', ''], ['Shift', '', ''],
    ['Ctrl', '', ''], ['Wn', '', ''], ['Alt(lang)', '', ''], ['Space', '', ''], ['Alt', '', ''], ['Left', '', ''], ['Down', '', ''], ['Right', '', ''], ['Ctrl', '', '']
  ],

  renderKeyboard () {
    const body = document.querySelector('body');
    const fragment = document.createDocumentFragment();
    const keyboardArea = document.createElement('div');
    const textArea = document.createElement('input');
    const langIndex = this.langCode[this.lang];
    let button = '';

    for (let i = 0; i < keyBoard.buttonsCodes.length; i += 1) {
      button = `<div class='button' id='${this.buttonsCodes[i]}'>${langPanel(i, langIndex)}</div>`;
      keyboardArea.innerHTML += button;
    }

    textArea.setAttribute('autofocus', 'true');
    textArea.setAttribute('cols', 50);
    textArea.setAttribute('rows', 10);

    keyboardArea.appendChild(textArea).classList.add('text-area');
    fragment.appendChild(keyboardArea).classList.add('keyboard-area');
    body.appendChild(fragment);

    function langPanel (i) {
      let result;
      if (keyBoard.langCode !== 'en') {
        if (keyBoard.buttonsSigns[i][langIndex]) {
          result = keyBoard.buttonsSigns[i][langIndex];
        } else {
          return keyBoard.buttonsSigns[i][0];
        }
      } else {
        return keyBoard.buttonsSigns[i][0];
      }
      return result;
    }

    this.setListeners(body, keyboardArea, textArea);
    this.shift.keyboardArea = keyboardArea;
  },
  setListeners (body, keyboardArea, textArea) {
    let button;

    keyboardArea.addEventListener('keydown', (e) => {
      e.preventDefault();
      button = keyboardArea.querySelector(`[id ='${e.keyCode}']`);
      this.onPress(button, e, textArea, keyboardArea);
    });

    keyboardArea.addEventListener('keyup', (e) => {
      button = keyboardArea.querySelector(`[id ='${e.keyCode}']`);
      if (e.keyCode !== 20) this.outPress(button, e);
    });

    body.addEventListener('keydown', () => {
      textArea.focus();
    });

    keyboardArea.addEventListener('mousedown', (e) => {
      button = e.target;
      this.onPress(button, e, textArea, keyboardArea);
    });

    keyboardArea.addEventListener('mouseup', (e) => {
      button = e.target;
      this.outPress(button, e, textArea);
    });
  },
  onPress (button, e, textArea, keyboardArea) {
    const textZone = textArea;
    button.classList.add('active');

    if (e.shiftKey || button.id === '16') {
      this.shiftPress = true;
      this.compare();
    }
    if (e.keyCode === 17 || button.id === '17') this.ctrlPress = true;
    if (e.keyCode === 20 || button.id === '20') {
      if (this.capsLock === false) {
        this.capsLock = true;
        this.compare();
      } else {
        this.capsLock = false;
        this.compare();
        button.classList.remove('active');
      }
    }

    if ((e.keyCode === 18 && e.ctrlKey) || button.id === '18') {
      this.lang = (this.lang === 'ru') ? 'en' : 'ru';
      this.changeLang(keyboardArea);
    }

    if (e.keyCode === 8 || button.id === '8') textZone.value = textArea.value.slice(0, -1);
    if (e.keyCode === 32 || button.id === '32') textZone.value += ' ';
    if (button.textContent.length < 2) textZone.value += button.textContent;
  },
  outPress (button, e) {
    if (e.shiftKey === false || button.id === '16') {
      this.shiftPress = false;
      this.shift(false);
      this.compare();
    }
    if (e.keyCode === 17 || button.id === '17') this.ctrlPress = false;

    if (button.id !== '20') button.classList.remove('active');
  },
  compare () {
    if (this.capsLock === false && this.shiftPress === false) this.shift(false);
    if (this.capsLock === true && this.shiftPress === true) this.shift(false);
    if (this.capsLock === false && this.shiftPress === true) this.shift(true);
    if (this.capsLock === true && this.shiftPress === false) this.shift(true);
  },
  changeLang (keyboardArea) {
    let text;
    const keyboard = keyboardArea;
    for (let i = 0; i < this.buttonsSigns.length; i += 1) {
      if (this.lang === 'ru') {
        if (this.buttonsSigns[i][this.langCode.ru]) {
          text = this.buttonsSigns[i][this.langCode.ru];
          keyboard.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = text;
        }
      }
      if (this.lang === 'en') {
        if (this.buttonsSigns[i][2]) {
          text = this.buttonsSigns[i][this.langCode.en];
          keyboard.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = text;
        }
      }
    }
    localStorage.setItem('lang', this.lang);
  },
  shift (condition) {
    let text;

    if (keyBoard.lang === 'ru') {
      for (let i = 0; i < keyBoard.buttonsSigns.length; i += 1) {
        if (keyBoard.buttonsSigns[i][2]) {
          if (condition) {
            text = this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent.toUpperCase();
          } else {
            text = this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent.toLowerCase();
          }
          this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = text;
        } else if (keyBoard.buttonsSigns[i][1]) {
          if (condition) {
            this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = this.buttonsSigns[i]['1'];
          } else {
            this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = this.buttonsSigns[i]['0'];
          }
        }
      }
    }
    if (this.lang === 'en') {
      for (let i = 0; i < this.buttonsSigns.length; i += 1) {
        if (this.buttonsSigns[i][1]) {
          if (condition) {
            this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = this.buttonsSigns[i]['1'];
          } else {
            this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = this.buttonsSigns[i]['0'];
          }
        } else if (this.buttonsSigns[i][0] >= 'a' && this.buttonsSigns[i][0] <= 'z') {
          if (condition) {
            text = this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent.toUpperCase();
          } else {
            text = this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent.toLowerCase();
          }
          this.shift.keyboardArea.querySelector(`[id ='${this.buttonsCodes[i]}']`).textContent = text;
        }
      }
    }
  }
};
keyBoard.renderKeyboard();
