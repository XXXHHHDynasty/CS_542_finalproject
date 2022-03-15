/*The TA said we lack like 5 entities to hit 20 cuz ISA doesn't count,
I didn't do anything about it yet*/

/*Ideally every entity set with an arrow should be merged with its relationship set when creating table,
but there are two many arrows and I don't see the point of doing that every time. So I only merged those
weak entity sets with their bolded relationships.*/

CREATE TABLE Accounts(
id CHAR(20),
username CHAR(20),
password CHAR(20),
wpi_email CHAR(20),
PRIMARY KEY (id));

CREATE TABLE Users( 
uid CHAR(20),
uname CHAR(20),
age int,
pronouns CHAR(20),
profile_picture image,
location CHAR(20),
PRIMARY KEY (id));

/*i used image as the datatype*/

CREATE TABLE Login(
id CHAR(20) NOT NULL,
uid CHAR(20) NOT NULL,
PRIMARY KEY (id,uid),
FOREIGN KEY (id) REFERENCES Accounts (id),
FOREIGN KEY (uid) REFERENCES Users (uid));

/*see i didn't merge entity with relationship because of those arrows,
and ideally only when the arrow is pointing out of Login 
instead pointing towards Login can i add NOT NULL to id and uid,
but i did it anyway cuz the ERD may not be hundred percent right
or the theory is different from practice*/

/*i also didn't use the ON DELETE CASCADE cuz textbookly it's unnecessary,
i only use this when it comes to weak entities and ISA*/

CREATE TABLE Edit(
id CHAR(20) NOT NULL,
uid CHAR(20) NOT NULL,
PRIMARY KEY (id,uid),
FOREIGN KEY (id) REFERENCES Accounts (id),
FOREIGN KEY (uid) REFERENCES Users (uid));

CREATE TABLE Students(
uid CHAR(20),
major CHAR(20),
diploma CHAR(20),
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users (uid) ON DELETE CASCADE);

CREATE TABLE Professors(
uid CHAR(20),
department CHAR(20),
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users (uid) ON DELETE CASCADE);

CREATE TABLE Admins(
uid CHAR(20),
title CHAR(20),
level CHAR(20),
PRIMARY KEY (uid),
FOREIGN KEY (uid) REFERENCES Users (uid) ON DELETE CASCADE);

CREATE TABLE Discussions(
did CHAR(20),
content text,
number_likes int,
PRIMARY KEY (did));

CREATE TABLE Servers(
sid CHAR(20),
title CHAR(20),
PRIMARY KEY (sid));

CREATE TABLE Post(
uid CHAR(20),
did CHAR(20) NOT NULL,
PRIMARY KEY (uid,did),
FOREIGN KEY (uid) REFERENCES Users (uid),
FOREIGN KEY (did) REFERENCES Discussions (did));

/*i didn't put NOT NULL after uid cuz there's no arrow pointing,
same explanation to all the following*/

CREATE TABLE Like(
uid CHAR(20),
did CHAR(20),
PRIMARY KEY (uid,did),
FOREIGN KEY (uid) REFERENCES Users (uid),
FOREIGN KEY (did) REFERENCES Discussions (did));

CREATE TABLE S_modify(
uid CHAR(20),
did CHAR(20) NOT NULL,
PRIMARY KEY (uid,did),
FOREIGN KEY (uid) REFERENCES Students (uid),
FOREIGN KEY (did) REFERENCES Discussions (did));

/*foreign key uid references students uid*/

CREATE TABLE P_modify(
uid CHAR(20),
did CHAR(20) NOT NULL,
PRIMARY KEY (uid,did),
FOREIGN KEY (uid) REFERENCES Professors (uid),
FOREIGN KEY (did) REFERENCES Discussions (did));

CREATE TABLE D_monitor(
uid CHAR(20),
did CHAR(20),
PRIMARY KEY (uid,did),
FOREIGN KEY (uid) REFERENCES Admins (uid),
FOREIGN KEY (did) REFERENCES Discussions (did));

CREATE TABLE S_monitor(
uid CHAR(20),
sid CHAR(20),
PRIMARY KEY (uid,sid),
FOREIGN KEY (uid) REFERENCES Admins (uid),
FOREIGN KEY (did) REFERENCES Servers (sid));

CREATE TABLE Time_Posttime(
pdate date,
hour CHAR(20),
uid CHAR(20),
PRIMARY KEY (pdate,hour,did),
FOREIGN KEY (did) REFERENCES Discussions (did) ON DELETE CASCADE);

/*instead of year, month, day, i used date. hour remains unchanged*/
/*i didn't put NOT NULL after did cuz textbookly it shouldn't*/

CREATE TABLE Themes_have(
tid CHAR(20),
discription text,
sid CHAR(20),
PRIMARY KEY (tid,sid),
FOREIGN KEY (sid) REFERENCES Servers (sid) ON DELETE CASCADE);

CREATE TABLE Include(
did CHAR(20),
tid CHAR(20),
sid CHAR(20),
PRIMARY KEY (did,tid,sid),
FOREIGN KEY (did) REFERENCES Discussions (did),
FOREIGN KEY (tid,sid) REFERENCES Themes_have (tid,sid));

CREATE TABLE Posters(
did CHAR(20),
number_comments int,
PRIMARY KEY (did),
FOREIGN KEY (did) REFERENCES Discussions (did) ON DELETE CASCADE);

CREATE TABLE Comments(
did CHAR(20),
PRIMARY KEY (did),
FOREIGN KEY (did) REFERENCES Discussions (did) ON DELETE CASCADE);

CREATE TABLE Reply(
pdid CHAR(20),
cdid CHAR(20) NOT NULL,
PRIMARY KEY (pdid,cdid),
FOREIGN KEY (pdid) REFERENCES Posters (did),
FOREIGN KEY (cdid) REFERENCES Comments (did));

/*yeah i created pdid and cdid*/