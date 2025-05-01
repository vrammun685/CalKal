from django.core.mail import send_mail
from django.conf import settings
from .models import Diario, PesoRegistrado, Usuario


def correo_bienvenida(email, nombre):
    asunto = "Bienvenido a Calkal"
    mensaje = f"Muchisimas gracias {nombre},\n Por confiar en Calkal para tu proceso de cambio fisico"
    emisario = settings.EMAIL_HOST_USER
    listaReceptores = [email]

    send_mail(asunto, mensaje, emisario, listaReceptores)

def correo_recuperar_Contraseña(usuario, uid, token):
    

    link = f'http://localhost:3000/RecuperarContraseña/EscribirContraseña/{uid}/{token}'

    asunto = 'Recuperar Contraseña'
    mensaje = f"""
        Hola {usuario.username},

        Recibimos una solicitud para restablecer tu contraseña.

        Por favor, hacé clic en el siguiente enlace para establecer una nueva contraseña:

        {link}

        Si no fuiste vos, ignorá este correo.

        Saludos,  
        El equipo de CalKal.
        """
    emisario = settings.EMAIL_HOST_USER
    listaReceptores = [usuario.email]

    send_mail(asunto, mensaje, emisario, listaReceptores)

def cambiar_Contraseña(usuario, nueva_Contraseña):
    usuario.set_password(nueva_Contraseña)
    usuario.save()


def crearDiario(user):
    diario = Diario.objects.create(
        usuario=user,  
        calorias_a_Consumir=user.calcular_Calorias()
    )
    return diario

def crearPeso(usuario):
    PesoRegistrado.objects.create(
        usuario = usuario,
        peso = usuario.peso
    )

    