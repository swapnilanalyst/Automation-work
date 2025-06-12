describe('Dashboard API Tests', () => {
  before(() => {
    const env = Cypress.env('ENV');
    const role = Cypress.env('role');
    cy.loginWithRole(env, role);
  });

  it('intercepts and validates dashboard metrics API', () => {
    cy.intercept('GET', '/api/dashboard/metrics').as('getMetrics');
    cy.visit('/dashboard');
    cy.wait('@getMetrics').its('response.statusCode').should('eq', 200);
  });
});
