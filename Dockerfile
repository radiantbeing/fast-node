FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

ENTRYPOINT ["node", "./dist/main.js"]
