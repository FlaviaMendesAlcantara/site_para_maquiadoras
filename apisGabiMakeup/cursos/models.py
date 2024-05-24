# from django.utils import timezone
# from django.db import models

# class Curso(models.Model): 
#     cur_id = models.AutoField(primary_key=True)  # Campo de chave primária
#     cur_ativo = models.BooleanField(default=True)  # Indica se o curso está ativo
#     cur_titulo = models.CharField(max_length=100)  # Título do curso
#     cur_descricao = models.TextField()             # Descrição do curso
#     cur_carga_horaria = models.IntegerField()      # Carga horária em horas
#     cur_valor = models.DecimalField(max_digits=10, decimal_places=2)  # Valor do curso
#     cur_data_inicio = models.DateField(default=timezone.now)  # Data de início do curso
#     cur_data_fim = models.DateField()              # Data de término do curso
#     cur_data_criacao = models.DateTimeField(auto_now_add=True)  # Data de criação do curso
#     cur_data_alteracao = models.DateTimeField(auto_now=True)  # Data de alteração do curso
#     cur_data_exclusao = models.DateTimeField(null=True, blank=True)  # Data de exclusão do curso, pode ser vazia

#     def __str__(self):
#         return self.cur_titulo
    
#     class Meta:
#         db_table = 'tb_cursos'
