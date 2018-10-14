DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (30) NOT NULL,
department_name VARCHAR (30) NOT NULL,
price INT (10),
stock_quantity INT (10),
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(1,"I-Phone 10","technology",900,5);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(2,"Laptop","technology",800,10);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(3,"Desk","furniture",3000,15);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(4,"Tv","technology",1250,5);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(5,"Echo-Dot","technology",40,20);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(6,"Kindle","technology",140,7);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(7,"Yeezy","appearance",200,2);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(8,"Supreme Caps","appearance",650,7);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity) 
VALUES(9,"Playstation4","games",260,33);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES(10,"X-Box1","games",200,40);