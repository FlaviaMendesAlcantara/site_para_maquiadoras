# from django.db import models
# from django.utils import timezone

# class PerfilUsuario(models.Model):
#     per_id = models.AutoField(primary_key=True)
#     per_nome = models.CharField(max_length=100)
#     per_data_criacao = models.DateTimeField(auto_now_add=True)
#     per_data_alteracao = models.DateTimeField(null=True,blank=True)
#     per_data_exclusao = models.DateTimeField(null=True, blank=True)

#     def __str__(self):
#         return self.per_nome
    
#     def save(self, *args, **kwargs):
#         if not self.pk:  # Se o objeto está sendo criado
#             self.per_data_alteracao = None 
#             self.per_data_exclusao = None
#         super().save(*args, **kwargs)
        
#     class Meta:
#         db_table = 'tb_perfil_usuarios'
