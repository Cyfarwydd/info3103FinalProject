DELIMITER //
DROP PROCEDURE getLists //

CREATE PROCEDURE getLists(in usID varchar(64))
begin
	declare id int default 0;
	select userID from Users where UserName = usID into id;
	select * from ToDoLists where UserID = id;
end//
DELIMITER ;
