# Deployment Guide

This guide covers deploying the Global Trade Hub platform to production.

## Architecture Overview

```
                    ┌─────────────┐
                    │   Clients   │
                    │  (Browsers) │
                    └──────┬──────┘
                           │
                           │ HTTPS
                           │
                    ┌──────▼──────┐
                    │   CDN/Nginx │
                    │  (Frontend) │
                    └──────┬──────┘
                           │
                           │ HTTPS/API
                           │
                    ┌──────▼──────┐
                    │   Go API    │
                    │  (Backend)  │
                    └──────┬──────┘
                           │
                           │ MySQL Protocol
                           │
                    ┌──────▼──────┐
                    │    MySQL    │
                    │  (Database) │
                    └─────────────┘
```

## Backend Deployment

### Option 1: Docker Deployment (Recommended)

1. **Create Production Dockerfile**:

```dockerfile
# backend/Dockerfile
FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o api cmd/api/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/api .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080
CMD ["./api"]
```

2. **Update docker-compose.yml for production**:

```yaml
version: '3.8'

services:
  api:
    build: .
    container_name: gth-api
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - APP_ENV=production
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET}
      - JWT_ISSUER=global-trade-hub
    depends_on:
      - mysql
    networks:
      - gth-network

  mysql:
    image: mysql:8.0
    container_name: gth-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASS}
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - gth-network
    command: --default-authentication-plugin=mysql_native_password

  nginx:
    image: nginx:alpine
    container_name: gth-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ../dist:/usr/share/nginx/html:ro
    depends_on:
      - api
    networks:
      - gth-network

volumes:
  mysql_data:

networks:
  gth-network:
    driver: bridge
```

3. **Deploy**:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Run migrations
docker-compose exec api sh -c "mysql -h mysql -u $DB_USER -p$DB_PASS $DB_NAME < migrations/001_init_schema.up.sql"
```

### Option 2: Direct Deployment

1. **Build the binary**:
```bash
cd backend
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o api cmd/api/main.go
```

2. **Transfer to server**:
```bash
scp api user@server:/opt/global-trade-hub/
scp -r migrations user@server:/opt/global-trade-hub/
```

3. **Create systemd service** (`/etc/systemd/system/gth-api.service`):
```ini
[Unit]
Description=Global Trade Hub API
After=network.target mysql.service

[Service]
Type=simple
User=gth
WorkingDirectory=/opt/global-trade-hub
ExecStart=/opt/global-trade-hub/api
Restart=on-failure
RestartSec=5

Environment="APP_ENV=production"
Environment="HTTP_HOST=0.0.0.0"
Environment="HTTP_PORT=8080"
Environment="DB_HOST=localhost"
Environment="DB_PORT=3306"
Environment="DB_USER=gth_user"
Environment="DB_PASS=secure_password"
Environment="DB_NAME=global_trade_hub"
Environment="JWT_SECRET=your-very-secure-secret-key"
Environment="JWT_ISSUER=global-trade-hub"

[Install]
WantedBy=multi-user.target
```

4. **Start service**:
```bash
sudo systemctl daemon-reload
sudo systemctl enable gth-api
sudo systemctl start gth-api
sudo systemctl status gth-api
```

### Database Setup (Production)

1. **Install MySQL 8.0**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server-8.0

# Configure MySQL
sudo mysql_secure_installation
```

2. **Create database and user**:
```sql
CREATE DATABASE global_trade_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'gth_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON global_trade_hub.* TO 'gth_user'@'localhost';
FLUSH PRIVILEGES;
```

3. **Run migrations**:
```bash
mysql -u gth_user -p global_trade_hub < migrations/001_init_schema.up.sql
mysql -u gth_user -p global_trade_hub < migrations/002_seed_data.up.sql  # Optional: only for dev/staging
```

4. **Configure backups**:
```bash
# Create backup script
cat > /opt/backups/gth-backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u gth_user -p'secure_password' global_trade_hub > /opt/backups/gth_$DATE.sql
# Keep only last 7 days
find /opt/backups -name "gth_*.sql" -mtime +7 -delete
EOF

chmod +x /opt/backups/gth-backup.sh

# Add to crontab (daily at 2 AM)
echo "0 2 * * * /opt/backups/gth-backup.sh" | crontab -
```

## Frontend Deployment

### Option 1: Static Hosting (Recommended)

1. **Build for production**:
```bash
npm run build
# Output will be in dist/
```

2. **Deploy to Vercel**:
```bash
npm install -g vercel
vercel --prod
```

3. **Deploy to Netlify**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

