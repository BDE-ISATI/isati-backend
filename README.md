<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![AGPL-3.0 License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<br />
<div align="center">
  <a href="https://github.com/BDE-ISATI/isati-backend">
    <img src="pb_public/logo.png" alt="Logo" width="320" height="320">
  </a>

  <h3 align="center">ISATI Backend</h3>

  <p align="center">
    The backend of the website of ISATI, the student association of ESIR (University of Rennes).
    <br />
    <br />
    <a href="https://isati.org">View Website</a>
    &middot;
    <a href="https://github.com/BDE-ISATI/isati-backend/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/BDE-ISATI/isati-backend/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#useful-commands">Useful Commands</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



## About the Project

Backend of the ISATI website, the student association of ESIR (University of Rennes).

It is a [PocketBase](https://pocketbase.io/) server handling authentication, users, roles and permissions,
file storage, rooms, clubs and the WEI. Business rules are enforced server-side by JavaScript hooks.

This repository holds the **backend only**. The frontend lives in
[BDE-ISATI/isati-website](https://github.com/BDE-ISATI/isati-website).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![PocketBase][PocketBase]][PocketBase-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![SQLite][SQLite]][SQLite-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Getting Started

### Prerequisites

* The [PocketBase](https://github.com/pocketbase/pocketbase/releases) 0.39.x binary for your OS
  (it is not versioned in this repository)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BDE-ISATI/isati-backend.git
   cd isati-backend
   ```
2. Download PocketBase and put the `pocketbase` (or `pocketbase.exe`) binary at the root of the project
3. Start the server (migrations in `pb_migrations/` are applied automatically)
   ```sh
   ./pocketbase serve
   ```
4. Create a superuser
   ```sh
   ./pocketbase superuser upsert you@example.com yourpassword
   ```
5. Open the admin dashboard at [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)

### Configuration

There is no `.env` file: the server is configured from the admin dashboard (**Settings**).

| Setting               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| Application URL       | Public URL of the frontend, used in email links                 |
| Mail settings (SMTP)  | Required for email verification and password reset              |
| `listRooms` records   | Configuration used by the room synchronisation job              |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Useful Commands

| Command                                     | Description                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `./pocketbase serve`                        | Starts the server on `http://127.0.0.1:8090`                             |
| `./pocketbase migrate collections`          | Creates a migration snapshot of the current collections                  |
| `./pocketbase superuser upsert EMAIL PASS`  | Creates or updates a superuser                                           |
| `npm run types` (in `isati-website`)        | Regenerates the frontend types from `pb_data/data.db` after a schema change |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Project Structure

```
pb_hooks/          # JavaScript hooks: one file per collection, custom routes, crons
├── utils/         # Shared helpers (permissions, mail, rooms, WEI…)
└── views/         # Email HTML templates
pb_migrations/     # Schema migrations
pb_public/         # Static files served at /
pb_data/           # Database and uploaded files (gitignored)
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Roadmap

- [ ] Clubs
- [ ] BDE membership
- [ ] Collaborative space for past exams
- [ ] Home page (in progress)
- [ ] Rooms (in progress)
- [ ] Ongoing events
- [ ] WEI feature code cleanup

See the [open issues](https://github.com/BDE-ISATI/isati-backend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request against `main`

### Top contributors:

<a href="https://github.com/BDE-ISATI/isati-backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BDE-ISATI/isati-backend" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## License

Distributed under the GNU Affero General Public License v3. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Contact

All contacts are listed on the home page of [isati.org](https://isati.org).

Project Link: [https://github.com/BDE-ISATI/isati-backend](https://github.com/BDE-ISATI/isati-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Shields.io](https://shields.io)
* [contrib.rocks](https://contrib.rocks)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[contributors-shield]: https://img.shields.io/github/contributors/BDE-ISATI/isati-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/BDE-ISATI/isati-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BDE-ISATI/isati-backend.svg?style=for-the-badge
[forks-url]: https://github.com/BDE-ISATI/isati-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/BDE-ISATI/isati-backend.svg?style=for-the-badge
[stars-url]: https://github.com/BDE-ISATI/isati-backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/BDE-ISATI/isati-backend.svg?style=for-the-badge
[issues-url]: https://github.com/BDE-ISATI/isati-backend/issues
[license-shield]: https://img.shields.io/github/license/BDE-ISATI/isati-backend.svg?style=for-the-badge
[license-url]: https://github.com/BDE-ISATI/isati-backend/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://fr.linkedin.com/company/bde-isati
[PocketBase]: https://img.shields.io/badge/PocketBase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=black
[PocketBase-url]: https://pocketbase.io/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/docs/Web/JavaScript
[SQLite]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/
