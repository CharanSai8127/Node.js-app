-- Create application database
CREATE DATABASE IF NOT EXISTS appdb;

-- Create application user
CREATE USER IF NOT EXISTS 'appuser'@'%' IDENTIFIED BY 'AppUserPass123!';

-- Grant privileges to application user
GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'%';

-- Apply privilege changes
FLUSH PRIVILEGES;

