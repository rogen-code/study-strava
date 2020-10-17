/*  Execute this file from the command line by typing:
 *    mysql -u "root" < db/schema.sql
*/

DROP DATABASE IF EXISTS study_strava;

CREATE DATABASE study_strava;

-- ---
-- Globals
-- ---
USE study_strava;

-- ---
-- Table 'Schools'
--
-- ---

DROP TABLE IF EXISTS Schools;

CREATE TABLE Schools (
  school_id INTEGER NOT NULL AUTO_INCREMENT,
  school_name VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (school_id)
);

-- ---
-- Table 'Teachers'
--
-- ---

CREATE TABLE Teachers (
  teacher_id INTEGER NOT NULL AUTO_INCREMENT,
  teacher_name VARCHAR(100) NULL DEFAULT NULL,
  school_id int,
  FOREIGN KEY (school_id) references Schools(school_id),
  PRIMARY KEY (teacher_id)
);


-- ---
-- Table 'Classes'
--
-- ---

DROP TABLE IF EXISTS Classes;

CREATE TABLE Classes (
  class_id INTEGER NOT NULL AUTO_INCREMENT,
  class_name VARCHAR(255) NULL DEFAULT NULL,
  teacher_id int,
  school_id int,
  FOREIGN KEY (teacher_id) references Teachers(teacher_id),
  FOREIGN KEY (school_id) references Schools(school_id),
  PRIMARY KEY (class_id)
);

-- ---
-- Table 'Students'
--
-- ---

DROP TABLE IF EXISTS Students;

CREATE TABLE Students (
  student_id INTEGER NOT NULL AUTO_INCREMENT,
  student_name VARCHAR(255) NULL DEFAULT NULL,
  school_id int,
  FOREIGN KEY (school_id) references Schools(school_id),
  PRIMARY KEY (student_id)
);


-- ---
-- Table 'Classes_Students'
--
-- ---

DROP TABLE IF EXISTS Classes_Students;

CREATE TABLE Classes_Students (
  class_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  PRIMARY KEY (class_id, student_id)

);

-- ---
-- Table 'Tests'
--
-- ---

DROP TABLE IF EXISTS Tests;

CREATE TABLE Tests (
  test_id INTEGER AUTO_INCREMENT,
  test_name VARCHAR(100) NOT NULL,
  test_date DATE NOT NULL,
  test_description VARCHAR(255) DEFAULT NULL,
  school_id INTEGER,
  class_id INTEGER,
  FOREIGN KEY (school_id) references Schools(school_id),
  FOREIGN KEY (class_id) references Classes(class_id),
  PRIMARY KEY (test_id, class_id)
);