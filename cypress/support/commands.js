Cypress.Commands.add('createTrelloBoard', (name) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');

  return cy.request({
    method: 'POST',
    url: 'https://api.trello.com/1/boards/',
    qs: { name, key: apiKey, token: apiToken }
  });
});

Cypress.Commands.add('deleteTrelloBoard', (boardId) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');

  return cy.request({
    method: 'DELETE',
    url: `https://api.trello.com/1/boards/${boardId}`,
    qs: { key: apiKey, token: apiToken }
  });
});
