# # myproject/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('perfil_usuario/', include('perfil_usuario.urls')),
]
