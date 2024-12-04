CREATE TABLE "users" (
	"userID"	TEXT NOT NULL UNIQUE,
	"display_name"	TEXT NOT NULL UNIQUE,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"email"	TEXT NOT NULL,
	PRIMARY KEY("userID")
);

CREATE TABLE "categories" (
	"categoryID"	INTEGER NOT NULL UNIQUE,
	"category_name"	TEXT NOT NULL,
	PRIMARY KEY("categoryID" AUTOINCREMENT)
);

CREATE TABLE "products" (
	"productID"	INTEGER NOT NULL UNIQUE,
	"product_name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"img_url"	TEXT NOT NULL,
	"price"	REAL NOT NULL,
	"categoryID"	INTEGER NOT NULL,
	"tree_type"	TEXT,
	"fruiting"	INTEGER COLLATE BINARY,
	"height"	INTEGER,
	"tool_function"	TEXT,
	"nitrogen"	INTEGER,
	"phosphorus"	INTEGER,
	"potassium"	INTEGER,
	PRIMARY KEY("productID" AUTOINCREMENT),
	FOREIGN KEY("categoryID") REFERENCES "categories"("categoryID")
);

CREATE TABLE "carts" (
	"cartID"	INTEGER NOT NULL UNIQUE,
	"status"	TEXT NOT NULL,
	"created_at"	DATETIME NOT NULL,
	"userID"	TEXT NOT NULL,
	PRIMARY KEY("cartID" AUTOINCREMENT),
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);

CREATE TABLE "cartProducts" (
	"cpID"	INTEGER NOT NULL UNIQUE,
	"cartID"	INTEGER NOT NULL,
	"productID"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("cpID" AUTOINCREMENT),
	FOREIGN KEY("cartID") REFERENCES "carts"("cartID"),
	FOREIGN KEY("productID") REFERENCES "products"("productID")
);

CREATE TABLE "orders" (
	"orderID"	INTEGER NOT NULL UNIQUE,
	"userID"	TEXT NOT NULL,
	"created_at"	DATETIME NOT NULL,
	"status"	TEXT NOT NULL,
	"totalCost"	REAL NOT NULL,
	"address"	TEXT,
	"city"	TEXT,
	"state"	TEXT,
	"zip"	TEXT,
	"cardNum"	TEXT,
	PRIMARY KEY("orderID" AUTOINCREMENT),
	FOREIGN KEY("userID") REFERENCES "users"("userID")
);

CREATE TABLE "orderProducts" (
	"orderID"	INTEGER NOT NULL,
	"productID"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	"review"	TEXT,
	FOREIGN KEY("orderID") REFERENCES "orders"("orderID"),
	FOREIGN KEY("productID") REFERENCES "products"("productID")
);