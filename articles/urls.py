from django.urls import path

from .views import (ArticlesListView, 
                    ArticlesDetailView,
                    ArticleUpdateView,
                    ArticleDeleteView,
                    ArticleCreateView
                    )

urlpatterns = [
    path('<int:pk>/edit/', ArticleUpdateView.as_view(), name='article_edit'),
    path('<int:pk>/', ArticlesDetailView.as_view(), name='article_content'),
    path('<int:pk>/delete/', ArticleDeleteView.as_view(), name='article_delete'),
    path('new/', ArticleCreateView.as_view(), name = 'article_new'),
    path('', ArticlesListView.as_view(), name='article_list')
]