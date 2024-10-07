-- Drop the database if it exists
DROP DATABASE IF EXISTS pursuit_project_tracker;

-- Create the database
CREATE DATABASE pursuit_project_tracker;

-- Connect to the newly created database
\c pursuit_project_tracker;


-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'regular')) DEFAULT 'regular',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requester_id INTEGER REFERENCES users(id),
    product_manager_id INTEGER REFERENCES users(id),
    status VARCHAR(50) CHECK (status IN ('Gathering Requirements', 'In Development', 'MVP', 'Under Review', 'Maintenance', 'Deprecated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ProjectSupporters table
CREATE TABLE project_supporters (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Create ProjectContributors table
CREATE TABLE project_contributors (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

-- Create Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for foreign keys to improve query performance
CREATE INDEX idx_projects_requester ON projects(requester_id);
CREATE INDEX idx_projects_product_manager ON projects(product_manager_id);
CREATE INDEX idx_project_supporters_project ON project_supporters(project_id);
CREATE INDEX idx_project_supporters_user ON project_supporters(user_id);
CREATE INDEX idx_project_contributors_project ON project_contributors(project_id);
CREATE INDEX idx_project_contributors_user ON project_contributors(user_id);
CREATE INDEX idx_comments_project ON comments(project_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- Add triggers to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_project_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_project_contributor_modtime
    BEFORE UPDATE ON project_contributors
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_comment_modtime
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Create GitHub Repos table
CREATE TABLE github_repos (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    repo_url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for the foreign key in the GitHub Repos table
CREATE INDEX idx_github_repos_project ON github_repos(project_id);

-- Add trigger to automatically update the updated_at column for GitHub Repos
CREATE TRIGGER update_github_repo_modtime
    BEFORE UPDATE ON github_repos
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

