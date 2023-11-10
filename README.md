# dashboard-puente-grua-server

Crear el archivo `.env` con el siguiente contenido:

```
MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD
MYSQL_DATABASE="acme_db"
MYSQL_USER="acme"
MYSQL_PASSWORD=$ACME_INTERNAL_PASSWORD
```

En la carpeta `node-db-server` crear el archivo `.env` con el siguiente contenido:

```
ACME_INTERNAL_PASSWORD=$ACME_INTERNAL_PASSWORD
DB_USER="acme"
DB_NAME = "acme_db"
DB_HOST="db"
```

Este servidor tiene el dashboard del puente grua y el servidor que se conecta a la base de datos local e incluso la base de datos. Si la base de datos se coenta, no funcionará bien porque las otras aplicaciones la referencian desde el compose.
