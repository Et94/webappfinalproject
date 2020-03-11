use d6f0ta0sp4vrnm;

drop table if exists Topics;

create table if not exists Topics (
    topicId SERIAL not null,
    topicName VARCHAR(255),
    primary key (topicId)
);