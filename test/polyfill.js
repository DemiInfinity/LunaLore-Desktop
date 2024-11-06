if (typeof globalThis.TextEncoder === 'undefined') {
    globalThis.TextEncoder = require('util').TextEncoder;
  }
  
  if (typeof globalThis.TextDecoder === 'undefined') {
    globalThis.TextDecoder = require('util').TextDecoder;
  }
  