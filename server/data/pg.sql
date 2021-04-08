drop schema if exists quizz CASCADE;
create schema quizz;
set search_path to quizz;

CREATE TABLE person (
    id serial PRIMARY KEY,
    per_username varchar NOT NULL,
    per_password varchar NOT NULL,
    per_score int
);

create table quizz (
    id serial primary key,
    qui_name varchar,
    qui_image varchar,
    person_id int references person(id)
);
create table question (
    id serial primary key,
    que_state varchar,
    que_points int,
    que_is_image boolean,
    quizz_id int references quizz(id)
);
create table keyword (
    id serial primary key,
    key_value varchar NOT NULL,
    quizz_id int references quizz(id) NOT NULL
);
create table anwser (
    id serial primary key,
    anw_is_true boolean,
    anw_state varchar,
    que_id int references question(id)
);

insert into person(per_username, per_password, per_score) values ('nico', 'nico', 0);
insert into quizz(qui_name, qui_image, person_id) values ('Culture informatique', 'informatique.jpg', 1), ('Star Wars', 'star-wars.png', 1);
insert into question(que_state, que_points, que_is_image, quizz_id) values
    ('Par qui à été créé GitHub ?', 3, FALSE, 1),
    ('En Markdown, parmi les propositions suivantes, quelles balises permettent de formater du texte ?', 2, FALSE, 1),
    ('Quel est le protocole (langage) d`échange de fichier entre un client et un serveur sur internet ?', 2, FALSE, 1),

    ('En quelle année à été réalisé Star Wars: La menace fantôme ?', 2, FALSE, 2),
    ('Combien de films Star Wars y a t-il en tout ? (Star Wars et A Star Wars Story)', 4, FALSE, 2),
    ('Laquelle de ces peluches est un Ewok ?', 2, TRUE, 2),
    ('Trouvez l‘intrus', 1, FALSE, 2);

insert into anwser(anw_is_true, anw_state, que_id) values
    (FALSE, 'Ronald Wayne', 1),(TRUE, 'Linus Torvalds', 1), (FALSE, 'Sid SijBrandij', 1), (FALSE, 'Paul Allen', 1),
    (TRUE, '˜˜X˜˜', 2), (TRUE, '_X_', 2), (FALSE, '|X|', 2), (TRUE, '||X||', 2),
    (FALSE, 'SMTP', 3), (FALSE, 'AUX', 3), (TRUE, 'FTP', 3), (FALSE, 'TCP/IP', 3),
    (TRUE, '1999', 4), (FALSE, '2000', 4), (FALSE, '2001', 4),
    (TRUE, '12', 5), (FALSE, '9', 5), (FALSE, '11', 5),
    (FALSE, 'Porg.jpg', 6), (TRUE, 'ewok.jpg', 6), (FALSE, 'wookiee.jpg', 6),
    (FALSE, 'Luc Skywalker', 7), (FALSE, 'Anakin Skawalker', 7), (FALSE, 'Obi-wan Kenobi', 7), (TRUE, 'Han Solo', 7);

insert into keyword(key_value, quizz_id) values
    ('informatique', 1), ('Star Wars', 2), ('Sciences fictions', 2), ('Dark Vador', 2), ('Jedi', 2);
