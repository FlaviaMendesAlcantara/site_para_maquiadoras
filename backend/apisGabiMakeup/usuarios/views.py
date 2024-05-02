from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Usuario
from .serializers import UsuarioSerializer
from perfil_usuario.models import PerfilUsuario

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        print('Dados recebidos no backend:', request.data)
        data = request.data.copy()

        # Buscar o perfil de usuário com o nome "usuário padrão"
        perfil_padrao = get_object_or_404(PerfilUsuario, per_nome="usuário padrão")

        # Adicionar o perfil de usuário encontrado aos dados do usuário
        data['usu_perfil'] = perfil_padrao.pk 
        
        serializer = self.get_serializer(data=data)
        
        
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response({'error': 'Nome de usuário já existe.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Criptografar a senha antes de salvar
        password = data.pop('password', None)
        
        user = serializer.save()
        user.set_password(password)
        user.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # Verificar se 'usu_usuario' e 'password' estão nos dados do request
        if 'usu_usuario' not in data or 'password' not in data:
            return Response({'error': 'usu_usuario(usuario) e password(senha) precisam ser preenchidos.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Tentar autenticar o usuário com as credenciais fornecidas
        user = authenticate(request, username=data['usu_usuario'], password=data['password'])
        
        if user is not None:
            # Se o usuário for autenticado com sucesso, registrar na sessão
            login(request, user)
            return Response({'message': 'Usuario autenticado com sucesso.'}, status=status.HTTP_200_OK)
        else:
            # Se as credenciais estiverem incorretas, criar um novo usuário
            return self.create(request, *args, **kwargs)


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer