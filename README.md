## Project setup

```bash
$ yarn
```

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## DB

```bash
# create migration
$ yarn migrate:generate --name=version


# run migration
$ yarn migrate:up

# undo migration
$ yarn migrate:undo
```
