
from functools import partial
from http.client import HTTPResponse
from logging import raiseExceptions
from multiprocessing import context
from statistics import mode
from sys import api_version
from wsgiref.util import FileWrapper
from django.shortcuts import render
from django.forms.models import model_to_dict
from api import serializer
from rest_framework.decorators import api_view
from django.core.files import File
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
from django.http import JsonResponse, HttpResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, SolicitudSerializer, EventoSerializer, UserSerializer, InvitacionSerializer, BannerSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from api.models import User, Solicitud, Invitacion, Evento, Banner
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import datetime


# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
   

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/login/',
        '/api/register/',
        '/api/familia/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET'])
def getSingleUser(self):
    queryset = User.objects.filter(id=self.query_params.get('id'))
    serializer = UserSerializer(queryset, many = True)
    return Response(serializer.data)


class UserView(APIView):
    def get (self, request):
        queryset = User.objects.filter(tipo= 'a')
        serializer = UserSerializer(queryset, many= True)
        return Response(serializer.data)


class crearBanner(generics.CreateAPIView):
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser,)
    queryset = Banner.objects.all();


class EventoView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        eventos = Evento.objects.all()
        serializer = EventoSerializer(eventos, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request):

        evento = Evento.objects.filter(
            event_id=request.data['event_id']).first()
        serializer = EventoSerializer(evento, data=request.data)
        if serializer.is_valid(raiseExceptions):
            serializer.save()
        return Response(serializer.data)

    def delete(self, request):

        evento = Evento.objects.get(pk=self.request.query_params.get('pk'))
        evento.delete()
        return Response({'deletedId': self.request.query_params.get('pk')})

@api_view(['POST'])
def inviMasiva(request):
    ini = datetime.datetime.strptime(
        request.data['solicitud']['horaIni'], "%Y-%m-%dT%H:%M:%SZ")
    ter = datetime.datetime.strptime(
        request.data['solicitud']['horaTer'], "%Y-%m-%dT%H:%M:%SZ")
    solicitante = request.data['solicitud']['solicitante']['username']
    evento = request.data['solicitud']['evento']
    evento_id = request.data['solicitud']['id']
    mensaje = request.data['mensaje']

    for inv in request.data['invitados']:
        invitado = inv['user_id']['username']
        invitado_email = inv['user_id']['email']
        invitado_id = inv['user_id']['id']
        
        datos = {
            'horaIni': ini,
            'horaTer': ter,
            'solicitante': solicitante,
            'evento': evento,
            'mensaje': mensaje,
            'invitado': invitado,
            'invitado_email': invitado_email}

        enviarInvi(datos)

        data = {'invitado_id': invitado_id, 'solicitud_id': evento_id,'estado': 'v'}
        serializer = InvitacionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

