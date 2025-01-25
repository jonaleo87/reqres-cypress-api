describe('GET api/unknown', () => {
    let response;

    before(async () => {
        response = await cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/api/unknown`,
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
        expect(response.body).to.have.property('page').and.to.be.a('number');
        expect(response.body).to.have.property('per_page').and.to.be.a('number');
        expect(response.body).to.have.property('total').and.to.be.a('number');
        expect(response.body).to.have.property('total_pages').and.to.be.a('number');
        expect(response.body).to.have.property('data').and.to.be.an('array');
        expect(response.body).to.have.property('support').and.to.be.an('object');
    });

    it('TC04| Validar que cada recurso contenga las propiedades y valores esperados', () => {
        response.body.data.forEach((resource) => {
            expect(resource).to.have.all.keys('id', 'name', 'year', 'color', 'pantone_value');
            expect(resource.id).to.be.a('number');
            expect(resource.name).to.be.a('string');
            expect(resource.year).to.be.a('number');
            expect(resource.color).to.be.a('string');
            expect(resource.pantone_value).to.be.a('string');
        });
    });

    it('TC05| Validar que la propiedad support tenga las propiedades esperadas', () => {
        const support = response.body.support;
        expect(support).to.have.property('url', 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
        expect(support).to.have.property('text', 'Tired of writing endless social media content? Let Content Caddy generate it for you.');
    });

    it('TC06| Validar consistencia en la paginación', () => {
        expect(response.body.page).to.eq(1);
        expect(response.body.per_page).to.eq(6);
        expect(response.body.total).to.eq(12);
        expect(response.body.total_pages).to.eq(2);
    });

    it('TC07| Validar que haya recursos en la página solicitada', () => {
        expect(response.body.data).to.not.be.empty;
    });

    it('TC08| Validar que los colores sean valores hexadecimales válidos', () => {
        response.body.data.forEach((resource) => {
            expect(resource.color).to.match(/^#[0-9A-F]{6}$/i);
        });
    });

    it('TC09| Validar dominio del URL de soporte', () => {
        expect(response.body.support.url).to.contain('contentcaddy.io');
    });

});
