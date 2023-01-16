describe('Landing page', () => {
  beforeEach(() => {
    // cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    // cy.intercept("PUT", "http://localhost:3001/todos/:id", { fixture: "todos2" })
    // cy.intercept("POST", "http://localhost:3001/todos/:id", { fixture: "post" })
    cy.visit('http://localhost:3000/todos')
  })

  it("Should create a todo even if the user doesn't input information", () => {
    cy.get('.addButton').click()
    cy.get("body").should("contain", "No title")
  })

  it('Should be able to add a new todo and change each field', () => {
    cy.get('.contentInput').type("This is a test")
    cy.get('.dateInput').click().type("2023-02-10")
    cy.get("select").select(2)
    cy.get('.addButton').click()
    cy.get("body").should("contain", "This is a test")
    cy.get("body").should("contain", "Due: 2023-02-10")
  })

  it('Should be able to delete a todo', () => {
    cy.get("body").should("contain", "Make vet appointment 🐶")
    cy.get('[data-rbd-draggable-id="2"] > .deleteButton').click()
    cy.get("body").should("not.contain", "Make vet appointment 🐶")
  })
})




