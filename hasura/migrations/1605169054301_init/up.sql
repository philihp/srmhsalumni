CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_seen timestamp with time zone,
    password text
);
CREATE VIEW public.online_users AS
 SELECT users.id,
    users.last_seen
   FROM public.users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
