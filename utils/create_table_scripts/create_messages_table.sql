use d6f0ta0sp4vrnm;

drop table if exists Messages;

create table Messages (
    messageId SERIAL not null,
    conversationId INT not null,
    body TEXT,
    date TIMESTAMP,
    primary key (messageId),
    foreign key (conversationId) references Conversations (conversationId)
);