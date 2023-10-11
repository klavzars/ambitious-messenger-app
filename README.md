<p align="center">
    <img src="assets/repo_banner.svg"/>
</p>

**A modern web messaging application**



## Run Database container


Clone the project

```bash
  git clone https://github.com/briantwene/ambitious-bishes.git
```



Go to the `database` folder

```bash
  cd database
```

Create a docker volume called `db_data`

```bash
  docker volume create db_data
```

Then, start the container

```bash
  docker compose up
```

The database should be running

Next, is to get prisma working, the schema is there already


Install dependencies (**make sure that you're in `/backend`**)

```bash
  npm install
```

now run the following to generate the prisma client
```bash
  npx prisma generate
```


**OR** 

**You probably wont have to do this, but @briantwene will let you know**

if the prisma schema has changed (if a table has been added or modified) run this

```bash
  npx prisma migrate dev
```

**Then**

One last thing would be to create an .env file in /backend and add the following:

```bash
# Database configuration
DATABASE_URL=postgresql://username:password@localhost:5432/databasename?schema=public
```
The username, password and database can be found in `docker-compose.yml`

