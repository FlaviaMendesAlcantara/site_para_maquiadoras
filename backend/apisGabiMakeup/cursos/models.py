from django.db import models

class Curso(models.Model):
    id = models.AutoField(primary_key=True)  # Campo de chave primária
    ativo = models.BooleanField(default=True)  # Indica se o curso está ativo
    titulo = models.CharField(max_length=100)  # Título do curso
    descricao = models.TextField()             # Descrição do curso
    carga_horaria = models.IntegerField()      # Carga horária em horas
    valor = models.DecimalField(max_digits=10, decimal_places=2)  # Valor do curso
    data_inicio = models.DateField()           # Data de início do curso
    data_fim = models.DateField()              # Data de término do curso

    def __str__(self):
        return self.titulo
    
    class Meta:
            app_label = 'cursos'

