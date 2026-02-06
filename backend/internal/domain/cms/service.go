package cms

import "context"

// Service contains business logic for CMS (contact, blog, etc.).
type Service struct {
	repo Repository
}

// NewService constructs a new CMS service.
func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// CreateContactMessage persists a new contact form submission.
func (s *Service) CreateContactMessage(ctx context.Context, in CreateContactMessageInput) (*ContactMessage, error) {
	// Basic normalization / defaults
	if in.InquiryType == "" {
		in.InquiryType = "general"
	}

	msg := &ContactMessage{
		Name:        in.Name,
		Email:       in.Email,
		Phone:       in.Phone,
		Company:     in.Company,
		Subject:     in.Subject,
		Message:     in.Message,
		InquiryType: in.InquiryType,
		// Metadata can be extended later (e.g., locale, user agent, etc.)
		Metadata: "",
	}

	if err := s.repo.CreateContactMessage(ctx, msg); err != nil {
		return nil, err
	}
	return msg, nil
}

// ListBlogPosts returns a paginated list of blog posts.
func (s *Service) ListBlogPosts(ctx context.Context, limit, offset int) ([]*BlogPost, error) {
	return s.repo.ListBlogPosts(ctx, limit, offset)
}

// GetBlogPostByID returns a single blog post.
func (s *Service) GetBlogPostByID(ctx context.Context, id string) (*BlogPost, error) {
	return s.repo.GetBlogPostByID(ctx, id)
}

// ListFAQs returns all FAQs.
func (s *Service) ListFAQs(ctx context.Context) ([]*FAQ, error) {
	return s.repo.ListFAQs(ctx)
}

// ListJobs returns all jobs (careers).
func (s *Service) ListJobs(ctx context.Context) ([]*Job, error) {
	return s.repo.ListJobs(ctx)
}

// ListPressReleases returns all press releases.
func (s *Service) ListPressReleases(ctx context.Context) ([]*PressRelease, error) {
	return s.repo.ListPressReleases(ctx)
}



