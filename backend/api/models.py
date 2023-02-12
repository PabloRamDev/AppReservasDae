import uuid
import os
import random
import string
from django.db import models
from django.contrib.auth.models import( AbstractBaseUser,BaseUserManager,PermissionsMixin)
from django.db.models.signals import post_save, post_delete, pre_save
from django.utils import timezone
from django.dispatch import receiver
from django.conf import settings
from django.core.mail import send_mail
from cloudinary.models import CloudinaryField


CLOUD_NAME = os.environ.get("CLOUD_NAME")




#Usuarios
class UserManager(BaseUserManager):
    
    def create_user(self,username,email,password=None):
        if username is None:
          raise TypeError('El nombre de usuario es obligatorio')
        if email is None:
          raise TypeError('El email es obligatorio')

        user=self.model(username=username,email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user 

    def create_superuser(self, username,email,password=None):
        if password is None:
          raise TypeError('El nombre de usuario es obligatorio')
        if email is None:
          raise TypeError('El email es obligatorio')

        user = self.create_user(username,email,password)  
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    
class User(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=255,unique=False,db_index=True)
    email = models.EmailField(max_length=255,unique=True,db_index=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    TIPO_USUARIOS = (
        ('a', 'Alumno'),
        ('d', 'Dae'),
        ('i', 'Informatico'),
    )
    ESTADO_USUARIOS = (
        ('b', 'Bloqueado'),
        ('a', 'Activo'),
  
    )
    tipo = models.CharField(
        max_length=1,
        choices=TIPO_USUARIOS,
        blank=False,
        default='a',
        help_text='Tipo de usuario',
    )

    estado = models.CharField(
        max_length=1,
        choices=ESTADO_USUARIOS,
        blank=False,
        default='a',
        help_text='Tipo de usuario',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

# Create your models here.

class Solicitud(models.Model):
    solicitante = models.ForeignKey('User', on_delete=models.CASCADE ,null = True)
    admin_id = models.IntegerField(default= 0, null = True, blank = True)
    horaIni = models.DateTimeField(auto_now=False, auto_now_add=False, null = True, blank= True)
    clave = models.CharField(max_length=8, default="",null=True, blank=True)
    participantes = models.IntegerField(default=0, null = True, blank = True)
    horaTer = models.DateTimeField(auto_now=False, auto_now_add=False, null = True, blank= True)
    evento = models.CharField(max_length=300, null = True, blank = True)
    mensaje = models.CharField(max_length=300, null = True, blank = True, default=" ")

    ESTADOS_SOL = (
    ('p','Pendiente'),
    ('a','Aprobada'),   
    ('r', 'Rechazada'), 
    )

    estado = models.CharField(max_length = 1, choices = ESTADOS_SOL, blank= True, default = 'p',help_text = 'Estado de la solicitud')
    vigencia = models.CharField(max_length= 10, null = False, blank = True, default= "True");

class Evento(models.Model):
    event_id = models.BigAutoField(primary_key= True)
    title = models.CharField(max_length=300, null = True, blank = True,)
    start = models.DateTimeField(auto_now=False, auto_now_add=False, null = True, blank= True)
    end = models.DateTimeField(auto_now=False, auto_now_add=False, null = True, blank= True)
    color = models.CharField(max_length = 9, null = True, blank = True)
    disabled = models.CharField(max_length= 5, null=True, blank = True, default="false")
    description = models.CharField(max_length=300, null = True, blank = True,)



class Invitacion(models.Model):
    solicitud = models.ForeignKey('Solicitud', on_delete=models.CASCADE, null = True)
    invitado = models.ForeignKey('User', on_delete=models.CASCADE, null= True)
    ESTADOS_INV = (
    ('v','Vigente'),
    ('a','Aprobada'),
    ('r', 'Rechazada'),
    ('c','Caducada'),
    )

    estado = models.CharField(max_length = 1, choices = ESTADOS_INV, blank= True, default = 'v',help_text = 'Estado de la invitación')

class Banner(models.Model):
    imagen = CloudinaryField("image")
    timestamp = models.DateTimeField(default=timezone.now)
    titulo = models.CharField(max_length=300, null = True, blank = True)

    @property
    def imagen_url(self):
        return (
            f"https://res.cloudinary.com/{CLOUD_NAME}/{self.image}"
        )


def get_random_string():
    # choose from all lowercase letter
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(8))
    return result_str
    

@receiver(pre_save)
def generarClave(sender,instance,*args,**kwargs):
    instance.clave = get_random_string()


