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

