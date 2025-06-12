import filters from '../../utils/filters';
import DashboardPagefile from '../../../pageObjects/DashboardPagefile';

describe('Dashboard Filter Tests', () => {
  beforeEach(() => {
    const env = Cypress.env('ENV');
    const role = Cypress.env('role');
    cy.loginWithRole(env, role);
    cy.visit('/dashboard');
  });

  it('tests Team dropdown filter', () => {
    filters.testAllDropdownOptions('Select Team', () => {
      cy.contains('Show').click();
      DashboardPagefile.verifyDashboardElements();
    });
  });

  it('tests Employee dropdown filter', () => {
    filters.testAllDropdownOptions('Select Employee', () => {
      cy.contains('Show').click();
      DashboardPagefile.verifyDashboardElements();
    });
  });
});
