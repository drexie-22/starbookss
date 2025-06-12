-- DATABASE Schema for Dost
CREATE DATABASE dost;

-- Set up uuid "uuid-ossp"; 
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


-- Insert a test user
INSERT INTO users (user_email, user_password) VALUES ('elizerlibatique65@gmail.com', 'Test1234');