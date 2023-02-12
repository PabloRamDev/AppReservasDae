from api.models import User, Solicitud, Invitacion, Evento, Banner
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.conf import settings
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['tipo'] = user.tipo
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email','username', 'password', 'password2','tipo')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username = validated_data['username'],
            tipo = validated_data['tipo']
        )
        
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password','is_active','is_staff','is_superuser','is_verified','last_login','user_permissions')
        


class SolicitudSerializer(serializers.ModelSerializer):

    solicitante = UserSerializer(read_only = True)
    solicitante_id = serializers.IntegerField(write_only = True)
    
    
    class Meta:
        model = Solicitud
        fields = ['id','solicitante','horaIni','horaTer','participantes','evento','clave','estado','mensaje','solicitante_id','admin_id','vigencia']
        depth = 1

    def create (self, validated_data):
        solicitud = Solicitud.objects.create(
            solicitante_id = validated_data['solicitante_id'],
            horaIni = validated_data['horaIni'],
            horaTer = validated_data['horaTer'],
            participantes = validated_data['participantes'],
            evento = validated_data['evento'],  
            # vigencia = validated_data['vigencia'], 
        )
        
        return solicitud


class EventoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Evento
        fields = ['event_id','title','start','end','color','disabled','description']

    def create (self, validated_data):
        evento = Evento.objects.create(
            title = validated_data['title'],
            start = validated_data['start'],
            end = validated_data['end'],
            disabled = validated_data['disabled'],
            description = validated_data['description']
        )
        evento.save()
        return evento
    
class InvitacionSerializer(serializers.ModelSerializer):

    invitado = UserSerializer(read_only = True)
    solicitud = SolicitudSerializer(read_only = True)
    invitado_id = serializers.IntegerField(write_only = True)
    solicitud_id = serializers.IntegerField(write_only = True)

    class Meta:
        model = Invitacion
        fields = ['id','solicitud','invitado','estado','solicitud_id','invitado_id']
        depth = 1

    def create (self, validated_data):
        invitacion = Invitacion.objects.create(
            solicitud_id = validated_data['solicitud_id'],
            invitado_id = validated_data['invitado_id'],
            estado = validated_data['estado']
        )
        invitacion.save()
        return invitacion

class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()

    class Meta:
        model = Banner
        fields = ["imagen_url", "imagen", "timestamp"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("imagen")

        return representation