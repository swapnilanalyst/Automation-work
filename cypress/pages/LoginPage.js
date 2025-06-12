class LoginPage {
  visit() {
    cy.visit('/login')
    cy.wait(1000)
  }

  selectRole(role) {
    if (role.toLowerCase().includes('admin')) {
      cy.get('.nav-tabs-custom .nav-link').eq(0).click()
    } else {
      cy.get('.nav-tabs-custom .nav-link').eq(1).click()
    }
  }

  enterEmail(email) {
    cy.get('#home1 input[placeholder="Enter email address"]').filter(':visible').first().clear({ force: true }).type(email, { force: true })
  }

  enterPassword(password) {
    cy.get('#home1 input[placeholder="Enter Password"]').filter(':visible').first().clear({ force: true }).type(password, { force: true })
  }

  submit() {
    cy.get('button[type="submit"]').filter(':visible').click()
  }

  assertDashboardVisible() {
    cy.url().should('include', '/dashboard')
  }

  loginAs(role, email, password) {
    this.visit()
    this.selectRole(role)
    this.enterEmail(email)
    this.enterPassword(password)
    this.submit()
  }
  assertInvalidLoginMessage(expectedMessage) {
    cy.get('#home1 .alert.alert-danger')
      .should('be.visible')
      .invoke('text')
      .then((actualText) => {
        cy.log(' Actual Alert Message:', actualText.trim());
        if (!actualText.includes(expectedMessage)) {
          throw new Error(` Expected Text: "${expectedMessage}", Actual Text: "${actualText.trim()}"`);
        }
      });
    }
}
export default new LoginPage()
