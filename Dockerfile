# Use an official Bun image as a base
FROM oven/bun:latest

# Set working directory to /app
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Copy package.json
COPY package.json ./

# Install dependencies using Bun
RUN bun install
RUN bun run nuxt build

# Expose port 3000 (default Nuxt port)
EXPOSE 3001

# Run command to start Nuxt with Bun
CMD ["bun", "run", "nuxt", "start"]