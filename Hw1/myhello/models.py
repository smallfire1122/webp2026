from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class Course_table(models.Model):
    Department = models.CharField(max_length=100)    
    CourseTitle = models.CharField(max_length=100)   
    Instructor = models.CharField(max_length=100)    