-- Drop table

-- DROP TABLE public.replies;

CREATE TABLE public.replies (
	replyid serial NOT NULL,
	postid int4 NOT NULL,
	userid int4 NOT NULL,
	body text NULL,
	CONSTRAINT replies_pkey PRIMARY KEY (replyid),
	CONSTRAINT replies_userid_fkey FOREIGN KEY (userid) REFERENCES users(userid)
);

-- Table Triggers

-- DROP TRIGGER updateposts ON public.replies;

create trigger updateposts after
insert
    on
    public.replies for each row execute function increasenumreplies();
