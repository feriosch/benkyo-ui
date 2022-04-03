FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/benkyo-ui/ /usr/share/nginx/html/
