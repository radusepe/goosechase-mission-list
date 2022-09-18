DROP DATABASE IF EXISTS goosechase;

CREATE DATABASE goosechase;

\c goosechase;

DROP TABLE IF EXISTS missions;

CREATE TABLE missions (
  id SERIAL,
  name varchar(128),
  description varchar(128),
  points int,
  type varchar(128)
);

INSERT INTO missions (name, description, points, type)
  VALUES
  ('Race Car Driver', 'Name the 2021 Formula 1 World Champion Driver', 250, 'text'),
  ('Mario Kart', 'Drive a go kart on the track. Team member and lap time must be in picture', 350, 'photo'),
  ('Track Visit', 'Visit the Canadian Grand Prix track.', 500, 'gps'),
  ('Canada P1', 'Name the 2021 Canadian Grand Prix winner', 250, 'text'),
  ('Real Racing', 'Drive a Formula 1 Car on the track. Team member and car must be in the picture', 1000, 'photo'),
  ('Going Vertical', 'Make your way to the top of Mount Royal', 400, 'gps'),
  ('Going for Gold', 'What year were the Olympic games played in Montreal?', 200, 'text'),
  ('On the Water', 'Go for a boat ride. Or a swim. Team member must be in the picture', 800, 'photo'),
  ('Other Speedrunners', 'Visit the Olympic Park', 500, 'gps');
