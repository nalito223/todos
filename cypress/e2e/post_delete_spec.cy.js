describe('Delete and post', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("POST", "http://localhost:3001/todos", { fixture: "todos" })
    cy.visit('http://localhost:3000/todos')
  })
  it('Should be able to add a new todo', () => {
    cy.get('.contentInput').type("TEST")
    cy.get('.dateInput').focus().type("{downarrow}");
   
  })
})