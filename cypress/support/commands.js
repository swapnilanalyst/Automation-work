/// <reference types="cypress" />

import { allFakers } from "@faker-js/faker"
// import cypress = require("cypress")

Cypress.Commands.add('loginWithRole', (env, role) => {
    const credentials = Cypress.env(env)?.[role]
  
    if (!credentials) {
      throw new Error(`No credentials for env="${env}" role="${role}"`)
    }
  
    const { email, password } = credentials
  
    cy.visit('/login')
    cy.wait(3000)
    if (role.toLowerCase().includes('admin')) {
      cy.get('.nav-tabs-custom .nav-link').eq(0).click()
    } else {
      cy.get('.nav-tabs-custom .nav-link').eq(1).click()
    }
  
    cy.get('input[name="email"]').filter(':visible').first().clear({ force: true }).type(email, { force: true })
    cy.get('input[name="password"]')
    .filter(':visible')
    .first()
    .as('passwordInput');

  cy.get('@passwordInput')
    .clear({ force: true })
    .type(password, { force: true });
    cy.get('button[type="submit"]').filter(':visible').click()
    cy.wait(3000)
    cy.url().should('include', '/dashboard')
  })

  // ✅ Custom command register kiya jo Cypress ke 'cy' object ke sath use ho sakta hai

//   Cypress.Commands.add("waitForApiRetry", (alias, url, {
//   retries = 2,                //(retry count – it will retry 2 times)
//   timeout = 5000,             //(wait time for every attempt)
//   reload = true,              //(if failed to load page this helps to reload page)
//   visit = null                //(optional) If page needs to be visited before wait
// } = {}) => {

//   // 📡 API intercept set kiya with alias
//   cy.intercept("GET", url).as(alias);

//   // 🌐 If visit URL provided, visit that page first
//   if (visit) cy.visit(visit, { failOnStatusCode: false });

//   // 🔁 Retry control start (max retries + 1 attempt)
//   let attempt = 0;

//   // 🔁 Recursive function to handle retry logic
//   function tryWait() {
//     // ✅ Agar attempts khatam ho gaye to test fail kar do
//     if (attempt > retries) {
//       throw new Error(`❌ [${alias}] failed after ${retries + 1} attempts`);
//     }

//     cy.log(`⏱️ Waiting for [${alias}] – attempt ${attempt + 1}`);

//     // ✅ Cypress.Promise.try for error-safe async chaining
//     Cypress.Promise.try(() => {
//       return cy.wait(`@${alias}`, { timeout });
//     })
//     .then((res) => {
//       if (res?.response) {
//         // 🟢 Success mila to log karo aur retry band karo
//         cy.log(`✅ [${alias}] success on attempt ${attempt + 1}`);
//         return;
//       }
//     })
//     .catch(() => {
//       // ⚠️ Agar fail hua aur retry bacha hai to reload aur dobara try karo
//       if (attempt < retries) {
//         cy.log(`🔁 Retry ${attempt + 1}/${retries}`);
//         if (reload) cy.reload();
//         attempt++;
//         tryWait(); // 🔁 Recursive call to retry again
//       } else {
//         // ❌ Last retry bhi fail hua to error throw karo
//         throw new Error(`❌ [${alias}] failed after ${retries + 1} attempts`);
//       }
//     });
//   }

//   tryWait(); // 🔄 Start first attempt
// });




// /**
//  * Logs in with the specified role using environment credentials.
//  * @param {string} env - The environment key from Cypress.env (e.g. "dev", "qa").
//  * @param {string} role - The user role (e.g. "admin", "employee").
//  */
// Cypress.Commands.add('loginWithRole', (env, role) => {
//   const credentials = Cypress.env(env)?.[role];

//   if (!credentials) {
//     throw new Error(`No credentials for env="${env}" role="${role}"`);
//   }

//   const { email, password } = credentials;

//   cy.visit('/login');

//   if (role.toLowerCase().includes('admin')) {
//     cy.get('.nav-tabs-custom .nav-link').eq(0).click();
//   } else {
//     cy.get('.nav-tabs-custom .nav-link').eq(1).click();
//   }

//   cy.get('input[name="email"]')
//     .filter(':visible')
//     .first()
//     .clear({ force: true })
//     .type(email, { force: true });

//   cy.get('input[name="password"]')
//     .filter(':visible')
//     .first()
//     .clear({ force: true })
//     .type(password, { force: true });

//   cy.get('button[type="submit"]').filter(':visible').click();
//   cy.wait(2000);
//   cy.url().should('include', '/dashboard');
// });

// /**
//  * Safely clears and types into an input field (especially for React-controlled inputs).
//  * Helps avoid issues where .clear() doesn't reset component state properly.
//  * 
//  * @param {string} selector - CSS selector of the input field
//  * @param {string} value - The value to type
//  */
// Cypress.Commands.add('reactForceClearAndType', (selector, value) => {
//   cy.get(selector).then(($input) => {
//     console.log("Before clear:", $input[0].value);
//     const nativeInput = $input[0];

//     // Select and clear properly
//     nativeInput.focus();
//     nativeInput.setSelectionRange(0, nativeInput.value.length);
//     nativeInput.value = '';

//     // Fire BOTH input and change to update React state
//     nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
//     nativeInput.dispatchEvent(new Event('change', { bubbles: true }));

//     // Blur + wait ensures React state sync
//     nativeInput.blur();
//   });

//   // Wait for DOM + state to sync before typing
//   cy.wait(300);

//   cy.get(selector)
//     .should('have.value', '') // confirm clearing succeeded
//     .type(value, { delay: 100 })
//     .should('have.value', value);
// });



