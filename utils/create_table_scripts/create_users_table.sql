drop table if exists Users cascade;

create table if not exists Users (
    userId SERIAL not NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    imageURL VARCHAR(255),
	about TEXT,
    country VARCHAR(255),
    dob VARCHAR(255),
    numPosts INT default 0,
    numMessages INT default 0,
    numLikes INT default 0
    primary key (userId)
);