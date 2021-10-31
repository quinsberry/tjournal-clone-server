# tjournal-clone backend

## Description
Server side of tjournal-clone app.

**Technologies**: NestJS, Typeorm <br>
**Database**: PostgreSQL

##Features schema
- [ ] Posts
    - [x] Fresh
    - [X] Popular
    - [X] CRUD
    - [ ] *Add to Favorites*
    - [X] Increasing views
    - [X] Posts search
- [ ] Comments
    - [ ] Realtime comments (sockets)
    - [X] CRUD
        - [ ] Popular
        - [ ] Ordered
        - [ ] *Ranking CRUD*
- [ ] Users
    - [ ] Popular
    - [ ] All users
        - [ ] *Ranking CRUD*
    - [ ] Profile editing
    - [ ] Users search
    - [ ] Registration
    - [ ] Authorization
    - [ ] Password reset
- [X] Tags
    - [X] CRUD
    - [X] Search posts by tags


## Installation

1. `yarn install`
2. Create `.env` file by using `cp .env.development.example .env` command.
3. Install PostgreSQL if you have not done that yet.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```