use d6f0ta0sp4vrnm;

drop table if exists Posts cascade;

create table Posts (
    postId SERIAL not null,
    userId INT not null,
    topicName VARCHAR(255),
    subject VARCHAR(255),
    body TEXT,
    date TIMESTAMP,
    numReplies INT,
    primary key (postId),
    foreign key (userId) references Users (userId),
    foreign key (topicName) references Topics (topicName)
);