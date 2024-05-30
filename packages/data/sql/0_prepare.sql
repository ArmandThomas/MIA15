-- db: mia15
USE mia15;

-- countries
CREATE INDEX idx_countries_name ON mia15.countries(name);
-- disciplines
CREATE INDEX idx_disciplines_name ON mia15.disciplines(name);
-- hosts
CREATE INDEX idx_hosts_name ON mia15.hosts(name);
CREATE INDEX idx_hosts_slug ON mia15.hosts(slug);
-- athletes
CREATE INDEX idx_athletes_url ON mia15.athletes(url);
CREATE INDEX idx_athletes_full_name ON mia15.athletes(full_name);
-- events
CREATE INDEX idx_events_name ON mia15.events(name);