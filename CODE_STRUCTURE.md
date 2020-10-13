# AWS Lambda & Typescript - Code structure guidelines

This application uses [serverless](https://www.serverless.com/framework/docs/) to deploy on [aws lambda](https://aws.amazon.com/lambda/).
[Middy](https://github.com/middyjs/middy) is also used to bring the middleware pattern in this project.

## How the code is structured

- serverless.yml → the config file, where we define the routes and we configure api endpoints, it is used by serverless framework, to deploy the lambda on the AWS cloud.

- src/hello.ts → it’s the bootstrap of all the /hello endpoints:
    - Plugs all the wires, instanciate controllers, services etc...
    - serverless.yml points to this file to handle the api endpoints (see handler property in serverless.yml
    - Manages the dependency injection

- src/hello.controller.ts → basically it’s the entrypoint, it uses the service (managers) and handle the HTTP responses and requests.

- services → they are usually hide all the validation, serialization logic, they are in charge of calling the ORM too.

- src/*.formatters = serializers

- src/*.repositories → database layers

- src/*.validators → data validation input & output, the latest version uses the JSON schema and middy/validator

- shared → they are basically helpers, and common interfaces
