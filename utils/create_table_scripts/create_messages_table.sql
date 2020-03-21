drop table if exists Messages cascade;

create table Messages (
    messageId SERIAL not null,
    conversationId INT not null,
    body TEXT,
    date TIMESTAMP,
    primary key (messageId),
    foreign key (conversationId) references Conversations (conversationId)
);