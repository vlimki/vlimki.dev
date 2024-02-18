yarn build
rsync build $1:/root/ -r
ssh $1 'rm /var/www/html/* -rf; cp ~/build/* /var/www/html -r'
