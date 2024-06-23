#!/bin/bash
set -e

# Initialize the database
docker-entrypoint.sh mysqld &

# Wait for the database to be ready
while ! mysqladmin ping --silent; do
    sleep 1
done

# Set up replication
mysql -uroot -proot_password <<EOF
CHANGE MASTER TO MASTER_HOST='$MASTER_HOST', MASTER_USER='repl', MASTER_PASSWORD='repl_password', MASTER_LOG_FILE='$MASTER_LOG_FILE', MASTER_LOG_POS=$MASTER_LOG_POS;
START SLAVE;
EOF

wait
