# Generated by Django 5.0.6 on 2024-06-27 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('check_reviews', '0002_searchquery'),
    ]

    operations = [
        migrations.AddField(
            model_name='searchquery',
            name='status',
            field=models.CharField(blank=True, max_length=245, null=True),
        ),
    ]
