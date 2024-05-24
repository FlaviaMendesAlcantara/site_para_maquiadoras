from django.db import models
# from cursos.models import Curso

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
