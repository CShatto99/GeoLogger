# GeoLogger

GeoLogger is a web app that allows you to log your vacation history. Create an account to choose from one of five map styles and change your vacation history tracking color using any hex color code. An early version of the site can be found at [GeoLogger](https://geo-logger.herokuapp.com). This web app is currently under development and will be expected to contain bugs. If you discover a bug please notify me at geologgerservice@gmail.com.

## Table of Contents

- [Tech Stack](#tech-stack)
  - [Front End](#front-end)
  - [Back End](#back-end)
- [Local Setup](#local-setup)
- [Demo](#demo)

## Tech Stack

#### Front end

- React
- react-router-dom
- redux
- styled-components
- react-map-gl
- axios

#### Back end

- node
- express
- jsonwebtoken
- MongoDB/mongoose
- bcryptjs

## Local Setup

1. Run the following commands

   ```
   git clone https://github.com/CShatto99/GeoLogger.git

   cd GeoLogger

   npm run installDep
   ```

2. In the root directory, rename `.env.example` to `.env` and fill out the placeholder variable values.
3. In the `client` directory, rename `.env.example` to `.env` and add your Mapbox token. Click [here](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/) to create a Mapbox token.
4. Servers

   ```
    Option 1 (runs backeend and fronteend servers):

    npm run dev

    Option 2 (for running both the servers individually):

    npm run server (runs backeend server only)

    npm run client (runs fronteend server only)
   ```

## DEMO

#### LINK - [GeoLogger](https://geo-logger.herokuapp.com)
