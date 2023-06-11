import { initialize, data, replaceChars } from './common.js';




document.addEventListener('DOMContentLoaded', function() {
  var inputText = document.getElementById('input-text');
  var outputText = document.getElementById('output-text');
  var copyBtn = document.getElementById('copy-btn');

  // Initialize the current character preset
  initialize();
  
  // Copy the output text to the clipboard
  copyBtn.addEventListener('click', function() {
    outputText.select();
    navigator.clipboard.writeText(outputText.value)
  });

  // Input text event listener
  inputText.addEventListener('input', function() {
      outputText.value = replaceChars(inputText.value);
  });
});

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});