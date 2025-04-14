from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator

# Create your models here.

class Usuario(AbstractUser):
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    GENEROS = [
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
    ]

    OBJETIVOS = [
        ('Perder peso', 'Perder peso'),
        ('Mantener peso', 'Mantener peso'),
        ('Ganar peso', 'Ganar peso'),
    ]    
    ACTIVIDAD = [
        ('Nula', 'Nula'),
        ('1 a 2 veces en semana', '1 a 2 veces en semana'),
        ('3 a 5 veces en semana', '3 a 5 veces en semana'),
        ('6 a 7 veces en semana', '6 a 7 veces en semana'),
        ('Ejercicio intenso a diario', 'Ejercicio intenso a diario'),
    ]

    altura = models.FloatField(null=True, blank=True)
    edad = models.IntegerField(validators=[MinValueValidator(12)], null=True, blank=True)
    peso = models.FloatField(null=True, blank=True)
    imagen_Perfil = models.ImageField(null=True, blank=True)
    genero = models.CharField(max_length=100, choices=GENEROS, default='Selecciona biologicamente', null=True, blank=True)
    objetivo = models.CharField(max_length=200, choices=OBJETIVOS, default='Selecciona una opcion', null=True, blank=True)
    actividad = models.CharField(max_length=30, choices=ACTIVIDAD, default='Selecciona una opcion', null=True, blank=True)
    notificaciones = models.BooleanField(default=True)

    def __str__(self):
        return self.first_name


class PesoRegistrado(models.Model):
    class Meta:
        verbose_name = 'Pesos Registrados'
        verbose_name_plural = 'Lista de Pesos registrados'

    peso = models.FloatField()
    fecha = models.DateTimeField(auto_now_add=True)
    foto_pesaje = models.ImageField(null=True, blank=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='pesos')

    def __str__(self):
        return f"{self.usuario.username} - {self.peso} kg - {self.fecha.strftime('%Y-%m-%d %H:%M')}"


class Diario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='diarios')
    fecha = models.DateField(auto_now_add=True)
    calorias = models.FloatField(default=0)

    class Meta:
        verbose_name = 'Diario'
        verbose_name_plural = 'Diarios'
        ordering = ['-fecha']

    def __str__(self):
        return f"{self.usuario.username} - {self.fecha} - {self.calorias} kcal"


class Comida(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='comidas')
    diario = models.ForeignKey(Diario, on_delete=models.CASCADE, related_name='comidas', null=True, blank=True)
    numeroPersonas = models.IntegerField(default=1)

    class Meta:
        verbose_name = 'Comida'
        verbose_name_plural = 'Comidas'


class AlimentoComida(models.Model):
    comida = models.ForeignKey(Comida, on_delete=models.CASCADE, related_name='alimentos')
    cantidad = models.FloatField()
    nombre_es = models.CharField(max_length=20)
    nombre_en = models.CharField(max_length=20)
    medida = models.CharField(max_length=20)
    grasas = models.FloatField()
    proteinas = models.FloatField()
    carbohidratos = models.FloatField()
    codigoAlimentos = models.IntegerField()

    class Meta:
        verbose_name = 'Ingrediente'
        verbose_name_plural = 'Ingredientes'


class AlimentoConsumido(models.Model):
    diario = models.ForeignKey(Diario, on_delete=models.CASCADE, related_name='alimentos_consumidos')
    cantidad = models.FloatField()
    nombre_es = models.CharField(max_length=20)
    nombre_en = models.CharField(max_length=20)
    medida = models.CharField(max_length=20)
    grasas = models.FloatField()
    proteinas = models.FloatField()
    carbohidratos = models.FloatField()
    codigoAlimentos = models.IntegerField()
    calorias = models.FloatField()

    class Meta:
        verbose_name = 'Alimento Consumido'
        verbose_name_plural = 'Alimentos Consumidos'


class EjercicioRealizado(models.Model):
    diario = models.ForeignKey(Diario, on_delete=models.CASCADE, related_name='ejercicios_realizados')
    nombre_es = models.CharField(max_length=20)
    nombre_en = models.CharField(max_length=20)
    calorias = models.FloatField()
    codigoEjrcicio = models.IntegerField()

    class Meta:
        verbose_name = 'Ejercicio Realizado'
        verbose_name_plural = 'Ejercicios Realizados'
