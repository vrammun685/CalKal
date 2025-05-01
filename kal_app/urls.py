from django.urls import path
from .views import *

urlpatterns = [

    #Login y Registros
    path('api/register/', RegistroUsuario.as_view(), name='register'),
    path('api/login/', Login.as_view(), name="login"),
    path('api/solicitar-contraseña/', SolicitarCorreoPass.as_view(), name="SolicitarCorreoPass"),
    path('api/CambiaContraseña/<uidb64>/<token>/', CambiarContraseña.as_view(), name="CambiarContraseña"),
    path("api/logout/", Logout.as_view(), name="logout"),

    #Token
    path('api/checktoken/', CheckToken.as_view(), name="checkToken"),
    path('api/refreshtoken/', Refresh_Token.as_view(), name="refreshToken"),

    #Paginas
    path('api/home/', Home.as_view(), name="Home"),
    path('api/diario/', Diarios.as_view(), name="Diarios"),
    path('api/pesos/', Pesos.as_view(), name='pesos'),
    path('api/pesos/<int:pk>/', Pesos.as_view(), name='pesoseliminar'),


]