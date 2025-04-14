from django.urls import path
from .views import *

urlpatterns = [
    path('api/usuarios/', UsuarioListado.as_view(), name='usuariolistado'),

    #Login y Registros
    path('api/register/', RegistroUsuario.as_view(), name='register'),
]