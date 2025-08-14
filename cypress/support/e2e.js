import './commands'

// Pre condition to run once before each tests in every spec file
beforeEach(()=>{

    // Open the landing page
    cy.viewport(1280, 720)
    cy.visit(Cypress.config('baseUrl'))

    // Accept cookies if prompted
    cy.acceptCookies()

    // Prevent Seezar popup to be prompted
    cy.closeSeezar()
})

Cypress.on('uncaught:exception', (err) => {
    return false
})