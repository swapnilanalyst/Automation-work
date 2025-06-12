import DashboardPage from '../pages/Dashboard'
Cypress.on('uncaught:exception', () => false)

describe('Dashboard Element Verification', () => {
  before(() => {
    const env = Cypress.env('ENV')
    const role = Cypress.env('role')
    cy.loginWithRole(env, role)
    
  })

  it('should verify key dashboard metrics and charts', () => {
    DashboardPage.verifyDashboardElements()
    
  })
  //  it('should test dashboard with each team filter', () => {
  //   cy.visit('/dashboard');

  //   // Loop through all team options
  //   // filters.testAllDropdownOptions('Select Team', (selectedTeam) => {
  //   //   cy.log(`Testing with team: ${selectedTeam}`);

  //   //   // Click Show / Search button if needed
  //   //   cy.contains('Show').click();

  //   //   // Then check if table works correctly
  //   //   // tableUtils.verifyPagination();
  //   // });
  // });
  // it('should verify the presence of the sidebar menu', () => {
  //   DashboardPage.verifySidebarMenu()
  // })
  // it('should verify the presence of the header menu', () => {
  //   DashboardPage.verifyHeaderMenu()
  // })
})
