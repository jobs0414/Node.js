CREATE DATABASE may30;

USE may30;

CREATE TABLE Persons (
    ID INT,
    NAME VARCHAR(255),
    AGE INT
);

INSERT INTO Persons(id, name, age) VALUES(1, "John Doe", 20);

SELECT * FROM Persons;

