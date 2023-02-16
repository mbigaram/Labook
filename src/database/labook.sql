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
 DROP TABLE users;


CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
            ON DELETE CASCADE --toda vez q um id de usuario for deletado, todos os post daquele usuario sera deletado
            ON UPDATE CASCADE --toda vez q um id de usuario for editado, todos os post daquele usuario sera atualizado
    );
 DROP TABLE posts;

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );

 DROP TABLE likes_dislikes ;

     INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Marcelo", "mb@gmail.com", "mb123", "ADMIN"),
    ("u002", "Silmara", "sb@gmail.com", "sb123", "NORMAL"),
    ("u003", "Gisela", "gb@gmail.com", "gb123", "NORMAL");

INSERT INTO posts (id, creator_id, content) 
VALUES
    ("p001", "u001", "maravilha"),
    ("p002", "u002", "Esta pago!"),
    ("p003", "u003", "#Jantinha");

INSERT INTO
likes_dislikes (user_id, post_id, like)
VALUES 
("u002", "p001", 1), 
("u003", "p001", 1),
("u002", "p002", 1), 
("u003", "p002", 1),
("u001", "p003", 1),
("u003", "p003", 0);

UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 2
WHERE id = "p003";

UPDATE posts
SET dislikes = 1
WHERE id = "p003";


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;
