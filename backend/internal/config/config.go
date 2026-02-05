package config

import (
	"fmt"
	"time"

	"github.com/spf13/viper"
)

// Config holds all runtime configuration for the API.
// It is intentionally flat to keep Viper bindings simple.
type Config struct {
	AppEnv string

	HTTPHost string
	HTTPPort int

	MySQLHost     string
	MySQLPort     int
	MySQLUser     string
	MySQLPassword string
	MySQLDB       string
	MySQLParams   string // optional, e.g. "parseTime=true&loc=Local"

	JWTSecret           string
	JWTIssuer           string
	JWTAccessTokenTTL   time.Duration
	JWTRefreshTokenTTL  time.Duration
	CORSAllowedOrigins  []string
	CORSAllowedMethods  []string
	CORSAllowedHeaders  []string
	CORSAllowCredentials bool
}

// Load reads configuration from environment variables and optional config file.
// Priority: ENV > config.[yaml|json|...] > defaults.
func Load() (*Config, error) {
	v := viper.New()

	// Defaults
	v.SetDefault("APP_ENV", "development")
	v.SetDefault("HTTP_HOST", "0.0.0.0")
	v.SetDefault("HTTP_PORT", 8081)

	v.SetDefault("MYSQL_HOST", "127.0.0.1")
	v.SetDefault("MYSQL_PORT", 3306)
	v.SetDefault("MYSQL_USER", "root")
	v.SetDefault("MYSQL_PASSWORD", "password")
	v.SetDefault("MYSQL_DB", "global_trade_hub")
	v.SetDefault("MYSQL_PARAMS", "parseTime=true&loc=Local&charset=utf8mb4,utf8")

	v.SetDefault("JWT_SECRET", "change-me-in-production")
	v.SetDefault("JWT_ISSUER", "global-trade-hub")
	v.SetDefault("JWT_ACCESS_TOKEN_TTL", "15m")
	v.SetDefault("JWT_REFRESH_TOKEN_TTL", "720h") // 30 days

	v.SetDefault("CORS_ALLOWED_ORIGINS", []string{"http://localhost:8080", "http://localhost:5173"})
	v.SetDefault("CORS_ALLOWED_METHODS", []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"})
	v.SetDefault("CORS_ALLOWED_HEADERS", []string{"Authorization", "Content-Type", "X-Requested-With"})
	v.SetDefault("CORS_ALLOW_CREDENTIALS", true)

	// Optional config file (backend/config.{yaml,json,toml,...})
	v.SetConfigName("config")
	v.AddConfigPath(".")
	v.AddConfigPath("./backend")
	_ = v.ReadInConfig() // ignore error; config file is optional

	// Environment variables
	v.AutomaticEnv()

	accessTTL, err := time.ParseDuration(v.GetString("JWT_ACCESS_TOKEN_TTL"))
	if err != nil {
		accessTTL = 15 * time.Minute
	}
	refreshTTL, err := time.ParseDuration(v.GetString("JWT_REFRESH_TOKEN_TTL"))
	if err != nil {
		refreshTTL = 30 * 24 * time.Hour
	}

	cfg := &Config{
		AppEnv: v.GetString("APP_ENV"),

		HTTPHost: v.GetString("HTTP_HOST"),
		HTTPPort: v.GetInt("HTTP_PORT"),

		MySQLHost:     v.GetString("MYSQL_HOST"),
		MySQLPort:     v.GetInt("MYSQL_PORT"),
		MySQLUser:     v.GetString("MYSQL_USER"),
		MySQLPassword: v.GetString("MYSQL_PASSWORD"),
		MySQLDB:       v.GetString("MYSQL_DB"),
		MySQLParams:   v.GetString("MYSQL_PARAMS"),

		JWTSecret:          v.GetString("JWT_SECRET"),
		JWTIssuer:          v.GetString("JWT_ISSUER"),
		JWTAccessTokenTTL:  accessTTL,
		JWTRefreshTokenTTL: refreshTTL,

		CORSAllowedOrigins:   v.GetStringSlice("CORS_ALLOWED_ORIGINS"),
		CORSAllowedMethods:   v.GetStringSlice("CORS_ALLOWED_METHODS"),
		CORSAllowedHeaders:   v.GetStringSlice("CORS_ALLOWED_HEADERS"),
		CORSAllowCredentials: v.GetBool("CORS_ALLOW_CREDENTIALS"),
	}

	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}

	return cfg, nil
}

// HTTPAddress returns host:port for net/http server.
func (c *Config) HTTPAddress() string {
	return fmt.Sprintf("%s:%d", c.HTTPHost, c.HTTPPort)
}

