-- Drop table

-- DROP TABLE public.posts;

CREATE TABLE public.posts (
	postid serial NOT NULL,
	userid int4 NOT NULL,
	topicname varchar(255) NULL,
	subject varchar(255) NULL,
	body text NULL,
	"date" timestamp NULL DEFAULT now(),
	numreplies int4 NULL DEFAULT 0,
	CONSTRAINT posts_pkey PRIMARY KEY (postid),
	CONSTRAINT posts_topicname_fkey FOREIGN KEY (topicname) REFERENCES topics(topicname),
	CONSTRAINT posts_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid)
);

-- Table Triggers

-- DROP TRIGGER updateuser ON public.posts;

create trigger updateuser after
insert
    on
    public.posts for each row execute function increasenumposts();
