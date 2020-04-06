-- Drop table

-- DROP TABLE public.topics;

CREATE TABLE public.topics (
	topicname varchar(255) NOT NULL,
	CONSTRAINT topics_pkey PRIMARY KEY (topicname)
);

insert into Topics (topicName) values ('php');
insert into Topics (topicName) values ('nodejs');
insert into Topics (topicName) values ('java');
insert into Topics (topicName) values ('sql');
insert into Topics (topicName) values ('zend');