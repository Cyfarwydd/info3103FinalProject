DELIMITER //
DROP PROCEDURE deleteUser//

CREATE PROCEDURE deleteUser (in usID varchar(64))
begin

	DELETE from Users
		WHERE UserID = usID;

end//
DELIMITER ;
