# Use uma imagem Node.js como base
FROM node:16

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "vite", "preview", "--port", "3000"]
