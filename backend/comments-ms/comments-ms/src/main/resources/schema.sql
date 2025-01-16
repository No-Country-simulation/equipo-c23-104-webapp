-- === COMMENT SERVICE ===
-- Tabla COMMENT
CREATE TABLE COMMENT (
    comment_id SERIAL PRIMARY KEY,                 -- ID único para el comentario
    user_id BIGINT NOT NULL,                       -- ID del usuario que hizo el comentario (FK)
    post_id BIGINT NOT NULL,                       -- ID del post relacionado (FK)
    parent_comment_id BIGINT NULL,                 -- ID del comentario padre (en caso de respuesta)
    content TEXT NOT NULL,                         -- Contenido del comentario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del comentario
--    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    CONSTRAINT fk_parent_comment FOREIGN KEY (parent_comment_id) REFERENCES COMMENT(comment_id) ON DELETE CASCADE
);

-- Tabla COMMENT_INTERACTION
CREATE TABLE COMMENT_INTERACTION (
    interaction_id SERIAL PRIMARY KEY,            -- ID único para la interacción
    comment_id BIGINT NOT NULL,                   -- ID del comentario relacionado (FK)
    user_id BIGINT NOT NULL,                      -- ID del usuario que interactuó (FK)
    reaction_type VARCHAR(50) NOT NULL,           -- Tipo de reacción (Enum-like, texto que representa el tipo de interacción)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de la interacción
    CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES COMMENT(comment_id) ON DELETE CASCADE,
--    CONSTRAINT fk_user_interaction FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_comment_post ON COMMENT (post_id);
CREATE INDEX idx_comment_user ON COMMENT (user_id);
CREATE INDEX idx_comment_parent ON COMMENT (parent_comment_id);

CREATE INDEX idx_interaction_comment ON COMMENT_INTERACTION (comment_id);
CREATE INDEX idx_interaction_user ON COMMENT_INTERACTION (user_id);
