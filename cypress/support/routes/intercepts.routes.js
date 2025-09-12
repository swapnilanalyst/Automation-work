// cypress/support/routes/intercepts.routes.js

// Central API paths (import from a constants file if you already have one)
const API = {
  EMPLOYEE_DATATABLE: '/call-reports/get-employees-performance',
  EMPLOYEE_CALL_HOURS_GRAPH: '/call-reports/get-call-hours',
  DASHBOARD_GRAPH_DATA: '/call-reports/employee-report',
  DASHBOARD_PIE_CHART: '/call-reports/get-dashboard-piechart',
  Dashboard_Top_Performaers: '/call-reports/get-top-performer',

  GET_EMPLOYEES: '/organization/get-employees',
  GET_EMPLOYEE_NAMES: '/organization/get-employee-names',
  GET_TEAM_EMPLOYEE_INCLUDE: '/organization/get-team-employee-include',
  GET_TEAMS: '/organization/get-teams',
};

// 1) Dashboard data intercepts
export function registerDashboardIntercepts() {
  // Register BEFORE cy.visit('/dashboard')
  cy.intercept({ method: 'Post', url: `**${API.EMPLOYEE_DATATABLE}**` }).as('empTable');
  cy.intercept({ method: 'Post', url: `**${API.EMPLOYEE_CALL_HOURS_GRAPH}**` }).as('callHours');
  cy.intercept({ method: 'Post', url: `**${API.DASHBOARD_GRAPH_DATA}**` }).as('empReport');
  cy.intercept({ method: 'Post', url: `**${API.DASHBOARD_PIE_CHART}**` }).as('pieChart');
  cy.intercept({ method: 'Post', url: `**${API.Dashboard_Top_Performaers}**` }).as('TopPerformers');
}

// Wait until the four key dashboard calls happen and respond
export function waitDashboardIntercepts(requestTimeout = 40000) {
  cy.wait(['@empTable', '@callHours', '@empReport', '@pieChart'], { requestTimeout });
}

// 2) Common “Select Employee / Select Team” filters
export function registerFilterIntercepts() {
  cy.intercept({ method: 'GET', url: `**${API.GET_EMPLOYEES}**` }).as('getEmployees');
  cy.intercept({ method: 'GET', url: `**${API.GET_EMPLOYEE_NAMES}**` }).as('getEmployeeNames');
  cy.intercept({ method: 'GET', url: `**${API.GET_TEAM_EMPLOYEE_INCLUDE}**` }).as('getTeamEmployeeInclude');
  cy.intercept({ method: 'GET', url: `**${API.GET_TEAMS}**` }).as('getTeams');
}

// Wait helpers for filters
export function waitEmployeeFilter() {
  cy.wait(['@getEmployees', '@getEmployeeNames', '@getTeamEmployeeInclude'], { requestTimeout: 20000 });
}

export function waitTeams() {
  cy.wait('@getTeams', { requestTimeout: 15000 });
}

// 3) Utility to clear all aliases (optional)
export function clearAliases() {
  // Cypress does not provide a built-in “clear all routes”,
  // but you can re-register only what you need per test.
  // This is a placeholder if you later add custom cleanup logic.
}

// 4) Export API (optional) so tests can reuse constants
export { API };