4. **Deploy to AWS S3 + CloudFront**:
```bash
# Install AWS CLI
# Configure credentials
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 2: Nginx Static Hosting

1. **Build frontend**:
```bash
npm run build
```

2. **Copy to server**:
```bash
scp -r dist/* user@server:/var/www/globaltradehub/
```

3. **Configure Nginx** (`/etc/nginx/sites-available/globaltradehub`):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name globaltradehub.com www.globaltradehub.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name globaltradehub.com www.globaltradehub.com;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/globaltradehub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/globaltradehub.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/globaltradehub;
    index index.html;

    # Frontend SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

4. **Enable site and reload Nginx**:
```bash
sudo ln -s /etc/nginx/sites-available/globaltradehub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Environment Variables

### Backend Production Environment

```bash
APP_ENV=production
HTTP_HOST=0.0.0.0
HTTP_PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=gth_user
DB_PASS=SECURE_PASSWORD_HERE
DB_NAME=global_trade_hub

JWT_SECRET=VERY_SECURE_RANDOM_STRING_AT_LEAST_32_CHARS
JWT_ISSUER=global-trade-hub

CORS_ALLOWED_ORIGINS=https://globaltradehub.com,https://www.globaltradehub.com
CORS_ALLOWED_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_ALLOW_CREDENTIALS=true
```

### Frontend Production Environment

```bash
VITE_API_URL=https://globaltradehub.com/api/v1
```

## SSL/TLS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d globaltradehub.com -d www.globaltradehub.com

# Auto-renewal is configured by default
# Test renewal
sudo certbot renew --dry-run
```

## Monitoring & Logging

### Application Logs

Backend logs are output to stdout. Capture with systemd or Docker:

```bash
# Systemd logs
sudo journalctl -u gth-api -f

# Docker logs
docker-compose logs -f api
```

### Health Checks

Monitor the health endpoint:
```bash
curl http://localhost:8080/healthz
```

Expected response:
```json
{"status": "ok"}
```

### Monitoring Tools (Optional)

1. **Prometheus + Grafana**: For metrics
2. **ELK Stack**: For log aggregation
3. **Uptime monitoring**: UptimeRobot, Pingdom, etc.

## Performance Optimization

### Backend
- Enable Go runtime optimization: `GOGC=100`
- Use connection pooling for MySQL
- Implement caching (Redis) for frequently accessed data
- Add rate limiting middleware
- Enable gzip compression in Gin

### Frontend
- Enable CDN for static assets
- Implement lazy loading for images
- Use code splitting (already done with Vite)
- Enable browser caching
- Compress images (WebP format)

### Database
- Add indexes for frequently queried columns
- Use query caching
- Optimize slow queries
- Regular VACUUM and ANALYZE
- Set up read replicas for scaling

## Scaling Considerations

### Horizontal Scaling
- Deploy multiple API instances behind a load balancer
- Use session-less JWT authentication (already implemented)
- Store uploaded files in S3/object storage (not local disk)

### Database Scaling
- Use MySQL master-slave replication
- Implement read replicas
- Consider sharding for very large datasets
- Use connection pooling

### Caching Layer
Add Redis for:
- Session storage (if needed)
- API response caching
- Rate limiting
- Real-time features (WebSocket state)

## Security Checklist

- [ ] Strong JWT secret (32+ characters, random)
- [ ] HTTPS/TLS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention (using prepared statements ✓)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Secure password hashing (bcrypt ✓)
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] Error messages don't leak sensitive info
- [ ] File upload validation
- [ ] API versioning (/api/v1 ✓)

## Backup Strategy

### Database Backups
- **Daily**: Full database dump
- **Hourly**: Binary logs for point-in-time recovery
- **Retention**: 30 days
- **Off-site**: Store backups in S3 or similar

### Application Backups
- Version control (Git) for code
- Configuration files in secure vault
- Document all environment variables

## Rollback Plan

1. **Database rollback**:
```bash
# Restore from backup
mysql -u gth_user -p global_trade_hub < backup_YYYYMMDD.sql
```

2. **Application rollback**:
```bash
# Docker
docker-compose down
docker-compose pull api:previous-tag
docker-compose up -d

# Systemd
sudo systemctl stop gth-api
# Replace binary with previous version
sudo systemctl start gth-api
```

## Maintenance

### Database Maintenance
```sql
-- Optimize tables weekly
OPTIMIZE TABLE products, suppliers, orders;

-- Update statistics
ANALYZE TABLE products, suppliers, orders;
```

### Log Rotation
Configure logrotate for application logs:

```
/var/log/gth-api/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 gth gth
    sharedscripts
    postrotate
        systemctl reload gth-api > /dev/null 2>&1 || true
    endscript
}
```

## Support Contacts

- **Technical Issues**: tech@globaltradehub.com
- **Security Issues**: security@globaltradehub.com
- **General Support**: support@globaltradehub.com

---

Last updated: February 2026
