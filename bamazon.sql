DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price FLOAT,
  stock_quantity INTEGER
);

INSERT INTO products 
	(product_name, department_name, price, stock_quantity) 
VALUES 
	("Spyderco Paramilitary", "knives", 59.00, 10),
	("benchmade940", "knives", 200.00, 10),
	("Paracord", "outdoors", 4.98, 10),
	("Osprey Raptor", "outdoors", 89.99, 10),
	("Glock 19", "firearms", 398.00, 10),
	("Manchego Cheese", "food", 6.48, 10),
	("VitaCoco", "food", 12.00, 10),
	("FMJ 9mm 50rnds", "firearms", 15.00, 10),
	("benchmade 42", "knives", 460.00, 10),
	("electric kettle", "appliances", 30.00, 10);
                        







