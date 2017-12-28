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

For sure all processes can and should be automated for real projects.