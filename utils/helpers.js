export class helpers {
  /**
   * Safely selects a value from a <select> dropdown by label text.
   * Only selects if current selected value is different.
   * @param {string} label - The visible label text
   * @param {string} value - The value to select
   */
  static safeSelectByLabel(label, value) {
    cy.contains('label', label)
      .parent()
      .find('select')
      .then(($select) => {
        const current = $select.find('option:selected').text().trim();
        if (current !== value) {
          cy.wrap($select).select(value, { force: true });
        } else {
          cy.log(`ℹ️ "${label}" already set to "${value}"`);
        }
      });
  }
}
