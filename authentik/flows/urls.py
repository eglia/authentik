"""flow urls"""
from django.urls import path
from django.views.generic import RedirectView

from authentik.flows.models import FlowDesignation
from authentik.flows.views import CancelView, ConfigureFlowInitView, ToDefaultFlow

urlpatterns = [
    path(
        "-/default/authentication/",
        ToDefaultFlow.as_view(designation=FlowDesignation.AUTHENTICATION),
        name="default-authentication",
    ),
    path(
        "-/default/invalidation/",
        ToDefaultFlow.as_view(designation=FlowDesignation.INVALIDATION),
        name="default-invalidation",
    ),
    path("-/cancel/", CancelView.as_view(), name="cancel"),
    path(
        "-/configure/<uuid:stage_uuid>/",
        ConfigureFlowInitView.as_view(),
        name="configure",
    ),
    path(
        "<slug:flow_slug>/",
        RedirectView.as_view(pattern_name="authentik_core:if-flow"),
        name="flow-executor-shell",
    ),
]
