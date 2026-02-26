-- +goose Up
-- Supplier Capabilities Table
CREATE TABLE IF NOT EXISTS supplier_capabilities (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36) NOT NULL,
    capability_type VARCHAR(100) NOT NULL COMMENT 'e.g., OEM/ODM, Trade Assurance, Custom Design',
    capability_value TEXT COMMENT 'value or description',
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_supplier_id (supplier_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Supplier Certificates Table
CREATE TABLE IF NOT EXISTS supplier_certificates (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36) NOT NULL,
    certificate_name VARCHAR(255) NOT NULL COMMENT 'e.g., ISO 9001, CE, FDA',
    certificate_number VARCHAR(255),
    issued_by VARCHAR(255),
    issued_date DATE,
    expiry_date DATE,
    document_url TEXT COMMENT 'PDF or image URL',
    verified BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_supplier_id (supplier_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- +goose Down
DROP TABLE IF EXISTS supplier_certificates;
DROP TABLE IF EXISTS supplier_capabilities;
