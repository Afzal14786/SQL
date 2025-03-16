create database if not exists store;

-- create table if not exists products (
--     productId varchar(255) primary key,
--     productName varchar(255) not null,
--     productQty int default 0
-- );

-- create table if not exists customer (
--     id varchar(255) primary key,
--     username varchar(255) unique not null,
--     email varchar(255) unique not null,
--     password varchar(255) not null
-- );

-- create table if not exists users (
--     id int primary key,
--     name varchar(40),
--     email varchar(60),
--     phoneNo int unsigned,
--     city varchar(30),
--     state varchar(30)
-- );

-- alter table users modify email varchar(255) not null;
-- alter table users modify phoneNo int unsigned not null;

-- create an another table and insert values in bulk using @faker-js/faker package

create table if not exists user2 (
    id varchar(255) primary key,
    username varchar(70) not null,
    email varchar(120) not null,
    password varchar(120)
);