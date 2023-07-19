FROM node as build
WORKDIR /app

COPY ./front/*.json ./
RUN npm install

COPY ./front ./
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]