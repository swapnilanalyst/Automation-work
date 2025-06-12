class Filters {
  selectTeam(teamName) {
    cy.get('[placeholder="Select Team"]').click().type(`${teamName}{enter}`);
  }

  selectEmployee(employeeName) {
    cy.get('[placeholder="Select Employee"]').click().type(`${employeeName}{enter}`);
  }

  selectDateRange(fromDate, toDate) {
    cy.get('input[placeholder="From Date"]').clear().type(fromDate).blur();
    cy.get('input[placeholder="To Date"]').clear().type(toDate).blur();
  }

  testAllDropdownOptions(placeholder, callback) {
    cy.get(`[placeholder="${placeholder}"]`).click();
    cy.get('.vs__dropdown-menu li').each(($el) => {
      const option = $el.text();
      cy.get(`[placeholder="${placeholder}"]`).click().type(`${option}{enter}`);
      callback(option);
    });
  }
}

export default new Filters();
