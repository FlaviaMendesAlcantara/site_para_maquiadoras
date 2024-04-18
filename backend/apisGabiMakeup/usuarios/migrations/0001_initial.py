# Generated by Django 5.0.4 on 2024-04-18 19:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('perfil_usuario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('usu_nome', models.CharField(max_length=100, unique=True)),
                ('usu_senha', models.CharField(max_length=128)),
                ('usu_ativo', models.BooleanField(default=True)),
                ('usu_data_criacao', models.DateTimeField(auto_now_add=True)),
                ('usu_data_alteracao', models.DateTimeField(auto_now=True)),
                ('usu_data_exclusao', models.DateTimeField(blank=True, null=True)),
                ('usu_perfil', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='perfil_usuario.perfilusuario')),
            ],
            options={
                'db_table': 'tb_usuarios',
            },
        ),
    ]
