SELECT * FROM categories;

/* trees */
INSERT INTO products (product_name, description, img_url, price, categoryID, tree_type, fruiting, height)
VALUES 
('Maple Tree', 'A beautiful deciduous tree with vibrant fall colors.', '', 199.99, 1, 'deciduous', 0, 30);

INSERT INTO products (product_name, description, img_url, price, categoryID, tree_type, fruiting, height)
VALUES 
('Pine Tree', 'An evergreen tree that provides year-round greenery.', '', 149.99, 1, 'evergreen', 0, 50);

INSERT INTO products (product_name, description, img_url, price, categoryID, tree_type, fruiting, height)
VALUES 
('Apple Tree', 'A fruiting deciduous tree that yields delicious apples.', '', 129.99, 1, 'deciduous', 1, 15);

/* tools */

INSERT INTO products (product_name, description, img_url, price, categoryID, tool_function)
VALUES 
('Pruning Shears', 'High-quality shears for precise pruning.', '', 29.99, 2, 'pruning');

INSERT INTO products (product_name, description, img_url, price, categoryID, tool_function)
VALUES 
('Garden Trowel', 'Durable trowel for planting and digging.', '', 15.99, 2, 'digging');

INSERT INTO products (product_name, description, img_url, price, categoryID, tool_function)
VALUES 
('Hedge Trimmer', 'Efficient trimmer for shaping hedges.', '', 89.99, 2, 'trimming');

/* soils */

INSERT INTO products (product_name, description, img_url, price, categoryID, nitrogen, phosphorus, potassium)
VALUES 
('All-Purpose Garden Soil', 'A balanced soil mix suitable for various plants.', '', 19.99, 3, 10, 10, 10);

INSERT INTO products (product_name, description, img_url, price, categoryID, nitrogen, phosphorus, potassium)
VALUES 
('Organic Compost', 'Rich organic matter that enhances soil fertility.', '', 24.99, 3, 5, 5, 5);

INSERT INTO products (product_name, description, img_url, price, categoryID, nitrogen, phosphorus, potassium)
VALUES 
('Potting Mix', 'Lightweight soil mix ideal for container gardening.', '', 14.99, 3, 8, 4, 6);

SELECT p.*, c.category_name FROM products p
join categories c on p.categoryID = c.categoryID