@api_view(['GET'])
def getSoli(self):

    solicitudes = Solicitud.objects.filter(
        solicitante_id=self.query_params.get('id'))
    serializer = SolicitudSerializer(solicitudes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getInviSoli(self):

    invitaciones = Invitacion.objects.filter(
        solicitud_id=self.query_params.get('id'),
        estado='a')
    serializer = InvitacionSerializer(invitaciones, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMisInvis(self):
    
    invitaciones = Invitacion.objects.filter(
        invitado_id=self.query_params.get('id'),
        estado = 'v'
        )
    serializer = InvitacionSerializer(invitaciones, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSingleInvi(self):
    
    invitaciones = Invitacion.objects.filter(
        solicitud_id = self.query_params.get('id')
        )

    serializer = InvitacionSerializer(invitaciones, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEstudiantes(self):
    estudiantes = User.objects.filter(tipo='a')
    serializer = UserSerializer(estudiantes, many=True)
    return Response(serializer.data)

class EstudiantesList(generics.ListCreateAPIView):
    queryset = User.objects.filter(tipo='a')
    serializer_class = UserSerializer
    name = 'lista_estudiantes'
    search_fields = (
        '^email',
    )

@api_view(['GET'])
def getsinglesoli(self):
    soli = Solicitud.objects.filter(id=self.query_params.get('id'))
    serializer = SolicitudSerializer(soli, many=True)
    return Response(serializer.data)

class invitacionView(APIView):


    def patch(self, request):
        invi = Invitacion.objects.filter(
            id=self.request.query_params.get('id')).first()
       
        invi.estado = request.data['estado']   
        invi.save()
        return Response(request.data)


class SolicitudView(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        solicitudes = Solicitud.objects.all()
        serializer = SolicitudSerializer(solicitudes, many=True)
        return Response(serializer.data)

    def post(self, request):

        user = User.objects.get(id=request.data['solicitante_id'])
        request.data['solicitante'] = model_to_dict(user)
        serializer = SolicitudSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            enviarConfiSoli(request)
            return Response(serializer.data)
        
        

    def patch(self, request):
        soli = Solicitud.objects.filter(
            id=self.request.query_params.get('id')).first()
        print(request.data)
        soli.estado = request.data['estado']

        enviarSoliAceptada(soli, soli.estado)
        soli.admin_id = request.data['admin_id']
        soli.save()
        return Response(request.data)
    
    def put(self, request):
        soli = Solicitud.objects.all()
        serializer = SolicitudSerializer(soli, many= True, data = request.data)
        if serializer.is_valid():
            serializer.save(partial= True)
        return Response(request.data)

        # set partial=True to update a data partially

    # def delete (self, request):

    #     prod = InstanciaProd.objects.filter(id = request.query_params.get('pk'))
    #     prod.delete()
    #     return Response("Producto eliminado con éxito")

def enviarSoliAceptada(soli, tipo):

    horaIni = soli.horaIni.strftime("%d/%m/%Y %H:%M:%S")
    horaTer = soli.horaTer.strftime("%d/%m/%Y %H:%M:%S")
    context_data = {'context': {'nombre': soli.solicitante.username,
                                'evento': soli.evento,
                                'horaIni': horaIni, 
                                'horaTer': horaTer}}

    if tipo == 'a':
        html_message = render_to_string(
            'email_templates/solicitud_aceptada.html', context_data)
    elif tipo == 'r':
        html_message = render_to_string(
            'email_templates/solicitud_rechazada.html', context_data)

    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [soli.solicitante.email]
    send_mail(
        'comprobante de solicitud',
        plain_message,
        from_email,
        to,
        html_message=html_message

    )


def enviarConfiSoli(request):

    ini = datetime.datetime.strptime(
        request.data['horaIni'], "%Y-%m-%dT%H:%M:%S.%fZ")
    ter = datetime.datetime.strptime(
        request.data['horaTer'], "%Y-%m-%dT%H:%M:%S.%fZ")
    horaIni = ini.strftime("%d/%m/%Y %H:%M:%S")
    horaTer = ter.strftime("%d/%m/%Y %H:%M:%S")
    context_data = {'context': {'nombre': request.data['solicitante']['username'],
                                'evento': request.data['evento'], 'horaIni': horaIni, 'horaTer': horaTer}}

    html_message = render_to_string(
        'email_templates/solicitud_creada.html', context_data)
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [request.data['solicitante']['email']]
    send_mail(
        'comprobante de solicitud',
        plain_message,
        from_email,
        to,
        html_message=html_message

    )


def enviarInvi(datos):

    horaIni = datos['horaIni'].strftime("%d/%m/%Y %H:%M:%S")
    horaTer = datos['horaTer'].strftime("%d/%m/%Y %H:%M:%S")
    context_data = {'context': {'nombre': datos['solicitante'], 'evento': datos['evento'], 'horaIni': horaIni,
                                'horaTer': horaTer, 'invitado': datos['invitado'], 'solicitante': datos['solicitante'], 'mensaje': datos['mensaje']}}

    html_message = render_to_string(
        'email_templates/invitacion.html', context_data)
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to = [datos['invitado_email']]
    send_mail(
        'comprobante de solicitud',
        plain_message,
        from_email,
        to,
        html_message=html_message

    )

