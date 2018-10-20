DELIMITER //
DROP PROCEDURE IF EXISTS "deleteUser"//

CREATE PROCEDURE deleteUser (in usID varchar(16))
begin

	DELETE from Users
		WHERE UserID = usID;

end//
DELIMITER ;
