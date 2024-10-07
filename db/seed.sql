-- Seed data for Users table
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@example.com', 'hashed_password_1', 'Admin User', 'admin'),
('pm1@example.com', 'hashed_password_2', 'Product Manager 1', 'regular'),
('pm2@example.com', 'hashed_password_3', 'Product Manager 2', 'regular'),
('dev1@example.com', 'hashed_password_4', 'Developer 1', 'regular'),
('dev2@example.com', 'hashed_password_5', 'Developer 2', 'regular'),
('dev3@example.com', 'hashed_password_6', 'Developer 3', 'regular'),
('tester1@example.com', 'hashed_password_7', 'Tester 1', 'regular'),
('tester2@example.com', 'hashed_password_8', 'Tester 2', 'regular'),
('requester1@example.com', 'hashed_password_9', 'Requester 1', 'regular'),
('requester2@example.com', 'hashed_password_10', 'Requester 2', 'regular');

-- Seed data for Projects table
INSERT INTO projects (title, description, requester_id, product_manager_id, status) VALUES
('Project A', 'Description for Project A', 9, 2, 'Gathering Requirements'),
('Project B', 'Description for Project B', 10, 3, 'In Development'),
('Project C', 'Description for Project C', 9, 2, 'MVP'),
('Project D', 'Description for Project D', 10, 3, 'Under Review'),
('Project E', 'Description for Project E', 9, 2, 'Maintenance'),
('Project F', 'Description for Project F', 10, 3, 'Deprecated'),
('Project G', 'Description for Project G', 9, 2, 'In Development'),
('Project H', 'Description for Project H', 10, 3, 'Gathering Requirements'),
('Project I', 'Description for Project I', 9, 2, 'MVP'),
('Project J', 'Description for Project J', 10, 3, 'Under Review');

-- Seed data for ProjectSupporters table
INSERT INTO project_supporters (project_id, user_id) VALUES
(1, 4), (1, 5), (2, 6), (2, 7), (3, 8), (3, 4),
(4, 5), (4, 6), (5, 7), (5, 8), (6, 4), (6, 5),
(7, 6), (7, 7), (8, 8), (8, 4), (9, 5), (9, 6),
(10, 7), (10, 8);

-- Seed data for ProjectContributors table
INSERT INTO project_contributors (project_id, user_id, role) VALUES
(1, 4, 'Developer'), (1, 7, 'Tester'), (2, 5, 'Developer'), (2, 8, 'Tester'),
(3, 6, 'Developer'), (3, 7, 'Tester'), (4, 4, 'Developer'), (4, 8, 'Tester'),
(5, 5, 'Developer'), (5, 7, 'Tester'), (6, 6, 'Developer'), (6, 8, 'Tester'),
(7, 4, 'Developer'), (7, 7, 'Tester'), (8, 5, 'Developer'), (8, 8, 'Tester'),
(9, 6, 'Developer'), (9, 7, 'Tester'), (10, 4, 'Developer'), (10, 8, 'Tester');

-- Seed data for Comments table
INSERT INTO comments (project_id, user_id, content) VALUES
(1, 2, 'Initial requirements gathered for Project A'),
(1, 4, 'Started development on Project A'),
(2, 3, 'Project B is progressing well'),
(2, 5, 'Encountered a minor issue in Project B'),
(3, 2, 'MVP for Project C is ready for review'),
(3, 7, 'Testing MVP for Project C'),
(4, 3, 'Project D is under final review'),
(4, 8, 'Found a few bugs in Project D'),
(5, 2, 'Project E moved to maintenance phase'),
(5, 6, 'Regular maintenance update for Project E'),
(6, 3, 'Project F is now deprecated'),
(6, 5, 'Final report on Project F'),
(7, 2, 'New feature request for Project G'),
(7, 4, 'Implementing new feature in Project G'),
(8, 3, 'Initial meeting for Project H scheduled'),
(8, 6, 'Drafting requirements for Project H'),
(9, 2, 'Project I MVP demonstration scheduled'),
(9, 7, 'Preparing test cases for Project I MVP'),
(10, 3, 'Final review meeting for Project J tomorrow'),
(10, 8, 'Compiling review notes for Project J');

-- Seed data for GitHub Repos table
INSERT INTO github_repos (project_id, repo_url, description) VALUES
(1, 'https://github.com/org/project-a', 'Repository for Project A'),
(2, 'https://github.com/org/project-b', 'Repository for Project B'),
(3, 'https://github.com/org/project-c', 'Repository for Project C'),
(4, 'https://github.com/org/project-d', 'Repository for Project D'),
(5, 'https://github.com/org/project-e', 'Repository for Project E'),
(6, 'https://github.com/org/project-f', 'Repository for Project F'),
(7, 'https://github.com/org/project-g', 'Repository for Project G'),
(8, 'https://github.com/org/project-h', 'Repository for Project H'),
(9, 'https://github.com/org/project-i', 'Repository for Project I'),
(10, 'https://github.com/org/project-j', 'Repository for Project J');
