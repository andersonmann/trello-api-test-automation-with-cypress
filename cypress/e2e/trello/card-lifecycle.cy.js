describe('Trello API - Criação de Card em um Board', () => {
  let boardId;
  let listId;
  let cardResponse;

  const boardName = `Board-${Date.now()}`;
  const cardName = `Card-${Date.now()}`;

  before(() => {
    // Cria o board
    cy.createTrelloBoard(boardName).then((boardRes) => {
      expect(boardRes.status).to.eq(200);
      boardId = boardRes.body.id;

      // Obtém a primeira lista do board
      cy.getListsFromBoard(boardId).then((listsRes) => {
        expect(listsRes.status).to.eq(200);
        expect(listsRes.body.length).to.be.greaterThan(0);

        listId = listsRes.body[0].id;
      });
    });
  });

  it('deve criar um card em uma lista do board criado', () => {
    cy.createTrelloCard({ name: cardName, idList: listId }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', cardName);
      expect(response.body).to.have.property('idList', listId);
      cardResponse = response;
    });
  });

  after(() => {
    // Exclui o card
    const cardId = cardResponse?.body?.id;
    if (cardId) {
      cy.deleteTrelloCard(cardId).then((res) => {
        expect(res.status).to.eq(200);
      });
    }

    // Exclui o board
    if (boardId) {
      cy.deleteTrelloBoard(boardId).then((res) => {
        expect(res.status).to.eq(200);
      });
    }
  });
});