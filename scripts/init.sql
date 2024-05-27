-- init.sql
CREATE USER 'readonly'@'%' IDENTIFIED BY 'readonlypassword';
GRANT SELECT ON mia15.* TO 'readonly'@'%';

CREATE USER 'tensorflow'@'%' IDENTIFIED BY 'tensorflowpassword';
GRANT SELECT, INSERT, UPDATE, DELETE ON mia15.* TO 'tensorflow'@'%';

FLUSH PRIVILEGES;
