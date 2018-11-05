DELIMITER //
DROP PROCEDURE deleteList //

CREATE PROCEDURE deleteList(
	in lID int,
	usID varchar(64)
)

BEGIN
	DELETE FROM ToDoLists
		WHERE (ListID = lID
		AND UserID = usID);
END//
DELIMITER ;
