<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [x] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MarkusCDev/CSC473-GroupProject">
    <img src="Logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Sole Sphere</h3>

  <p align="center">
    The purpose of this website is to provide a streamlined ecommerce platform for sneakers.
Users on the site have the ability to buy/sell/trade new and used sneakers all in one place. We
want to enhance the experience of sneaker buying by providing competitor pricing and detailed
information on the sneakers that our users post, so that way all your research can be done on one
website without having to bounce back and forth.
    <br />
    <a href="https://github.com/MarkusCDev/CSC473-GroupProject"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://csc473-ff414.web.app/">View Demo</a>
    ·
    <a href="https://github.com/MarkusCDev/CSC473-GroupProject/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/MarkusCDev/CSC473-GroupProject/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Flask][Flask]][Flask-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Google Cloud][GoogleCloud]][GoogleCloud-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
* [![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Prerequisites

Make sure you have node.js, git, and python downloaded on your end:
* [Node.js](https://nodejs.org/en)
* [Git](https://git-scm.com/)
* [Python](https://www.python.org/downloads/)

Next, open VS code, in a new folder open terminal then:

```git clone https://github.com/MarkusCDev/CSC473-GroupProject.git```

You should now see Frontend and Backend Folders


## Installation

### Front End Setup

```sh
cd Frontend
cd csc473gp
npm install
```

Before you can run, you need to create a `.env` file (same file root as `firebase.js`) with your Firebase configuration:
```
VITE_APP_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
VITE_APP_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
VITE_APP_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
VITE_APP_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
VITE_APP_FIREBASE_MSG_SENDER_ID=<YOUR_FIREBASE_MSG_SENDER_ID>
VITE_APP_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
VITE_APP_FIREBASE_MEASUREMENT_ID=<YOUR_FIREBASE_MEASUREMENT_ID>
VITE_APP_CLOUD_API_URL=http://127.0.0.1:8080
```

Now to run:
```sh
npm run dev
```

### Back End Setup

```sh
cd backend
python -m venv env
env/scripts/activate
pip install -r requirements.txt
flask run
```

Side note: When making changes in backend, you have to restart `flask run` to have it run the new stuff.

Add `auth.json` file with your Firebase admin configuration:
```json
{
  "type": "service_account",
  "project_id": "<YOUR_PROJECT_ID>",
  "private_key_id": "<YOUR_PRIVATE_KEY_ID>",
  "private_key": "<YOUR_PRIVATE_KEY>",
  "client_email": "<YOUR_CLIENT_EMAIL>",
  "client_id": "<YOUR_CLIENT_ID>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<YOUR_CLIENT_EMAIL>"
}
```

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

### Initial Setup
- [x] Set up repository
- [x] Install initial dependencies
- [x] Configure Firebase and Google Cloud

### Frontend Development
- [x] Set up React with Tailwind CSS
- [x] Implement initial UI components

### Backend Development
- [x] Set up Flask server
- [x] Implement API endpoints

### Hosting and Deployment
- [x] Configure Firebase for frontend hosting
- [x] Configure Google Cloud for backend hosting

### Feature Development
- [x] Implement user authentication
- [x] Implement sneaker listing (buy/sell/trade/auction)
- [x] Implement competitor pricing comparison
- [x] Implement location-based listing views using Google Maps API
- [x] Implement search bar with ChatGPT-Turbo-3 for shoe recommendations

### Testing and QA
- [x] Set up CI/CD pipeline for automated testing
- [x] Perform unit and integration tests
- [x] Conduct user acceptance testing

### Beta Release
- [x] Launch beta version

### Full Release
- [x] Implement final adjustments and fixes
- [x] Launch full version to the public

See the [open issues](https://github.com/your_username/your_repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<p>Markus Chmiel - mchmiel000@citymail.cuny.edu</p>
<p>Melido Bello - mbellon000@citymail.cuny.edu</p>
<p>Devin Munoz - dmunoz005@citymail.cuny.edu</p>


Project Link: [https://github.com/MarkusCDev/CSC473-GroupProject](https://github.com/MarkusCDev/CSC473-GroupProject)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- **Team Members**: 
  - Markus Chmiel
  - Devin Munoz
  - Melido Bello

- **Mentors and Advisors**:
  - Donato Cruz - For guidance and support throughout the project.

- **Resources**:
  - [React Documentation](https://reactjs.org/docs/getting-started.html) - For comprehensive React documentation.
  - [Firebase Documentation](https://firebase.google.com/docs) - For Firebase integration and support.
  - [Google Cloud Documentation](https://cloud.google.com/docs) - For deploying and managing the backend.
  - [Flask Documentation](https://flask.palletsprojects.com/en/2.0.x/) - For backend development with Flask.
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs) - For styling and layout with Tailwind CSS.

- **Tools**:
  - [Visual Studio Code](https://code.visualstudio.com/) - For a powerful and versatile code editor.
  - [GitHub](https://github.com/) - For version control and project management.
  - [Postman](https://www.postman.com/) - For API testing and development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/MarkusCDev/CSC473-GroupProject/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/MarkusCDev/CSC473-GroupProject/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/MarkusCDev/CSC473-GroupProject/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/MarkusCDev/CSC473-GroupProject/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/MarkusCDev/CSC473-GroupProject/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
[GoogleCloud]: https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[GoogleCloud-url]: https://cloud.google.com/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
