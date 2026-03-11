<<<<<<< HEAD
# from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def myIndex(request):
    # my_name = request.GET.get('name', "CGU")
    my_name = request.GET.get('name', "CGU")
=======
# from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def myIndex(request):
    # my_name = request.GET.get('name', "CGU")
    my_name = request.GET.get('name', "CGU")
>>>>>>> 66e258f8c7fadbb871358e82e8eff34f3d41ac55
    return HttpResponse("Hello " + my_name)