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


class UsuarioListCreate(generics.CreateAPIView):
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Verificar se 'usu_usuario' e 'password' estão nos dados do request
        if 'usu_usuario' in data and 'password' in data:
            # Tentar autenticar o usuário com as credenciais fornecidas
            user = authenticate(request, username=data['usu_usuario'], password=data['password'])

            if user is not None:
                # Se o usuário for autenticado com sucesso, registrar na sessão
                login(request, user)
                return Response({'message': 'Usuário autenticado com sucesso.'}, status=status.HTTP_200_OK)

        # Validação de perfil
        perfil_padrao = PerfilUsuario.objects.filter(per_nome="usuário padrão").first()
        if not perfil_padrao:
            return Response({'error': 'Perfil padrão não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)

        # Adicionar o perfil de usuário padrão aos dados do usuário
        data['usu_perfil'] = perfil_padrao.pk

        # Validar e criar usuário
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        # Verificar se 'usu_usuario' e 'password' estão nos dados do request
        if 'usu_usuario' in data and 'password' in data:
            # Tentar autenticar o usuário com as credenciais fornecidas
            user = authenticate(request, username=data['usu_usuario'], password=data['password'])

            if user is not None:
                # Se o usuário for autenticado com sucesso, registrar na sessão
                login(request, user)
                return Response({'message': 'Usuário autenticado com sucesso.'}, status=status.HTTP_200_OK)

        # Se as credenciais não estiverem presentes ou a autenticação falhar, prosseguir com a criação do usuário
        return self.create(request, *args, **kwargs)

class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioAuthenticationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Recebendo os dados do request
        usu_usuario = request.data.get('usu_usuario')
        password = request.data.get('password')

        # Buscando o usuário no banco de dados
        try:
            user = Usuario.objects.get(usu_usuario=usu_usuario)  # Change this line
        except Usuario.DoesNotExist:  # Change this line
            # Usuário não encontrado
            return Response({'error': 'Usuário não encontrado.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verificando se a senha está correta
        if user.check_password(password):
            # Autenticando o usuário
            login(request, user)

            # Obtendo o perfil do usuário
            perfil_usuario = user.usu_perfil
            data = {
                'message': 'Usuário autenticado com sucesso.',
                'perfil_usuario': {
                    'per_id': perfil_usuario.per_id,
                    'per_nome': perfil_usuario.per_nome,
                    # Adicione outros campos do perfil que deseja retornar
                }
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            # Senha incorreta
            return Response({'error': 'Senha incorreta.'}, status=status.HTTP_401_UNAUTHORIZED)

class PerfilUsuarioListCreate(generics.ListCreateAPIView):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer

class PerfilUsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PerfilUsuario.objects.all()
    serializer_class = PerfilUsuarioSerializer


def index(request):
    return HttpResponse("Olá, este é o perfil do usuário.")


def hello_world(request):
    return JsonResponse({'message': 'Hello, world!'})


class CursoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class CursoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class InscricaoCursoViewSet(viewsets.ModelViewSet):
    queryset = InscricaoCurso.objects.all()
    serializer_class = InscricaoCursoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]