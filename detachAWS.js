'use strict'
// NB detachAWS.js must be run before flushAWS.js
// This deactivates all aws resources (things, policies, certificates)
var AWS = require('aws-sdk');
var iot = new AWS.Iot({region: 'us-east-1'});

iot.listCertificates({}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     // successful response
  for (var i in data.certificates) {
    // principalPolicy(data.certificates[i].certificateArn);
    principalThing(data.certificates[i].certificateArn);
    principalPolicy(data.certificates[i].certificateArn);
    deactivateCert(data.certificates[i].certificateId)
  }
});

function principalPolicy(principal) {
  iot.listPrincipalPolicies({principal: principal}, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else
      for (var i in data) {
        if (data[i] !=null && data[i].length > 0) {
          detachPolicyCert(data[i][0].policyName, principal);
        }
      } // successful response
  });
}

function principalThing(principal) {
  var params = {
    principal: principal, /* required */
  };
  iot.listPrincipalThings(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else
      // console.log(data);
      for (var i in data) {
        if (data[i] !=null && data[i].length > 0) {
          detachThingCert(data[i][0], principal);
        }
      } // successful response
  });
}

function detachPolicyCert(policy, cert) {
  var params = {
    policyName: policy, /* required */
    principal: cert /* required */
  };
  iot.detachPrincipalPolicy(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

function detachThingCert(thingName, cert) {
  console.log(thingName)
  var params = {
    principal: cert, /* required */
    thingName: thingName /* required */
  };
  iot.detachThingPrincipal(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

function deactivateCert(certificateId) {
  var params = {
    certificateId: certificateId, /* required */
    newStatus: 'INACTIVE' /* required */
  };
  iot.updateCertificate(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
