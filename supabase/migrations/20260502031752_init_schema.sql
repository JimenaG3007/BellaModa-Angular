-- 1. Crear tabla de clientes
CREATE TABLE clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  direccion TEXT NOT NULL,
  correo TEXT NOT NULL,
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de productos
CREATE TABLE productos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio NUMERIC NOT NULL,
  imagen TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT
);

-- 3. Insertar los 10 productos base para que la tienda no esté vacía
INSERT INTO productos (id, nombre, precio, imagen, categoria) VALUES
('abrigobeige', 'Abrigo Beige Élite', 189, 'img/AbrigoBeigeN.jpg', 'abrigo'),
('abrigogris', 'Chaqueta Gris Oversize', 215, 'img/AbrigoGrisMetalico.jpg', 'chaqueta'),
('abrigoverde', 'Abrigo Jade Tenue', 195, 'img/AbrigoVerdePalido.jpg', 'abrigo'),
('chaquetaazul', 'Chaqueta Índigo y Marfil', 175, 'img/ChaquetaAzulBeige.jpg', 'chaqueta'),
('conjuntoblanco', 'Conjunto Perla y Denim', 160, 'img/ConjuntoBlancoDenim.jpg', 'conjunto'),
('conjuntorojo', 'Conjunto Vino y Sombras', 145, 'img/ConjuntoRojoN.jpg', 'conjunto'),
('conjuntorosa', 'Conjunto Dulce Ensueño', 138, 'img/ConjuntoRosa.jpg', 'conjunto'),
('conjuntoplaya', 'Conjunto Coral y Encaje', 125, 'img/ConjuntoRosaPlaya.jpg', 'conjunto'),
('gabardina', 'Gabardina Medianoche', 230, 'img/GabardinaNegro.jpg', 'abrigo'),
('vestidoceleste', 'Vestido Cielo Teatral', 155, 'img/VestidoCeleste.jpg', 'vestido');
