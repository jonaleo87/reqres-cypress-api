describe('POST api/register', () => {
    let registerData;
    let response;

    before(() => {
        cy.fixture('register-succesful').then((data) => {
            registerData = data;
        });
    });

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/api/register`,
            body: registerData,
        }).then((res) => {
            response = res;
        });
    });

    it('CP01| Validar que el status de la respuesta sea 200', () => {
        expect(response.status).to.eq(200);
    });

    it('CP02| Validar que el tiempo de respuesta sea menor a 2 segundos', () => {
        expect(response.duration).to.be.lessThan(2000);
    });

    it('CP03| Validar que se envien correctamente los headers en el request', () => {
        expect(response.requestHeaders).to.have.property('content-type').and.to.include('application/json');
    });

    it('CP04| Validar que el body de la petición contenga los parámetros esperados', () => {
        const requestBodyObject = JSON.parse(response.requestBody);
        expect(requestBodyObject).to.deep.include({
            email: registerData.email,
            password: registerData.password
        });
    });

    it('CP05| Validar que existan todas las propiedades principales de la respuesta y devuelvan los tipos de datos esperados', () => {
        expect(response.body).to.have.property('id').and.to.be.a('number');
        expect(response.body).to.have.property('token').and.to.be.a('string');
    });
});
