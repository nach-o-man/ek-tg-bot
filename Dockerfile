FROM denoland/deno:alpine-1.39.0

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

WORKDIR /app
COPY ./src /app/src
COPY ./deno.* /app

RUN deno cache src/main.ts

ENTRYPOINT deno task start