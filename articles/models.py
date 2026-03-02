from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse


class Articles(models.Model):
    title = models.CharField(max_length=25)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        get_user_model(),
        on_delete = models.CASCADE
    )

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('article_content', args=[self.id])
    
class Comment(models.Model):
    # foreign key name
    article = models.ForeignKey(Articles, on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=150)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.comment
    
    def get_absolute_url(self):
        return reverse('article_content', args=[self.id])
