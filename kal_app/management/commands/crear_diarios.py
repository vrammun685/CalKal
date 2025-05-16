from django.core.management.base import BaseCommand
from datetime import date
from django.contrib.auth.models import User
from kal_app.models import Diario,Usuario  # Ajusta si está en otra app
from kal_app.utils import crearDiario

class Command(BaseCommand):
    help = "Crear diarios para todos los usuarios para el día actual"

    def handle(self, *args, **kwargs):
        hoy = date.today()
        usuarios = Usuario.objects.filter(is_staff=False, is_superuser=False)

        for usuario in usuarios:
            if not Diario.objects.filter(usuario=usuario, fecha=hoy).exists():
                if usuario.peso and usuario.altura and usuario.edad:
                    crearDiario(usuario)
                    self.stdout.write(f"Creado diario para {usuario.username} en {hoy}")
                else:
                    self.stdout.write(f"Usuario {usuario.username} sin datos completos, omitido.")