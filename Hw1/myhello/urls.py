from django.urls import path
from . import views

urlpatterns = [
    path('courselist', views.courselist, name='courselist'), # [cite: 1656]
    path('addcourse', views.addcourse, name='addcourse'),   # [cite: 1658]
]