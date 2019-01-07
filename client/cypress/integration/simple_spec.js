let tokenCache = null;

describe('Login Test', function() {
  it('Vist Login', function() {
    cy.visit("/login");

    cy.get('.MuiInput-input-25[type="email"]').type('admin@quizbizz.com');
    cy.get('.MuiInput-input-25[type="password"]').type('adminadmin');
    cy.get('.btn[type="submit"]').click();
    cy.url().should('include', '/quizzes');
  })

  after(() => {
  	tokenCache = localStorage.getItem('token');
  })
})

describe('Quizzes Page', function() {
	beforeEach(() => {
		localStorage.setItem('token', tokenCache);
	});

	it('has title', () => {
		cy.contains('My Quizzes');
	});

	it('creating quiz', () => {
		cy.get('.btn-createquiz').click();
		cy.url().should('include', '/create');
		cy.get('#input-title').type('Test Quiz Title');
		cy.get('#input-description').type('Test Quiz Description');
		cy.get('.btn-create').click();
		cy.url().should('include', '/quiz/');
		cy.contains('Test Quiz Title');
		cy.contains('Test Quiz Description');
	}) 
})