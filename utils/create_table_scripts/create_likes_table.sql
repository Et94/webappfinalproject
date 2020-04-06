-- Drop table

-- DROP TABLE public.likes;

CREATE TABLE public.likes (
	recipientid int4 NOT NULL,
	senderid int4 NOT NULL,
	CONSTRAINT likes_pkey PRIMARY KEY (recipientid, senderid),
	CONSTRAINT likes_recipientid_fkey FOREIGN KEY (recipientid) REFERENCES users(userid),
	CONSTRAINT likes_senderid_fkey FOREIGN KEY (senderid) REFERENCES users(userid)
);

-- Table Triggers

-- DROP TRIGGER updateuser ON public.likes;

create trigger updateuser after
insert
    on
    public.likes for each row execute function increasenumlikes();
