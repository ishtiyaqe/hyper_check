# Generated by Django 5.0.6 on 2024-06-27 14:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('check_reviews', '0003_searchquery_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('buyer_name', models.CharField(blank=True, max_length=245, null=True)),
                ('country', models.CharField(blank=True, max_length=228, null=True)),
                ('review_time', models.CharField(blank=True, max_length=228, null=True)),
                ('review_text', models.TextField()),
                ('review_rating', models.CharField(blank=True, max_length=50, null=True)),
                ('review_title', models.CharField(blank=True, max_length=255, null=True)),
                ('verified_purchase', models.BooleanField(blank=True, default=False, null=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='check_reviews.product', to_field='product_no')),
            ],
        ),
        migrations.DeleteModel(
            name='reviews',
        ),
    ]