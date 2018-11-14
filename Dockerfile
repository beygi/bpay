FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx/webApp /etc/nginx/conf.d/default.conf
