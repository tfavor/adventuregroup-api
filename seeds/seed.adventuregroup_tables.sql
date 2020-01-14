BEGIN;

TRUNCATE
  adventuregroup_events,
  adventuregroup_users
  RESTART IDENTITY CASCADE;

INSERT INTO adventuregroup_users (user_name, password, full_name)
VALUES
    ('dunder', 'Password1!', 'full_name'),
    ('b.deboop', 'bo-password', 'full_name'),
    ('c.bloggs', 'charlie-password', 'full_name'),
    ('s.smith', 'sam-password', 'full_name');

INSERT INTO adventuregroup_events (name, location, date, type, users_attending, creator_id, details)
VALUES
    ('event1', 'Austin, Texas', '2019-06-23', 'hiking', 'user1, user3, user2, user4', 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event2', 'SanAntonio, Texas', '2019-06-23', 'biking', 'user2, user3', 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event3', 'Austin, Texas', '2019-06-23', 'biking', 'user3, user2', 4,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event4','SanAntonio, Texas', '2019-06-23', 'water', 'user1, user2', 3,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event5', 'Austin, Texas', '2019-06-23', 'camping', 'user2, user4', 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event6', 'SanAntonio, Texas', '2019-06-23', 'climbing', 'user1, user', 2,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event7', 'Austin, Texas', '2019-06-23', 'other', 'user1, user3', 2,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event8', 'SanAntonio, Texas', '2019-06-23', 'water', 'user3, user4', 1,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event9', 'Austin, Texas', '2019-06-23', 'biking', 'user3, user2', 4,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.'),
    ('event10', 'SanAntonio, Texas', '2019-06-23', 'biking', 'user3, user2', 4,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in. Amet facilisis magna etiam tempor orci. Sapien et ligula ullamcorper malesuada. Tincidunt tortor aliquam nulla facilisi. Ac auctor augue mauris augue neque gravida. Enim nec dui nunc mattis enim ut tellus elementum. Purus sit amet luctus venenatis lectus magna fringilla urna. Laoreet non curabitur gravida arcu ac. Dignissim enim sit amet venenatis urna cursus eget. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum.');  

INSERT INTO adventuregroup_attending (event_id, user_name, creator)
VALUES
    (1, 'dunder', 'false'),
    (2, 'dunder', 'false'),
    (3, 'dunder', 'true'),
    (1, 'b.deboop', 'true'),
    (1, 'c.bloggs', 'false'),
    (2, 's.smith', 'false'),
    (3, 'b.deboop', 'false');

COMMIT;