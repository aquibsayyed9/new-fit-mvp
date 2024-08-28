#!/bin/sh

# Wait for the database to be ready
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME
do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up!"

# Execute the main command
exec "$@"