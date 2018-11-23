describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('has the right title', () => {
    cy.title().should('eq', 'AI Demo')
  })

  it('has an input', () => {
    cy.get('input[placeholder="Your Name..."]').should('have.length', 1)
  })
})
