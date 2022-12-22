[![Alpha](https://raster.shields.io/badge/maturity-Alpha-red.png)]()
[![MIT license](https://img.shields.io/badge/license-MIT-green)](https://mit-license.org/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/89c960f1999542b4befa368dd2e1f697)](https://www.codacy.com/gh/VictorHachard/user-application/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=VictorHachard/user-application&amp;utm_campaign=Badge_Grade)
[![CI/CD](https://github.com/VictorHachard/user-application/actions/workflows/actions-ci-cd-angular-app.yml/badge.svg)](https://github.com/VictorHachard/user-application/actions/workflows/actions-ci-cd-angular-app.yml)

# User Application

![screenshot](../master/res/tfe-application.gif)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Build and Deploy with Nginx on Linux

[How to Deploy an Angular app in Production with Nginx](https://arjunphp.com/deploy-angular-app-production-nginx/)

First update the apt-get package lists and then install Nginx using apt-get:

```bash
sudo apt-get update
sudo apt-get install nginx
```

Then open the default file to configure server which is located in /etc/nginx/sites-available/ directory. Delete everything in this configuration file and paste the following content:

```bash
server {
    listen 80 http2;
    listen [::]:80 http2;

    gzip on;
    gzip_types text/plain application/xml;
    gzip_proxied no-cache no-store private expired auth;
    gzip_min_length 1000;

    location ~* \.(css|js|woff|ttf|otf|svg|woff2|eot)$ {
       expires 7d;
       access_log off;
       add_header Pragma public;
       add_header Cache-Control "public, max-age=604800";
       add_header X-Asset "yes";
   }

   location ~* \.(ico|gif|jpeg|jpg|png)$ {
       expires 30d;
       access_log off;
       add_header Pragma public;
       add_header Cache-Control "public, max-age=18144000";
       add_header X-Asset "yes";
   }

    root /var/www/html/<repository-name>/deploy_dist/<application-name>;
    index index.html;

    server_name <server_name>;

    location / {
        try_files $uri $uri/ /index.html =404;
    }
}
```

To make the changes active, restart the web server nginx:

```bash
sudo systemctl restart nginx
```

Now check the status of Nginx service by running following command, you should get “active” green color text along with other text.

```bash
sudo systemctl status nginx
```

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

When you run the `ng build --prod` command, it creates a `/dist` folder and it places all compiled files inside it.

```bash
sudo rm -rf /var/www/html/<repository-name>/deploy_dist/<application-name>/*
```

### Build and Deploy using Github Actions - CI/CD

Using the `actions-ci-cd-angular-app.yml` workflow:

Make sure on that the target directory was the right permission (`sudo chmod 777 target_directory`).

#### Github secrets

-   HOST
-   PASSWORD
-   PATH: `/var/www/html/<repository-name>/`
-   PORT
-   USERNAME

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## What I Learned

-   Angular
-   TypeScript

## Authors & Contributors

-   **Hachard Victor** - *Initial work* - [VictorHachard](https://github.com/VictorHachard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](../master/LICENSE) file for details.
