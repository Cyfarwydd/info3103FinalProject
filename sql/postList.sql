delimiter //
drop procedure if exists postList//

create procedure postList(in usID varchar(64), title varchar(64))
begin
	declare id int;
	select UserID from Users where UserName = usID into id;
	insert into ToDoLists (UserID, Title) values
		(id, title);
end//
delimiter ;
