package cms

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("cms resource not found")
)

// Repository defines persistence for CMS entities (currently contact messages, blog posts, FAQs, jobs, press).
type Repository interface {
	CreateContactMessage(ctx context.Context, msg *ContactMessage) error
	ListBlogPosts(ctx context.Context, limit, offset int) ([]*BlogPost, error)
	GetBlogPostByID(ctx context.Context, id string) (*BlogPost, error)
	ListFAQs(ctx context.Context) ([]*FAQ, error)
	ListJobs(ctx context.Context) ([]*Job, error)
	ListPressReleases(ctx context.Context) ([]*PressRelease, error)
}

type mySQLCMSRepository struct {
	db *sql.DB
}

// NewMySQLCMSRepository creates a new CMS repository backed by MySQL.
func NewMySQLCMSRepository(db *sql.DB) Repository {
	return &mySQLCMSRepository{db: db}
}

func (r *mySQLCMSRepository) CreateContactMessage(ctx context.Context, msg *ContactMessage) error {
	if msg.ID == "" {
		msg.ID = uuid.NewString()
	}
	msg.CreatedAt = time.Now().UTC()

	const query = `
INSERT INTO cms_contact_messages (
  id, name, email, phone, company, subject, message, inquiry_type, created_at, metadata
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(
		ctx,
		query,
		msg.ID,
		msg.Name,
		msg.Email,
		msg.Phone,
		msg.Company,
		msg.Subject,
		msg.Message,
		msg.InquiryType,
		msg.CreatedAt,
		msg.Metadata,
	)
	return err
}

func (r *mySQLCMSRepository) ListBlogPosts(ctx context.Context, limit, offset int) ([]*BlogPost, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	const query = `
SELECT id, slug, title, excerpt, content, image_url, category, tags,
       author_name, author_avatar, author_role, published_at, read_time,
       views, likes, featured, created_at, updated_at
FROM cms_blog_posts
ORDER BY featured DESC, published_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*BlogPost
	for rows.Next() {
		var p BlogPost
		if err := rows.Scan(
			&p.ID,
			&p.Slug,
			&p.Title,
			&p.Excerpt,
			&p.Content,
			&p.ImageURL,
			&p.Category,
			&p.Tags,
			&p.AuthorName,
			&p.AuthorAvatar,
			&p.AuthorRole,
			&p.PublishedAt,
			&p.ReadTime,
			&p.Views,
			&p.Likes,
			&p.Featured,
			&p.CreatedAt,
			&p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		posts = append(posts, &p)
	}
	return posts, rows.Err()
}

func (r *mySQLCMSRepository) GetBlogPostByID(ctx context.Context, id string) (*BlogPost, error) {
	const query = `
SELECT id, slug, title, excerpt, content, image_url, category, tags,
       author_name, author_avatar, author_role, published_at, read_time,
       views, likes, featured, created_at, updated_at
FROM cms_blog_posts
WHERE id = ? LIMIT 1`

	var p BlogPost
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&p.ID,
		&p.Slug,
		&p.Title,
		&p.Excerpt,
		&p.Content,
		&p.ImageURL,
		&p.Category,
		&p.Tags,
		&p.AuthorName,
		&p.AuthorAvatar,
		&p.AuthorRole,
		&p.PublishedAt,
		&p.ReadTime,
		&p.Views,
		&p.Likes,
		&p.Featured,
		&p.CreatedAt,
		&p.UpdatedAt,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &p, nil
}

func (r *mySQLCMSRepository) ListFAQs(ctx context.Context) ([]*FAQ, error) {
	const query = `
SELECT id, question_en, question_fa, question_ar,
       answer_en, answer_fa, answer_ar,
       category, popular, created_at, updated_at
FROM cms_faqs
ORDER BY popular DESC, created_at DESC`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var faqs []*FAQ
	for rows.Next() {
		var f FAQ
		if err := rows.Scan(
			&f.ID,
			&f.QuestionEn,
			&f.QuestionFa,
			&f.QuestionAr,
			&f.AnswerEn,
			&f.AnswerFa,
			&f.AnswerAr,
			&f.Category,
			&f.Popular,
			&f.CreatedAt,
			&f.UpdatedAt,
		); err != nil {
			return nil, err
		}
		faqs = append(faqs, &f)
	}
	return faqs, rows.Err()
}

func (r *mySQLCMSRepository) ListJobs(ctx context.Context) ([]*Job, error) {
	const query = `
SELECT id, title, department, location, job_type, experience, salary,
       posted_at, description, requirements, benefits, created_at, updated_at
FROM cms_jobs
ORDER BY posted_at DESC, created_at DESC`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var jobs []*Job
	for rows.Next() {
		var j Job
		if err := rows.Scan(
			&j.ID,
			&j.Title,
			&j.Department,
			&j.Location,
			&j.JobType,
			&j.Experience,
			&j.Salary,
			&j.PostedAt,
			&j.Description,
			&j.Requirements,
			&j.Benefits,
			&j.CreatedAt,
			&j.UpdatedAt,
		); err != nil {
			return nil, err
		}
		jobs = append(jobs, &j)
	}
	return jobs, rows.Err()
}

func (r *mySQLCMSRepository) ListPressReleases(ctx context.Context) ([]*PressRelease, error) {
	const query = `
SELECT id, title, excerpt, content, category,
       published_at, featured, attachments, created_at, updated_at
FROM cms_press_releases
ORDER BY featured DESC, published_at DESC, created_at DESC`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var releases []*PressRelease
	for rows.Next() {
		var pr PressRelease
		if err := rows.Scan(
			&pr.ID,
			&pr.Title,
			&pr.Excerpt,
			&pr.Content,
			&pr.Category,
			&pr.PublishedAt,
			&pr.Featured,
			&pr.Attachments,
			&pr.CreatedAt,
			&pr.UpdatedAt,
		); err != nil {
			return nil, err
		}
		releases = append(releases, &pr)
	}
	return releases, rows.Err()
}
