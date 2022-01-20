   # Final challenge using java language<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a>
<div style="display: inline_block">
Performing Employee registration project and connecting Backend with Frontend  <img  align="center" alt="html5" src="https://img.shields.io/static/v1?label=DevSchool&message=MJV&color=blueviolet"/>  <a href="https://www.java.com" target="_blank"> 
  
  #### Authors
- [Wagner dos Santos ](https://github.com/wbatista985)

## Requirements

For building and running the application you need:

- [Spring Boot](http://maven.apache.org/download.cgi)
- [Maven](http://maven.apache.org/download.cgi)
- [PostgresSQL](http://maven.apache.org/download.cgi)

## Running

First, clone the project and build locally:

```shell
https://github.com/wbatista985/mjv-projeto-final.git
```

Make sure you have a PostgresSQL database called "postgres".

From project root directory run:

```shell
spring-boot:run
```
We have an API written in Java, using the Spring framework which is used to register employees.
For our application to work, it is necessary for employees to register in the system. Each employee is represented by the following class:

```
  
  
```

- `@Entity`: Our User class is an entity that will be mapped to our database.
- `@Id/@GeneratedValue`: The annotated attribute will be the primary key of the table and will be generated automatically using the IDENTITY strategy.
# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
