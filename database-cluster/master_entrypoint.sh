#!/bin/bash
set -e

# Initialize the database
docker-entrypoint.sh mysqld &

# Wait for the database to be ready
while ! mysqladmin ping --silent; do
    sleep 1
done

# Set deprecated options to avoid warnings
mysql -uroot -proot_password <<EOF
SET GLOBAL host_cache_size = 0;
EOF


# Set up replication user
mysql -uroot -proot_password <<EOF
CREATE USER IF NOT EXISTS 'repl'@'%' IDENTIFIED WITH 'mysql_native_password' BY 'repl_password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
FLUSH PRIVILEGES;
EOF

# Set up bidirectional replication if both masters are defined
if [[ -n "$MASTER_HOST" ]]; then
    mysql -uroot -proot_password <<EOF
CHANGE MASTER TO MASTER_HOST='$MASTER_HOST', MASTER_USER='repl', MASTER_PASSWORD='repl_password', MASTER_LOG_FILE='$MASTER_LOG_FILE', MASTER_LOG_POS=$MASTER_LOG_POS;
START SLAVE;
EOF
fi

wait
