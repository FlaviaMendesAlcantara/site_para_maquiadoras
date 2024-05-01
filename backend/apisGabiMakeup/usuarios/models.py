from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from perfil_usuario.models import PerfilUsuario

class UsuarioManager(BaseUserManager):
    def create_user(self, usu_usuario, usu_nome_completo, usu_ativo=True, password=None, **extra_fields):
        if not usu_usuario:
            raise ValueError('O nome do usuário deve ser fornecido')
        usuario = self.model(
            usu_usuario=usu_usuario,
            usu_nome_completo=usu_nome_completo,
            usu_ativo=usu_ativo,
            **extra_fields,
        )
        if password:
            usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, usu_usuario, usu_nome_completo, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        return self.create_user(usu_usuario, usu_nome_completo, **extra_fields)

class Usuario(AbstractBaseUser):
    usu_usuario = models.CharField(max_length=100, unique=True, verbose_name='Nome de Usuário',default='usuario_padrao')
    usu_nome_completo = models.CharField(max_length=255, verbose_name='Nome Completo',default='Nome Usuário Padrão')
    usu_ativo = models.BooleanField(default=True)
    usu_data_criacao = models.DateTimeField(auto_now_add=True)
    usu_data_alteracao = models.DateTimeField(blank=True, null=True)
    usu_data_exclusao = models.DateTimeField(blank=True, null=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'usu_usuario'
    REQUIRED_FIELDS = [ 'usu_nome_completo']

    def __str__(self):
        return self.usu_usuario

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin

    class Meta:
        db_table = 'tb_usuarios'
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
