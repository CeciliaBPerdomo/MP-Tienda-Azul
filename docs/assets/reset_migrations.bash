rm -R -f ./migrations &&  
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE example;' || true &&
psql -U gitpod -c 'CREATE DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade

# --- Borrar manualmente la carpeta migrations
# pipenv run init
# mysql -u root -p (Abre MariaDB)
# 1234 (mi contraseña)
# DROP DATABASE example;
# CREATE DATABASE example;
# ctrl + c
# pipenv run migrate
# pipenv run upgrade
