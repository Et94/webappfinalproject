-- Drop table

-- DROP TABLE public.conversations;

CREATE TABLE public.conversations (
	conversationid serial NOT NULL,
	senderid int4 NOT NULL,
	receiverid int4 NOT NULL,
	subject text NULL,
	latestdate timestamp NULL,
	CONSTRAINT conversations_pkey PRIMARY KEY (conversationid),
	CONSTRAINT conversations_receiverid_fkey FOREIGN KEY (receiverid) REFERENCES users(userid),
	CONSTRAINT conversations_senderid_fkey FOREIGN KEY (senderid) REFERENCES users(userid)
);

-- Table Triggers

-- DROP TRIGGER updateusermsgcount ON public.conversations;

create trigger updateusermsgcount after
update
    on
    public.conversations for each row execute function increasenummsgs();

