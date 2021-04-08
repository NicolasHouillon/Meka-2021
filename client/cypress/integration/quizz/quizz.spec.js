describe('Quizz',  ()  =>  {
    it('content',  ()  =>  {
        let url = cy.visit('/quizz/1');
        url.get('img');
        url.get('div').should('have.class', 'quizz-anwser').contains('Par qui à été créé GitHub ?');

        url.get('.anwser').its('length').should('eq', 4);
        url.get('.anwser').should('have.class', 'btn-answer');

        url.get('.btn-valider').its('length').should('eq', 1);
        url.get('.btn-valider').contains('Valider');
    });

    it('response ', function () {
        let url = cy.visit('/quizz/1');
        let btn = url.get('.anwser').contains('Ronald Wayne');

        btn.click().should('have.class', 'btn-answer-select');
        btn.click().should('have.class', 'btn-answer');
    });

    it('Valider', function () {
        let url = cy.visit('/quizz/1');
        let h5 = url.get('div').should('have.class', 'quizz-anwser').invoke('text');

        url.get('.btn-valider').click();

        url.get('div').should('have.class', 'quizz-anwser').invoke('text').should('not.eq', h5);
    });

    it('results', function () {
        let url = cy.visit('/quizz/1');
        let h5 = url.get('div').should('have.class', 'quizz-anwser').invoke('text');

        url.get('.btn-valider').click();
        url.get('.btn-valider').click();
        url.get('.btn-valider').click();

        url.get('.anwser').its('length').should('eq', 12);
        url.get('p').should('have.class', 'quizz-anwser').its('length').should('at.least', 3);

        url.get('p').should('have.class', 'score').contains('Votre score : 0');
    });

    it('retour', function () {
        let url = cy.visit('/quizz/1');
        let h5 = url.get('div').should('have.class', 'quizz-anwser').invoke('text');

        url.get('.btn-valider').click();
        url.get('.btn-valider').click();
        url.get('.btn-valider').click();

        url.get('.btn-valider').contains('Retour aux quizz');
        url.get('.btn-valider').click();

        cy.url().should('eq', 'http://localhost:3000/quizz');
    });
});
