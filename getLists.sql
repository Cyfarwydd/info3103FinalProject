DELIMITER //
DROP PROCEDURE getLists //

CREATE PROCEDURE getLists(in usID varchar(64))
begin
	select * from ToDoLists where STRCMP(UserID, usID) = 0;
end//
DELIMITER ;
