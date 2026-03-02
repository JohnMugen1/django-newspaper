## 📰 Django Newspaper
A modern, feature-rich newspaper website built with Django – featuring articles, user authentication, and a beautifully styled comment system.

https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django
https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python
https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite
https://img.shields.io/badge/license-MIT-green?style=for-the-badge

## ✨ Features
### 📝 Articles
Create, read, update, and delete articles

Rich text content with line breaks

Author attribution and publication dates

Clean, card-based layout

### 💬 Comments
User-only commenting system

Real-time comment display

Elegant, animated comment cards

Empty state with friendly messaging

Login prompts for unauthenticated users

### 🔐 Authentication
User registration and login

Role-based permissions (only authors can edit/delete their articles)

Secure password handling

### 🎨 Design
Fully responsive (mobile, tablet, desktop)

Modern gradient aesthetics

Smooth animations and hover effects

Custom CSS with beautiful typography (Inter font)

### 🚀 Live Demo
View Live Demo (update with your actual URL)

### 🛠️ Tech Stack
Backend: Django 5.0

Frontend: HTML5, CSS3

Database: SQLite (development) / PostgreSQL (production ready)

Authentication: Django Auth

Fonts: Google Fonts (Inter)

### 📸 Screenshots
##### Homepage
<img width="947" height="509" alt="homepage-web" src="https://github.com/user-attachments/assets/af246149-7978-4d35-9631-ababe9e053f5" />
<img width="375" height="510" alt="homepage-mobile" src="https://github.com/user-attachments/assets/4b83d210-8c37-45b3-be06-ac224b6bf759" />

##### Article Detail
<img width="949" height="476" alt="article-web" src="https://github.com/user-attachments/assets/9d408506-865d-4c8e-931d-f8bd1cd08358" />
<img width="362" height="511" alt="article-mobile" src="https://github.com/user-attachments/assets/a093c6e6-8795-4dc8-ac40-d604317d5eec" />

##### Comments
<img width="359" height="436" alt="comment-mobile" src="https://github.com/user-attachments/assets/31db4dce-eb1e-4369-8ec3-e2a1881eae12" />
<img width="947" height="439" alt="comment-web" src="https://github.com/user-attachments/assets/d38d0250-7502-4dfd-aa83-33cd371415b7" />


### ⚙️ Installation
Prerequisites
Python 3.13+

pip

virtualenv (recommended)

Step-by-Step Setup
Clone the repository

bash
git clone https://github.com/yourusername/django-newspaper.git
cd django-newspaper
Create and activate virtual environment

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

bash
pip install -r requirements.txt
Run migrations

bash
python manage.py migrate
Create a superuser

bash
python manage.py createsuperuser
Run the development server

bash
python manage.py runserver
Visit the site

Main site: http://127.0.0.1:8000

Admin panel: http://127.0.0.1:8000/admin

### 📁 Project Structure
text
django-newspaper/
├── articles/               # Main app
│   ├── migrations/         # Database migrations
│   ├── templates/          # HTML templates
│   │   ├── article_list.html
│   │   ├── article_content.html
│   │   ├── article_new.html
│   │   ├── article_edit.html
│   │   └── article_delete.html
│   ├── models.py           # Database models
│   ├── views.py            # View logic
│   ├── urls.py             # App URLs
│   └── admin.py            # Admin configuration
├── newspaper_project/      # Project configuration
│   ├── settings.py         # Django settings
│   └── urls.py             # Project URLs
├── static/                 # Static files
│   ├── css/
│   │   ├── article_content.css
│   │   └── comments.css
├── templates/              # Base templates
│   └── base.html
├── manage.py
├── requirements.txt
└── README.md
### 🎯 Usage
#### Creating Articles
Log in to the admin panel or use the "New Article" link

Enter a title and content

Publish – your article appears immediately

#### Commenting
Log in to your account

Navigate to any article

Write your comment in the elegant form

Watch it appear instantly with beautiful animations

### 🔧 Configuration
Environment Variables (Optional)
Create a .env file for sensitive data:

text
SECRET_KEY=your-secret-key
DEBUG=False
Static Files
In production, run:

bash
python manage.py collectstatic
🚢 Deployment
Deploy to PythonAnywhere
Create a PythonAnywhere account

Open a Bash console

Clone your repository

Set up virtual environment

Configure WSGI file

Collect static files

Reload your web app

Detailed deployment guide (link to your guide)

### 🤝 Contributing
Contributions are welcome! Here's how:

Fork the repository

Create a feature branch (git checkout -b feature/amazing)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing)

Open a Pull Request

### 📝 License
This project is licensed under the MIT License – see the LICENSE file for details.

### 🙏 Acknowledgments
Django Documentation

PythonAnywhere for hosting

Google Fonts for Inter typeface

All contributors and users

### 📬 Contact
Your Name – @yourtwitter – email@example.com

Project Link: https://github.com/yourusername/django-newspaper

### ⭐ Support
If you found this project helpful, please give it a ⭐ on GitHub!

### 📊 Stats
https://img.shields.io/github/stars/yourusername/django-newspaper?style=social
https://img.shields.io/github/forks/yourusername/django-newspaper?style=social
https://img.shields.io/github/watchers/yourusername/django-newspaper?style=social

### 🎨 Customization Tips
Colors: Edit the gradients in comments.css and article_content.css

Fonts: Change the Google Font import in the CSS files

Animations: Adjust transition times in the CSS classes

Layout: Modify the grid in template files

### 🐛 Known Issues
None currently – but if you find one, please open an issue!

### 🗓️ Changelog
v1.0.0 (March 2026)
Initial release

Article CRUD functionality

User authentication

Comment system with beautiful styling

Responsive design

