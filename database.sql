USE CRUD;

drop table produtos;
drop table categoria;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    category int NOT NULL,
    price VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);
CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

ALTER TABLE produtos
ADD CONSTRAINT fk_categoria
FOREIGN KEY (category) REFERENCES categoria(id);

insert into categoria(nome) values ("esportes");
select * from categoria;
