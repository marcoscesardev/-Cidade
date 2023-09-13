# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto (incluindo package.json e yarn.lock) para o contêiner
COPY . .

# Instale as dependências usando o Yarn (ou npm, se preferir)
RUN yarn install

# Construa o projeto Vite para produção
RUN yarn build

# Exponha a porta em que o servidor Vite está rodando (geralmente 3000)
EXPOSE 3000

# Inicie o servidor Vite em modo de produção
CMD ["yarn", "vite", "preview", "--port", "3000"]
