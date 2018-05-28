FROM nginx:mainline-alpine

RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
ADD nginx.conf /etc/nginx/nginx.conf
ADD site.conf /etc/nginx/sites-enabled/
EXPOSE 80
