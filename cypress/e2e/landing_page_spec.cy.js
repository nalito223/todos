describe('Landing page', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("PUT", "http://localhost:3001/todos/:id", { fixture: "todos" })
    cy.visit('http://localhost:3000/todos')
  })

  it('Should be able to route between starting page and board view', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.Login-header')
      .should('have.text', 'Get started with Todos')
    cy.get('iframe')
      .should('exist')
    cy.get('.Login-button')
      .click()
    cy.get('h1')
      .contains("Todos")
      .url()
      .should('include', '/todos')
  })

  it('Should have 404 page for non existent routes', () => {
    cy.visit('http://localhost:3000/test')
    cy.get('.Error-header')
      .should('have.text', '404: Page not found')
    cy.get('.Error-button')
      .url()
      .should('include', '/')
    cy.get('.Error-button')
      .click()
    cy.get('.Login-header')
      .should('have.text', 'Get started with Todos')
  })

  it('Should have a logo', () => {
    cy.get('h1')
      .contains("Todos")
  })

  it('Should have an input field for a todo description', () => {
    cy.get('.contentInput')
      .should('exist')
  })

  it('Should have date picker with a default of current date', () => {
    const getDate = new Date()
    let day = getDate.getDate()
    let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
    let year = getDate.getFullYear()
    let currentDate = `${year}-${month}-${day}`
    cy.get('.dateInput')
      .should('have.value', `${currentDate}`)
  })

  it('Should have an alert symbol for late todos', () => {
    cy.get('[data-rbd-draggable-id="1"] > .content > .icon-container').should('exist')
    cy.get('[data-rbd-draggable-id="1"] > .content')
      .should("have.text", "Due: 2023-01-13")
  })

  it('Should have button to submit new todo', () => {
    cy.get('.addButton')
      .contains("Add")
  })

  it('Should have all four status columns', () => {
    cy.get('.sc-eDvSVe')
      .contains("Backlog")
    cy.get('.sc-eDvSVe')
      .contains("On deck")
    cy.get('.sc-eDvSVe')
      .contains("In progress")
    cy.get('.sc-eDvSVe')
      .contains("Done")
  })

  it('Should have todos in all four status columns', () => {
    cy.get('.sc-eDvSVe > :nth-child(1)')
      .contains("Make vet appointment")
    cy.get('.sc-eDvSVe > :nth-child(2)')
      .contains("Assemble new desk chair")
    cy.get('.sc-eDvSVe > :nth-child(2)')
      .contains("Assemble new desk chair")
    cy.get('.sc-eDvSVe > :nth-child(3)')
      .contains("Buy plane tickets")
    cy.get('.sc-eDvSVe > :nth-child(4)')
      .contains("Pay water bill")
  })
})

