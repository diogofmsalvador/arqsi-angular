describe('register user button', () => {

    it('Validate text button', () => {
        cy.visit('/')
        cy.viewport(1500, 800)
        cy.wait(5000);
        cy.contains('🥳 Registe-se agora 😎')
      })

    it('Registe-se agora click button', () => {
      cy.contains('🥳 Registe-se agora 😎').click()
      cy.viewport(1700, 900)
      
    })

    it('form validation title', () => {
      cy.viewport(1700, 900)
      //validar que chegou à nova view
      cy.contains(' 🥰 Bem-vindo ao processo de registo. ')
      cy.get('input').first().click()
    })

    it('click cancel button', () => {
        cy.viewport(1700, 900)
        cy.wait(2000)
        cy.get('mat-toolbar[class*="ng-trigger"] > button').click()
      })

  
  
  })
  