# Generated by Django 5.0.4 on 2024-04-22 17:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cursos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InscricaoCurso',
            fields=[
                ('ins_id', models.AutoField(primary_key=True, serialize=False)),
                ('ins_nome_completo', models.CharField(max_length=100)),
                ('ins_data_nascimento', models.DateField()),
                ('ins_numero_telefone', models.CharField(max_length=20)),
                ('ins_tipo_pagamento', models.CharField(choices=[('PIX', 'PIX'), ('DINHEIRO', 'Dinheiro'), ('DEBITO', 'Débito'), ('CREDITO', 'Crédito')], max_length=10)),
                ('ins_modalidade_curso', models.CharField(choices=[('ONLINE', 'Online'), ('PRESENCIAL', 'Presencial')], max_length=10)),
                ('ins_tipo_pele', models.CharField(choices=[('SECA', 'Seca'), ('MISTA', 'Mista'), ('OLEOSA', 'Oleosa'), ('NAO_SEI', 'Não sei')], max_length=10)),
                ('ins_alergia', models.BooleanField()),
                ('ins_tipo_alergia', models.TextField(blank=True)),
                ('ins_data_inscricao', models.DateTimeField(auto_now_add=True)),
                ('ins_data_alteracao', models.DateTimeField(auto_now=True)),
                ('ins_data_exclusao', models.DateTimeField(blank=True, null=True)),
                ('ins_codigo_curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.curso')),
            ],
            options={
                'db_table': 'tb_inscricao_curso',
            },
        ),
    ]
