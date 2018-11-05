DELIMITER //
DROP PROCEDURE IF EXISTS getListByID //

CREATE PROCEDURE getListByID(IN listIDIn INT)
begin
	SELECT Title FROM ToDoLists
		WHERE ListID = listIDIn;
	SELECT * from Tasks
		where ListID = listIDIn;
end//
DELIMITER ;
