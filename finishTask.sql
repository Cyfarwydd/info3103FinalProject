DELIMITER //
DROP PROCEDURE IF EXISTS finishTask //

CREATE PROCEDURE finishTask(
	in
	usID varchar(64),
	tID int,
	lID int
)
	BEGIN
	if (select ListID from ToDoList where (UserID = usID AND ListID = lID)) then
		UPDATE Tasks SET Complete = true where TaskID = tID;
		end if;
	END //
DELIMITER ;
