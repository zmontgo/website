# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application's dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

ENV NODE_ENV=production
RUN yarn prisma generate

# Build the Next.js application
RUN yarn next build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["yarn", "next", "start"]
