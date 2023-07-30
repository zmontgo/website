# Use a multi-stage build process. This will allow us to install dependencies and build our application in one stage, and then copy over the built application into a new image.

# Stage 1: Base
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV production

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Builder
FROM base AS builder
COPY . .
RUN yarn next build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app
EXPOSE 3000

# Copy over the built application from the builder stage.
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

CMD [ "yarn", "start" ]
