DELIMITER //
DROP PROCEDURE deleteUser//

CREATE PROCEDURE deleteUser (in usID int)
begin

	DELETE from Users
		WHERE UserID = usID;

end//
DELIMITER ;
