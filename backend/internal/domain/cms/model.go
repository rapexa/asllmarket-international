package cms

import "time"

// ContactMessage represents a public contact form submission.
type ContactMessage struct {
	ID          string    `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Email       string    `db:"email" json:"email"`
	Phone       string    `db:"phone" json:"phone"`
	Company     string    `db:"company" json:"company"`
	Subject     string    `db:"subject" json:"subject"`
	Message     string    `db:"message" json:"message"`
	InquiryType string    `db:"inquiry_type" json:"inquiryType"`
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	Metadata    string    `db:"metadata" json:"metadata"`
}

// TableName overrides GORM's default table name for ContactMessage.
func (ContactMessage) TableName() string { return "cms_contact_messages" }

// CreateContactMessageInput is the payload for creating a contact message.
type CreateContactMessageInput struct {
	Name        string `json:"name" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Phone       string `json:"phone"`
	Company     string `json:"company"`
	Subject     string `json:"subject" binding:"required"`
	Message     string `json:"message" binding:"required"`
	InquiryType string `json:"inquiryType" binding:"required,oneof=general sales support partnership careers other"`
}

// BlogPost represents a CMS blog article.
type BlogPost struct {
	ID          string    `db:"id" json:"id"`
	Slug        string    `db:"slug" json:"slug"`
	Title       string    `db:"title" json:"title"`
	Excerpt     string    `db:"excerpt" json:"excerpt"`
	Content     string    `db:"content" json:"content"`
	ImageURL    string    `db:"image_url" json:"imageUrl"`
	Category    string    `db:"category" json:"category"`
	Tags        string    `db:"tags" json:"tags"` // JSON array of strings
	AuthorName  string    `db:"author_name" json:"authorName"`
	AuthorAvatar string   `db:"author_avatar" json:"authorAvatar"`
	AuthorRole  string    `db:"author_role" json:"authorRole"`
	PublishedAt *time.Time `db:"published_at" json:"publishedAt,omitempty"`
	ReadTime    int       `db:"read_time" json:"readTime"`
	Views       int       `db:"views" json:"views"`
	Likes       int       `db:"likes" json:"likes"`
	Featured    bool      `db:"featured" json:"featured"`
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time `db:"updated_at" json:"updatedAt"`
}

// TableName overrides GORM's default table name for BlogPost.
func (BlogPost) TableName() string { return "cms_blog_posts" }

// FAQ represents a frequently asked question (multilingual).
type FAQ struct {
	ID         string    `db:"id" json:"id"`
	QuestionEn string    `db:"question_en" json:"questionEn"`
	QuestionFa string    `db:"question_fa" json:"questionFa"`
	QuestionAr string    `db:"question_ar" json:"questionAr"`
	AnswerEn   string    `db:"answer_en" json:"answerEn"`
	AnswerFa   string    `db:"answer_fa" json:"answerFa"`
	AnswerAr   string    `db:"answer_ar" json:"answerAr"`
	Category   string    `db:"category" json:"category"`
	Popular    bool      `db:"popular" json:"popular"`
	CreatedAt  time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt  time.Time `db:"updated_at" json:"updatedAt"`
}

// TableName overrides GORM's default table name for FAQ.
func (FAQ) TableName() string { return "cms_faqs" }

// Job represents a career opportunity.
type Job struct {
	ID          string    `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Department  string    `db:"department" json:"department"`
	Location    string    `db:"location" json:"location"`
	JobType     string    `db:"job_type" json:"jobType"`
	Experience  string    `db:"experience" json:"experience"`
	Salary      string    `db:"salary" json:"salary"`
	PostedAt    *time.Time `db:"posted_at" json:"postedAt,omitempty"`
	Description string    `db:"description" json:"description"`
	Requirements string   `db:"requirements" json:"requirements"` // JSON array of strings
	Benefits    string    `db:"benefits" json:"benefits"`         // JSON array of strings
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time `db:"updated_at" json:"updatedAt"`
}

// TableName overrides GORM's default table name for Job.
func (Job) TableName() string { return "cms_jobs" }

// PressRelease represents a press/news item.
type PressRelease struct {
	ID          string    `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Excerpt     string    `db:"excerpt" json:"excerpt"`
	Content     string    `db:"content" json:"content"`
	Category    string    `db:"category" json:"category"`
	PublishedAt *time.Time `db:"published_at" json:"publishedAt,omitempty"`
	Featured    bool      `db:"featured" json:"featured"`
	Attachments string    `db:"attachments" json:"attachments"` // JSON array of attachments
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time `db:"updated_at" json:"updatedAt"`
}

// TableName overrides GORM's default table name for PressRelease.
func (PressRelease) TableName() string { return "cms_press_releases" }



