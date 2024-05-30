#!/usr/bin/env sh

# Nom de la base de données à importer
DATABASE_NAME="mia15"
MYSQL_PASSWORD="r00tp4ssw0rd"

# Démarrer le conteneur Docker avec Docker Compose
docker-compose up -d

# Attendre que la base de données MySQL démarre
timeout=30
waited=0
until docker-compose exec -T db mysqladmin ping -h "localhost" --silent || [ "$waited" -ge "$timeout" ]; do
    echo "En attente que la base de données MySQL démarre..."
    sleep 1
    waited=$((waited+1))
done

# Obtenir l'ID du conteneur de la base de données MySQL
container_id=$(docker-compose ps -q db)

# Exécuter les fichiers SQL dans le répertoire sql
current_dir=$(dirname $0)
parent_dir=$(dirname $current_dir)
SQL_DIR=$parent_dir/packages/data/sql

for sql_file in $(ls $SQL_DIR/*.sql | sort); do
    echo "Executing $sql_file..."
    docker exec -i $container_id mysql -u root --password=$MYSQL_PASSWORD $DATABASE_NAME < $sql_file
done

echo "Base de données initialisée avec succès."


