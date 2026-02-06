-- CMS Blog Posts table
CREATE TABLE IF NOT EXISTS cms_blog_posts (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    tags JSON NULL,
    author_name VARCHAR(255),
    author_avatar TEXT,
    author_role VARCHAR(255),
    published_at TIMESTAMP NULL,
    read_time INT NOT NULL DEFAULT 0,
    views INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published_at (published_at),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

