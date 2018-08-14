# Web Client
This is a guide to dev,build and deploy webapp

## Installation
```bash
yarn install
```
## Development Build with node server
```bash
yarn fast
```

## Production Build
```bash
yarn build
```

## generate api codes from swagger files
```bash
yarn gen
```

## generate documentation
```bash
yarn doc
```

## Nginx sample config
```apache
server {
       listen 80;
       listen [::]:80;

       server_name staging1.b2mark.com avazcoin.com;

       root /home/staging/web/dist;
       index index.html;

       location / {
                try_files $uri $uri/ /index.html;
       }
}
```
