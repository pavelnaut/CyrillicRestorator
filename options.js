import { initialize, currentPresetName, currentPreset, data } from './common.js';


const mapping = {
  0: 'а',
  1: 'б',
  2: 'в',
  3: 'г',
  4: 'д',
  5: 'е',
  6: 'ж',
  7: 'з',
  8: 'и',
  9: 'й',
  10: 'к',
  11: 'л',
  12: 'м',
  13: 'н',
  14: 'о',
  15: 'п',
  16: 'р',
  17: 'с',
  18: 'т',
  19: 'у',
  20: 'ф',
  21: 'х',
  22: 'ц',
  23: 'ч',
  24: 'ш',
  25: 'щ',
  26: 'ъ',
  27: 'ь',
  28: 'ю',
  29: 'я',
  30: 'А',
  31: 'Б',
  32: 'В',
  33: 'Г',
  34: 'Д',
  35: 'Е',
  36: 'Ж',
  37: 'З',
  38: 'И',
  39: 'Й',
  40: 'К',
  41: 'Л',
  42: 'М',
  43: 'Н',
  44: 'О',
  45: 'П',
  46: 'Р',
  47: 'С',
  48: 'Т',
  49: 'У',
  50: 'Ф',
  51: 'Х',
  52: 'Ц',
  53: 'Ч',
  54: 'Ш',
  55: 'Щ',
  56: 'Ъ',
  57: 'Ь',
  58: 'Ю',
  59: 'Я'
};



// Saves options to chrome.storage
const saveOptions = () => {
    const color = document.getElementById('color').value;
    const likesColor = document.getElementById('like').checked;
  
    chrome.storage.sync.set({'savedItem': newDict},
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  
// document.addEventListener('DOMContentLoaded', initialize);
document.getElementById('save').addEventListener('click', saveOptions);


// Get all elements with class name "inputChar"
var elements = document.getElementsByClassName("inputChar");

function setCurrentCharDict(newDict) {
  // Sets the current character dictionary in browser storage
  chrome.storage.sync.set({'CharDict': newDict}, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  }
  );

};

function getInputCharacterMapping() {
  const inputChars = document.querySelectorAll('.inputChar');
  let characterMapping = {};

  inputChars.forEach((inputChar) => {
    const char = inputChar.value.trim();
    const id = inputChar.id;
    const key = id.replace('inputChar', ''); // Remove the prefix 'inputChar'
    characterMapping[mapping[key]] = char;
  });

  return characterMapping;
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the current character preset
  initialize();
  loadPresets();
  loadInputCharacterMapping();
});


function loadPresets() {
  // Get the selection element
  let presetSelection = document.getElementById("Preset");
  console.log(Object.keys(data['presets']));
  // For each preset, create an option element and append it to the select element
  for (let preset of Object.keys(data['presets'])) {
    console.log(preset);
    let option = document.createElement("option");
    option.value = preset;
    option.text = preset;
    presetSelection.appendChild(option);
  }
  // Add an option for creating a new preset
  let preset = 'Create new preset';
  let option = document.createElement("option");
  option.value = preset;
  option.text = preset;
  presetSelection.appendChild(option);
}


function loadInputCharacterMapping() {
  // Load input field values with the current character mapping
  for (const key in mapping) {
    let itemId = 'inputChar' + key;
    let inputChar = document.getElementById(itemId);
    inputChar.value = currentPreset[mapping[key]] ?? '';
  }
}



// Ах чудна българска земьо, полюшвай цъфтящи жита
// Жълтата дюля беше щастлива, че пухът, който цъфна, замръзна като гьон.
// За миг бях в чужд плюшен скърцащ фотьойл.

  // ɰ uʋυսᴜꞟꭎꭒｕ𐓶𑣘𝐮𝑢𝒖𝓊𝓾𝔲𝕦𝖚𝗎𝘂𝘶𝙪𝚞𝛖𝜐𝝊𝞄𝞾
//ßβϐᏰꞵ𝛃𝛽𝜷𝝱𝞫
// ⳍ,ӡ,ꝫ Ⲫ
// '\u04E1' - 