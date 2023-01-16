import keyCodes from "../integration/key-codes"

describe('Landing page', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("PUT", "http://localhost:3001/todos:id", { fixture: "todos2" })
    cy.visit('http://localhost:3000/todos')
  })

  it('Should have a title', () => {
    cy.get('h1')
      .contains("Todos")
  })

  it('Should have an input for title', () => {
    cy.get('.contentInput')
      .should('have.value', "No title")
  })

  // it('Should have date picker', () => {
  //   cy.get('.dateInput')
  //     .should('have.value', "2023-01-14")
  // })

  it('Should have select for status', () => {
    cy.get('#column')
      .should('have.value', "column-1")
      .contains("Backlog")
  })

  it('Should have button to submit new todo', () => {
    cy.get('.addButton')
      .contains("Add")
  })

  it('Should have Backlog column with tasks', () => {
    cy.get('.sc-eDvSVe > :nth-child(1)')
      .contains("Backlog")
    cy.get(':nth-child(1) > .sc-hLBbgP > .sc-bcXHqe')
      .contains("Make vet appointment 🐶")
  })

  it('Should have Backlog column with tasks', () => {
    cy.get('.sc-eDvSVe')
      .contains("Backlog")
    cy.get('.sc-eDvSVe')
      .contains("On deck")
    cy.get('.sc-eDvSVe')
      .contains("In progress")
    cy.get('.sc-eDvSVe')
      .contains("Done")
  })

  // it('Should be able to move a todo between columns', () => {
  //   const dataTransfer = new DataTransfer()
  //   cy.get('[data-rbd-draggable-id="5"] > :nth-child(1)')
  //     .trigger('dragstart', {
  //       dataTransfer
  //     })
  //   cy.get(':nth-child(1) > .sc-hLBbgP')
  //     .trigger('drop', {
  //       dataTransfer
  //     })
  // })

  it('Should be able to move a todo between columns', () => {
    // cy.get('.sc-eDvSVe > :nth-child(3)').children().eq(1).contains('Return library books')
    // cy.get('.sc-eDvSVe > :nth-child(3)').children().eq(1).contains('Buy plane tickets')

    // test starting point of task
    cy.get(':nth-child(2) > .sc-hLBbgP > .sc-bcXHqe')
      .tab().tab().should('have.text', 'Buy plane tickets 🛩Due: 2023-01-19Delete')

    // move task below another task
    cy.get('[data-rbd-draggable-id="3"]')
      .trigger('keydown', { keyCode: 32 })
      .trigger('keydown', { keyCode: 40, force: true })
    cy.wait(500)
    cy.get(':nth-child(1) > .sc-hLBbgP > .sc-bcXHqe').trigger('keyup', { keyCode: 32 })
    cy.get(':nth-child(1) > .sc-hLBbgP > .sc-bcXHqe').trigger('keyup', { keyCode: 40 })
      .trigger('keypress', { keyCode: 27, force: true })

    // cy.get('body')
    // .tab().tab().contains('have.text', 'You have moved the item from position 1\n to position 2\n')

    cy.get(':nth-child(2) > .sc-hLBbgP > .sc-bcXHqe')
      .tab().tab().should('have.text', 'Buy plane tickets 🛩Due: 2023-01-19Delete')

    // cy.get(':nth-child(3) > .sc-hLBbgP').children().eq(0).contains('Return library books 📚')
    // cy.get(':nth-child(3) > .sc-hLBbgP').children().eq(1).contains('Buy plane tickets 🛩')
    // .trigger('keydown', { keyCode: 37, force: true })

    // select the card, move up, should contain 
  })

})





