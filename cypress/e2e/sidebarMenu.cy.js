import SideBarMenuPage from "../pages/SidebarMenuPage";
import DashboardPage from "../pages/Dashboard";
import SidebarPage from "../pages/SidebarMenuPage";
import SidebarMenuPage from "../pages/SidebarMenuPage";

Cypress.on("uncaught:exception", () => false);

describe("🧩 Sidebar Menu Verification", () => {
  beforeEach(() => {
    const env = Cypress.env("ENV");
    const role = Cypress.env("role");
    cy.loginWithRole(env, role);
  });

  it("🔎 Should verify all sidebar menu items are visible and clickable", () => {
    SidebarPage.verifySidebarMenuItems();
  });

  it("✅ Should match actual sidebar menu items with expected list", () => {
    const expectedMenuItems = [
  "Dashboard",
  "Report",
  "Consolidate report",
  "Unique Client Report",
  "Call Logs Report",
  "Employee Report",
  "Client Report",
  "Never Attended",
  "Not Picked Up by Client",
  "Performance Metrics",
  "Top Caller",
  "Top Dialer",
  "Top Answered",
  "Highest Call Duration",
  "Recording Report",
  "Recording Report",
  "Recording Archives",
  "Management",
  "Team Management",
  "Employee Management",
  "Role Management",
  "Exclude Number",
  "Storage Management",
  "Lead Management",
  "Add Lead",
  "Bulk Operation",
  "Subscription",
  "Subscriptions",
  "Invoice",
 ];

    SidebarMenuPage.assertSidebarMenuItems(expectedMenuItems);
  });

  it("📥 Should verify sidebar menu items and store navigable links", () => {
    SidebarPage.verifySidebarMenuItemsAndStoreLinks();
  });

  it("🖼️ Should verify sidebar logo is present and visible", () => {
    SidebarPage.verifySidebarLogoPresence();
  });

  it('🏠 Should redirect to Dashboard when logo is clicked from various sidebar pages', () => {
    SidebarPage.verifySidebarMenuItemsAndStoreLinks();

    cy.get('@sidebarLinks').then((validLinks) => {
      SidebarPage.verifySidebarMenuLinks(validLinks);
    });
  });
});


