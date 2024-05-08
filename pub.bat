@echo off
@echo "copy .env.prod file"
@REM copy .env.prod dist\.env

@echo "copy package.json file"
copy package.json dist\package.json

@echo "delete server files"
ssh aiweibang "rm -rf /var/nginx/www/html/kx_openai_api"

@echo "Start to upload files to server..."
scp -r dist aiweibang:/var/nginx/www/html/kx_openai_api