# Use Node.js 22.3.0 base image
FROM node:22.3.0

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-workspace.yaml to the working directory
COPY package.json pnpm-workspace.yaml turbo.json ./

# Copy the apps folder
COPY apps ./apps
copy packages ./packages

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm workspaces
RUN pnpm install

# Build the application using Turbo
RUN pnpm turbo run build

# Expose ports
EXPOSE 4000 5000

# Default command
CMD ["sh", "-c", "pnpm start:config-service & pnpm start:cache-service"]
