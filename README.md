# AWS Lambda & Typescript

Template to start coding a lambda :)

Uses the [Serverless Application Framework](https://serverless.com/) to implement an AWS Lambda function in TypeScript, deploy it via CloudFormation, and publish it through API Gateway.


[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/2154/badge)](https://bestpractices.coreinfrastructure.org/projects/2154)


## Setup

1. **Install [Node.js](https://nodejs.org).**

2. **Install the [Serverless Application Framework](https://serverless.com/) as a globally available package:**

```bash
npm install serverless -g
```

Verify that Serverless was installed correctly:

```
serverless -v
```

3. **Setup AWS credentials:**

  * Download [aws cli v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

  * Create a new IAM User for Programmatic Access only in the aws console, assign the admin access policy to it, and get the Access Key ID and the Secret Access Key of the user.
  (If you prefer minimal permissions, you may want to follow [Issue 1439: Narrowing the Serverless IAM Deployment Policy](https://github.com/serverless/serverless/issues/1439). )

  * Run `aws configure`
 
4. **Clone this repository.**

  * Change the accoundId in serverless.yml, and the S3 bucket name.

5. **Install the dependencies:**

```bash
npm install
```

If your lambda use Dynamo DB, install the dynamodb local plugging

```bash
sls dynamodb install
```

***More information about dynamodb local: https://github.com/99xt/serverless-dynamodb-local/tree/v1 or `sls dynamodb --help`***


6. **Seed the data:**

Locally the data should be added automatically through dynamodb-local, you can use the aws cli tool to move the data :

```
cd ./aws-setup/dynamodb
aws dynamodb batch-write-item --request-items file://seed.development.json
```


## How the code is structured

This project is implementated with the following layers (see the `src/hello` folder):

- **Handler**: The handler is the endpoint that is called by AWS when it executes your Lambda. See `hello.ts`.
- **Controller**: The controller is responsible for transforming any operation result to an HTTP response. See `hello.controller.ts`.
- **Service**: The service is responsible for implementing the business logic, and provide the operation result. See `hello.service.ts`.
- **Repository**: The repository is responsible for providing the data for the service. See `hello.repository.ts`.

All layers have unit tests with mocking the underlying layers.

Additional read: ./CODE_STRUCTURE.md

To understand the code, open `src/hello/hello.ts`, find the `greeting` function and follow the call chain.

### Swagger export

To be documented ...

## Developer tasks

Frequently used `npm script`s:

| Script name   | Description                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------|
| `analyse`     | Runs all code analysis tools, including linters and unit tests.                                                     |
| `deploy`      | Runs all analysis tools, creates the deployment package, installs it on AWS and finally runs the integration tests. |
| `start`       | Runs the service locally, so you can call your API endpoints on http://localhost.                                   |

Additional useful `npm script`s:

| Script name        | Description                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `build`            | Runs all pre-deploy analysis and creates the deployment package, but does not install it onto AWS.                              |
| `clean`            | Removes all tool-generated files and folders (build output, coverage report etc.). Automatically runs as part of other scripts. |
| `deploy:init`      | Creates the domain in Route53. Required to manually execute once.                                                               |
| `lint`             | Runs the static code analyzers. Automatically runs before deployment.                                                           |
| `test`             | Runs the unit tests. Automatically runs before deployment.                                                                      |
| `test:integration` | Runs the integration tests. Automatically runs after deployment.                                                                |


### Run the service locally

**To run the service locally, run:** _This command requires Administrator privileges on Windows!_

```bash
npm start
```

This command will not terminate, but will keep running a webserver that you can use to locally test your service. Verify that the service runs perfectly by opening the `http://localhost:3015` URL in your browser. The console window will log your requests.

You can modify your code after running this command, Serverless will automatically recognize the changes and recompile your code.

### Deploy to AWS (Manually)

The deployment is done through the CI/CD with bitbucket, go check in bitbucket pipelines for the deployment status.

One you push your code to one of the 3 branches (dev, staging, and master) it will trigger a deployment to this env.

Otherwise you can also deploy manually with `serverless`:

**To deploy the service to AWS, run:** _This command requires Administrator privileges on Windows!_

_This project uses the AWS System Manager (ssm) to manage its environment variables. So be sure to check the serverless.yml file and set the appropriate parameters using put-parameter command with aws cli tool. SSM Documentation [here](https://docs.aws.amazon.com/cli/latest/reference/ssm/put-parameter.html)_

```bash
serverless deploy -s development
```

***replace the name of the stage***

or you can use the NPM script alias, which is recommended, because it runs the analysers (linter + tests) before deployment, and integration tests after deployment:

```bash
ENV=development npm run deploy -- -s development
```
***replace the name of the stage***

Verify that the deployment is completed successfully by opening the URL displayed in your console window in your browser. To see all resources created in AWS navigate to CloudFormation in the AWS Console and look for the stack named with the name of your service you specified in Step 6.

_Important: To deploy in staging and prod there's a manual step required according to [this](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/) we need to change the route table configuration. For that go in AWS console => VPC and choose the production-dfu or staging-dfu subnet, then, just click on the route table tab, set the route table with the private route table inside the corresponding VPC. That should be automatized soon see this [PR](https://github.com/serverless/components/pull/314)_

### Run linter

**To check your codebase with TSLint, run:**

```bash
npm run lint
```

The linter automatically checks your code before deployment, so you don't need to run it manually.

### Run unit tests

**To check your code with unit tests, run:**

```
npm test
```

The unit tests are automatically running before deployment, so you don't need to run them manually.

### Run integration tests

**To verify that your deployment completed successfully, run:**

Locally:

```
npm run test:integration
```

On a specific env:

```
ENV={development|staging|production} npm run test:integration
```

The integration tests are automatically running after deployment, so you don't need to run them manually.

## Problems?

```
EPERM: operation not permitted, symlink 'C:\Git\aws-lambda-typescript\node_modules' -> 'C:\Git\aws-lambda-typescript\.build\node_modules'
```

On Windows you need **Administrator privileges** to run `serverless` commands (see [Issue 23](https://github.com/graphcool/serverless-plugin-typescript/issues/23)).
