use d6f0ta0sp4vrnm;

drop table if exists Posts;

create table Posts (
    postId SERIAL not null,
    userId INT not null,
    topic VARCHAR(255),
    subject VARCHAR(255),
    body TEXT,
    date TIMESTAMP,
    numReplies INT,
    primary key (postId),
    foreign key (userId) references Users (userId)
);