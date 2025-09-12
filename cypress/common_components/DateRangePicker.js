// cypress/pageObjects/components/DateRangePicker.js
// For the dual-month range picker visible on the Dashboard
class DateRangePicker {
  els = {
    control: '.ant-picker', // single range input showing from -> to
    popup: '.daterangepicker, .date-picker-range, .v-date-picker',
    leftMonth: '.drp-calendar.left',
    rightMonth: '.drp-calendar.right',
    applyBtn: '.applyBtn, [data-cy="date-apply"]',
    presets: '.ranges li'
  };

  open() {
    cy.get(this.els.control).click({ force: true });
    cy.get(this.els.popup).should('be.visible');
  }

  pickPreset(label) {
    this.open();
    cy.get(this.els.presets).contains(new RegExp(`^${label}$`, 'i')).click({ force: true });
    cy.get(this.els.popup).should('not.exist');
  }

  pickRangeByISO(fromISO, toISO) {
    this.open();

    const clickDay = (scope, iso) => {
      const day = Number(iso.slice(-2)); // fallback text match
      cy.get(scope)
        .find(`[data-date='${iso}'], [data-day='${iso}'], td:contains(${day})`)
        .first()
        .click({ force: true });
    };

    clickDay(this.els.leftMonth, fromISO);
    clickDay(this.els.rightMonth, toISO);

    cy.get(this.els.applyBtn).click({ force: true });
    cy.get(this.els.popup).should('not.exist');
  }
}

export default DateRangePicker;
