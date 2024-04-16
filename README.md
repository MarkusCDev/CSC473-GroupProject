﻿# CSC473-GroupProject

-----------------------------------

Link: https://csc473-ff414.web.app/

-----------------------------------
# Setup

Make sure you have node.js, git, and python downloaded on your end:

node - ```https://nodejs.org/en```

git - ```https://git-scm.com/```

python - ```https://www.python.org/downloads/```

Next open VS code, in a new folder open terminal then:

```git clone https://github.com/MarkusCDev/CSC473-GroupProject.git```

## Front End Setup
```cd frontend```

```cd csc473gp```

```npm install```

include a .env file and include api keys using the following format:
```
VITE_APP_FIREBASE_API_KEY =
VITE_APP_FIREBASE_AUTH_DOMAIN =
VITE_APP_FIREBASE_PROJECT_ID = 
VITE_APP_FIREBASE_STORAGE_BUCKET = 
VITE_APP_FIREBASE_MSG_SENDER_ID = 
VITE_APP_FIREBASE_APP_ID = 
VITE_APP_FIREBASE_MEASUREMENT_ID = 
VITE_APP_CLOUD_API_URL = http://127.0.0.1:8080
```

## Back End Setup
```cd backend```

```python -m venv env```

```env/scripts/activate```

```pip install -r requirements.txt```

```flask run```

include a ```auth.json``` with the firebase service account key

-----------------------------------

## Tech Stack + APIS

### Frontend - React, JS
### Framework - Tailwind CSS
### Backend - Flask, Python
### Database - Google Firebase (nonSQL)
### Frontend Hosting - Firebase
### Backend Hosting - Google CLoud instance
### Tooling - Docker Containers
