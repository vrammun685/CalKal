from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Diario, PesoRegistrado, AlimentoConsumido, Comida, Alimento
from .serializers import UsuarioSerializer, LoginSerializer, DiarioSerializer, PesoRegistradoSerializer, AlimentoConsumidoSerializer, ComidaSerializer, AlimentoSerializer
from .utils import correo_bienvenida, correo_recuperar_Contraseña, cambiar_Contraseña, crearDiario, crearPeso
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from datetime import date
from collections import defaultdict
from rest_framework.renderers import JSONRenderer
# Create your views here.
    
class AlimentoListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer
    renderer_classes = [JSONRenderer]

class CheckUsername(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        if username is None:
            return Response({"error": "No username provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        exists = Usuario.objects.filter(username=username).exists()
        return Response({"exists": exists})

class CheckEmail(APIView):
    def get(self, request):
        email = request.query_params.get('email')
        if email is None:
            return Response({"error": "No email provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        exists = Usuario.objects.filter(email=email).exists()
        return Response({"exists": exists})
    
class RegistroUsuario(CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        crearDiario(user)
        crearPeso(user)
        correo_bienvenida(user.email, user.first_name)

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

            #Creamos el diario del dia
            diario = Diario.objects.filter(usuario=user).order_by('-fecha').first()
            if(diario.fecha != date.today()):
                diario = crearDiario(user)

            # Si la autenticación es exitosa, creamos un token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Enviamos el token al frontend
            response = Response({
                "message":"Login successful",
            })
            response.set_cookie(
                key='token',
                value=access_token,
                httponly=True,
                secure=False, #Cambiar en Produccion
                max_age=3600,
                samesite='Lax',
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,
                max_age=7 * 24 * 60 * 60,  # 7 días
                samesite='Lax'
            )
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            return Response({"message": "Token válido"})
        except AuthenticationFailed:
            return Response({"error": "Token no válido o ha expirado, por favor inicie sesión nuevamente."}, status=status.HTTP_401_UNAUTHORIZED)

class Refresh_Token(APIView):
    def post(self, request):
        # Obtener el refresh_token de las cookies
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response({"error": "No se proporcionó refresh token."}, status=400)

        try:
            # Validamos el refresh_token
            refresh = RefreshToken(refresh_token)
            # Recuperamos el usuario usando el 'user_id' en el payload del refresh token
            user = Usuario.objects.get(id=refresh.payload['user_id'])

            # Generamos un nuevo access_token
            new_access_token = str(refresh.access_token)

            # Devolvemos el nuevo access token
            response = Response({
                "access_token": new_access_token
            })
            # Almacenamos el nuevo access token en la cookie
            response.set_cookie(
                key='token',
                value=new_access_token,
                httponly=True,
                secure=False,  # Cambiar a True en producción
                max_age=300,  # Expiración en 5 minutos
                samesite='Lax'
            )
            return response

        except Exception as e:
            # Si algo falla (token inválido, no encontrado, etc.)
            raise AuthenticationFailed('El refresh token no es válido o ha expirado.')
        
class Logout(APIView):
    def post(self, request):
        response = Response({"message":"Logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie('token')
        response.delete_cookie('refresh_token')
        return response

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


class Home(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        diario = Diario.objects.filter(usuario=usuario).order_by('-fecha').first()
        diario_serializado = DiarioSerializer(diario)
        try:
            imagen = request.build_absolute_uri(usuario.imagen_Perfil.url)
        except (ValueError, AttributeError):
            imagen = request.build_absolute_uri('/media/imagenSinPerfil.jpg')
        return Response({"foto_perfil":imagen,
                         "diario": diario_serializado.data,})

class Diarios(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user
        diarios = Diario.objects.filter(usuario=usuario).order_by('-fecha')[:5]

        if not diarios:
            return Response({"detalle": "No hay diarios."}, status=404)

        resultado = []

        try:
            imagen = request.build_absolute_uri(usuario.imagen_Perfil.url)
        except (ValueError, AttributeError):
            imagen = request.build_absolute_uri('/media/imagenSinPerfil.jpg')

        for diario in diarios:
            alimentos = AlimentoConsumido.objects.filter(diario=diario)
            comidas = Comida.objects.filter(diario=diario)

            # Agrupamos alimentos y comidas por parte del día
            alimentos_agrupados = defaultdict(list)
            for a in alimentos:
                alimentos_agrupados[a.parte_del_dia.lower()].append(AlimentoConsumidoSerializer(a).data)

            comidas_agrupadas = defaultdict(list)
            for c in comidas:
                comidas_agrupadas[c.parte_del_dia.lower()].append(ComidaSerializer(c).data)

            resultado.append({
                "fecha": diario.fecha,
                "alimentos": alimentos_agrupados,
                "comidas": comidas_agrupadas,
            })

        return Response({
            "foto_perfil": imagen,
            "diarios": resultado
        })
    
class Pesos(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario= request.user
        pesos = PesoRegistrado.objects.filter(usuario=request.user)
        serializer = PesoRegistradoSerializer(pesos, many=True, context={'request': request})
        try:
            imagen = request.build_absolute_uri(usuario.imagen_Perfil.url)
        except (ValueError, AttributeError):
            imagen = request.build_absolute_uri('/media/imagenSinPerfil.jpg')
        return Response({"pesos":serializer.data,
                         "foto_perfil":imagen})
    
    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            peso = PesoRegistrado.objects.get(pk=pk, usuario=self.request.user)
            peso.delete()

            return Response({'mensaje':'Peso eliminado'}, status=status.HTTP_204_NO_CONTENT)
        except PesoRegistrado.DoesNotExist:
            return Response({'error':'Peso no encontrado'}, status=status.HTTP_404_NOT_FOUND)