DELIMITER //
DROP PROCEDURE IF EXISTS finishTask //

CREATE PROCEDURE finishTask(
	in
	usID int,
	lID int,
	tID int
)
	BEGIN
	if (select ListID from ToDoLists where (UserID = usID AND ListID = lID)) then
		UPDATE Tasks SET Complete = true where TaskID = tID;
		end if;
	END //
DELIMITER ;
