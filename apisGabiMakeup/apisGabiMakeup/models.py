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


class Curso(models.Model): 
    cur_id = models.AutoField(primary_key=True)  # Campo de chave primária
    cur_ativo = models.BooleanField(default=True)  # Indica se o curso está ativo
    cur_titulo = models.CharField(max_length=100)  # Título do curso
    cur_descricao = models.TextField()             # Descrição do curso
    cur_carga_horaria = models.IntegerField()      # Carga horária em horas
    cur_valor = models.DecimalField(max_digits=10, decimal_places=2)  # Valor do curso
    cur_data_inicio = models.DateField(default=timezone.now)  # Data de início do curso
    cur_data_fim = models.DateField()              # Data de término do curso
    cur_data_criacao = models.DateTimeField(auto_now_add=True)  # Data de criação do curso
    cur_data_alteracao = models.DateTimeField(auto_now=True)  # Data de alteração do curso
    cur_data_exclusao = models.DateTimeField(null=True, blank=True)  # Data de exclusão do curso, pode ser vazia

    def __str__(self):
        return self.cur_titulo
    
    class Meta:
        db_table = 'tb_cursos'


class InscricaoCurso(models.Model):
    ins_id = models.AutoField(primary_key=True)
    # ins_codigo_curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    ins_nome_completo = models.CharField(max_length=100)
    ins_data_nascimento = models.DateField()
    ins_numero_telefone = models.CharField(max_length=20)
    ins_tipo_pagamento_choices = [
        ('PIX', 'PIX'),
        ('DINHEIRO', 'Dinheiro'),
        ('DEBITO', 'Débito'),
        ('CREDITO', 'Crédito'),
    ]
    ins_tipo_pagamento = models.CharField(max_length=10, choices=ins_tipo_pagamento_choices)
    ins_modalidade_choices = [
        ('ONLINE', 'Online'),
        ('PRESENCIAL', 'Presencial'),
    ]
    ins_modalidade_curso = models.CharField(max_length=10, choices=ins_modalidade_choices)
    ins_tipo_pele_choices = [
        ('SECA', 'Seca'),
        ('MISTA', 'Mista'),
        ('OLEOSA', 'Oleosa'),
        ('NAO_SEI', 'Não sei'),
    ]
    ins_tipo_pele = models.CharField(max_length=10, choices=ins_tipo_pele_choices)
    ins_alergia = models.BooleanField()
    ins_tipo_alergia = models.TextField(blank=True,null=True)
    ins_data_inscricao = models.DateTimeField(auto_now_add=True)
    ins_data_alteracao = models.DateTimeField(auto_now=True)
    ins_data_exclusao = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Inscrição para {self.ins_codigo_curso} - {self.ins_nome_completo}"

    class Meta:
        db_table = 'tb_inscricao_curso'
