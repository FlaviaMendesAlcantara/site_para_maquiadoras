from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        # Extrair os dados do request
        data = request.data.copy()
        
        # Verificar se 'usu_nome' e 'password' estão nos dados do request
        if 'usu_nome' not in data or 'password' not in data:
            return Response({'error': 'usu_nome and password must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Criar o usuário com os dados fornecidos
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        # Criptografar a senha antes de salvar
        user = Usuario.objects.create_user(usu_nome=data['usu_nome'], password=data['password'])
        usuario = serializer.save(user=user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def post(self, request, *args, **kwargs):
        # Extrair os dados do request
        data = request.data.copy()
        
        # Verificar se 'usu_nome' e 'password' estão nos dados do request
        if 'usu_nome' not in data or 'password' not in data:
            return Response({'error': 'usu_nome and password must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Tentar autenticar o usuário com as credenciais fornecidas
        user = authenticate(request, username=data['usu_nome'], password=data['password'])
        
        if user is not None:
            # Se o usuário for autenticado com sucesso, registrar na sessão
            login(request, user)
            return Response({'message': 'User authenticated successfully'}, status=status.HTTP_200_OK)
        else:
            # Se as credenciais estiverem incorretas, criar um novo usuário
            return self.create(request, *args, **kwargs)


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
