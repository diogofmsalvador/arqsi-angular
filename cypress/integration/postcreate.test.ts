describe('add Comment tests', () => {
  it('Validate text button', () => {
    cy.visit('http://localhost:4200/feed')
    //cy.viewport(1500, 800)
    cy.wait(1000);
    cy.contains('ARQSI Social Game')
  })
  it('Validate view elements', () => {
    //cy.viewport(1500, 800)
    cy.contains('Painel do Utilizador')
    cy.contains('Publicações')
    cy.contains('Introduções | Missões')
  })

  it('Enviar mensagem para desafio', () => {
    cy.contains('Painel do Utilizador')
    cy.get('mat-expansion-panel-header > span > mat-panel-description > mat-icon').click()
    cy.wait(3000)
    //cy.get('div[class="row p-2"] > mat-radio-button >label > span > input[id="mat-radio-2-input"]').check()
    cy.get('label').should('have.class', 'mat-radio-label').first().click({force : true})
    cy.get('mat-action-row[class$="ng-star-inserted"] > button').click()
    //ver se o container apareceu
    cy.contains('Qual a mensagem que pretende enviar ao utilizador?')
    cy.wait(3000)
    cy.get('mat-dialog-container input').type('Vamos a este desafio?')
    cy.wait(3000)
    cy.get('mat-dialog-container button > span').contains('Submeter').click()

  })


})
