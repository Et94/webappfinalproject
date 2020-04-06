-- Drop table

-- DROP TABLE public.messages;

CREATE TABLE public.messages (
	messageid serial NOT NULL,
	conversationid int4 NOT NULL,
	body text NULL,
	"date" timestamp NULL,
	senderid int4 NULL,
	CONSTRAINT messages_pkey PRIMARY KEY (messageid),
	CONSTRAINT messages_conversationid_fkey FOREIGN KEY (conversationid) REFERENCES conversations(conversationid)
);

-- Table Triggers

-- DROP TRIGGER updateconvodate ON public.messages;

create trigger updateconvodate after
insert
    on
    public.messages for each row execute function updateconvo();
