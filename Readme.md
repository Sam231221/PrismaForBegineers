# Prisma Installation

Install Prisma

```
npm install prisma
```

Automatically creates prisma folder with .env file in current directory

```
npx prisma init
```

Creates table/detect changes and updates in to your Database

```
npx prisma db push
```

# Useful commands

## 1. Setup a new Prisma project

This creates .env file and prisma folder

### i.Without database

```
npx prisma init
```

### ii.With database

```
npx prisma init --datasource-provider sqlite
```

## 2. Generate the Prisma Client.

Without running this cmd, Querying your database is not possible.

```
npx prisma generate
```

Note that if you make changes to existing schema,
You might need to run the above command for getting updated query.

## 3. Database Migrations

A.Create migrations folder locally from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
Here dev is a compulsory keyword indicating development stage.

```
npx prisma migrate dev --name [name_for_this_migration]
```

### Other commands

npx prisma migrate [command]

```
i.Commands for development
         dev   Create a migration from changes in Prisma schema, apply it to the database
               trigger generators (e.g. Prisma Client)
       reset   Reset your database and apply all migrations, all data will be lost

ii. Commands for production/staging
      deploy   Apply pending migrations to the database
      status   Check the status of your database migrations
                 i.e prisma migrate status --schema=./schema.prisma
     resolve   Resolve issues with database migrations, i.e. baseline, failed migration, hotfix

iii. Command for any stage

        diff   Compare the database schema from two arbitrary sources
                i.e prisma migrate diff \
                      --from-url "$DATABASE_URL" \
                      --to-url "postgresql://login:password@localhost:5432/db" \
                      --script

```

## 4. Database Pull and Push

Push the Prisma schema state to the database

```
npx prisma db push
```

Turn your database schema into a Prisma schema.

```
npx prisma db pull
```

# Viewing Table data browser

```
npx prisma studio
```

# Formatting Prisma schema.

```
npx prisma format
```
