INSERT INTO ambitiousdb.public.user(username, email, password)
VALUES
    ('briantwene', 'briant@mail.com', 'bbbbb'),
    ('simonklavzar', 'simonk@mail.com', 'sssss'),
    ('linchen', 'linc@mail.com', 'lllll');


-- the name of the chat might not matter here but I want to test something later - briantwene
INSERT INTO ambitiousdb.public.chat(chat_name, is_private)
VALUES
    ('briantwene,simonklavzar', TRUE),
    ('briantwene,linchen', TRUE),
    ('simonklavzar,linchen', TRUE),
    ('briantwene,simonklavzar,linchen', TRUE);



INSERT INTO ambitiousdb.public.member(user_id, chat_id, joined_date, left_datetime, username)
VALUES
    (1, 1, CURRENT_TIMESTAMP, NULL, 'briantwene'),
    (1, 2, CURRENT_TIMESTAMP, NULL, 'briantwene'),
    (1, 4, CURRENT_TIMESTAMP, NULL, 'briantwene'),
    (1, 1, CURRENT_TIMESTAMP, NULL, 'simonklavzar'),
    (1, 3, CURRENT_TIMESTAMP, NULL, 'simonklavzar'),
    (1, 4, CURRENT_TIMESTAMP, NULL, 'simonklavzar'),
    (1, 2, CURRENT_TIMESTAMP, NULL, 'linchen'),
    (1, 3, CURRENT_TIMESTAMP, NULL, 'linchen'),
    (1, 4, CURRENT_TIMESTAMP, NULL, 'linchen');
