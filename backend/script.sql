DROP TABLE USER_GROUP CASCADE;
DROP TABLE GROUPS CASCADE;
DROP TABLE USERS CASCADE;
DROP TABLE ROLES CASCADE;

CREATE TABLE USERS(
	ID BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	USERNAME VARCHAR NOT NULL ,
	EMAIL VARCHAR,
	PASSWORD VARCHAR,
	FULLNAME VARCHAR,
	BIRTHDAY VARCHAR,
	CREATE_AT TIMESTAMP,
	ENABLE BOOLEAN,
	LOCK BOOLEAN,
	CONSTRAINT PK_PHOTO PRIMARY KEY(ID)

);
CREATE TABLE GROUPS(
	ID BIGINT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	NAME VARCHAR NOT NULL,
	CREATE_AT TIMESTAMP,
	ADMIN_ID BIGINT,
	CONSTRAINT PK_GROUP PRIMARY KEY(ID)
);

CREATE TABLE USER_GROUP(
	USER_ID BIGINT NOT NULL,
	GROUP_ID BIGINT NOT NULL,
	ROLE_ID INT,
	CONSTRAINT PK_USER_GROUP PRIMARY KEY(USER_ID,GROUP_ID)
	
	
);
CREATE TABLE ROLES(
	ID INT NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	NAME VARCHAR,
	CONSTRAINT PK_ROLE PRIMARY KEY(ID)
);

INSERT INTO ROLES VALUES (1,'MEMBER');
INSERT INTO ROLES VALUES (2,'KICKOUT');
INSERT INTO ROLES VALUES (3,'CO-OWNER');
INSERT INTO ROLES VALUES (4,'OWNER');