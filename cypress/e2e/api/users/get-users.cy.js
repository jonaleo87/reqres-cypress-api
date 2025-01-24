describe('GET api/users', () => {
  let response;

  before(async () => {
    response = await cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/users?page=2`,
    });
  });

  it('TC01| Validar que la respuesta sea status 200', () => {
    expect(response.status).to.eq(200);
    expect(response.statusText).to.eq('OK');
  });

  it('TC02| Validar que la respuesta sea en formato JSON y que el tiempo de respuesta sea menor a 2 segundos', () => {
    console.log(response.headers['content-type']); // Agregar log para depuración
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.duration).to.be.lessThan(2000);
  });

  it('TC03| Validar la estructura de la respuesta contenga todas las propiedades y valores esperados', () => {
    expect(response.body).to.have.property('page').and.to.be.a('number');
    expect(response.body).to.have.property('per_page').and.to.be.a('number');
    expect(response.body).to.have.property('total').and.to.be.a('number');
    expect(response.body).to.have.property('total_pages').and.to.be.a('number');
    expect(response.body).to.have.property('data').and.to.be.an('array');
    expect(response.body).to.have.property('support').and.to.be.an('object');
  });

  it('TC04| Validar que cada usuario contenga las propiedades y valores esperados', () => {
    response.body.data.forEach((user) => {
      expect(user).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
      expect(user.id).to.be.a('number');
      expect(user.email).to.be.a('string').and.to.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/); // Email válido
      expect(user.first_name).to.be.a('string');
      expect(user.last_name).to.be.a('string');
      expect(user.avatar).to.be.a('string');
    });
  });

  it('TC05| Validar que la propiedad support tenga las propiedades esperadas', () => {
    expect(response.body.support).to.have.all.keys('url', 'text');
    expect(response.body.support.url).to.be.a('string');
    expect(response.body.support.text).to.be.a('string');
  });

  it('TC06| Validar consistencia en la paginación', () => {
    expect(response.body.page).to.eq(2);
    expect(response.body.per_page * response.body.total_pages).to.be.at.least(response.body.total);
  });

  it('TC07| Validar que haya usuarios en la página solicitada', () => {
    expect(response.body.data).to.not.be.empty;
  });

  it('TC08| Validar que los avatares sean URLs válidas', () => {
    response.body.data.forEach((user) => {
      expect(user.avatar).to.match(/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[/#?]?.*$/);
    });
  });

  it('TC09| Validar respuesta al solicitar una página fuera del rango', async () => {
    const emptyResponse = await cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/users?page=100`,
    });
    expect(emptyResponse.body.data).to.be.empty;
  });


  it('TC10| Validar dominio del URL de soporte', () => {
    expect(response.body.support.url).to.contain('reqres');
  });

  it('TC11| Verificar límites de page y per_page', () => {
    const maxPage = 50;
    const maxPerPage = 100;

    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/users?page=${maxPage}&per_page=${maxPerPage}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.page).to.eq(maxPage);
      expect(response.body.per_page).to.eq(maxPerPage);
      expect(response.body.data).to.be.an('array');
    });
  });

});