create database collage;
use collage;
-- creating a table name "Teacher"
-- with (id, name, email, subject, salary)
create table teacher (
	id int primary key,
    name varchar(30),
    subject varchar(20),
    salary double
);

-- adding a new column "email" into teacher table
alter table teacher 
add column email varchar(60);

-- insert values into the teacher table
insert into teacher
(id, name, email, subject, salary)
values
(101, "Md Afzal", "afzal14777@outlook.com", "CS", 89000.00),
(102, "Kajal Yadhuvanshi", "kajal87@gmail.com", "Maths", 90000.00),
(103, "Salim Zafar", "zafar.salaim@outlook.com", "Chemestry/Biology", 75000.00),
(104, "Amit Kumar", "kumar.amit@yahoo.co.in", "Maths/Physics", 100000.00),
(105, "Tanmay Kumar", "tanmay.kumar@outlook.com", "Computer", 45000.00),
(106, "Soren", "soren@outlook.com", "Social Science", 50000.00),
(107, "Anil Kumar Beshra", "anilbeshra@outlook.com", "Hindi", 63000.00),
(108, "Gulam Rabbani", "glgrabbani@gmail.com", "Chemical Science", 99000.00),
(109, "Firoz Ansari", "firoz.ansari@outlook.com", "Accounting", 96000.00),
(110, "Haider Ali", "ali.haider@outlook.com", "Physicology", 85000.00);

-- command is used to display all the data
select * from teacher;

-- Update a perticular value in a tuple 
update teacher
set subject = "Computer Science"
where id = 101;

-- Question upon the data
-- 1. Select teacher whose salary is more than 80k

select * from teacher			-- correct in first time
where salary > 80000.00;

-- Rename the salary column of teacher table to CTC.
-- CHANGE Is used to change the name of a column in a table using alter command
alter table teacher
change salary CTC double;


-- Update salary of all the teachers by giving them an increment of 25%
update teacher
set CTC = CTC + CTC * (0.25);

select * from teacher;

-- add a new column "city" into teacher table and default city is "Mumbai"
alter table teacher
add column city varchar(30) default "Mumbai";

-- rename the city as states
alter table teacher
change city state varchar(30) default "Maharashtra";


-- create a new table student with (rollNo, name, email, city, marks)

create table student (
	rollNo int primary key,
    name varchar(30),
    email varchar(50),
    city varchar(20),
    marks double
);

insert into student
(rollNo, name, email, city, marks)
values
(101, "Md Afzal Ansari", "ansari.afzal@edupoint.edu", "Mumbai", 98),
(102, "Md Firoz Alam", "alam.firoz@edupoint.edu", "Ranchi", 78),
(103, "Gulam Rabbani", "glg.rabbani@edupoint.edu", "Chandigarh", 99),
(104, "Haider Ali", "ali.haider@edupoint.edu", "Bhagalpur", 95),
(105, "Md Faizal Ansari", "faizal@edupoint.edu", "Sabor", 90),
(106, "Kajal Yadhuvashi", "yadhu.kajal@edupoint.edu", "Kanpur", 78),
(107, "Nisha Poddar", "poddar.nisha@edupoint.edu", "Kolkata", 89),
(108, "Shweta Mahto", "mahto.shweta@edupoint.edu", "Delhi", 99),
(109, "Rakhi Verma", "verma.rakhi@edupoint.edu", "Madhubani", 76),
(110, "Saloni Bhagat", "bhagat.saloni@edupoint.edu", "Sahibgunj", 55);

select * from student;

-- The students who score more than 80.
select * from student where marks > 80;

-- selecting the cities from where the students belongs.
select city from student;

select city, max(marks)
from student
group by city;

-- find the avg marks of the class
select avg(marks) from student;

-- add a new column grade, and assign grades such than
-- marks > 90, grade O
-- marks 80-90, grade A
-- marks 70-80, grade B
-- marks > 0 and <= 70, grade C

alter table student
add column grade varchar(2);

-- modify the data type 
alter table student
modify grade varchar(10);

update student
set grade = "O"
where marks > 90;

update student
set grade = "A"
where marks > 80 and marks <= 90;

update student
set grade = "B"
where marks > 70 and marks <= 80;

update student
set grade = "C"
where marks >= 35 and marks <= 70;

update student 
set grade = "Fail"
where marks >= 0 and marks < 35;


select * from student;

SHOW TABLES;