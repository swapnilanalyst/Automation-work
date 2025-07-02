/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginWithRole(env: string, role: string): Chainable<void>;
    reactClearAndType(selector: string, value: string): Chainable<void>;
  }
}
