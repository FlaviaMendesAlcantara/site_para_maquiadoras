from rest_framework import generics
from .models import PerfilUsuario
from .serializers import PerfilUsuarioSerializer
from django.http import HttpResponse

class PerfilUsuarioListCreate(generics.ListCreateAPIView):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer

class PerfilUsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer


def index(request):
    return HttpResponse("Olá, este é o perfil do usuário.")
