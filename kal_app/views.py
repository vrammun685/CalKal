from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer, LoginSerializer
from .utils import correo_bienvenida, correo_recuperar_Contraseña, cambiar_Contraseña
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes


# Create your views here.
    
class RegistroUsuario(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            correo_bienvenida(user.email, user.first_name)
            return Response({"message" : "Usuario creado Correctamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        # Validamos los datos del formulario
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.validated_data['usuario']
            password = serializer.validated_data['password']

            # Intentamos autenticar al usuario con nombre de usuario o email
            user = authenticate(request, username=usuario, password=password)
            if user is None:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            # Si la autenticación es exitosa, creamos un token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Enviamos el token al frontend
            return Response({
                'token': access_token,
                'username' : user.first_name
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SolicitarCorreoPass(APIView):
    def post(self, request):
        email_selec=request.data.get('email')
        usuario = Usuario.objects.filter(email=email_selec).first()
        if usuario:
            uid = urlsafe_base64_encode(force_bytes(usuario.pk))
            token = default_token_generator.make_token(usuario)
            correo_recuperar_Contraseña(usuario, uid, token)
            return Response({"message": "Correo enviado."}, status=status.HTTP_200_OK)
        else:
            
            return Response({"error": "No registrado."}, status=status.HTTP_400_BAD_REQUEST)

class CambiarContraseña(APIView):
    def post(self, request, uidb64, token):
        nueva_Contraseña = request.data.get('password')

        #Decodificar el usuario (UID)
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            usuario = Usuario.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            return Response({'error': 'Usuario no válido'}, status=status.HTTP_400_BAD_REQUEST)
        
        #Verificar el token
        if default_token_generator.check_token(usuario, token):
            cambiar_Contraseña(usuario , nueva_Contraseña)

            return Response({'message': 'Contraseña cambiada correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Token inválido o expirado'}, status=status.HTTP_400_BAD_REQUEST)

