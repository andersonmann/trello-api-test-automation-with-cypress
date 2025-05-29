/*
Devido a limitações de armazenamento do trello a quantidade de boards criados é limitada
Com isso foi desenvolvido um método que realiza a exclusão do board, logo após as validações definidas.
*/
describe('Trello API - Criação e Remoção de Board', () => {
  const apiKey = Cypress.env('trelloApiKey');
  const apiToken = Cypress.env('trelloApiToken');
  let boardId; // variável local para armazenar o ID do board

  it('deve criar um board com sucesso e armazenar o ID', () => {
    const randomName = `Board-${Date.now()}`;

    cy.request({
      method: 'POST',
      url: 'https://api.trello.com/1/boards/',
      qs: {
        name: randomName,
        key: apiKey,
        token: apiToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id').and.to.be.a('string');
      expect(response.body).to.have.property('name', randomName);

      boardId = response.body.id;
      cy.log(`Board criado com ID: ${boardId}`);
    });
  });

  it('deve deletar o board criado anteriormente', () => {
    // Verifica se o boardId foi definido
    expect(boardId, 'Board ID deve estar definido').to.not.be.undefined;

    cy.request({
      method: 'DELETE',
      url: `https://api.trello.com/1/boards/${boardId}`,
      qs: {
        key: apiKey,
        token: apiToken
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Board com ID ${boardId} deletado com sucesso`);
    });
  });
});
