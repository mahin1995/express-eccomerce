```
npm install
npm i nodemon -g
npm install knex --save
npm install sqlite3
```

```
npx knex init
npx knex migrate:make init --migrations-directory db/migrations
npx knex migrate:latest --knexfile db/knexfile.js
```