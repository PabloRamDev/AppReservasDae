# Generated by Django 4.1.2 on 2022-11-24 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_solicitud_vigencia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solicitud',
            name='vigencia',
            field=models.BooleanField(blank=True),
        ),
    ]
