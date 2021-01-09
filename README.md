# QuestTrackr

[![Contributors](https://img.shields.io/github/contributors/Lazytangent/QuestTrackr)](https://www.github.com/Lazytangent/QuestTrackr/contributors)
[![Open Issues](https://img.shields.io/github/issues/Lazytangent/QuestTrackr)](https://www.github.com/Lazytangent/QuestTrackr/issues)
[![Forks](https://img.shields.io/github/forks/Lazytangent/QuestTrackr)](https://www.github.com/Lazytangent/QuestTrackr/forks)
[![Stars](https://img.shields.io/github/stars/Lazytangent/QuestTrackr)](https://www.github.com/Lazytangent/QuestTrackr/stars)

## What is it?

QuestTrackr is a clone of the popular web app [Remember the Milk](https://www.rememberthemilk.com/) with an RPG twist. Its functionality includes:

- Viewing open quests and choosing to take on said quests
- Creating your own quests
- Deleting your own quests
- Mark a quest you've taken as completed
- Seeing all the quests you've signed up for
- Seeing your current XP status
- Seeing your current quest completion summary

## Developing

To run this application locally, you'll need to:

1. `git clone` this repo
2. `cd` into the local repo
3. `npm install` to install the dependencies
4. Create a `.env` file based on the `.env.example` file included in the repo with your own values
5. Create a user on your local machine with the username and password specified in your `.env` file in PostgreSQL
6. Run `npx dotenv sequelize db:create` to create the database
    * If the `sequelize` module is not found, try running `npx dotenv sequelize-cli db:create` and replace `sequelize` with `sequelize-cli` for the rest of these commands
7. Run `npx dotenv sequelize db:migrate` to run the migrations
8. Run `npx dotenv sequelize db:seed:all` to seed the database
9. Finally, start the development server with `npm start`. The scripts in the `package.json` should do the work. You'll see the local address you can use show up in the terminal.

## Technologies Used

* PostgreSQL
* Express.js
* Pug.js
* JavaScript
* CSS
* Bcryptjs
* Express-session
* Express-validator
* Node.js

## Live Site

[Here's](https://quest-trackr.herokuapp.com/) a link to our live app!

## Documentation

[Here's](https://github.com/Lazytangent/QuestTrackr/wiki/) a link to our Wiki!

## Features

- 

## Challenges

## Best Snippets
