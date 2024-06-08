CREATE DATABASE Login;

USE Login;

CREATE TABLE Credentials (
	email VARCHAR(50),
    password VARCHAR(50)
);

INSERT INTO Credentials(email,password) VALUES ('hani@example.com','1234');
INSERT INTO Credentials(email,password) VALUES ('admin','admin');