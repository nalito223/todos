
// @flow
import * as keyCodes from '../integration/key-codes'
import { timings } from '../integration/animation'
import { getHandleSelector } from '../integration/util'

describe('reorder', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("PUT", "http://localhost:3001/todos:id", { fixture: "todos" })
    cy.visit('http://localhost:3000/todos')
  })

  it('should reorder within a list', () => {
   
cy.findByText("Buy plane tickets 🛩").trigger("dragstart").trigger("dragleave");

cy.findByText("Pay water bill 🚰")
.trigger("dragenter")
.trigger("dragover")
.trigger("drop")
.trigger("dragend");
  })
})