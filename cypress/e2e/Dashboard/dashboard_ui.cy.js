import DashboardPagefile from "../../../pageObjects/DashboardPagefile";

describe('Dashboard UI Tests', () => {
  before(() => {
    const env = Cypress.env('ENV');
    const role = Cypress.env('role');
    cy.loginWithRole(env, role);
  });

  it('should verify all dashboard widgets and charts', () => {
    DashboardPagefile.verifyDashboardElements();
  });

  it('should verify sidebar visibility', () => {
    DashboardPagefile.verifySidebarMenu();
  });

  it('should verify header is rendered', () => {
    DashboardPagefile.verifyHeaderMenu();
  });
});
