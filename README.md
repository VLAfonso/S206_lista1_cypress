# Lista de Exercício 1 - Teste de UI com Cypress
Repositório destinado à Lista de Exercício 1 - Teste de UI com cypress - da disciplina S206 - Qualidade de Software.
O objetivo principal é o desenvolvimento de testes de UI para o website [Gartic](https://gartic.com.br/).

## :pencil: Descrição
O website [Gartic](https://gartic.com.br/) é um jogo multiplayer de adivinhação de desenhos. Para a Lista de Exercícios 1, foram desenvolvidos testes de UI para o login, criação e gravação de salas utilizando a ferramenta `cypress` e o `mochawesome` para a geração de relatório.  
Para fins didáticos, foi criada uma conta de e-mail no [Outlook](https://outlook.live.com/) e uma conta no [Gartic](https://gartic.com.br/) para uso exclusivo de realização de testes.

## :gear: Execução
1. Clonar o repositório
```bash
git clone https://github.com/VLAfonso/S206_lista1_cypress.git
cd S206_lista1_cypress/Lista1_Cypress
```
2. Instalar as dependências
```bash
npm install
```

3. Executar os testes
```bash
./node_modules/.bin/cypress run --spec 'cypress/e2e/**/'
```

4. Acessar relatório de testes  
O relatório é gerado automaticamente após a execução de testes e pode ser encontrado em [`cypress/reports/html`](./cypress/reports/html) no arquivo [`index.html`](./cypress/reports/html/index.html).

> :pushpin: **Notas:** É necessário ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior) e o npm configurado corretamente no sistema.

## :white_check_mark: Testes de UI
Os testes de UI foram divididos em 2 suítes de teste:
### Testes de login

| # | Teste | Tipo | Descrição |
|----|------|---------|-----------|
| 1 | **Teste de login com sucesso** | Positivo | Realiza o login corretamente com credenciais válidas |
| 2 | **Teste de login com falha** | Negativo | Realiza o login de forma inválida com senha incorreta |
| 3 | **Teste de deslogar com sucesso** | Positivo | Realiza o logout corretamente|

### Testes de criação, gravação e exclusão de sala

| # | Teste | Tipo | Descrição |
|----|------|---------|-----------|
| 1 | **Teste de criação de sala com sucesso** | Positivo | Realiza de forma correta a criação de uma sala |
| 2 | **Teste de criação de sala com falha** | Negativo | Realiza a tentativa de criação de uma sala sem fornecer um nome |
| 3 | **Teste de gravação de sala com sucesso** | Positivo | Realiza de forma correta a gravação de uma sala com nome baseado no horário |
| 4 | **Teste de exclusão de sala com sucesso** | Positivo | Realiza de forma correta a exclusão de uma sala gravada |
| 5 | **Teste de exclusão de todas as salas com sucesso** | Positivo | Realiza de forma correta a exclusão de todas as salas gravadas |

Dessa forma, são realizados 8 testes, sendo 6 positivos e 2 negativos.

### Relatório de testes
O relatório de testes é gerado automaticamente em formato HTML pelo `Mochawesome` e está presente em [`cypress/reports/html`](./cypress/reports/html). Seu resultado pode ser visto a seguir:
<!-- Adicionar imagem do relatório -->

## :hammer_and_wrench: Tecnologias e Ferramentas Utilizadas
- Linguagem de Programação: **JavaScript**
- Framework de Testes: **Cypress**
- Relatórios de Teste: **Mochawesome**
- Ambiente de Execução: **Node.js**
- Gerenciador de Dependências: **npm**
- IDE: **Visual Studio Code**

## :busts_in_silhouette: Desenvolvedora 
[Virgínia Letícia Afonso](https://github.com/VLAfonso)

## :scroll: Licença
Este projeto está licenciado sob a MIT License.