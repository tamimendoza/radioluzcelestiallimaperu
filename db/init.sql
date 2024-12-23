CREATE TABLE IF NOT EXISTS configuracion (
  codigo CHAR(5) PRIMARY KEY,
  valor VARCHAR(255) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- INSERT INTO configuracion (codigo, valor) VALUES ("PLAYS", "...");
-- INSERT INTO configuracion (codigo, valor) VALUES ("TELEF", "...");
-- INSERT INTO configuracion (codigo, valor) VALUES ("MISIN", "...");
-- INSERT INTO configuracion (codigo, valor) VALUES ("VISIN", "...");
-- INSERT INTO configuracion (codigo, valor) VALUES ("DOCTN", "...");

CREATE TABLE IF NOT EXISTS chat (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(10) NOT NULL,
  mensaje VARCHAR(50) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS imagen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008751/slides/bbzrmxvgpqhtufj68nmd.jpg");
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008240/slides/u8xehb9nff9f3pmbbaok.webp");
-- INSERT INTO imagen (src) VALUES ("https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008907/slides/zkwdc1zeop9cbtkltiot.jpg");
CREATE TABLE IF NOT EXISTS noticia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT,
  imagen TEXT,
  fecha DATE NOT NULL
);
-- INSERT INTO noticia (titulo, contenido, imagen, fecha) VALUES ('Noticia', 'contenido...', "https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008907/slides/zkwdc1zeop9cbtkltiot.jpg", '2024-11-28 06:00:00');
CREATE TABLE IF NOT EXISTS programacion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT,
  imagen TEXT,
  desde DATE NOT NULL,
  hasta DATE NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- INSERT INTO programacion (titulo, contenido, imagen, desde, hasta) VALUES ('Programación', 'contenido...', "https://res.cloudinary.com/radioluzcelestial/image/upload/v1686008907/slides/zkwdc1zeop9cbtkltiot.jpg", '2024-11-28 06:00:00', '2024-12-04 05:33:00');
