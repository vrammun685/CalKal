from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','username','first_name','last_name', 'email','altura', 'edad', 'peso','genero', 'objetivo', 'actividad','imagen_Perfil', 'notificaciones']
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = Usuario.objects.create_user(**validated_data)
            return user

class PesoRegistradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PesoRegistrado
        fields = ['id', 'peso', 'fecha', 'foto_pesaje', 'usuario']

class DiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diario
        fields = ['id', 'usuario', 'fecha', 'calorias']

class ComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comida
        fields = ['id', 'usuario', 'diario', 'numeroPersonas']

class AlimentoComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlimentoComida
        fields = [
            'id', 'comida', 'cantidad', 'nombre_es', 'nombre_en', 
            'medida', 'grasas', 'proteinas', 'carbohidratos', 'codigoAlimentos'
        ]

class AlimentoConsumidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlimentoConsumido
        fields = [
            'id', 'diario', 'cantidad', 'nombre_es', 'nombre_en', 
            'medida', 'grasas', 'proteinas', 'carbohidratos', 
            'codigoAlimentos', 'calorias'
        ]

class EjercicioRealizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EjercicioRealizado
        fields = [
            'id', 'diario', 'nombre_es', 'nombre_en', 
            'calorias', 'codigoEjrcicio'
        ]