# Generated by Django 5.1.4 on 2025-01-02 01:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_basefile_audiofile_excelfile_imagefile_otherfile_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basefile',
            name='file',
            field=models.FileField(upload_to=''),
        ),
    ]
