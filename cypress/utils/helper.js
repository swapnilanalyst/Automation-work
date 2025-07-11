// cypress/utils/helper.js

class Helper {

  logAndCompare(section, expected, actual) {
  const expArr = expected.map(String).sort();
  const actArr = actual.map(String).sort();

  const pass = JSON.stringify(expArr) === JSON.stringify(actArr);

  // Node/browser console
  console.log(`---- ${section} ----`);
  console.log("Expected:", expArr);
  console.log("Actual:  ", actArr);
  console.log(pass ? "✅ PASS" : "❌ FAIL");
  console.log("------------------");

  // Cypress log
  cy.log(`---- ${section} ----`);
  cy.log(`Expected: ${expArr.join(", ")}`);
  cy.log(`Actual:   ${actArr.join(", ")}`);
  cy.log(pass ? "✅ PASS" : "❌ FAIL");

  return pass;
}

  // Example: Capitalize first letter
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Example: Wait and log (custom wait)
  waitAndLog(ms, msg) {
    cy.wait(ms);
    cy.log(msg || `Waited for ${ms}ms`);
  }

  // Aur bhi helper bana sakte ho...
}

export default new Helper();
