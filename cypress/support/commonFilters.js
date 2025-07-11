// CommonFilters.js

// class CommonFilters {
//   /**
//    * 🔁 Iterates all dropdown options by placeholder and tests them one by one
//    * Useful for looping through custom multiselects
//    */
//   testAllDropdownOptions(placeholder, callbackFn) {
//     const dropdownSelector = `[placeholder="${placeholder}"]`;
//     const optionSelector = ".p-multiselect-items-wrapper li";

//     cy.get(dropdownSelector).click();

//     cy.get(optionSelector).then(($options) => {
//       const totalOptions = $options.length;

//       Cypress._.times(totalOptions, (index) => {
//         cy.get(dropdownSelector).click();

//         cy.get(optionSelector)
//           .eq(index)
//           .then(($el) => {
//             const optionText = $el.text().trim();
//             cy.wrap($el).click({ force: true });

//             cy.get("body").type("{esc}");

//             callbackFn(optionText);
//           });
//       });
//     });
//   }

//   /**
//    * 🔁 Generic multi-select dropdown handler
//    * @param {string} dropdownName - Label text (e.g. 'Team', 'Employee')
//    * @param {string} valueToSelect - Option text to select (e.g. 'Pulkit Soni')
//    */
//   selectFromDropdown(dropdownName, valueToSelect) {
//     // const dropdownContainer = '.rmsc.classgroup .dropdown-container';
//     // const dropdownPanel = ".dropdown-content";
//     // const optionItem = "label.select-item";

//     // Step 1: Find dropdown by its label (above or near container)
//     cy.contains("label", dropdownName)
//       .parent() // Go up to .col-sm-auto
//       .find(".dropdown-container") // Target the dropdown inside
//       .click();

//     cy.get("body") // Check body because options often render here
//       .find(".dropdown-content") // Replace with actual class of options
//       .should("be.visible") // Ensures options are fully loaded
//       .then(($options) => {
//          const optionTexts = [];
//           // Loop through all options
//           $options.each((index, option) => {
//             optionTexts.push(option.innerText.trim());
//           });
//          // Log the options to Cypress console
//          cy.log('Dropdown options:', optionTexts);
//          console.log('Dropdown options:', optionTexts);
         

//         // optionTexts.forEach((val, i) => cy.log(`${i + 1}. ${val}`));

//         // Step 3: Click Select All first
//         cy.contains("Select All").click({ force: true });

//         // Step 4: Click the specific value
//         // if (optionTexts.includes(valueToSelect)) {
//         //   cy.wrap($options).contains(valueToSelect).click({ force: true });
//         // } else {
//         //   throw new Error(`❌ Option "${valueToSelect}" not found in dropdown`);
//         // }
//       });

//     // Step 5: Optional cleanup
//     cy.get("body").type("{esc}");
//   }

//   /**
//    * ✅ Check default filter visibility
//    */
//   verifyDefaultFiltersVisible() {
//     cy.get(".form-label")
//       .contains("Select Team")
//       .should("exist")
//       .and("be.visible");
//     cy.get(".form-label")
//       .contains("Select Employee")
//       .should("exist")
//       .and("be.visible");
//     cy.get(".ant-picker.ant-picker-range")
//       .find("input")
//       .should("have.length", 2);

//     cy.get("button").contains("Show").should("be.visible");
//   }

//   selectTeam(teamName) {
//     this.selectFromDropdown("team", teamName);
//   }

//   selectEmployee(employeeName) {
//     this.selectFromDropdown("employee", employeeName);
//   }

//   setDateRange(fromDate, toDate) {
//     cy.get("input[placeholder='yyyy-mm-dd']").eq(0).clear().type(fromDate);
//     cy.get("input[placeholder='yyyy-mm-dd']").eq(1).clear().type(toDate);
//   }

//   applyFilters() {
//     cy.get("button").contains("Show").click();
//   }
// }


class commonFilters{

  // Select default value for filter dropdown by label
selectDefaultFilter(label) {
  cy.contains('label', label)
    .parent() // Move to parent to find dropdown input
    .find('input')
    .should('exist')
    .click({force: true});
  // Optionally verify default selection
  cy.get('.option-label') // update selector based on actual dropdown structure
    .should('contain', 'All items are selected');
}

// Get all dropdown options for a filter by label
getAllDropdownValues(label) {
  cy.contains('label', label)
    .parent()
    .find('input')
    .click({force: true}); // Open dropdown
  cy.get('.dropdown-options-list .option-label') // Update to your dropdown option selector
    .each($el => {
      cy.log($el.text());
    });
  // You can also return all options as an array if needed
}

// Deselect all, then select each option one by one and verify
iterateDropdownValues(label) {
  cy.contains('label', label)
    .parent()
    .find('input')
    .click({force: true});
  // Deselect all
  cy.get('.dropdown-options-list .option-label')
    .contains('Select All')
    .click({force: true});
  // Now iterate each option
  cy.get('.dropdown-options-list .option-label').each(($el, index, $list) => {
    if ($el.text().trim() !== 'Select All') {
      cy.wrap($el).click({force: true});
      // Optionally, assert page reload/data update here
      cy.wait(1000); // Wait for data update
      // Deselect current before next
      cy.wrap($el).click({force: true});
    }
  });
}

// Select a specific value in dropdown by label
selectSpecificDropdownValue(label, value) {
  cy.contains('label', label)
    .parent()
    .find('input')
    .click({force: true});
  // Deselect all
  cy.get('.dropdown-options-list .option-label')
    .contains('Select All')
    .click({force: true});
  // Scroll and select value
  cy.get('.dropdown-options-list .option-label')
    .contains(value)
    .scrollIntoView()
    .click({force: true});
  // Optionally assert after selection
  cy.wait(1000);
}



}

export default new CommonFilters();
