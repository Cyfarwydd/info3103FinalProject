create table Users
(
	UserID	VARCHAR(64) not null primary key
);

create table ToDoLists
(
	ListID	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Title VARCHAR(64),
	UserID VARCHAR(64) NOT NULL,
	FOREIGN KEY(UserID)
		REFERENCES Users(UserID) ON DELETE CASCADE
);

create table Tasks
(
	TaskID int not null auto_increment primary key,
	ListID int not null,
	Task VARCHAR(64),
	Complete boolean,
	FOREIGN KEY(ListID)
		REFERENCES ToDoLists(ListID) ON DELETE CASCADE
);

deleting tables:

drop table Tasks;
drop table ToDoLists;
drop table Users;
