CREATE DATABASE epytodo;

use epytodo;

CREATE TABLE user
(
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (email),
  PRIMARY KEY (id)
);

CREATE TABLE todo
(
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_time DATETIME NOT NULL,
  status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT 'not started',
  user_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
