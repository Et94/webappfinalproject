drop table if exists Topics cascade;

create table if not exists Topics (
    topicName VARCHAR(255),
    primary key (topicName)
);

insert into Topics (topicName) values ('php');
insert into Topics (topicName) values ('nodejs');
insert into Topics (topicName) values ('java');
insert into Topics (topicName) values ('sql');
insert into Topics (topicName) values ('zend');