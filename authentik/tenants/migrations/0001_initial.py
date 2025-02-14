# Generated by Django 3.2.3 on 2021-05-29 16:10

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("authentik_flows", "0018_oob_flows"),
    ]

    operations = [
        migrations.CreateModel(
            name="Tenant",
            fields=[
                (
                    "tenant_uuid",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                (
                    "domain",
                    models.TextField(
                        help_text="Domain that activates this tenant. Can be a superset, i.e. `a.b` for `aa.b` and `ba.b`"
                    ),
                ),
                ("default", models.BooleanField(default=False)),
                ("branding_title", models.TextField(default="authentik")),
                (
                    "branding_logo",
                    models.TextField(
                        default="/static/dist/assets/icons/icon_left_brand.svg"
                    ),
                ),
                (
                    "flow_authentication",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tenant_authentication",
                        to="authentik_flows.flow",
                    ),
                ),
                (
                    "flow_invalidation",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tenant_invalidation",
                        to="authentik_flows.flow",
                    ),
                ),
                (
                    "flow_recovery",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tenant_recovery",
                        to="authentik_flows.flow",
                    ),
                ),
                (
                    "flow_unenrollment",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tenant_unenrollment",
                        to="authentik_flows.flow",
                    ),
                ),
            ],
            options={
                "verbose_name": "Tenant",
                "verbose_name_plural": "Tenants",
            },
        ),
    ]
