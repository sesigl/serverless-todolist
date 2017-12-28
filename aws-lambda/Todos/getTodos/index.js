"use strict";

var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = (event, context, callback) => {
  dynamodb.scan(
    {
      TableName: "todos",
      Limit: 10
    },
    function(err, data) {
      if (err) {
        callback("reading dynamodb failed: " + err);
        return;
      }

      let todos = [];
      for (var i in data.Items) {
        i = data.Items[i];
        todos.push({
          id: i.id ? i.id.S : null,
          name: i.name ? i.name.S : null,
          done: i.done ? i.done.BOOL : null
        });
      }

      var response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todos),
        isBase64Encoded: false
      };

      callback(null, response);
    }
  );
};
