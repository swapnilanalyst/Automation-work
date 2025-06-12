import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/Dashboard';

let validLinks = [];

class SidebarPage {

  /**
   * 🔎 Verifies all sidebar menu items are visible and have valid hrefs
   */
  verifySidebarMenuItems() {
    cy.get('#navbar-nav a.nav-link').then($elements => {
      const menuItems = Array.from($elements); // Convert jQuery object to JS array

      menuItems.forEach((el, index) => {
        const itemText = el.innerText.trim();
        const href = el.getAttribute('href');

        // 🔹 Log item details to Cypress and browser console
        cy.log(`🔹 Menu Item ${index + 1}: ${itemText} ➜ ${href}`);
        console.log(`Menu Item ${index + 1}: ${itemText} ➜ ${href}`);

        // ✅ Assertions
        expect(itemText, `Menu item ${index + 1} should have text`).to.not.be.empty;
        expect(href, `Menu item ${index + 1} should have href`).to.not.be.empty;
      });
    });
  }

  /**
   * ✅ Compares actual sidebar items with expected list
   */
  assertSidebarMenuItems(expectedMenuItems) {
    const actualMenuItems = [];

    cy.get('#navbar-nav a.nav-link').each(($el) => {
      const text = $el.text().trim();
      actualMenuItems.push(text);
    }).then(() => {
      // 📥 Log both expected and actual results
      console.log('✅ Expected Menu Items:', expectedMenuItems);
      console.log('📥 Actual Menu Items:', actualMenuItems);

      cy.log('🔵 Expected:', expectedMenuItems.join(' | '));
      cy.log('🟢 Actual:', actualMenuItems.join(' | '));

      // 🔍 Assert deep equality
      expect(actualMenuItems).to.deep.equal(expectedMenuItems);
    });
  }

  /**
   * 📥 Collects and stores valid sidebar hrefs in an alias `@sidebarLinks`
   */
  verifySidebarMenuItemsAndStoreLinks() {
    cy.get('#navbar-nav a.nav-link').then($elements => {
      const menuItems = Array.from($elements);

      menuItems.forEach((el, index) => {
        const itemText = el.innerText.trim();
        const href = el.getAttribute('href');

        // 🔹 Log each item
        cy.log(`🔹 Menu Item ${index + 1}: ${itemText} ➜ ${href}`);
        console.log(`Menu Item ${index + 1}: ${itemText} ➜ ${href}`);

        // ✅ Collect only valid navigable links
        if (href && href !== '/') {
          validLinks.push({ text: itemText, href });
        }

        // Basic validations
        expect(itemText, `Menu item ${index + 1} should have text`).to.not.be.empty;
        expect(href, `Menu item ${index + 1} should have href`).to.not.be.empty;
      });

      // 📌 Log all collected links
      cy.log(`✅ Collected ${validLinks.length} navigable links:`);
      console.table(validLinks);

      // 💾 Store in Cypress alias
      cy.wrap(validLinks).as('sidebarLinks');
    });
  }

  /**
   * 🖼️ Verifies the presence and visibility of the sidebar logo image
   */
  verifySidebarLogoPresence() {
    cy.get('.navbar-brand-box img')
      .should('exist')
      .and('have.attr', 'src')
      .then((src) => {
        cy.log(`🖼️ Sidebar logo src: ${src}`);

        // ✅ Check if it's a valid image (URL or Base64)
        const isValidImage = /^data:image\/(png|jpeg|jpg|svg\+xml);base64,/.test(src) ||
                             /\.(png|jpg|jpeg|svg)$/i.test(src);

        // 📌 Determine image type or file name
        let actualResult;
        if (src.startsWith('data:image/')) {
          const match = src.match(/^data:image\/([a-zA-Z0-9+]+);base64,/);
          actualResult = `Base64 encoded image - type: ${match ? match[1] : 'unknown'}`;
        } else {
          const match = src.match(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/);
          actualResult = `Image file name: ${match ? match[0] : 'unknown'}`;
        }

        cy.log(`📌 Actual Result: ${actualResult}`);
        expect(isValidImage, 'Logo source should be a valid image (URL or base64)').to.be.true;
      });

    // ✅ Ensure at least one visible logo
    cy.get('.navbar-brand-box img:visible')
      .should('have.length.at.least', 1)
      .each(($el, index) => {
        cy.log(`✅ Visible logo #${index + 1}: ${$el.attr('src')}`);
      });
  }

  /**
   * 🏠 Navigates through all stored links and checks logo redirection to Dashboard
   * @param {Array} validLinks - Collected sidebar links
   */
  verifySidebarMenuLinks(validLinks) {
    validLinks.forEach((link, index) => {
      cy.log(`🔗 [${index + 1}] Navigating to: ${link.text} ➜ ${link.href}`);
      cy.visit(link.href);
      cy.wait(5000);

      cy.get(
        '#layout-wrapper > div.app-menu.navbar-menu.sn-sideBar-navbar-main.sn-left-side-menu-bar-main-page > div.navbar-brand-box'
      )
        .should('be.visible')
        .click();

      cy.url().should('include', '/dashboard');
    });
  }

}

export default new SidebarPage();
