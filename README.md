#  21TV NODE API

## Before Using
<br />        

Please make sure that you have:

* [node.js](https://nodejs.org/)  installed
* have [mongodb](https://www.mongodb.com/) installed and running locally 
<br /><br />

## Getting started
<br />

* git clone [repo name](https://github.com/arnologyllc/21tv-backend-node-express.git). Clone this repo
* `npm install` to install all required dependencies 
* `npm run start` to start the local server or `npm run dev` to start th local server with nodemon
 
<br />

## Code Overview
<br />

*   [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
*   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
*   [validator](https://github.com/validatorjs/validator.js) - A library of string validators and sanitizers.
*   [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
*   [cors](https://github.com/expressjs/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
*   [multer](https://github.com/expressjs/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
*   [aws-sdk](https://github.com/aws/aws-sdk-js) - The AWS SDK for JavaScript v3 API Reference Guide provides a JavaScript API for AWS services.
*   [nodemailer](https://github.com/nodemailer/nodemailer)  - Nodemailer is a module for Node.js applications to allow easy as cake email sending
*   [nodemailer-smtp-transport](https://github.com/nodemailer/nodemailer-smtp-transport)- SMTP is the main transport in Nodemailer for delivering messages
*   [rrule](https://github.com/jakubroztocil/rrule) - Library for working with recurrence rules for calendar dates.

<br />

### Application Structure
<br />

* `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
* `controller/` - Controllers are responsible for handling incoming requests and returning responses to the client.
* ` model/` - This folder contains the schema definitions for our Mongoose models.
* `routes/` - This folder contains the route definitions for our API.
* `utils/` - This folder contains additional functions.
* `middlewares` - The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.

<br />  

## Amazon S3 Node.js 
<br />

The following topics show examples of how the AWS SDK for JavaScript can be used to interact with Amazon S3 buckets using Node.js.

**Topics**

* [Creating and Using Amazon S3 Buckets](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html)
* [Configuring Amazon S3 Buckets](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-configuring-buckets.html)
* [Managing Amazon S3 Bucket Access Permissions](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-access-permissions.html)
* [Working with Amazon S3 Bucket Policies](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-bucket-policies.html)
* [Using an Amazon S3 Bucket as a Static Web Host](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-static-web-host.html)

<br />

### Import it in your code at the top of the file you’re going to add this file upload to S3 functionality
<br />

```
const S3 = require('aws-sdk/clients/s3')
```
<br /><br />

### Next, use the SDK to create an instance of the S3 object. I assign it to a s3 variable 
<br />

```
const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION,
    acl: 'public-read',
  });
```
<br /><br />

### Create Params for s3
<br />


```
const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream
  };
```
<br /><br />

### Make a call to s3.upload() and call its .promise() method so you can use await to wait until it finishes to get the uploaded file object:
<br />

```
const awsResponse = await s3.upload(params).promise()
```

<br /><br />

# Deploy 21TV to Digitalocean 
<br />


>Steps to deploy a Node.js app to DigitalOcean using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt

<br />


## 1. Sign up for Digital Ocean

<br />



