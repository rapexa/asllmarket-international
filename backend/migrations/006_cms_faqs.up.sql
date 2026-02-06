-- CMS FAQs table (multilingual)
CREATE TABLE IF NOT EXISTS cms_faqs (
    id VARCHAR(36) PRIMARY KEY,
    question_en TEXT NOT NULL,
    question_fa TEXT,
    question_ar TEXT,
    answer_en TEXT NOT NULL,
    answer_fa TEXT,
    answer_ar TEXT,
    category VARCHAR(100) NOT NULL,
    popular BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_popular (popular)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

