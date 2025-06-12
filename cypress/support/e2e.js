// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'cypress-mochawesome-reporter/register';
import '@shelex/cypress-allure-plugin';
Cypress.on('uncaught:exception', () => false);
require('cypress-xpath');

Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch;

  win.fetch = function (...args) {
    return originalFetch.apply(this, args).then((response) => {
      const url = args[0];
      if (url.includes('.js')) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          throw new Error(`🛑 JS file returned HTML instead of JS: ${url}`);
        }
      }
      return response;
    });
  };
});

