DELIMITER //
DROP PROCEDURE IF EXISTS createTask//

CREATE PROCEDURE createTask(
	in
	usID int,
	lID int,
	description varchar(64)
)
BEGIN
	INSERT INTO Tasks (Task, Complete, ListID) values ( description, false,
		(SELECT ListID FROM ToDoLists WHERE (UserID = usID AND ListID = lID))
	);
		
END //
DELIMITER ;
