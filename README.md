# dashboard-puente-grua-server

Crear el archivo `.env` con el siguiente contenido:

```
MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD
MYSQL_DATABASE="acme_db"
MYSQL_USER="acme"
MYSQL_PASSWORD=$ACME_INTERNAL_PASSWORD
```

Este servidor tiene el dashboard del puente grua y el servidor que se conecta a la base de datos local e incluso la base de datos. Si la base de datos se coenta, no funcionará bien porque las otras aplicaciones la referencian desde el compose.
