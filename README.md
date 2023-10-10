<p align="center">
    <img src="assets/repo_banner.svg"/>
</p>

**A modern web messaging application**



## Run Database container


Clone the project

```bash
  git clone https://github.com/briantwene/ambitious-bishes.git
```

Go to the db-setup folder

```bash
  cd db-setup
```

First create docker volumne

```bash
  docker volume create db_data
```

Start the container

```bash
  docker compose up
```

The database should be running

Next, is to get prisma working, the schema is there already

install dependencies

```bash
  npm install
```

now run the following to generate the prisma client
```bash
  npx prisma generate
```

OR if the schema has change (if a table has been added or modified)
```bash
  npx prisma migrate dev
```

