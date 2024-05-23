set -o errexit

pip install -r backend/requirements.txt
python backend/apisGabiMakeup/manage.py collectstatic --no-input
python backend/apisGabiMakeup/manage.py migrate 

# Baixar e instalar o Cloud SQL Auth Proxy
wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

# Criar o arquivo de credenciais a partir da variável de ambiente
echo $GOOGLE_APPLICATION_CREDENTIALS_JSON > credentials.json

# Exportar a variável de ambiente apontando para o arquivo de credenciais
export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/credentials.json

# Iniciar o Cloud SQL Auth Proxy
./cloud_sql_proxy -dir=/cloudsql -instances=<gabi-makeup-420121:us-central1:bd-site-maquiadoras>

