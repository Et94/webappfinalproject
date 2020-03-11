use d6f0ta0sp4vrnm;

drop table if exists Likes;

create table Likes (
    likeId SERIAL not null,
    recipientId INT not null,
    senderId INT not null,
    primary key (likeId),
    foreign key (recipientId) references Users (userId),
    foreign key (senderId) references Users (userId)
);