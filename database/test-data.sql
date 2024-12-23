PRAGMA defer_foreign_keys = on;

-- Things
INSERT INTO things (title)
VALUES ("Thing 1");

INSERT INTO things (title)
VALUES ("Thing 2");

INSERT INTO things (title)
VALUES ("Thing 3");

PRAGMA defer_foreign_keys = off;