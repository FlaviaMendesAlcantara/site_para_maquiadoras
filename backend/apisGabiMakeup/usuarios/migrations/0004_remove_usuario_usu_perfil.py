# Generated by Django 5.0.4 on 2024-05-01 01:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_alter_usuario_usu_perfil'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='usu_perfil',
        ),
    ]
