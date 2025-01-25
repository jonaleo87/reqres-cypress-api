describe('GET api/users/2', () => {
    let response;

    before(async () => {
        response = await cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/api/users/2`,
        });
    });

    it('TC01| Validar que la respuesta sea status 200', () => {
        expect(response.status).to.eq(200);
        expect(response.statusText).to.eq('OK');
    });

    it('TC02| Validar que la respuesta sea en formato JSON', () => {
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('TC03| Validar la estructura de la respuesta contenga todas las propiedades y valores esperados', () => {
        expect(response.body).to.have.property('data').and.to.be.an('object');
        expect(response.body).to.have.property('support').and.to.be.an('object');
    });

    it('TC04| Validar que el usuario contenga las propiedades y valores esperados', () => {
        const user = response.body.data;
        expect(user).to.have.property('id', 2);
        expect(user).to.have.property('email', 'janet.weaver@reqres.in');
        expect(user).to.have.property('first_name', 'Janet');
        expect(user).to.have.property('last_name', 'Weaver');
        expect(user).to.have.property('avatar', 'https://reqres.in/img/faces/2-image.jpg');
    });

    it('TC05| Validar que la propiedad support tenga las propiedades esperadas', () => {
        const support = response.body.support;
        expect(support).to.have.property('url', 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
        expect(support).to.have.property('text', 'Tired of writing endless social media content? Let Content Caddy generate it for you.');
    });

    it('TC06| Validar que el email sea válido', () => {
        expect(response.body.data.email).to.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    });

    it('TC07| Validar que el avatar sea una URL válida', () => {
        expect(response.body.data.avatar).to.match(/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[/#?]?.*$/);
    });

    it('TC08| Validar dominio del URL de soporte', () => {
        expect(response.body.support.url).to.contain('contentcaddy.io');
    });

});
