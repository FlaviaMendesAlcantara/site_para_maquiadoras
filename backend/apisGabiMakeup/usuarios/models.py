from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from perfil_usuario.models import PerfilUsuario

class UsuarioManager(BaseUserManager):
    def create_user(self, usu_nome, usu_perfil, usu_ativo=True, **extra_fields):
        if not usu_nome:
            raise ValueError('O nome do usuário deve ser fornecido')
        usuario = self.model(
            usu_nome=usu_nome,
            usu_perfil=usu_perfil,
            usu_ativo=usu_ativo,
            **extra_fields,
        )
        usuario.set_password(extra_fields.get('password'))
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, usu_nome, usu_perfil, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        return self.create_user(usu_nome, usu_perfil, **extra_fields)

class Usuario(AbstractBaseUser):
    usu_nome = models.CharField(max_length=100, unique=True)
    usu_perfil = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE, related_name='usuarios', db_column='per_id')
    usu_ativo = models.BooleanField(default=True)
    usu_data_criacao = models.DateTimeField(auto_now_add=True)
    usu_data_alteracao = models.DateTimeField(auto_now=True)
    usu_data_exclusao = models.DateTimeField(blank=True, null=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'usu_nome'
    REQUIRED_FIELDS = ['usu_perfil']

    def __str__(self):
        return self.usu_nome

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
    
    class Meta:
            db_table = 'tb_usuarios'
