DELIMITER //
DROP PROCEDURE IF EXISTS updateTask //

CREATE PROCEDURE updateTask(in lID int, in tskID int, in taskIn varchar(64) )
BEGIN
	UPDATE Tasks SET Task = taskIn
		WHERE (ListID = lID AND TaskID = tskID);
END//
DELIMITER ;
