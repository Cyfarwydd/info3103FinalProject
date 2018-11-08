delimiter //

drop procedure if exists changeListTitle//

create procedure changeListTitle(
	in
	newName varchar(64),
	usID varchar(64),
	lID int
)
	begin
		UPDATE ToDoLists SET Title = newName where (ListID = lID and (strcmp(usID, UserID)) = 0);
	end //
delimiter ;
