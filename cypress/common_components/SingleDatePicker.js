// cypress/pageObjects/components/SingleDatePicker.js
// For single-input calendars used on reports
class SingleDatePicker {
  open(inputSelector) {
    cy.get(inputSelector).click({ force: true });
    cy.get('.v-date-picker, .react-datepicker, .date-picker-single, .drp-calendar').should('be.visible');
  }

  typeValue(inputSelector, displayValue) {
    cy.get(inputSelector).clear().type(displayValue).should('have.value', displayValue);
  }

  pickISO(inputSelector, iso) {
    this.open(inputSelector);
    cy.get(`[data-date='${iso}'], [aria-label*='${iso}']`).first().click({ force: true });
    cy.get(inputSelector).should($i => {
      const v = $i.val() || '';
      expect(v.length).to.be.greaterThan(5);
    });
  }
}

export default SingleDatePicker;
