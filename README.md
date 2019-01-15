# Web Client
This is a guide to dev,build and deploy webapp


##### master build status
[![pipeline status](https://gitlab.becopay.com/ui/web/badges/master/pipeline.svg)](https://gitlab.becopay.com/ui/web/commits/master)

##### development build status
[![pipeline status](https://gitlab.becopay.com/ui/web/badges/develop/pipeline.svg)](https://gitlab.becopay.com/ui/web/commits/develop)

## Installation
```bash
yarn install
```
## Development Build with node server
```bash
yarn start-dev
```

## Production Build
```bash
yarn build
```

## generate api codes from swagger files
```bash
yarn apiGen
```

## generate documentation
```bash
yarn doc
```

## Nginx sample config
```nginx
server {
   listen 80;
   server_name my.becopay.com;
   return 301 https://$host$request_uri;
}


server {
    listen 443;
    server_name my.becopay.com;

    ssl_certificate           /etc/nginx/cert.crt;
    ssl_certificate_key       /etc/nginx/cert.key;

    ssl on;
    ssl_session_cache  builtin:1000  shared:SSL:10m;
    ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    ssl_prefer_server_ciphers on;

    access_log            /var/log/nginx/merchants.access.log;

    root /home/staging/web/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
