DELIMITER //
DROP PROCEDURE getLists //

CREATE PROCEDURE getLists(in usID int)
begin
	select * from ToDoLists where UserID = usID;
end//
DELIMITER ;
