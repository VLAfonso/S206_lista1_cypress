Cypress.on('uncaught:exception', (err, runnable) => {
  //Ignora erro da aplicação 
  if (err.message.includes('Unexpected token') && err.message.includes('is not valid JSON')) {
    return false
  }
  //Falha em outras exceções
  return true
})

describe('Testes de login', () => {
  it('Teste de login com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")
  })

  it('Teste de login com falha', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaerrada")
    //Verificar senha inválida
    cy.get('#janelaMsg').should("contain.text", "Erro: Login ou senha inválidos.")
  })

  it('Teste de deslogar com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")
    //Deslogar
    cy.get('.deslogar').click()
    //Verificar de deslogou
    cy.get('#blocoLogin > .cabecalho > h1').should("contain.text", "LOGIN")
  })
})

describe('Testes de criação, gravação e exclusão de sala', () => {
  it('Teste de criação de sala com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")

    //Criar sala
    cy.get('.botaoCriar').click()
    cy.get('#nome').type("SalaExemplo")
    cy.get('#senhaSim').click()
    cy.get('#senha').type("senhaExemplo")
    cy.get('td > [type="submit"]').click()

    //Verificar criação de sala
    cy.get('div.criador > span').should("contain.text", "O link de acesso para a sua sala é:")

    //Fechar sala
    cy.get('.popupContent > .sair').click()
    cy.get('#icones > .sair').click()
    cy.get('#popupBt1').click()

    //Verificar se sala foi fechada
    cy.url().should('eq', 'https://gartic.com.br/')
  })

  it('Teste de criação de sala com falha', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")

    //Criar sala sem informações
    cy.get('.botaoCriar').click()
    cy.get('td > [type="submit"]').click()

    //Verificar erro ao criar sala
    cy.get('#janelaMsg').should("contain.text", "erros no formul")//texto parcial para evitar erros de acentuação
  })

  it('Teste de gravação de sala com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")

    //Gravar sala
    gravarSala()
  })

  it('Teste de exclusão de sala com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")

    //Gravar sala
    let infos = gravarSala()

    //Excluir sala
    cy.contains('tbody tr', infos[0]).find('td').eq(4).click()

    //Verificar se sala foi excluida
    cy.get('tbody').find('td').should('not.contain.text', infos[0])

  })

  it('Teste de exclusão de todas as salas com sucesso', () => {
    //Realizar login
    cy.login("ExemploVLA", "senhaexemplovla")
    //Verificar se está logado na conta correta
    cy.get('#dadosLogin').should("contain.text", "ExemploVLA")

    //Gravar duas salas
    gravarSala()
    gravarSala()

    //Excluir todas as salas
    excluirSalas()

    //Verificar se todas as salas foram excluidas
    cy.get('em').should("contain.text", "possui salas gravadas.") //texto parcial para evitar erros de acentuação
    
  })
})

function gravarSala(){
  //Criar nome de sala e senha com base no horário
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let Sala = hora + minuto + seg + "Sala" 
  let Senha = hora + minuto + seg + "Senha" 
  let infos = [Sala, Senha]

  //Gravar sala
  cy.visit('https://gartic.com.br/criar-sala/')
  cy.get('#nome').type(Sala)
  cy.get('#senhaSim').click()
  cy.get('#senha').type(Senha)
  cy.get('td > [type="button"]').click()

  //Verificar se sala foi criada
  cy.get('tbody').find('td').should('contain.text', Sala)

  return infos
}

function excluirSalas() {
  cy.get('body').then(($body) => {
    //Verifica se há salas gravadas
    if ($body.find('#blocoConteudo > .conteudo tbody:visible').length > 0) {
      //Exclui primeira sala da tabela
      cy.get('tbody > :nth-child(3) > :nth-child(5)').click();

      //Verificar se a página foi recarregada
      cy.get('#blocoConteudo').should('be.visible');

      //Excluir próxima sala
      excluirSalas();
    }
  });
}
