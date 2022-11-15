create database signatures;

create table prof(
    prof_id serial primary key,
    prof_name varchar(255) not null,
    prof_password varchar(255) not null,
    prof_mail varchar(255) not null,
);

create table class(
    class_id serial primary key,
    class_name varchar(255) not null,
);

create table eleve(
    eleve_id serial primary key,
    eleve_name varchar(255) not null,
    eleve_class int not null,
    foreign key eleve_class references class(class_id),
);

create table cours(
    cours_id serial primary key,
    cours_date timestamp not null,
    cours_name varchar(255) not null,
    cours_prof int not null,
    foreign key cours_prof references prof(prof_id),
    cours_class int not null,
    foreign key cours_class references class(class_id),
);

create table participe(
    participe_id serial primary key,
    participe_cours int not null,
    foreign key participe_cours references cours(cours_id),
    participe_eleve int not null,
    foreign key participe_eleve references eleve(eleve_id),
);