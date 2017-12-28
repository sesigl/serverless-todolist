# serverless-todolist
Playground for a serverless todolist application. It's an example for how to use AWS for use cases that contains a complex frontend and a simple backend.

## AWS-Lambda
This folder contains a AWS-Cloud9 template file. It's the root of all definitions like API-Gateway definitions and linked lambda functions. If you want to create a similar application set up the following things:

 - Cloud9 IDE
 - Create some functions and API Gateways using Cloud9
 - Assign required IAM policies to used roles
 - Deploy API Gateway endpoints to an environment
 - Use the base url in the frontend application

## Frontend
Contains a vue todolist frontend that uses lambda functions to create, read and update todos. By running `yarn run build` a dist folder is created. Upload these files to a S3 bucket and set it public.

### Testing

I also added an example unit test for the addTodo lambda function: https://github.com/Journerist/serverless-todolist/blob/master/aws-lambda/Todos/addTodo/__test__/index.spec.js

Cloud9 offers nice testing mechanics but for now it did not work with external dependencies like dynamo db. But I am confident that they will also improve that.

One more thing to mention is that you should also add integration tests to test the real behavior in a test environment. All functions should be deployed. Afterwards some request should proof that everything works. This test suite is probably useful to automate pre-release testing in a continuous delivery pipeline.
