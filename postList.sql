delimiter //
drop procedure if exists "postList"//

create procedure postList(in usID varchar(16), title varchar(16))
begin
	insert into ToDoLists (UserID, Title) values
		(usID, title);
end//
delimiter ;
