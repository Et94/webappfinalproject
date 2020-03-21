use d6f0ta0sp4vrnm;

drop table if exists Likes cascade;

create table Likes (
    recipientId INT not null,
    senderId INT not null,
    primary key (recipientId, senderId),
    foreign key (recipientId) references Users (userId),
    foreign key (senderId) references Users (userId)
);