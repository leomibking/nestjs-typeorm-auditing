CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table person
(
  id        uuid    not null default uuid_generate_v4(),
  active    boolean not null default true,
  name      text    not null,
  last_name text    not null,
  constraint pk_person primary key (id)
);
