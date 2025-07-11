import DashboardData from "../pages/DashboardData";
import DashboardPage from "../pages/DashboardPage";

describe("Verify Dashboard Page Role Based", () => {
  beforeEach(() => {
    const role = Cypress.env("role");
    if (role === "admin") {
      cy.log("**Logging in as ADMIN**");
    } else if (role === "employee") {
      cy.log("**Logging in as EMPLOYEE**");
    } else if (role === "roleBasedEmployee") {
      cy.log("**Logging in as ROLE-BASED EMPLOYEE**");
    } else {
      cy.log("**Logging in with unknown role: " + role + "**");
    }
    cy.loginWithRole(Cypress.env("ENV"), role);
    // Dashboard open by default after login
    cy.url().should("include", "/dashboard");
  });

  // it("Should verify dashboard components as per role", () => {
  //   DashboardPage.verifyDashboardUI();
  //   cy.wait(1000);
  // });
  it("Should verify dashboard data as per role", () => {
    DashboardData.verifyAdminDashboardData();
    cy.wait(1000);
  });

  // Add more deep data tests later, yaha UI element/role-based checks ho gaye
});
