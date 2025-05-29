// Comandos customizados para interagir com a API do Trello
Cypress.Commands.add('createTrelloBoard', (boardName) => {
  const baseUrl = Cypress.config('baseUrl');
  cy.request({
    method: 'POST',
    url: `https://api.trello.com/1/boards/`,
    qs: {
      name: boardName,
      key: Cypress.env('TRELLO_API_KEY'),
      token: Cypress.env('TRELLO_API_TOKEN'),
    },
  }).then((response) => {
    // Retorna a resposta para uso no teste
    return response;
  });
});

Cypress.Commands.add('deleteTrelloBoard', (boardId) => {
  cy.request({
    method: 'DELETE',
    url: `https://api.trello.com/1/boards/${boardId}`,
    qs: {
      key: Cypress.env('TRELLO_API_KEY'),
      token: Cypress.env('TRELLO_API_TOKEN'),
    },
  });
});