describe('DELETE api/users', () => {
    let userId;
    let response;

    before(() => {
        cy.fixture('users').then((data) => {
            userId = data.id;
        });
    });

    beforeEach(() => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env('baseUrl')}/api/users/${userId}`,
        }).then((res) => {
            response = res;
        });
    });

    it('CP01| Validar que el status de la respuesta sea 204', () => {
        expect(response.status).to.eq(204);
    });
});
