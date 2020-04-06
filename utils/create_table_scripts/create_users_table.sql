-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	userid serial NOT NULL,
	firstname varchar(255) NOT NULL,
	"password" varchar(255) NULL,
	imageurl varchar(255) DEFAULT "https://randomuser.me/api/portraits/lego/1.jpg",
	about text NULL,
	country varchar(255) NULL,
	dob varchar(255) NULL,
	numposts int4 NULL DEFAULT 0,
	nummessages int4 NULL DEFAULT 0,
	email varchar(255) NULL,
	lastname varchar(255) NOT NULL,
	numlikes int4 NULL DEFAULT 0,
	CONSTRAINT email_unique UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (userid)
);