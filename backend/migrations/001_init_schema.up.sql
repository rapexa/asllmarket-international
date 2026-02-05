-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role ENUM('buyer', 'supplier', 'market_visitor', 'admin') NOT NULL DEFAULT 'buyer',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    logo TEXT,
    description TEXT,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    status ENUM('active', 'inactive', 'suspended', 'pending') NOT NULL DEFAULT 'pending',
    subscription ENUM('free', 'silver', 'gold', 'diamond') NOT NULL DEFAULT 'free',
    rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    total_products INT NOT NULL DEFAULT 0,
    total_orders INT NOT NULL DEFAULT 0,
    total_revenue DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    response_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    response_time INT NOT NULL DEFAULT 0,
    established INT,
    employees VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_verified (verified),
    INDEX idx_subscription (subscription)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_fa VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_fa TEXT,
    description_ar TEXT,
    icon VARCHAR(50),
    image TEXT,
    gradient VARCHAR(255),
    accent VARCHAR(50),
    product_count INT NOT NULL DEFAULT 0,
    supplier_count INT NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    trending BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_featured (featured),
    INDEX idx_trending (trending)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(36) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_fa VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    product_count INT NOT NULL DEFAULT 0,
    trending BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category_id (category_id),
    INDEX idx_trending (trending)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36),
    subcategory_id VARCHAR(36),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    specifications TEXT,
    images TEXT,
    price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    moq INT NOT NULL DEFAULT 1,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50) NOT NULL DEFAULT 'piece',
    lead_time INT NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    status ENUM('active', 'inactive', 'draft', 'out_of_stock') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_category_id (category_id),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_price (price),
    INDEX idx_rating (rating),
    FULLTEXT idx_name_description (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    buyer_id VARCHAR(36) NOT NULL,
    supplier_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(100),
    shipping_address TEXT NOT NULL,
    shipping_method VARCHAR(100),
    tracking_number VARCHAR(100),
    estimated_delivery TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_buyer_id (buyer_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- RFQs (Request for Quotation) table
CREATE TABLE IF NOT EXISTS rfqs (
    id VARCHAR(36) PRIMARY KEY,
    buyer_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36),
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    supplier_id VARCHAR(36),
    quantity INT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    specifications TEXT,
    requirements TEXT,
    delivery_location VARCHAR(255),
    preferred_delivery_date TIMESTAMP NULL,
    budget DECIMAL(15,2),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    status ENUM('draft', 'submitted', 'active', 'closed', 'cancelled') NOT NULL DEFAULT 'draft',
    submitted_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL,
    INDEX idx_buyer_id (buyer_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- RFQ Responses table
CREATE TABLE IF NOT EXISTS rfq_responses (
    id VARCHAR(36) PRIMARY KEY,
    rfq_id VARCHAR(36) NOT NULL,
    supplier_id VARCHAR(36) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    moq INT NOT NULL,
    estimated_delivery INT NOT NULL,
    payment_terms TEXT,
    specifications TEXT,
    message TEXT,
    status ENUM('pending', 'accepted', 'rejected', 'countered') NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rfq_id) REFERENCES rfqs(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    INDEX idx_rfq_id (rfq_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type ENUM('system', 'business', 'interaction', 'promotional') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    action_url TEXT,
    action_label VARCHAR(100),
    `read` BOOLEAN NOT NULL DEFAULT FALSE,
    metadata TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_read (user_id, `read`),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verifications table (KYC/KYB)
CREATE TABLE IF NOT EXISTS verifications (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36) NOT NULL,
    status ENUM('unverified', 'pending', 'verified', 'rejected', 'needs_update') NOT NULL DEFAULT 'unverified',
    -- Personal Identity
    full_name VARCHAR(255),
    nationality VARCHAR(100),
    id_type ENUM('passport', 'national_id'),
    id_number VARCHAR(100),
    identity_front_url TEXT,
    identity_back_url TEXT,
    -- Business Info
    legal_name VARCHAR(255),
    registration_number VARCHAR(100),
    country_of_registration VARCHAR(100),
    company_address TEXT,
    business_type VARCHAR(100),
    business_license_url TEXT,
    certificate_url TEXT,
    -- Contact Verification
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    phone_verified_at TIMESTAMP NULL,
    -- Admin Review
    submitted_at TIMESTAMP NULL,
    reviewed_at TIMESTAMP NULL,
    reviewed_by VARCHAR(36),
    rejection_reason TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subscriptions table (for tracking supplier subscription changes)
CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(36) PRIMARY KEY,
    supplier_id VARCHAR(36) NOT NULL,
    plan ENUM('free', 'silver', 'gold', 'diamond') NOT NULL DEFAULT 'free',
    status ENUM('active', 'cancelled', 'expired', 'trial') NOT NULL DEFAULT 'active',
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_method VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_status (status),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages table (for supplier-buyer communication)
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(36) PRIMARY KEY,
    conversation_id VARCHAR(36) NOT NULL,
    sender_id VARCHAR(36) NOT NULL,
    receiver_id VARCHAR(36) NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    attachments TEXT,
    `read` BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews table (for product/supplier reviews)
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36),
    supplier_id VARCHAR(36),
    reviewer_id VARCHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
    helpful_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_reviewer_id (reviewer_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Favorites table (for buyer's favorite products)
CREATE TABLE IF NOT EXISTS favorites (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Search history table
CREATE TABLE IF NOT EXISTS search_history (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    query TEXT NOT NULL,
    search_type ENUM('text', 'image', 'video') NOT NULL DEFAULT 'text',
    filters TEXT,
    result_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
