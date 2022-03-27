--every user should be distributed to a different role, like 'student', 'professor', 'visitor'--
CREATE TABLE Roles (
	rid CHAR(10),
	r_type CHAR(10) UNIQUE,
	PRIMARY KEY(rid)
);

--all of the account--
CREATE TABLE Accounts (
	email CHAR(30),
	account_password CHAR(30),
	PRIMARY KEY(email)
);

--different person has different Authorities, like the user who create a server has a authority to delete it--
CREATE TABLE Authority (
	auid CHAR(10),
	au_type CHAR(100) UNIQUE,
	PRIMARY KEY(auid)
);

--M:M relationship between 'Roles' and 'Authority'--
CREATE TABLE Roles_Authority_relation (
	rid CHAR(10),
	auid char(10),
	PRIMARY KEY(rid, auid),
	FOREIGN KEY(rid) REFERENCES Roles(rid),
	FOREIGN KEY(auid) REFERENCES Authority(auid)
);

--all of the Users--
CREATE TABLE Users (
	u_id CHAR(10),
	profile_picture BLOB,
	uname CHAR(20) NOT NULL,
	u_level INTEGER NOT NULL,
	follow INTEGER,
	follower INTEGER,
	u_location CHAR(30),
	age INTEGER,
	pronouns char(15),
	rid CHAR(10) NOT NULL,
	PRIMARY KEY(u_id),
	FOREIGN KEY(rid) REFERENCES Roles(rid)
);

-- Users' following and followers--
CREATE TABLE Follow (
	u_id CHAR(10),
	followed_uid CHAR(10),
	PRIMARY KEY(u_id, followed_uid),
	FOREIGN KEY(u_id) REFERENCES Users(u_id),
	FOREIGN KEY(followed_uid) REFERENCES Users(u_id)
);

--M:M relationship between 'Roles' and 'Authority'--
CREATE TABLE Users_Authority_relation (
	u_id CHAR(10),
	auid char(10),
	PRIMARY KEY(u_id, auid),
	FOREIGN KEY(u_id) REFERENCES Users(u_id),
	FOREIGN KEY(auid) REFERENCES Authority(auid)
);

--storing all of system messages that have been sent to every users--
CREATE TABLE System_message(
	smegid CHAR(10),
	semg_date DATE,
	semg_content NVARCHAR2(2000),
	u_id CHAR(10) NOT NULL,
	PRIMARY KEY(smegid),
	FOREIGN KEY(u_id) REFERENCES Users(u_id)
);

--every user could provide feedbacks to adminsters--
CREATE TABLE Feedback(
	fid CHAR(10),
	f_date DATE,
	f_content NVARCHAR2(500) NOT NULL,
	u_id CHAR(10) NOT NULL,
	PRIMARY KEY(fid),
	FOREIGN KEY(u_id) REFERENCES Users(u_id)
);

--every user could create Announcement in own servers--
CREATE TABLE Announcement(
	anid CHAR(10),
	an_date DATE,
	an_content NVARCHAR2(500) NOT NULL,
	u_id CHAR(10) NOT NULL,
	PRIMARY KEY(anid),
	FOREIGN KEY(u_id) REFERENCES Users(u_id)
);

--every user who has registered could create servers--
CREATE TABLE Servers(
	s_id CHAR(10),
	ser_name CHAR(20) NOT NULL UNIQUE,
	privacy CHAR(1) NOT NULL,
	u_id CHAR(10) NOT NULL,
	PRIMARY KEY(s_id),
	FOREIGN KEY(u_id) REFERENCES Users(u_id)
);

--M:M participation relationship between 'Users' and 'Servers'
CREATE TABLE Participation(
	s_id CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(s_id, u_id),
	FOREIGN KEY(s_id) REFERENCES Servers(s_id),
	FOREIGN KEY(u_id) REFERENCES Users(u_id)
);

--all of the subserver--
CREATE TABLE Subserver(
	subid CHAR(10),
	sub_name CHAR(30) NOT NULL,
	s_id CHAR(10) NOT NULL,
	PRIMARY KEY(subid),
	FOREIGN KEY(s_id) REFERENCES Servers(s_id)
);

--all of the discussions--
CREATE TABLE Discussion(
	did CHAR(10),
	dis_desp NVARCHAR2(500),
	dis_title CHAR(50) NOT NULL,
	dis_number_likes INTEGER NOT NULL,
	dis_status CHAR(10),
	dis_date DATE,
	subid CHAR(10) NOT NULL,
	PRIMARY KEY(did),
	FOREIGN KEY(subid) REFERENCES Subserver(subid)
);

--M:M relationship between 'Users' and the saved 'Discussion'
CREATE TABLE Saved_Discussion(
	did CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(did, u_id)
);

--M:M relationship between 'Users' and the subscribed 'Discussion'
CREATE TABLE Subscribed_Discussion(
	did CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(did, u_id)
);

--M:M relationship between 'Users' and the reported 'Discussion'
CREATE TABLE Reported_Discussion(
	did CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(did, u_id)
);

--all of the comments created in discussions--
CREATE TABLE Comments(
	cid CHAR(10),
	super_cid CHAR(10),
	c_date date,
	c_content VARCHAR(300) NOT NULL,
	c_number_likes INTEGER NOT NULL,
	c_status CHAR(10),
	PRIMARY KEY(cid),
	FOREIGN KEY(super_cid) REFERENCES Comments(cid)
);

--M:M relationship between 'Users' and the saved 'Comment'--
CREATE TABLE Saved_Comments(
	cid CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(cid, u_id)
);

--M:M relationship between 'Users' and the reported 'Comment'--
CREATE TABLE Reported_Comments(
	cid CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(cid, u_id)
);

--M:M relationship between 'Users' and the received 'Comment'--
CREATE TABLE Received_Comments(
	cid CHAR(10),
	u_id CHAR(10),
	PRIMARY KEY(cid, u_id)
);