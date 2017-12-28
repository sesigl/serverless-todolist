'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var docClient = new AWS.DynamoDB.DocumentClient()
exports.handler = (event, context, callback) => {
    
    let body = JSON.parse(event.body)
    
    var params = {
        TableName: 'todos',
        Key:{
            'id' : event.pathParameters.id
        },
        UpdateExpression: "set done = :d",
        ExpressionAttributeValues:{
            ":d": true
        },
        ReturnValues:"UPDATED_NEW"
    };
    
    docClient.update(params, function(err, data) {
        if (err) {
            callback("Unable to update item. Error JSON:" + JSON.stringify(err, null, 2));
        } else {
            var response = {
            "statusCode": 200,
            "headers": {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json"
            },
            "body": JSON.stringify(data),
            "isBase64Encoded": false
        };
        
        callback(null, response);
        }
    });
        
        
    };
