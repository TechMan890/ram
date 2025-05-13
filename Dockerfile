# ---------- Builder stage ----------
FROM node:16-alpine AS builder

WORKDIR /usr/src/app

# Copy only package files first for better cache efficiency
COPY package*.json ./

# Install dependencies (all, including dev)
RUN npm ci

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build


# ---------- Production stage ----------
FROM node:16-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy only necessary files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built output from builder
COPY --from=builder /usr/src/app/dist ./dist

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
