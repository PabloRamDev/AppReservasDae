from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('solicitud/',views.SolicitudView.as_view(), name= 'Solicitudes'),
    path('usuarios/',views.UserView.as_view(), name= 'Usuarios'),
    path('invitacion/',views.invitacionView.as_view(), name= 'Invitaciones'),
    path('solicitante/',views.getSoli, name= 'Solicitante'),
    path('invimasiva/',views.inviMasiva, name= 'Invitación Masiva'),
    path('getsinglesoli/',views.getsinglesoli, name= 'solicitud'),
    path('getinvisoli/',views.getInviSoli, name= 'invitacionesSoli'),
    path('getmisinvis/',views.getMisInvis, name= 'mis invitaciones'),   
    path('getsingleinvi/',views.getSingleInvi, name= 'invitacion'),
    path('getsingleuser/',views.getSingleUser, name= 'usuario'),
    path('getestemail/',views.EstudiantesList.as_view()),
    path('getestudiantes/',views.getEstudiantes, name= 'estudiantes'),
    path('evento/',views.EventoView.as_view(), name='eventos'),
    path('crearbanner/', views.BannerView.as_view(), name='banner')
]