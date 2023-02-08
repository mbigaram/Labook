-- Active: 1675460827848@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role ENUM NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );


CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        dislikes INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE users;

DROP TABLE posts;

DROP TABLE likes_dislikes;

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        "u001",
        "User 1",
        "user1@email.com",
        "password1",
        "admin"
    ), (
        "u002",
        "User 2",
        "user2@email.com",
        "password2",
        "user"
    ), (
        "u003",
        "User 3",
        "user3@email.com",
        "password3",
        "user"
    );

INSERT INTO
    posts (id, creator_id, content)
VALUES (
        "p001",
        "u001",
        "Post 1 content"
    ), (
        "p002",
        "u002",
        "Post 2 content"
    ), (
        "p003",
        "u001",
        "Post 3 content"
    );

INSERT INTO
    likes_dislikes (user_id, post_id, like)
VALUES ("u001", "p001", 1), ("u002", "p002", 1), ("u002", "p003", 0);

DELETE FROM users;

DELETE FROM posts;

DELETE FROM likes_dislikes;