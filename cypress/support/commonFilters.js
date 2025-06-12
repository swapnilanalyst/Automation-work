class CommonFilters {
  testAllDropdownOptions(placeholder, callbackFn) {
    cy.get(`[placeholder="${placeholder}"]`).click();

    // Wait for options to be visible
    cy.get('.p-multiselect-items-wrapper li').each(($el, index, $list) => {
      const optionText = $el.text().trim();

      // Select current option
      cy.wrap($el).click();

      // Close dropdown if needed
      cy.get('body').type('{esc}');

      // Run your custom test (like table verification)
      callbackFn(optionText);

      // Re-open dropdown for next selection (if not last)
      if (index < $list.length - 1) {
        cy.get(`[placeholder="${placeholder}"]`).click();
      }
    });
  }
}

export default new CommonFilters();
