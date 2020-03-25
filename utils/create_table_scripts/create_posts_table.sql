drop table if exists Posts cascade;

create table Posts (
    postId SERIAL not null,
    userId INT not null,
    topicName VARCHAR(255),
    subject VARCHAR(255),
    body TEXT,
    date date default now(),
    numReplies INT default 0,
    primary key (postId),
    foreign key (userId) references Users (userId),
    foreign key (topicName) references Topics (topicName)
);