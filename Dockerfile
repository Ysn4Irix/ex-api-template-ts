FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install --location=global pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm prune --prod
EXPOSE 5000
CMD ["pnpm", "start"]