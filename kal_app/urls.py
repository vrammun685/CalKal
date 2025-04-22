from django.urls import path
from .views import *

urlpatterns = [

    #Login y Registros
    path('api/register/', RegistroUsuario.as_view(), name='register'),
    path('api/login/', Login.as_view(), name="login"),
    path('api/solicitar-contraseña/', SolicitarCorreoPass.as_view(), name="SolicitarCorreoPass"),
    path('api/CambiaContraseña/<uidb64>/<token>/', CambiarContraseña.as_view(), name="CambiarContraseña"),

]