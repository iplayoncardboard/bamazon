CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
product_id INT(8) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (product_id),
product_name VARCHAR(50),
department_name INT(8),
 price DECIMAL(8,2),
 stock_quantity INT(6)
);

CREATE TABLE departments(
dept_id INT(8) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (dept_id),
department_name VARCHAR(50) NOT NULL
);

INSERT INTO departments(department_name) VALUES ("Games"), ("Sporting Goods"), ("Pets"),("Electronics")

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Twilight Imperium",1,149.99,100 ),("Climbing Harness",2,179.89,10),("Fire Hose Gator",3,9.99,15),
("Dodge Ball",2,24.99,26),("MSI Laptop",4,1799.99,2),("Logitech Mouse",4,24.99,5),("Kong Harness",3,26.99,4),
("Scythe",1,69.99,6),("Feudum",1,79.99,4),("Oculus Rift",4,399.99,17);