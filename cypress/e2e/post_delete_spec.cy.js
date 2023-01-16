//Note: Restart server immediately before running these tests 

describe('Post/Delete/Put', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/todos')
  })

  it("Should create a todo even if the user doesn't input information", () => {
    cy.get('.addButton')
      .click()
    cy.get("body")
      .should("contain", "No title")
  })

  it('Should be able to add a new todo and change each field', () => {
    cy.get('.contentInput')
      .type("This is a test")
    cy.get('.dateInput')
      .click()
      .type("2023-02-10")
    cy.get("select")
      .select(2)
    cy.get('.addButton')
      .click()
    cy.get("body")
      .should("contain", "This is a test")
    cy.get("body")
      .should("contain", "Due: 2023-02-10")
  })

  it('Should be able to move a todo between columns', () => {
    cy.get('[data-rbd-draggable-id="4"]')
      .tab().tab()
      .should('have.text', 'Buy plane tickets 🛩Due: 2023-01-19Delete')
    cy.get('[data-rbd-draggable-id="3"]')
      .trigger('keydown', { keyCode: 32 })
      .trigger('keydown', { keyCode: 40, force: true })
      .trigger('keydown', { keyCode: 37, force: true })
      .trigger('keydown', { keyCode: 32, force: true })
    cy.wait(500)
    cy.reload(true)
    cy.get('.sc-eDvSVe > :nth-child(2)')
      .should("have.text", 'On deckAssemble new desk chair 🪑Due: 2023-01-25DeleteBuy plane tickets 🛩Due: 2023-01-19Delete')
  })

  it('Should be able to move a todo within a column', () => {
    cy.get('.sc-eDvSVe > :nth-child(2)')
      .should("have.text", 'On deckAssemble new desk chair 🪑Due: 2023-01-25DeleteBuy plane tickets 🛩Due: 2023-01-19Delete')
    cy.get('[data-rbd-draggable-id="3"]')
      .trigger('keydown', { keyCode: 32 })
      .trigger('keydown', { keyCode: 38, force: true })
      .trigger('keydown', { keyCode: 38, force: true })
      .trigger('keydown', { keyCode: 32, force: true })
    cy.reload(true)
    cy.wait(500)
    cy.get('.sc-eDvSVe > :nth-child(2)')
      .should("have.text", 'On deckBuy plane tickets 🛩Due: 2023-01-19DeleteAssemble new desk chair 🪑Due: 2023-01-25Delete')
  })
  it('Should be able to delete a todo', () => {
    cy.get("body")
      .should("contain", "Make vet appointment 🐶")
    cy.get('[data-rbd-draggable-id="2"] > .deleteButton').click()
    cy.get("body")
      .should("not.contain", "Make vet appointment 🐶")
  })
})




