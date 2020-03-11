use d6f0ta0sp4vrnm;

drop table if exists Messages;

create table Messages (
    messageId SERIAL not null,
    receivingId INT not null,
    sendingId INT not null,
    body TEXT,
    date TIMESTAMP,
    primary key (messageId),
    foreign key (receivingId) references Users (userId),
    foreign key (sendingId) references Users (userId)
);