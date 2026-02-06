-- CMS Jobs (Careers) table
CREATE TABLE IF NOT EXISTS cms_jobs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type ENUM('full-time', 'part-time', 'contract', 'remote') NOT NULL,
    experience VARCHAR(100) NOT NULL,
    salary VARCHAR(100),
    posted_at TIMESTAMP NULL,
    description TEXT NOT NULL,
    requirements JSON NULL,
    benefits JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department),
    INDEX idx_location (location),
    INDEX idx_job_type (job_type),
    INDEX idx_posted_at (posted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

