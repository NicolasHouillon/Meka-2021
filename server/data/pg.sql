drop schema if exists quizz CASCADE;
create schema quizz;
set search_path to quizz;

create table quizz (
    id serial primary key,
    name varchar,
    keywords array
)

create table question (
    id serial primary key,
    enonce varchar,
    points int,
    anwsers array,
    quizz_id references quizz(id)
)
