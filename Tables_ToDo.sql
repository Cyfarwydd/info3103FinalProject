create table if not exists Users
(
	UserID	VARCHAR(16) not null primary key
);

create table if not exists ToDoLists
(
	ListID	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Title VARCHAR(16),
	UserID VARCHAR(16) NOT NULL,
	FOREIGN KEY(UserID)
		REFERENCES Users(UserID) ON DELETE CASCADE
);

create table if not exists Tasks
(
	TaskID int not null auto_increment primary key,
	ListID int not null,
	Complete boolean ,
	FOREIGN KEY(ListID)
		REFERENCES ToDoLists(ListID) ON DELETE CASCADE
);


