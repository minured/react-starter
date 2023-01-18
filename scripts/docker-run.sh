echo $(date "+%Y-%m-%d %H:%M:%S") $(pwd)
docker run -dit \
    --name myapp \
    -p 9527:80 \
    myapp
echo "server run on http://localhost:9527"
