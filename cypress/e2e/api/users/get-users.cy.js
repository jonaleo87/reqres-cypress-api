describe('GET api/users', () => {
  let response;

  before(() => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/api/users?page=2`,
    }).then((res) => {
      response = res; // Asignar la respuesta a la variable response
    });
  });

  it('TC01| Validar que la respuesta sea status 200', () => {
    expect(response.status).to.eq(200);
    expect(response.statusText).to.eq('OK');
  });

  it('TC02| Validar que la respuesta sea en formato JSON y que el tiempo de respuesta sea menor a 2 segundos', () => {
    expect(response.headers['content-type']).to.eq('application/json');
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

});