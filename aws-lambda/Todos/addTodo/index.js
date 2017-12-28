"use strict";

var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
var uuid = require("uuid");
exports.handler = (event, context, callback) => {

  let body = JSON.parse(event.body);

  if(!body.name || body.name === '') {
    callback('Missing or empty parameter `name`');
  }

  var params = {
    TableName: "todos",
    Item: {
      id: { S: uuid.v1() },
      name: { S: body.name },
      done: { BOOL: false }
    }
  };

  // Call DynamoDB to add the item to the table
  dynamodb.putItem(params, function(err, data) {
    if (err) {
      callback(err);
    } else {
      var response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        isBase64Encoded: false
      };

      callback(null, response);
    }
  });
};
