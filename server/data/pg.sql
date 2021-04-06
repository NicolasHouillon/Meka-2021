drop schema if exists quizz CASCADE;
create schema quizz;
set search_path to quizz;

create table quizz (
    id serial primary key,
    name varchar,
    keywords varchar[]
);
create table question (
    id serial primary key,
    enonce varchar,
    points int,
    anwsers varchar[][2],
    quizz_id int references quizz(id)
);

insert into quizz(name, keywords) values ('Culture informatique', '{"informatique", "culture"}'), ('Star Wars', '{"culture", "films"}');
insert into question(enonce, points, anwsers, quizz_id) values
    (
     'Par qui à été créé GitHub ?',
     3,
     '{{"Ronald Wayne", "faux"}, {"Linus Torvalds", "vrai"}, {"Sid SijBrandij", "faux"}, {"Paul Allen", "faux"}}',
     1
    ),
    (
     'En Markdown, parmi les propositions suivantes, quelles balises permettent de formater du texte ?',
     2,
     '{{"˜˜X˜˜", "vrai"}, {"_X_", "vrai"}, {"||X||", "vrai"}, {"|X|", "faux"}, {"```X```", "vrai"}}',
     1
    ),
    (
     'Quel est le protocole (langage) d`échange de fichier entre un client et un serveur sur internet ?',
     2,
     '{{"SMTP", "faux"}, {"AUX", "faux"}, {"FTP", "vrai"}, {"TCP/IP", "faux"}}',
     1
    );

insert into question(enonce, points, anwsers, quizz_id) values
    (
     'En quelle année à été réalisé Star Wars: La menace fantôme ?',
     2,
     '{{"1999", "vrai"}, {"2000", "faux"}, {"2001", "faux"}}',
     2
    ),
    (
     'Combien de films Star Wars y a t-il en tout ? (Star Wars et A Star Wars Story)',
     4,
     '{{"12", "vrai"}, {"9", "faux"}, {"11", "faux"}}',
     2
    );
