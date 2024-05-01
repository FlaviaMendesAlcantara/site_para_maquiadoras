from django.contrib.auth import authenticate, login
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer
from perfil_usuario.models import PerfilUsuario  # Importe o modelo PerfilUsuario

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        print('Dados recebidos no backend:', request.data)
        data = request.data.copy()
        
        # Verificar se 'usu_usuario' e 'password' estão nos dados do request
        if 'usu_usuario' not in data or 'password' not in data:
            return Response({'error': 'usu_usuario(usuario) e password(senha) precisa ser preenchido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Criar o usuário com os dados fornecidos
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # Criptografar a senha antes de salvar
        user = Usuario.objects.create_user(
            usu_usuario=data['usu_usuario'],
            usu_nome_completo=data.get('usu_nome_completo', ''),  # Adicionando suporte para usu_nome_completo opcional
            # Passando o objeto PerfilUsuario ao invés do ID
            usu_ativo=True,
            password=data['password']
        )
        
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
