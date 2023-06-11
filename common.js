var defaultDict = { 
    // '\u0432': '\u03D0', // в:ϐ
    '\u0437':'\uA76B', // з:ꝫ //ȝʒӡჳⳍꝫ   3ƷȜЗӠⳌꝪꞫ３𑣊𖼻𝈆𝟑𝟛𝟥𝟯𝟹🯳 ɜзᴈ
    '\u043B':'\u028C', // л:ʌ
    '\u041B':'\u0245', // Л:Ʌ
    '\u043F':'n', // п:n
    '\u0438':'u', // и:ս or \u057D
    '\u0439':'\u016D', //й:ŭ
    '\u0434':'\u0261', // д:ɡ
    '\u043A':'k', // к:k
    '\u0424':'\u2CAA', //Ф:Ⲫ
    '\u0442':'m', // т:ｍ or \uFF4D
    '\u0433':'\u01A8', // г:ƨ
    '\u0449':'\u0270', // щ:ɰ
    '\u0448': '\u026F'}; // ш:ɯ wɯѡԝաᴡꮃｗ𑜊𑜎𑜏𝐰𝑤𝒘𝓌𝔀𝔴𝕨𝖜𝗐𝘄𝘸𝙬𝚠
var currentPresetName = 'Default';
var Presets = {'Default': defaultDict};
var currentPreset = defaultDict;

async function syncPresetName() {
    currentPresetName = await new Promise((resolve) => {
        chrome.storage.sync.get({'currentPresetName': 'Default'}, function (obj) {
        resolve(obj.currentPresetName);
    });
});
}

function getPresetName() {
    syncPresetName();
    return currentPresetName;
}


async function syncPreset(presetName) {
    let query = {};
    query[Presets[presetName]] = defaultDict;
    currentPreset = await new Promise((resolve) => {
        chrome.storage.sync.get(query, function (obj) {
        resolve(obj.Presets[presetName]);
      });
    });
}

function getPreset(presetName='Default') {
    syncPreset(presetName);
    return currentPreset;
}


 // Initialize the current character preset
function initialize() {
    syncPresetName().then(() => {
        syncPreset(currentPresetName).then(() => {
            console.log('initialize currentPreset: ' + currentPreset);
        });
    });
    console.log('Current preset name: ' + currentPresetName);
    console.log('Current preset: ', currentPreset);
  }


function toUnicode(str) {
	return str.split('').map(function (value, index, array) {
		var temp = value.charCodeAt(0).toString(16).toUpperCase();
		if (temp.length > 2) {
			return '\\u' + temp;
		}
		return value;
	}).join('');
}

// Replace all characters in the input string with their corresponding values in the current character dictionary
function replaceChars(input) {
    console.log('replaceChars currentPreset: ' + currentPreset);
    let re = new RegExp('['+ Object.keys(currentPreset).join('')+ ']', 'g');
    return input.replace(re, m => currentPreset[m]);
    }

export { defaultDict, currentPresetName, currentPreset, initialize, toUnicode, replaceChars, getPresetName, getPreset };