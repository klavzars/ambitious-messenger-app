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




## React app setup

1. Install dependencies

```bash
  cd frontend
  npm install
```

2. Run dev build

```bash
  npm run dev
```

### Notes

#### Sass variables

Here is a list of the current Sass variables:

```scss
$color-primary: #0881a3;
$color-primary-bright: #60edff;
$color-primary-dark: #125067;

$color-secondary: #adadad;
$color-secondary-bright: #f7f7f7;
$color-secondary-dark: #363636;

$color-text: #111111;
$color-text-bright: #33373d;

$font-light: 300;
$font-regular: 400;
$font-semibold: 600;
$font-bold: 800;
```

To use them just import the `_variables.scss ` file in the modules.scss file, for example:

```scss
@import "./sass_utilities/_variables.scss";
```

