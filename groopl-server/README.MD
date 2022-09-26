to set up the server locally, run:

``` bash 
 yarn install
 
```
create a postgreSQL database and set it up on your .env file 
 
```bash 
 DB_NAME = ""
 DB_PASSWORD = ""
  
```

then run 

```bash
 yarn create:migration
 yarn watch

```

and 

```bash
 yarn dev

```

and you're set!
