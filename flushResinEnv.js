'use strict'
// to use: $ node flushResinEnv <appName> <email> <password>
var resin = require('resin-sdk');

var appName = process.argv[2]
var credentials = { email: process.argv[3], password: process.argv[4] }

resin.auth.login(credentials, function(error) {
    if (error) throw error;
    getDevices(appName, function(devices){
      for (var i in devices) {
        getEnvVars(devices[i], function(envVars) {
          for (var i in envVars) {
            deleteEnvVar(envVars[i]);
          }
        });
      }
    });
});

function getDevices(appName, cb) {
  resin.models.device.getAllByApplication(appName, function(error, devices) {
    if (error) throw error;
    cb(devices);
  });
}


function getEnvVars(device, cb) {
  resin.models.environmentVariables.device.getAll(device.uuid).then(function(environmentVariables) {
      cb(environmentVariables);
  });
}

function deleteEnvVar(envar) {
  resin.models.environmentVariables.device.remove(envar.id, function(error) {
    if (error) throw error;
    console.log(envar.name + "deleted")
  });
}

// resin.models.environmentVariables.create(appName, 'HALT', '1', function(error) {
//     if (error) throw error;
// });
