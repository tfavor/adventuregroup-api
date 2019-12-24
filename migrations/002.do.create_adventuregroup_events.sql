CREATE TYPE event_types AS ENUM ('hiking', 'biking', 'climbing', 'camping', 'water', 'other');

CREATE TABLE adventuregroup_events (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT,
    location TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time TIME NOT NULL,
    type event_types NOT NULL,
    details TEXT NOT NULL,
    users_attending TEXT,
    creator_id INTEGER REFERENCES adventuregroup_users(id) ON DELETE CASCADE NOT NULL 
);
