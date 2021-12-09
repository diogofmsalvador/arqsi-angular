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

    it('form validation Inputs', () => {
      cy.viewport(1700, 900)
      cy.get('input[id="Nome_de_utilizador"]')
      cy.get('input[id="Email"]')
      cy.get('input[id="Palavra_Passe"]')
      cy.get('input[id="check_Palavra_Passe"]')
      cy.get('input[id="Nome"]')
      cy.get('input[id="Phone"]')
      cy.get('input[id="dataNascimento"]')
      cy.get(' input[placeholder="Nova tag..."]')
      cy.get('div > mat-select')
    })

  
    it('fill form', () => {
      cy.viewport(1700, 900)
      cy.get('input[id="Nome_de_utilizador"]').type('arqsiUser')
      cy.get('input[id="Email"]').type('arqsiUser@gmail.com')
      cy.get('input[id="Palavra_Passe"]').type('arqsiUser123')
      cy.get('input[id="check_Palavra_Passe"]').type('arqsiUser123')
      cy.get('input[id="Nome"]').type('Utilizador ARQSI')
      cy.get('input[id="Phone"]').type('936985478')
      cy.get('input[id="dataNascimento"]').type('3/7/1999')
      cy.get(' input[placeholder="Nova tag..."]').type('séries')
      cy.get('div > mat-select[role="combobox"]').click()
      cy.get('div[role="listbox"] > mat-option:nth-child(2) > span').click()
    })

    it('validate submit button', () => {
      cy.viewport(1700, 900)
      cy.contains('Concluir Registo')
    })
  
    it('submit button', () => {
      cy.viewport(1700, 900)
      cy.contains('Concluir Registo').click()
    })
  
  
  })
  