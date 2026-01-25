FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/benkyo-ui/browser/ /usr/share/nginx/html/
