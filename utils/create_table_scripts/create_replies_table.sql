use d6f0ta0sp4vrnm;

drop table if exists Replies;

create table Replies (
    replyId SERIAL not null,
    postId INT not null,
    userId INT not null,
    body TEXT,
    primary key (replyId),
    foreign key (postId) references Posts (postId),
    foreign key (userId) references Users (userId)
);