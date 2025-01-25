describe('GET api/users/23', () => {
    let response;

    before(async () => {
        response = await cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/api/users/23`,
            failOnStatusCode: false, // No fallar en códigos de estado 4xx
        });
    });

    it('TC01| Validar que la respuesta sea status 404', () => {
        expect(response.status).to.eq(404);
    });

    it('TC02| Validar que la respuesta sea un objeto vacío', () => {
        expect(response.body).to.be.empty;
    });
});
