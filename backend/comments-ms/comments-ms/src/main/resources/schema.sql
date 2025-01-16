-- === COMMENT SERVICE ===
-- Tabla COMMENT
CREATE TABLE COMMENT (
    comment_id SERIAL PRIMARY KEY,                 -- ID único para el comentario
    user_id BIGINT NOT NULL,                       -- ID del usuario que hizo el comentario (FK)
    post_id BIGINT NOT NULL,                       -- ID del post relacionado (FK)
    parent_comment_id BIGINT NULL,                 -- ID del comentario padre (en caso de respuesta)
    content TEXT NOT NULL,                         -- Contenido del comentario
    reactions INT DEFAULT 0,                       -- Cantidad de reacciones al comentario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del comentario
--    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    CONSTRAINT fk_parent_comment FOREIGN KEY (parent_comment_id) REFERENCES COMMENT(comment_id) ON DELETE CASCADE
);

-- Tabla COMMENT_INTERACTION
CREATE TABLE COMMENT_INTERACTION (
    interaction_id SERIAL PRIMARY KEY,                -- Unique ID for the interaction
    comment_id BIGINT NOT NULL,                       -- Related comment ID (FK)
    user_id BIGINT NOT NULL,                          -- ID of the user interacting (FK)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Timestamp of the interaction
    CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES COMMENT(comment_id) ON DELETE CASCADE,
    CONSTRAINT unique_user_comment_reaction UNIQUE (comment_id, user_id) -- Ensure unique reactions
);

CREATE INDEX idx_comment_post ON COMMENT (post_id);
CREATE INDEX idx_comment_user ON COMMENT (user_id);
CREATE INDEX idx_comment_parent ON COMMENT (parent_comment_id);

CREATE INDEX idx_interaction_comment ON COMMENT_INTERACTION (comment_id);
CREATE INDEX idx_interaction_user ON COMMENT_INTERACTION (user_id);
CREATE INDEX idx_interaction_comment_user ON COMMENT_INTERACTION (comment_id, user_id);

-- Function to update the reactions count in COMMENT
CREATE OR REPLACE FUNCTION update_reactions_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Increment the reactions count when a new COMMENT_INTERACTION is added
    IF (TG_OP = 'INSERT') THEN
        UPDATE COMMENT
        SET reactions = reactions + 1
        WHERE comment_id = NEW.comment_id;
    END IF;

    -- Decrement the reactions count when a COMMENT_INTERACTION is deleted
    IF (TG_OP = 'DELETE') THEN
        UPDATE COMMENT
        SET reactions = reactions - 1
        WHERE comment_id = OLD.comment_id;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function on INSERT and DELETE of COMMENT_INTERACTION
CREATE TRIGGER trg_update_reactions
AFTER INSERT OR DELETE ON COMMENT_INTERACTION
FOR EACH ROW
EXECUTE FUNCTION update_reactions_count();
