/*
Devido a limitações de armazenamento do trello a quantidade de boards criados é limitada
Com isso foi desenvolvido um método que realiza a exclusão do board, logo após as validações definidas.
*/

describe('Trello API - Criação e Exclusão de board', () => {
  let boardResponse;

  beforeEach(() => {
    const boardName = `Board-${Date.now()}`;

    cy.createTrelloBoard(boardName).then((response) => {
      expect(response.status).to.eq(200);
      boardResponse = response; // 
    });
  });

  it('deve validar dados do board criado', () => {
    const { body } = boardResponse;
    expect(body).to.have.property('id');
    expect(body).to.have.property('name').and.to.include('Board-');
    expect(body).to.have.property('url');
  });

  afterEach(() => {
    const boardId = boardResponse?.body?.id;
    if (boardId) {
      cy.deleteTrelloBoard(boardId).then((response) => {
        expect(response.status).to.eq(200);
      });
    }
  });
});
