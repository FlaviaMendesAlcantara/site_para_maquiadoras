from django.db import models
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class PerfilUsuario(models.Model):
    per_id = models.AutoField(primary_key=True)
    per_nome = models.CharField(max_length=100)
    per_data_criacao = models.DateTimeField(auto_now_add=True)
    per_data_alteracao = models.DateTimeField(null=True,blank=True)
    per_data_exclusao = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.per_nome
    
    def save(self, *args, **kwargs):
        if not self.pk:  # Se o objeto está sendo criado
            self.per_data_alteracao = None 
            self.per_data_exclusao = None
        super().save(*args, **kwargs)
        
    class Meta:
        db_table = 'tb_perfil_usuarios'

class UsuarioManager(BaseUserManager):
    def create_user(self, usu_usuario, usu_nome_completo, usu_perfil, usu_ativo=True, password=None, **extra_fields):
        if not usu_usuario:
            raise ValueError('O nome do usuário deve ser fornecido')
        usuario = self.model(
            usu_usuario=usu_usuario,
            usu_nome_completo=usu_nome_completo,
            usu_perfil=usu_perfil,
            usu_ativo=usu_ativo,
            **extra_fields,
        )
        if password:
            usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, usu_usuario, usu_nome_completo, usu_perfil, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')
        return self.create_user(usu_usuario, usu_nome_completo, usu_perfil, **extra_fields)

class Usuario(AbstractBaseUser):
    usu_usuario = models.CharField(max_length=100, unique=True, verbose_name='Nome de Usuário', default='usuario_padrao')
    usu_nome_completo = models.CharField(max_length=255, verbose_name='Nome Completo', default='Nome Usuário Padrão')
    usu_perfil = models.ForeignKey(PerfilUsuario, on_delete=models.CASCADE)
    usu_ativo = models.BooleanField(default=True)
    usu_data_criacao = models.DateTimeField(auto_now_add=True)
    usu_data_alteracao = models.DateTimeField(blank=True, null=True)
    usu_data_exclusao = models.DateTimeField(blank=True, null=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'usu_usuario'
    REQUIRED_FIELDS = ['usu_nome_completo', 'usu_perfil']

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
