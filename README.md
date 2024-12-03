# thefirm

This repository contains the code for thefirm, a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

## How to run the code

Prerequisites:
- Node.js
- npm
- Redis

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm build` to complete the classes and enums
4. Run `brew services start redis` to start the redis server
5. Start the websocket server with `npm run start-ws`
6. Start the background workers with `npm run start-workers`
7. Run `npm run dev` to start the Next.js server

## Overview

The firm is a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

The firm is built using Node.js and Typescript.

Configure the team in the `team` folder.

Configure the workflows in the `workflows` folder.

Configure the artifacts in the `artifacts` folder.

Configure the reports in the `reports` folder.

Configure the startup idea meta data  in the `blueprint` folder.
