DELIMITER //
DROP PROCEDURE IF EXISTS getLastTask //

CREATE PROCEDURE getLastTask(in lstID int)
begin
	select TaskID from Tasks where ListID = lstID order by ListID desc limit 1;
end//
DELIMITER ;
