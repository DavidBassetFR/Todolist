BEGIN;

DROP TABLE IF EXISTS "liste",
"carte",
"label",
"carte_has_label";


CREATE TABLE IF NOT EXISTS "liste" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "carte" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "position" integer NOT NULL,
  "color" text null,
  "liste_id" integer NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "label" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "color" text NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "carte_has_label" (
  "carte_id" integer REFERENCES "carte"("id"),
  "label_id" integer REFERENCES "label" ("id"),
  PRIMARY KEY ("carte_id", "label_id"),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ
);

INSERT INTO "liste" ("name") VALUES
('Petit déjeuner'),
('Déjeuner'),
('Diner');

INSERT INTO "carte" ("title", "position", "color", "liste_id") VALUES
('Pain', 1, 'red', 1),
('Ravioli', 2, 'blue', 3),
('Pain dépice', 3, 'red', 1),
('Ravioli', 1, 'blue', 2),
('Pain dépice', 1, 'red', 1),
('Ravioli', 3, 'blue', 2);

INSERT INTO "label" ("name", "color") VALUES
('Grand', 'bleu'),
('Petit','vert'),
('Moyen', 'violet'),
('vaf', 'bleu'),
('Petfazfait','verfazefat'),
('Moyfafaen', 'fzaefaezfa'),
('da', 'bdaleu'),
('Petdazdit','verdat'),
('Modazedyen', 'violdaet');

INSERT INTO "carte_has_label" ("carte_id", "label_id") VALUES
(1, 1),
(1, 2),
(2, 4),
(3, 6);


COMMIT;