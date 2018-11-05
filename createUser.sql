DELIMITER //
DROP PROCEDURE IF EXISTS createUser //

CREATE PROCEDURE createUser( userNameIn VARCHAR(16))
begin
	INSERT INTO Users (userID) VALUES
	(userNameIn);
end//
DELIMITER ;
	
