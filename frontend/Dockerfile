# Use Node.js as the base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source files
COPY . ./

# Build the React app
RUN npm run build

# Use a lightweight HTTP server (e.g., serve) to serve the static files
FROM node:18

# Set working directory
WORKDIR /app

# Copy built app from the previous stage
COPY --from=build /app/build /app/build

# Install serve
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the HTTP server
CMD ["serve", "-s", "build", "-l", "3000"]
