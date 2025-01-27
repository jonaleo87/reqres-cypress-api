describe('POST api/login unsuccessful', () => {
    let loginData;
    let response;

    before(() => {
        cy.fixture('login-unsuccesful').then((data) => {
            loginData = data;
        });
    });

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/api/login`,
            body: loginData,
            failOnStatusCode: false
        }).then((res) => {
            response = res;
        });
    });

    it('CP01| Validar que el status de la respuesta sea 400', () => {
        expect(response.status).to.eq(400);
    });

    it('CP02| Validar que el mensaje de error sea correcto', () => {
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.eq('Missing password');
    });

    it('CP03| Validar que el tiempo de respuesta sea menor a 2 segundos', () => {
        expect(response.duration).to.be.lessThan(2000);
    });

    it('CP04| Validar que el método del request sea POST', () => {
        expect(response.requestHeaders).to.have.property('method', 'POST');
    });

    it('CP05| Validar que la URL del request sea correcta', () => {
        expect(response.requestHeaders).to.have.property('url', `${Cypress.env('baseUrl')}/api/login`);
    });
});
