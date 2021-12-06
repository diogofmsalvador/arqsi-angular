describe('Home Page', () => {

    it('Titulo Project TM', () => {
      cy.visit('/')
      cy.viewport(1700, 900)
      cy.wait(5000);
      cy.contains('ARQSI SOCIAL GAME')
    })
  
    it('Titulo de login', () => {
      cy.viewport(1700, 900)
      cy.contains('Inicio de sessão')
    })
  
  
  })
  