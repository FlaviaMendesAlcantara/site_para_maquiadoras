# Generated by Django 5.0.4 on 2024-04-17 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0002_rename_ativo_curso_cur_ativo_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='curso',
            name='teste',
            field=models.CharField(default='default', max_length=100),
        ),
    ]