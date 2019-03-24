'use strict';

var request = require('request');
var fs      = require('fs');
var q       = require('q');

function getPostOption(url, method, sessionId, csrftoken, option) {
  var postOption = {
    har: {
      url   : url,
      method: method,
      gzip: true,
      headers: [{
        name: 'origin',
        value: 'https://www.instagram.com'
      },
        {
          name: 'content-type',
          value: 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        {
          name: 'accept',
          value: 'application/json, text/javascript, */*; q=0.01'
        },
        {
          name: 'referer',
          value: 'https://www.instagram.com/'
        },
        {
          name: 'x-csrftoken',
          value: csrftoken
        }],
      cookies: [
        {
          "name": "sessionid",
          "value": sessionId,
          "expires": null,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "csrftoken",
          "value": csrftoken,
          "expires": null,
          "httpOnly": false,
          "secure": false
        },
      ],
      postData: {
        "mimeType": "application/x-www-form-urlencoded; charset=UTF-8",
        "params": []
      }
    }
  }
  var staticData = {
  login: function(option) {
    return [{
      "name": "username",
      "value": option.username
    },
      {
        "name": "password",
        "value": option.password
      }];
  }
}
  if(option.name) {
    postOption.har.postData.params = staticData[option.name](option)
  }

  // console.log(postOption.har.postData.params);

  return postOption;
}
function Instagram(param) {
  var param = param || {};

  this._sessionId = param.sessionId;
  this._csrftoken = param.csrftoken;
};

Instagram.prototype = {};

Instagram.prototype._request = function(url, method, option) {
  var self = this;
  var defer = q.defer();
  var option = getPostOption(url, method, self._sessionId, self._csrftoken, option || {});

  request(option, function(err, response, body) {
    if(err) {
      defer.reject("Requset err: " + err);
    }

    try {
      var output = JSON.parse(body);
    } catch(e) {
      return defer.reject("Error: " + e + ", may be not a JSON object");
    }

    defer.resolve(output);
  })

  return defer.promise;
}

function login(username, password) {
  var defer = q.defer();
  var url = 'https://www.instagram.com/accounts/login/ajax/';

  var option = getPostOption(url, 'post', null, null, {
    name: 'login',
    username: username,
    password: password,
  });

  var csrftoken;
  var sessionid;

  request(option, function(err, response, body) {
    if(err) {
      defer.reject("Requset err: " + err);
    }

    var cookies = response.headers['set-cookie'];
    cookies.forEach(function(cookie) {
      var csrftokenMatch = /csrftoken=(.*?);/g.exec(cookie)
      var sessionidMatch = /sessionid=(.*?);/g.exec(cookie)

      if(csrftokenMatch) {
        csrftoken = csrftokenMatch[1] || csrftoken;
      }

      if(sessionidMatch) {
        sessionid = sessionidMatch[1];
      }
    })

    try {
      var output = JSON.parse(body);
    } catch(e) {
      return defer.reject("Error: " + e + ", Body: " + body);
    }

    if(output.authenticated === false) {
      defer.reject(output)
    }

    if(csrftoken && sessionid) {
      output.csrftoken = csrftoken;
      output.sessionid = sessionid;
      defer.resolve(output);
    } else {
      defer.reject('csrftoken or sessionid is undefined')
    }
  })

  return defer.promise;
}

module.exports = {
  Instagram: Instagram,
  login: login
};


