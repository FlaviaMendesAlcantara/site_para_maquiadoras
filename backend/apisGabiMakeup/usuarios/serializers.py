from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Adiciona o campo password como write_only

    class Meta:
        model = Usuario
        fields = ['usu_usuario', 'usu_nome_completo', 'password', 'usu_ativo', 'usu_data_criacao', 'usu_data_alteracao', 'usu_data_exclusao']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # Create a new Usuario instance with the validated data
        usuario = Usuario.objects.create_user(
            usu_usuario=validated_data['usu_usuario'],
            usu_nome_completo=validated_data['usu_nome_completo'],
            usu_ativo=validated_data.get('usu_ativo', True),
            password=password
        )
        return usuario
