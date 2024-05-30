#!/bin/bash

# Nom de la base de données à importer
DATABASE_NAME="mia15"
MYSQL_PASSWORD="r00tp4ssw0rd"

# Nom du fichier de sauvegarde
CURRENT_DIR=$(dirname $0)
DUMP_FILE="${DATABASE_NAME}_dump.sql"

if [ ! -f $CURRENT_DIR/$DUMP_FILE ]; then
    echo "Le fichier $DUMP_FILE n'existe pas."
    exit 1
fi

# Démarrer le conteneur Docker avec Docker Compose
docker-compose up -d db

# Obtenir l'ID du conteneur de la base de données MySQL
container_id=$(docker-compose ps -q db)

# Attendre que la base de données MySQL démarre
timeout=30
waited=0
until docker-compose exec -T db mysqladmin ping -h "127.0.0.1" --silent || [ "$waited" -ge "$timeout" ]; do
    echo "En attente que la base de données MySQL démarre..."
    sleep 1
    waited=$((waited + 1))
done

# Importer le fichier SQL
docker exec -i $container_id mysql -u root --password=$MYSQL_PASSWORD $DATABASE_NAME < $CURRENT_DIR/$DUMP_FILE

echo "Base de données importée à partir du fichier $DUMP_FILE."
