describe('GET api/unknown/2', () => {
    let response;

    before(async () => {
        response = await cy.request({
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/api/unknown/2`,
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

    it('TC04| Validar que el recurso contenga las propiedades y valores esperados', () => {
        const resource = response.body.data;
        expect(resource).to.have.property('id', 2);
        expect(resource).to.have.property('name', 'fuchsia rose');
        expect(resource).to.have.property('year', 2001);
        expect(resource).to.have.property('color', '#C74375');
        expect(resource).to.have.property('pantone_value', '17-2031');
    });

    it('TC05| Validar que la propiedad support tenga las propiedades esperadas', () => {
        const support = response.body.support;
        expect(support).to.have.property('url', 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
        expect(support).to.have.property('text', 'Tired of writing endless social media content? Let Content Caddy generate it for you.');
    });

    it('TC06| Validar que el color sea un valor hexadecimal válido', () => {
        expect(response.body.data.color).to.match(/^#[0-9A-F]{6}$/i);
    });

    it('TC07| Validar dominio del URL de soporte', () => {
        expect(response.body.support.url).to.contain('contentcaddy.io');
    });

});
