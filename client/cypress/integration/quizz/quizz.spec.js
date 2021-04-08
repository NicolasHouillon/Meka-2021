describe('Quizz',  ()  =>  {
    it('content',  ()  =>  {
        let url = cy.visit('/quizz/1');
        url.get('h2').contains('Culture informatique');
        url.get('h5').contains('Par qui à été créé GitHub ?');

        url.get('.anwser').its('length').should('eq', 4);
        url.get('.anwser').should('have.class', 'btn-secondary');

        url.get('.btn-info').its('length').should('eq', 1);
        url.get('.btn-info').contains('Valider');
    });

    it('response ', function () {
        let url = cy.visit('/quizz/1');
        let btn = url.get('.anwser').contains('Ronald Wayne');

        btn.click().should('have.class', 'btn-primary');
        btn.click().should('have.class', 'btn-secondary');
    });

    it('Valider', function () {
        let url = cy.visit('/quizz/1');
        let h2 = url.get('h2').invoke('text');
        let h5 = url.get('h5').invoke('text');

        url.get('.btn-info').click();

        url.get('h2').invoke('text').should('not.eq', h2);
        url.get('h5').invoke('text').should('not.eq', h5);
    });

    it('results', function () {
        let url = cy.visit('/quizz/1');

        url.get('.valider').click();
        url.get('.valider').click();
        url.get('.valider').click();

        url.get('.anwser').its('length').should('eq', 12);
        url.get('h5').its('length').should('eq', 3);

        url.get('p').should('have.class', 'font-weight-bold').contains('Votre score : 0')
    })

    it('retour', function () {
        let url = cy.visit('/quizz/1');

        url.get('.valider').click();
        url.get('.valider').click();
        url.get('.valider').click();

        url.get('.btn-info').contains('Retour aux quizz');
        url.get('.btn-info').click();

        cy.url().should('eq', 'http://localhost:3000/quizz');
    })
});
