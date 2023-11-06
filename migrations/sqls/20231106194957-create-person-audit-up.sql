create table person_audit
(
  _seq          serial PRIMARY KEY NOT NULL,
  _action       text               not null,
  "_modifiedAt" timestamptz        not null default now(),
  id            uuid               null,
  active        boolean            null,
  name          text               null,
  last_name     text               null

)
