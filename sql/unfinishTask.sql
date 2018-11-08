delimiter //

drop procedure if exists unfinishTask //

create procedure unfinishTask(
	in
	usID int,
	lID int,
	tID int
)
	begin
	
	if(select ListID from ToDoLists where (UserID = usID and ListID = lID)) then
		 UPDATE Tasks set Complete = false where TaskID = tID;
	end if;

	end //
delimiter ;
