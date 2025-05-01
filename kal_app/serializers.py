from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','username','first_name','last_name', 'email','altura', 'edad', 'peso','genero', 'objetivo', 'actividad','imagen_Perfil', 'notificaciones', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if Usuario.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso")
        return value
        
    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está registrado")
        return value

    def create(self, validated_data):
        user = Usuario.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    usuario = serializers.CharField()
    password = serializers.CharField(write_only=True)

class PesoRegistradoSerializer(serializers.ModelSerializer):
    foto_pesaje = serializers.SerializerMethodField()

    class Meta:
        model = PesoRegistrado
        fields = ['id', 'peso', 'fecha', 'foto_pesaje', 'usuario']

    def get_foto_pesaje(self, obj):
        request = self.context.get('request')
        if obj.foto_pesaje and hasattr(obj.foto_pesaje, 'url'):
            return request.build_absolute_uri(obj.foto_pesaje.url) if request else obj.foto_pesaje.url
        return None

class DiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diario
        fields = ['id', 'usuario', 'fecha', 'calorias_Consumidas', 'calorias_a_Consumir']

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