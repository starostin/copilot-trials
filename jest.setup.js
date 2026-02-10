// Jest setup file
// Mock localStorage for Node.js environment
global.localStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Mock DOM elements that script.js expects
global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  body: { 
    appendChild: () => {}, 
    removeChild: () => {} 
  },
  createElement: () => ({ 
    click: () => {},
    download: '',
    href: ''
  })
};

global.window = {
  addEventListener: () => {}
};

// Mock Chart.js
global.Chart = function() {};

// Load the script functions
const fs = require('fs');
const path = require('path');
const scriptPath = path.join(__dirname, 'script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Extract and expose the functions we need to test
const functionsToExtract = [
  'validateUsername',
  'loadData',
  'saveData',
  'loadUsername',
  'saveUsername',
  'handleUsernameInput',
  'handleUsernameSubmit'
];

// Create a context and evaluate the functions
functionsToExtract.forEach(funcName => {
  const regex = new RegExp(`function ${funcName}\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}(?=\\n|$)`, 'm');
  const match = scriptContent.match(regex);
  if (match) {
    eval(match[0]);
    global[funcName] = eval(funcName);
  }
});

// Constants from script.js
global.STORAGE_KEY = 'bucks2barData';
