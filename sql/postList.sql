delimiter //
drop procedure if exists postList//

create procedure postList(in usID int, title varchar(64))
begin
	insert into ToDoLists (UserID, Title) values
		(usID, title);
end//
delimiter ;
