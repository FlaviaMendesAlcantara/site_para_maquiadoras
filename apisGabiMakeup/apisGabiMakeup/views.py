# apisGabiMakeup/apisGabiMakeup/views.py

from django.http import JsonResponse
from rest_framework import generics, status
from .models import PerfilUsuario, Usuario, Curso, InscricaoCurso
from .serializers import PerfilUsuarioSerializer,UsuarioSerializer,CursoSerializer, InscricaoCursoSerializer
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 

class UsuarioListCreate(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        perfil_padrao = PerfilUsuario.objects.filter(per_nome="usuário padrão").first()
        if not perfil_padrao:
            return Response({'error': 'Perfil padrão não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)
        data['usu_perfil'] = perfil_padrao.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioAuthenticationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        usu_usuario = request.data.get('usu_usuario')
        password = request.data.get('password')

        user = authenticate(request, username=usu_usuario, password=password)
        if user is not None:
            login(request, user)
            perfil_usuario = user.usu_perfil
            data = {
                'message': 'Usuário autenticado com sucesso.',
                'perfil_usuario': {
                    'per_id': perfil_usuario.per_id,
                    'per_nome': perfil_usuario.per_nome,
                }
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuário ou senha incorretos.'}, status=status.HTTP_401_UNAUTHORIZED)


class PerfilUsuarioListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer

class PerfilUsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer

def index(request):
    return HttpResponse("Olá, este é um teste de visualização.")


def hello_world(request):
    return JsonResponse({'message': 'Hello, world!'})

class CursoListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class CursoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class InscricaoCursoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = InscricaoCurso.objects.all()
    serializer_class = InscricaoCursoSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]