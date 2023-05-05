# Use the official Node.js LTS image as the base image
FROM node:lts

# Set environment variables
ENV NODE_ENV=production
ENV PNPM_VERSION=7.30.3
ENV ETH_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/KN9ZQRRwuXkdSoEYwvON7BbqZ08oxjwB
ENV REDIS_HOST=192.168.1.123
ENV REDIS_DISABLED=true

# Install global dependencies
RUN npm install -g pnpm@${PNPM_VERSION}

# Create the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install the application dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy the application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
