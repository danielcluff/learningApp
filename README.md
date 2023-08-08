# learningApp
## Reddit clone based off Ben Awad fullstack Typescript tutorial

This is a project which I followed along with a tutorial and typed every line of code myself.
It involved:
* Building and deploying independent backend server and frontend
* Defining database models and API implentation
* Creating systems for user registration, authentication, sessions, and caching.
* Building a Next/React frontend with Server Side Rendering capability.
* Tech stack: TypeScript, NodeJS, Express, Apollo Server, Redis, GraphQL, TypeGraphQL, TypeORM, Next, React, Urql, TailWindCSS

## Things I learned
* Docker
* Server and Database setup
* End to end type safety
* Creating backend api for frontend consumption
* Cookies and Sessions
* NextJS and SSR

## Challenges along the way
### Environment
The first major challenge that I faced was from my approach to setting up my dev environment.

I thought it would be a good time to learn Linux and be able to setup all of the services running natively. I was able to do this but each additional service became a huge time sink. I gave up on Linux when setting up Redis and switched to using Docker containers for all my local services.

I created a compose file to start all my service containers with a single command and never looked back.

### Package updates
This tutorial was two years old when I started it. As such several of the packages had gotten major updates in that time.

My method of installing packages was to run npm i on everything as I encountered it. Not referencing the repo package.json.

As such there were several times where stuff in the tutorial would not work for me and I would have to go digging for solutions. These ranged from learning how to use the updated code and methods in a package, to downgrading packages to have the correct matching features in other packages, and scouring the internet for hours to fix obscure bugs not fixed by either approach.

The next time I follow a tutorial I will copy the package.json from the provided repo. However, this was an excellent excercise in troubleshooting and debugging. 

### Apollo Server
One of the updates was that Apollo server used a webportal client for their GraphQL playground.
The web portal caused it to break the SSL and I wasn't able to test the cookies on my local client. I had to trust that what I had done worked, thankfully it did.

It also stopped working halfway through the project and I was unable to fix it. 

I won't be using Apollo Server for personal projects again. I created a GraphiQL interface repo for working GraphQL servers that don't include a playgound.

### Using my own frontend packages
My primary goal with this tutorial was learning backend technologies and methodologies so I would be able to create fullstack personal projects.

The frontend portion included several packages that I didn't like or were abandoned and so I picked some replacements. Notably:
* ChakraUI >> TailwindCSS
* Formik >> React Hook Form

The challenge here was translating the code for packages that I wasn't familiar with, using backend interfaces which I was still learning, into something usable with a package I had also never touched(React Hook Form).

A lof of work and learning but worth the effort.

----

### Commands and stuff so I don't forget

Migration stuff
create init migration
npx typeorm migration:generate Initial -d dist/typeOrmDataSource.js

Start docker container
docker-compose -f learningAppDockerCompose.yaml up
docker-compose -f learningAppDockerCompose.yaml down

docker build -t my-app:1.0 .
when you adjust the file you rebuild the image
docker rmi imageid
to delete
docker rm
container delete
