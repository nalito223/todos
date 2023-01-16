
// @flow
import * as keyCodes from '../integration/key-codes';
import { timings } from '../integration/animation';
import { getHandleSelector } from '../integration/util';

describe('reorder', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/todos", { fixture: "todos" })
    cy.intercept("PUT", "http://localhost:3001/todos:id", { fixture: "todos2" })
    cy.visit('http://localhost:3000/todos')
  })

  it('should reorder within a list', () => {
    // order: 1, 2
    cy.get(getHandleSelector()).eq(0).as('first').should('contain', 'id:1');
    cy.get(getHandleSelector()).eq(1).should('contain', 'id:2');

    // reorder operation
    cy.get('@first')
      .focus()
      .trigger('keydown', { keyCode: keyCodes.space })
      // need to re-query for a clone
      .get('@first')
      .trigger('keydown', { keyCode: keyCodes.arrowDown, force: true })
      // finishing before the movement time is fine - but this looks nice
      .wait(timings.outOfTheWay * 1000)
      .trigger('keydown', { keyCode: keyCodes.space, force: true });

    // order now 2, 1
    // note: not using get aliases as they where returning incorrect results
    cy.get(getHandleSelector()).eq(0).should('contain', 'id:2');

    cy.get(getHandleSelector()).eq(1).should('contain', 'id:1');

    // element should maintain focus post drag
    cy.focused().should('contain', 'id:1');
  });
});