// cypress/common_components/EmployeeFilter.js
class EmployeeFilter {
  els = {
    control: ':nth-child(2) > .col-sm-auto',
    dropdown: "(//div[contains(@class, 'dropdown-container')])[2]",
    content: "(//div[contains(@class,'dropdown-content')])[2]//div",
    option: "(//div[contains(@class,'dropdown-content')])[2]//div[contains(@class,'item')]",
    clearBtn: '[data-cy="filter-employee-clear"]'
  };

  intercept() {
    cy.intercept('GET', '**/organization/get-employees*').as('getEmployees');
    cy.intercept('GET', '**/organization/get-employee-names*').as('getEmployeeNames');
    cy.intercept('GET', '**/organization/get-team-employee-include*').as('getTeamEmployeeInclude');
  }

  open() {
    this.intercept();
  cy.get(':nth-child(2) > .col-sm-auto > .rmsc > .dropdown-container > .dropdown-heading').click({ force: true });
  cy.wait(3000);
  cy.get('.dropdown-content').should('be.visible');
  }

  close() {
    cy.get("body").click(0, 0);
    cy.xpath(this.els.content).should('not.exist');
  }

  // 1. Get & log dropdown list
  logOptions() {
    this.open();
    cy.xpath(this.els.option).each(($el, index) => {
      const text = $el.text().trim();
      cy.log(`Employee ${index + 1}: ${text}`);
      console.log(`Employee ${index + 1}: ${text}`);
    });
    this.close();
  }

  // 2. Select by search text
  selectByName(name) {
    this.intercept();
    this.open();
    cy.xpath(this.els.option)
      .contains(new RegExp(`^${name}$`, 'i'))
      .click({ force: true });
    cy.wait(['@getEmployees', '@getEmployeeNames', '@getTeamEmployeeInclude'], { timeout: 20000 });
    this.close();
  }

  // 3. Select by index
  selectByIndex(index) {
    this.intercept();
    this.open();
    cy.xpath(this.els.option).eq(index).click({ force: true });
    cy.wait(['@getEmployees', '@getEmployeeNames', '@getTeamEmployeeInclude'], { timeout: 20000 });
    this.close();
  }

  clear() {
    cy.get(this.els.clearBtn).click({ force: true });
  }
}

export default EmployeeFilter;




// // EMPLOYEE DROPDOWN   Working for default when all selected
// cy.log("Employee Dropdown options:");

// // Step 1: Open dropdown
// cy.xpath("(//div[contains(@class, 'dropdown-container')])[2]").click();

// // Step 2: Wait until dropdown-content is visible
// cy.xpath("(//div[contains(@class,'dropdown-content')])[2]//div")
//   .should("be.visible")
//   .each(($el, index) => {
//     const text = $el.text().trim();
//     cy.log(`Employee ${index + 1}: ${text}`);
//     console.log(`Employee ${index + 1}: ${text}`);
//   });

// // Step 3: Close dropdown
// cy.get("body").click(0, 0);