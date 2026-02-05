package config

import (
	"fmt"
	"strings"
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

	JWTSecret            string
	JWTIssuer            string
	JWTAccessTokenTTL    time.Duration
	JWTRefreshTokenTTL   time.Duration
	CORSAllowedOrigins   []string
	CORSAllowedMethods   []string
	CORSAllowedHeaders   []string
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

	// Set config file (backend/config.{yaml,json,toml,...})
	v.SetConfigName("config")
	v.SetConfigType("yaml")
	v.AddConfigPath(".")
	v.AddConfigPath("./backend")

	// Read config file first (before environment variables)
	if err := v.ReadInConfig(); err != nil {
		// Log warning but continue with defaults/env
		fmt.Printf("Warning: Could not read config file: %v\n", err)
	} else {
		fmt.Printf("Using config file: %s\n", v.ConfigFileUsed())
	}

	// Set up environment variable bindings with nested key support
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	v.BindEnv("app.env", "APP_ENV")
	v.BindEnv("http.host", "HTTP_HOST")
	v.BindEnv("http.port", "HTTP_PORT")
	v.BindEnv("db.host", "MYSQL_HOST")
	v.BindEnv("db.port", "MYSQL_PORT")
	v.BindEnv("db.user", "MYSQL_USER")
	v.BindEnv("db.pass", "MYSQL_PASSWORD")
	v.BindEnv("db.name", "MYSQL_DB")
	v.BindEnv("jwt.secret", "JWT_SECRET")
	v.BindEnv("jwt.issuer", "JWT_ISSUER")

	// Environment variables (will override config file)
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
		// Support both nested YAML (app.env) and flat env vars (APP_ENV)
		AppEnv: getString(v, "app.env", "APP_ENV"),

		HTTPHost: getString(v, "http.host", "HTTP_HOST"),
		HTTPPort: getInt(v, "http.port", "HTTP_PORT"),

		MySQLHost:     getString(v, "db.host", "MYSQL_HOST"),
		MySQLPort:     getInt(v, "db.port", "MYSQL_PORT"),
		MySQLUser:     getString(v, "db.user", "MYSQL_USER"),
		MySQLPassword: getString(v, "db.pass", "MYSQL_PASSWORD"),
		MySQLDB:       getString(v, "db.name", "MYSQL_DB"),
		MySQLParams:   getString(v, "db.params", "MYSQL_PARAMS"),

		JWTSecret:          getString(v, "jwt.secret", "JWT_SECRET"),
		JWTIssuer:          getString(v, "jwt.issuer", "JWT_ISSUER"),
		JWTAccessTokenTTL:  accessTTL,
		JWTRefreshTokenTTL: refreshTTL,

		CORSAllowedOrigins:   getStringSlice(v, "cors.allowed_origins", "CORS_ALLOWED_ORIGINS"),
		CORSAllowedMethods:   getStringSlice(v, "cors.allowed_methods", "CORS_ALLOWED_METHODS"),
		CORSAllowedHeaders:   getStringSlice(v, "cors.allowed_headers", "CORS_ALLOWED_HEADERS"),
		CORSAllowCredentials: getBool(v, "cors.allow_credentials", "CORS_ALLOW_CREDENTIALS"),
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

// Helper functions to support both nested YAML keys and flat env vars
func getString(v *viper.Viper, nestedKey, envKey string) string {
	// Try nested key first (from YAML)
	if v.IsSet(nestedKey) {
		return v.GetString(nestedKey)
	}
	// Fall back to flat env var
	return v.GetString(envKey)
}

func getInt(v *viper.Viper, nestedKey, envKey string) int {
	// Try nested key first (from YAML)
	if v.IsSet(nestedKey) {
		return v.GetInt(nestedKey)
	}
	// Fall back to flat env var
	return v.GetInt(envKey)
}

func getBool(v *viper.Viper, nestedKey, envKey string) bool {
	// Try nested key first (from YAML)
	if v.IsSet(nestedKey) {
		return v.GetBool(nestedKey)
	}
	// Fall back to flat env var
	return v.GetBool(envKey)
}

func getStringSlice(v *viper.Viper, nestedKey, envKey string) []string {
	// Try nested key first (from YAML)
	if v.IsSet(nestedKey) {
		return v.GetStringSlice(nestedKey)
	}
	// Fall back to flat env var
	return v.GetStringSlice(envKey)
}
