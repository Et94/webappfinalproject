use d6f0ta0sp4vrnm;

drop table if exists Conversations;

create table if not exists Conversations (
    conversationId SERIAL not null,
    senderId INT not null,
    receiverId INT not null,
    subject TEXT,
    primary key (conversationId),
    foreign key (senderId) references Users (userId),
    foreign key (receiverId) references Users (userId)
);