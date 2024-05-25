# from rest_framework import generics
# from .models import PerfilUsuario
# from .serializers import PerfilUsuarioSerializer

# class PerfilUsuarioListCreate(generics.ListCreateAPIView):
#     queryset = PerfilUsuario.objects.all()
#     serializer_class = PerfilUsuarioSerializer

# class PerfilUsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = PerfilUsuario.objects.all()
#     serializer_class = PerfilUsuarioSerializer
# perfil_usuario/views.py

from django.http import HttpResponse

def index(request):
    return HttpResponse("Olá, este é o perfil do usuário.")
