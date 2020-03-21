use d6f0ta0sp4vrnm;

drop table if exists Topics cascade;

create table if not exists Topics (
    topicName VARCHAR(255),
    primary key (topicName)
);