git add .
git commit -m 'Automated commit for $(date +"%d-%m-%Y")'
git push

yarn build
ssh $1 'sh "rm /var/www/html/* -rf"'
rsync build/ $1:/var/www/html/ -r
