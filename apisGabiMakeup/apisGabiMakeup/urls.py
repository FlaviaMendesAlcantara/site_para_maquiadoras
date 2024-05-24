from django.contrib import admin
from django.urls import path, include
from cursos.views import CursoListCreateAPIView, CursoRetrieveUpdateDestroyAPIView
from perfil_usuario.views import PerfilUsuarioListCreate, PerfilUsuarioDetail
from usuarios.views import UsuarioListCreate, UsuarioDetail,UsuarioAuthenticationAPIView
from inscricao_cursos.views import InscricaoCursoViewSet  # Importe o conjunto de visualizações
from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework import routers, permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

router = routers.DefaultRouter()

router.register('inscricoes', InscricaoCursoViewSet)  # Registre o conjunto de visualizações no roteador

def custom_swagger_login(request):
    username = request.GET.get('username')
    password = request.GET.get('password')

    # Verificar se o usuário e senha são válidos
    user = authenticate(request, username=username, password=password)
    if user is None:
        return HttpResponse('Usuário ou senha inválidos', status=401)

    # Se a autenticação for bem-sucedida, redirecione para o Swagger
    return HttpResponseRedirect('/swagger/')

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API Documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourdomain.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),

    path('cursos/', CursoListCreateAPIView.as_view(), name='curso-list-create'),
    path('cursos/<int:pk>/', CursoRetrieveUpdateDestroyAPIView.as_view(), name='curso-retrieve-update-destroy'),

    path('perfis/', PerfilUsuarioListCreate.as_view(), name='perfil-list-create'),
    path('perfis/<int:pk>/', PerfilUsuarioDetail.as_view(), name='perfil-detail'),

    path('usuarios/', UsuarioListCreate.as_view(), name='usuario-list-create'),
    path('usuarios/<int:pk>/', UsuarioDetail.as_view(), name='usuario-detail'),

    path('usuarios/authenticate/', UsuarioAuthenticationAPIView.as_view(), name='usuario-authenticate')
    
]
