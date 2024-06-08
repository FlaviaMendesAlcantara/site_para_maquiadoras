# Backend Site Gabi-Makeup

Este é um projeto de site para maquiadoras.
Nele é possivel publicar as fotos do seu trabalho, videos tutoriais, 
Permitir o usuario fazer inscrição em cursos. Permite tambem ao administrador criar e  gerenciar a lista de cursos, criar e gerenciar lista de inscritos . incluir e excluir fotos e videos.

## Como Usar
Localmente 

1. Clone o repositório. 
    git clone `https://github.com/FlaviaMendesAlcantara/site_para_maquiadoras.git`
2. navegue ate a pasta  `cd site_para_maquiadoras/apisGabiMakeup` 
3. Abra o cmd 
4. Execute `python -m venv venv` para criar o ambiente virtual.
5. Execute `.\env\Scripts\activate ` para ativar o ambiente virtual no windows.
6. Execute `pip install -r requeriments.txt` para instalar as dependências do Django.
7. Execute `python manage.py migrate` para fazer as migrações do banco de dados.OBS: So vai funcionar com o arquivo .env na raiz do projeto site maquiadoras
8. Execute `python manage.py runserver` Execute o servidor localmente.
9. Acesse `http://127.0.0.1:8000/swagger/` para visualizar as rotas

Implantação Automática render.com:
------------------------

Este projeto está configurado para implantações automáticas no render.com. Todas as alterações feitas no repositório do GitHub push ou pull request serão automaticamente implantadas no ambiente de produção pelo render.com, sem a necessidade de intervenção manual.

As configuracoes de Build no render:

Build & Deploy
Repository: `https://github.com/FlaviaMendesAlcantara/site_para_maquiadoras`
Branch: `producaoApis` 
Build Command: `sh build.sh` (esse comando executa tudo que esta no arquivo build na raiz do meu projeto fazendo a implanção automatica)
Start Command: `gunicorn apisGabiMakeup.apisGabiMakeup.wsgi:application --bind 0.0.0.0:8000`
Auto-Deploy: `yes`




## Contribuindo

Por favor, leia [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir para este projeto.

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
