from django.shortcuts import redirect
from django.contrib.auth.mixins import (LoginRequiredMixin,
                                        UserPassesTestMixin)
from django.views.generic import ListView, DetailView
from django.views.generic.edit import UpdateView, DeleteView, CreateView
from django.urls import reverse_lazy

from .models import Articles, Comment

class ArticlesListView(LoginRequiredMixin, ListView):
    model = Articles
    template_name = 'article_list.html'
    login_url = 'login'

class ArticlesDetailView(LoginRequiredMixin, DetailView):
    model = Articles
    template_name = 'article_content.html'
    login_url = 'login'
    context_object_name = 'object'

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        comment_text = request.POST.get('comment')
        if comment_text:   # only need the comment text
            Comment.objects.create(
                article=self.object,
                author=request.user,   # logged-in user
                comment=comment_text
            )
        return redirect('article_content', pk=self.object.pk)


class ArticleUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Articles
    fields = ['title', 'body']
    template_name = 'article_edit.html'
    login_url = 'login'

    def test_func(self):
        obj = self.get_object()
        return obj.author == self.request.user


class ArticleDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Articles
    template_name = 'article_delete.html'
    success_url = reverse_lazy('article_list')
    login_url = 'login'

    def test_func(self):
        obj = self.get_object()
        return obj.author == self.request.user

class ArticleCreateView(LoginRequiredMixin, CreateView):
    model = Articles
    template_name = 'article_new.html'
    fields = ('title', 'body')
    login_url = 'login'

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
