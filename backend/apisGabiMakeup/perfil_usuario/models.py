from django.db import models

class PerfilUsuario(models.Model):
    per_id = models.AutoField(primary_key=True)
    per_nome = models.CharField(max_length=100)
    per_data_criacao = models.DateTimeField(auto_now_add=True)
    per_data_alteracao = models.DateTimeField(auto_now=True)
    per_data_exclusao = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.per_nome
    class Meta:
            db_table = 'tb_perfil_usuarios'