use d6f0ta0sp4vrnm;

drop table if exists Users;

create table if not exists Users (
    userId SERIAL not NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    imageURL VARCHAR(255),
	about TEXT,
    country VARCHAR(255),
    dob VARCHAR(255),
    numPosts INT,
    numMessages INT,
    primary key (userId)
);