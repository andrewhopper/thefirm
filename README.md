# thefirm

This repository contains the code for thefirm, a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

## How to run the code

Prerequisites:
- Node.js (brew install node)
- npm (brew install npm)
- Redis (brew install redis)
- tsx (npm install -g tsx)

Overview:
* Frontend => Event => Websocket Server (node) => Redis (pub/sub) 
*  Workers (tsx) => LLM (openai) => Artifacts => Redis (pub/sub) => Websocket Server (Redis Subscriber) => Frontend

1. Clone the repository
2. Create a `.env.local` file and add your OpenAI API key
3. Run `npm install` to install the dependencies
4. Run `npm compile-types` to complete the classes and enums
5. Run `brew services start redis` to start the redis server
6. Start the websocket server with `tsx src/websocker-server.ts`
7. Start the background workers with `tsx src/workers/index.ts`
8. Run `npm run dev` to start the Next.js server

## Overview

The firm is a tool for building and managing a startup using a team of AI agents that simulate the work of a startup team.

The firm is built using Node.js and Typescript.

Configure the team in the `team` folder.

Configure the workflows in the `workflows` folder.

Configure the artifacts in the `artifacts` folder.

Configure the reports in the `reports` folder.

Configure the startup idea meta data  in the `blueprint` folder.
