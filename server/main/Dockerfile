FROM node:16

WORKDIR /app

COPY /*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY ./ ./

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start:prod"]