describe('extra e2e tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('modal closes when clicking overlay', () => {
    cy.contains('\u041a\u0440\u0430\u0442\u043e\u0440\u043d\u0430\u044f \u0431\u0443\u043b\u043a\u0430 N-200i').click();
  cy.get('[data-cy=modal]').should('exist');
  // click overlay to close modal (force because overlay may be covered briefly)
  cy.get('[data-cy=overlay]').click({ force: true });
  cy.get('[data-cy=modal]').should('not.exist');
  });

  it('remove ingredient from constructor', () => {
    // add bun
    cy.contains('\u041a\u0440\u0430\u0442\u043e\u0440\u043d\u0430\u044f \u0431\u0443\u043b\u043a\u0430 N-200i').parent().within(() => {
      cy.get('button').click();
    });
    // add a main
    cy.contains('\u0411\u0438\u043e\u043a\u043e\u0442\u043b\u0435\u0442\u0430 \u0438\u0437 \u043c\u0430\u0440\u0441\u0438\u0430\u043d\u0441\u043a\u043e\u0439 \u041c\u0430\u0433\u043d\u043e\u043b\u0438\u0438').parent().within(() => {
      cy.get('button').click();
    });

    // ensure constructor contains added bun and main by name
    cy.get('[data-cy=constructor]').contains('\u041a\u0440\u0430\u0442\u043e\u0440\u043d\u0430\u044f \u0431\u0443\u043b\u043a\u0430 N-200i');
    cy.get('[data-cy=constructor]').contains('\u0411\u0438\u043e\u043a\u043e\u0442\u043b\u0435\u0442\u0430 \u0438\u0437 \u043c\u0430\u0440\u0441\u0438\u0430\u043d\u0441\u043a\u043e\u0439 \u041c\u0430\u0433\u043d\u043e\u043b\u0438\u0438');

    // order button should exist and be visible
    cy.get('[data-cy=constructor-order-button]').should('exist').and('be.visible');
  });
});
