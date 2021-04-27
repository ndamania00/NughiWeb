ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NirmitD1!';

-- create the database
DROP DATABASE IF EXISTS nughiwebdb;
CREATE DATABASE nughiwebdb;

-- select the database
USE nughiwebdb;

DROP TABLE IF EXISTS item;
CREATE TABLE item
(
  item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  item_main_image_path VARCHAR(500) NOT NULL UNIQUE,
  item_title VARCHAR(5000) NOT NULL,
  original_price DECIMAL(5,2) NOT NULL,
  item_description VARCHAR(5000) NOT NULL,
  current_price DECIMAL(5,2) NOT NULL,
  item_filter VARCHAR(50) DEFAULT "misc"
  );
  
DROP TABLE IF EXISTS bid;
CREATE TABLE bid
(
	bid_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bidder_name VARCHAR(500) NOT NULL,
	bidder_contact_info VARCHAR(1000) NOT NULL,
    bid_item_id INT NOT NULL,
    bid_price DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (bid_item_id) REFERENCES item(item_id)
);
    
DROP TABLE IF EXISTS image;
CREATE TABLE image
(
	image_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(500) NOT NULL,
    item_id INT NOT NULL REFERENCES item(item_id),
	FOREIGN KEY (item_id) REFERENCES item(item_id)
);
    
    
DELIMITER $$

CREATE TRIGGER bid_update
    AFTER INSERT
    ON bid FOR EACH ROW
    BEGIN
		IF NEW.bid_price > (SELECT current_price FROM item WHERE item_id = NEW.bid_item_id) THEN
			UPDATE item
            SET current_price = NEW.bid_price
            WHERE NEW.bid_item_id = item_id;
		END IF;
	END;
				
$$
DELIMITER ;
   
INSERT INTO item (item_main_image_path, item_title, original_price, item_description, current_price, item_filter) VALUES 
('/sample.jpg', 'Necklace', '20.00', 'this is the description',  '20.00', 'jewelry'),
('/sample2.jpg', 'Painting', '10.00', 'this is the other description', '20.00', 'artwork');

INSERT INTO bid (bidder_name, bidder_contact_info, bid_item_id, bid_price) VALUES
('johnny appleseed', 'gmail', 1, 21.00),
('paul appleseed', 'hotmail', 2, 22.00),
('sam appleseed', 'outlook', 1, 20.00);

INSERT INTO image (image_path, item_id) VALUES
('/sample.jpg', 1),
('/sample2.jpg', 2),
('/sample21.jpeg', 2),
('/sample22.jpeg', 2),
('/sample23.jpeg', 2);