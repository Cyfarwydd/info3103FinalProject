DELIMITER //
DROP PROCEDURE IF EXISTS "createUser" //

CREATE PROCEDURE createUser(IN userNameIn VARCHAR(16))
begin
	INSERT INTO Users (userID) VALUES
	(userIDIn);
end//
DELIMITER ;
	