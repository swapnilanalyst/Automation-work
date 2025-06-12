class CommonElements {
  verifyDropdown(selector, label) {
    cy.get(selector)
      .should('exist')
      .should('be.visible')
      .then(($el) => {
        cy.wrap($el).should('contain.text', label);
      });
  }

  selectDropdownOption(selector, optionText) {
    cy.get(selector).click();
    cy.contains(optionText).click();
  }

  verifyPagination(tableSelector = '[role="table"]') {
    cy.get(tableSelector)
      .should('exist')
      .within(() => {
        cy.get('[role="row"]').then((rows) => {
          if (rows.length === 1) {
            cy.contains('No record to display', { matchCase: false }).should('exist');
          } else {
            cy.get('[role="row"]').should('have.length.lte', 11); // header + 10
          }
        });
      });
  }
}

export default new CommonElements();
