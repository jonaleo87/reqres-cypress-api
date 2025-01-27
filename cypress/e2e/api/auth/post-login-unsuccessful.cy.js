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

    it('CP02| Validar que el tiempo de respuesta sea menor a 2 segundos', () => {
        expect(response.duration).to.be.lessThan(2000);
    });

    it('CP03| Validar que el body de la respuesta contenga el error esperado', () => {
        expect(response.body).to.have.property('error').and.to.eq('Missing password');
    });
});
