# -------------------------
# 1. Build Astro UI
# -------------------------
FROM node:25-slim AS ui-builder

WORKDIR /ui

# Enable pnpm
RUN corepack enable

# Install deps
COPY ui/package.json ui/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build UI
COPY ui .
RUN pnpm build


# -------------------------
# 2. Build Go / PocketBase
# -------------------------
FROM golang:1.25-alpine AS go-builder

WORKDIR /go

# Install build deps
RUN apk add --no-cache git

# Download deps
COPY go/go.mod go/go.sum ./
RUN go mod download

# Build binary
COPY go .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app


# -------------------------
# 3. Final runtime image
# -------------------------
FROM alpine:3.23

WORKDIR /app

# Add CA certs for HTTPS, etc.
RUN apk add --no-cache ca-certificates

# Copy Go binary
COPY --from=go-builder /go/app /app/app

# Copy Astro output into PocketBase public dir
COPY --from=ui-builder /ui/dist /app/pb_public

# PocketBase default port
EXPOSE 8090

# Optional: data dir if you persist PB data
VOLUME ["/app/pb_data"]

# Run the app
CMD ["/app/app", "serve", "--http=0.0.0.0:8090"]
