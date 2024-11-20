CREATE TABLE IF NOT EXISTS configuracion (
  codigo CHAR(5),
  valor INTEGER,
  PRIMARY KEY(codigo)
);
-- INSERT INTO configuracion (codigo, valor) VALUES ("PLAYS", "...");
-- INSERT INTO configuracion (codigo, valor) VALUES ("TELEF", "...");

CREATE TABLE IF NOT EXISTS chat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(10),
  mensaje VARCHAR(50),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS imagen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src TEXT
);
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008751/slides/bbzrmxvgpqhtufj68nmd.jpg");
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008240/slides/u8xehb9nff9f3pmbbaok.webp");
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008907/slides/zkwdc1zeop9cbtkltiot.jpg");
