const baseURL = 'https://api.trello.com/1/boards/';
Cypress.Commands.add('createTrelloBoard', (name) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');

  return cy.request({
    method: 'POST',
    url: baseURL,
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

Cypress.Commands.add('getListsFromBoard', (boardId) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');
  return cy.request({
    method: 'GET',
    url: `https://api.trello.com/1/boards/${boardId}/lists`,
    qs: { key: apiKey, token: apiToken }
  });
});

Cypress.Commands.add('createTrelloCard', ({ name, idList }) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');
  return cy.request({
    method: 'POST',
    url: 'https://api.trello.com/1/cards',
    qs: {
      name,
      idList,
      key: apiKey,
      token: apiToken
    }
  });
});

Cypress.Commands.add('deleteTrelloCard', (cardId) => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');
  return cy.request({
    method: 'DELETE',
    url: `https://api.trello.com/1/cards/${cardId}`,
    qs: {
      key: apiKey,
      token: apiToken
    }
  });
});