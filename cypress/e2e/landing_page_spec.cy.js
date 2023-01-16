import { url } from "inspector"

describe('Landing page', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("PUT", "http://localhost:3001/todos/:id", { fixture: "todos-put" })
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

  it('Should have a logo', () => {
    cy.get('h1')
      .contains("Todos")
  })

  it('Should have an input field for a todo description', () => {
    cy.get('.contentInput')
      .should('exist')
  })

  it('Should have date picker with a default current date', () => {
    const getDate = new Date()
    let day = getDate.getDate()
    let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
    let year = getDate.getFullYear()
    let currentDate = `${year}-${month}-${day}`
    cy.get('.dateInput')
      .should('have.value', `${currentDate}`)
  })

  it('Should have a warning symbol for late todos and those that are due the current or following day', () => {
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



  it('Should be able to move a todo between columns and within columns', () => {
    // cy.get('.sc-eDvSVe > :nth-child(3)').children().eq(1).contains('Return library books')
    // cy.get('.sc-eDvSVe > :nth-child(3)').children().eq(1).contains('Buy plane tickets')

    // test starting point of task
    cy.get(':nth-child(2) > .sc-hLBbgP > .sc-bcXHqe')
      .tab().tab().should('have.text', 'Buy plane tickets 🛩Due: 2023-01-19Delete')

    // move task below another task
    cy.get('[data-rbd-draggable-id="3"]')
      .trigger('keydown', { keyCode: 32 })
      .trigger('keydown', { keyCode: 40, force: true })
      // cy.wait(500)
      // cy.get(':nth-child(1) > .sc-hLBbgP > .sc-bcXHqe').trigger('keyup', { keyCode: 32 })
      // cy.get(':nth-child(1) > .sc-hLBbgP > .sc-bcXHqe').trigger('keyup', { keyCode: 40 })
      .trigger('keypress', { keyCode: 27, force: true })

      // cy.get('body')
      // .tab().tab().contains('have.text', 'You have moved the item from position 1\n to position 2\n')

      // cy.get(':nth-child(2) > .sc-hLBbgP > .sc-bcXHqe')
      //   .tab().tab().should('have.text', 'Buy plane tickets 🛩Due: 2023-01-19Delete')

      // cy.get(':nth-child(3) > .sc-hLBbgP').children().eq(0).contains('Return library books 📚')
      // cy.get(':nth-child(3) > .sc-hLBbgP').children().eq(1).contains('Buy plane tickets 🛩')
      .trigger('keydown', { keyCode: 37, force: true })
      .trigger('keydown', { keyCode: 38, force: true })
    // cy.get('.sc-eDvSVe > :nth-child(2)')
    //   .contains("Buy plane tickets")
    // cy.get('.body')
    // .should("have.text", "You have moved the item from position 1\n to position 2\n")

    // cy.get('.sc-eDvSVe > :nth-child(2)')
    // .should("have.text",'Buy plane tickets')

    // select the card, move up, should contain 
  })

})




  // it('Should be able to drag and drop a todo between columns', () => {
  //   const dataTransfer = new DataTransfer()
  //   cy.get('[data-rbd-draggable-id="5"] > :nth-child(1)')
  //     .trigger('dragstart', {
  //       dataTransfer
  //     })
  //   cy.get(':nth-child(1) > .sc-hLBbgP')
  //     .trigger('drop', {
  //       dataTransfer
  //     })
  //     cy.get('.sc-eDvSVe > :nth-child(2)')
  //     .contains("Buy plane tickets")
  // })

