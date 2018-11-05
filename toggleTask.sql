DELIMITER //
DROP PROCEDURE IF EXISTS toggleTask //

CREATE PROCEDURE toggleTask(
	in
	tID int
)
	BEGIN
		UPDATE Tasks SET Complete = true where TaskID = tID;
	END //
DELIMITER ;
