# Markdown Notes

GeoLogger is a web app that allows you to log your vacation history. Create an account to choose from one of five map styles and modify your vacation history tracking color using any hex color code. An early version of the site can be found with this link: [GeoLogger](https://geo-logger.herokuapp.com).This web app is currently under development and will be expected to contain bugs. If you wish to report a bug, notify me at GeoLogger@gmail.com.

## Table of Contents

- [Tech Stack](#tech-stack)
  - [Front End](#front-end)
  - [Back End](#back-end)
- [Local Setup](#local-setup)
- [Demo](#demo)

## Tech Stack

#### Front-end

- React
- react-router-dom
- redux
- bootstrap/reactstrap
- react-map-gl
- tailwindcss
- axios

#### Back-end

- Node
- express
- jsonwebtoken
- MongoDB/mongoose
- bryptjs

## Local Setup

1. In the root directory, rename `.env.example` to `.env` and add your Mongo URI, JWT access token secret, and JWT refresh token secret to the file.
2. In the `client` directory, rename `.env.example` to `.env` and add your Mapbox token to the file.
3. Run the following commands

   ```
   git clone https://github.com/CShatto99/GeoLogger.git

   cd GeoLogger

   npm run installDep
   ```

4. Servers

   ```
    Option 1 (runs backend and frontend servers):

    npm run dev

    Option 2 (for running both the servers individually):

    npm run server (runs backend server only)

    npm run client (runs frontend server only)
   ```

## API Endpoints

## DEMO

#### LINK - [GeoLogger](https://geo-logger.herokuapp.com)
