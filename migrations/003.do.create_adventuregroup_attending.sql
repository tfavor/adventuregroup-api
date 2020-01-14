
CREATE TABLE adventuregroup_attending (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    event_id INTEGER REFERENCES adventuregroup_events(id) ON DELETE CASCADE NOT NULL, 
    user_name TEXT NOT NULL,
    creator BOOLEAN NOT NULL
);