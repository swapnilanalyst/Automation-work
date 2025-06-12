Cypress.Commands.add('loginWithRole', (env, role) => {
    const credentials = Cypress.env(env)?.[role]
  
    if (!credentials) {
      throw new Error(`No credentials for env="${env}" role="${role}"`)
    }
  
    const { email, password } = credentials
  
    cy.visit('/login')
    if (role.toLowerCase().includes('admin')) {
      cy.get('.nav-tabs-custom .nav-link').eq(0).click()
    } else {
      cy.get('.nav-tabs-custom .nav-link').eq(1).click()
    }
  
    cy.get('input[name="email"]').filter(':visible').first().clear({ force: true }).type(email, { force: true })
    cy.get('input[name="password"]').filter(':visible').first().clear({ force: true }).type(password, { force: true })
    cy.get('button[type="submit"]').filter(':visible').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
  })
