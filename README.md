# This is a quickstart template for building a RESTful API with [Hono](https://hono.dev/docs/api/hono)

This one includes a little more than a vanilla set-up, there is enough here to really get started with Hono - and quickly!

This project has been tailoured for use with the Cloudflare ecosystem.

Based on a simple model (called 'thing'), this project includes the necessary:

- CRUD endpoints
- Example database scripts to create the 'thing' table along with some test data
- Supporting controllers, services, SQL queries, etc - following SoC principles
- Reusable pagination example
- Authentication decorator example, ready to be adapted for your use case
- Example validators for request bodies and query parameters
- Error handling that makes sense to the consumer

> This project uses RESTful, if you would prefer to use GraphQL then check out https://github.com/nathandavies91/pylon-quickstart-for-cloudflare-workers for a pylon alternative

## Prerequisites

1. This project is built for the Cloudflare Developer Platform, to run and develop our project locally we need to install [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
2. To authenticate with Cloudflare, run `npx wrangler login`
3. For the datasource this app is using a [D1 database](https://developers.cloudflare.com/d1/) provided by Cloudflare; this is a fully relational database built on sqlite. You will need to create one for this project (unless you have one already in mind)
4. Copy the database name and id of your D1 database and copy these into the `wranger.toml` file at the route of this project

## Local set-up

### Database / data

Run: `npm run database:init`

This runs two other commands, `database:create` and `database:populate`. These essentially run through the SQL files under the `/database` folder which will create the necessary table(s) needed to run this application locally, additionally the `test-data.sql` file includes basic content so you don't need to manually create this for test purposes.

## Deployment

There is a simple `.gitlab-ci.yml` included which will:

1. Run [Auto Devops](https://docs.gitlab.com/ee/topics/autodevops/), this is a service provided by GitLab which handles things like testing and quality assurance
2. If successful then the `production` stage is run which will deploy the application; this has been restricted to the `main` branch only and requires manual intervention to kick off the process

You will need to set some variables to authenticate your pipeline, in order to be able to deploy your worker: https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-pipelines