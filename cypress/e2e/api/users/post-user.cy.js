describe('POST api/users', () => {
    let userData;
    let response;


    before(() => {
        cy.fixture('users').then((data) => {
            userData = data;
        });
    });

    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('baseUrl')}/api/users`,
            body: userData,
        }).then((res) => {
            response = res;
        });
    });

    it('CP01| Validar que el status de la respuesta sea 201', () => {
        expect(response.status).to.eq(201);
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
            name: userData.name,
            email: userData.email,
            job: userData.job
        });
    });

    it('CP05| Validar que existan todas las propiedades principales de la respuesta y devuelvan los tipos de datos esperados', () => {
        expect(response.body).to.have.property('name').and.to.be.a('string');
        expect(response.body).to.have.property('email').and.to.be.a('string');
        expect(response.body).to.have.property('job').and.to.be.a('string');
        expect(response.body).to.have.property('id').and.to.be.a('string');
        expect(response.body).to.have.property('createdAt').and.to.be.a('string');
    });
});