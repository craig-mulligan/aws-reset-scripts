'use strict'
// NB detachAWS.js must be run before
// This deletes all aws resources (things, policies, certificates)
var AWS = require('aws-sdk');
var iot = new AWS.Iot({region: 'us-east-1'});

iot.listCertificates({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     // successful response
  for (var i in data.certificates) {
    iot.deleteCertificate({ certificateId:data.certificates[i].certificateId }, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
});

iot.listPolicies({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
    for (var i in data.policies) {
      iot.deletePolicy({policyName: data.policies[i].policyName}, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    }
});

iot.listThings({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
    for (var i in data.things) {
      iot.deleteThing({thingName: data.things[i].thingName}, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    }
});
