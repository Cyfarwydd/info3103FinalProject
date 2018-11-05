DELIMITER //
DROP PROCEDURE getLists //

CREATE PROCEDURE getLists(in userID varchar(64))
begin
	SELECT * FROM ToDoLists
		where userID = UserID;
end//
DELIMITER ;
