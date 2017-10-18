CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("cat treat", "pets", 5.50, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("dog treat", "pets", 7.25, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("kid a", "music", 12.00, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("basketball", "sports", 13.99, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("puck", "sports", 3.00, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("sweater", "clothing", 15.15, 35);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("fender", "music", 1000, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", 23.00, 21);
 
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("saga", "comics", 15.00, 9);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("dark engine", "comics", 15.00, 5);

SELECT * FROM products;