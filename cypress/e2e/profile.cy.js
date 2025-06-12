import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/ProfilePage";

describe("Verify Profile Page Role Based", () => {
  beforeEach(() => {
    const role = Cypress.env('role');
      if (role === "admin") {
      cy.log("**Logging in as ADMIN**");
    } else if (role === "employee") {
      cy.log("**Logging in as EMPLOYEE**");
    } else {
      cy.log("**Logging in with unknown role: " + role + "**");
    }
    cy.loginWithRole(Cypress.env('ENV'), role);
    
  });

  // it("✅ Should open profile from header and verify profile details", () => {
  //   ProfilePage.openProfileFromHeader();
  // });

  // it("🧾 Should verify Org name and ID in header vs profile", () => {
  //   ProfilePage.openProfileFromHeader();
  //   ProfilePage.verifyHeaderDetailsAgainstProfile();
  // });

  // 🔥 Updated test - Ab yeh role ke hisab se different fields verify karega
  // it('Should validate personal details fields based on user role', () => {
  //   const currentRole = Cypress.env('role');
    
  //   ProfilePage.openProfileFromHeader();
    
  //   if (currentRole === 'admin') {
  //     cy.log("🔧 Running Admin Profile Verification");
  //     ProfilePage.verifyProfileDetails(); // Yeh internally admin wala method call karega
  //   } else if (currentRole === 'employee') {
  //     cy.log("👨‍💼 Running Employee Profile Verification");
  //     ProfilePage.verifyProfileDetails(); // Yeh internally employee wala method call karega
  //   } else {
  //     cy.log("⚠️ Unknown role, skipping profile field validation");
  //   }
  // });

  it('Should verify profile update details', () => {
    const currentRole = Cypress.env('role');
    
    ProfilePage.openProfileFromHeader();
    
    if (currentRole === 'admin') {
      cy.log("🔧 Running Admin Profile Verification");
      ProfilePage.verifyProfileUpdate(); // Yeh internally admin wala method call karega
    } else if (currentRole === 'employee') {
      cy.log("👨‍💼 Running Employee Profile Verification");
      ProfilePage.verifyProfileUpdate(); // Yeh internally employee wala method call karega
    } else {
      cy.log("⚠️ Unknown role, skipping profile field validation");
    }
  });
});