// cypress/common_components/TeamFilter.js
class TeamFilter {
  els = {
    control:  "(//div[@class='rmsc classgroup'])[1]",
    dropdown: ':nth-child(1) > .col-sm-auto > .rmsc > .dropdown-container > .dropdown-heading',
    heading: "(//div[contains(@class,'dropdown-container')])[1]//div[contains(@class,'dropdown-heading')]",
    content: "(//div[contains(@class,'dropdown-content')])[1]//div",
    option: "(//div[contains(@class,'dropdown-content')])[1]//div[contains(@class,'item')]",
    clearBtn: '[data-cy="filter-team-clear"]'
  };

  intercept() {
    cy.intercept('GET', '**/organization/get-teams*').as('getTeams');
  }
js
open() {
  this.intercept();
  cy.get(this.els.dropdown).click({ force: true });
  cy.wait(3000);
  // cy.wait('@getTeams', { timeout: 15000 });
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
      cy.log(`Team ${index + 1}: ${text}`);
      console.log(`Team ${index + 1}: ${text}`);
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
    cy.wait('@getTeams', { timeout: 15000 });
    this.close();
  }

  // 3. Select by index
  selectByIndex(index) {
    this.intercept();
    this.open();
    cy.xpath(this.els.option).eq(index).click({ force: true });
    cy.wait('@getTeams', { timeout: 15000 });
    this.close();
  }

  clear() {
    cy.get(this.els.clearBtn).click({ force: true });
  }
}

export default TeamFilter;















// // TEAM DROPDOWN Working for default when all selected
// cy.log("Team Dropdown options:");

// // Step 1: Open dropdown
// cy.xpath("(//div[contains(@class, 'dropdown-container')])[1]").click();

// // Step 2: Wait until dropdown-content is visible
// cy.xpath("(//div[contains(@class,'dropdown-content')])[1]//div")
//   .should("be.visible")  // ensure options appeared
//   .each(($el, index) => {
//     const text = $el.text().trim();
//     cy.log(`Team option ${index + 1}: ${text}`);
//     console.log(`Team option ${index + 1}: ${text}`);
//   });

// // Step 3: Close dropdown
// cy.get("body").click(0, 0);