"use-strict";

const fetch = require('node-fetch');
const FormData = require('form-data');
const config  = require('../../../config');
module.exports = class Instagram {
  /**
   * Constructor
   */
  constructor(csrfToken, sessionId) {
    this.csrfToken = csrfToken;
    this.sessionId = sessionId;
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
    this.userPosts = {};
    this.userFeedPosts = {};
    this.suggestedPosts = {};
    this.suggestedPeople = {};
    this.userIdFollowers = {};
    this.userIdFollowing = {};
    this.timeoutForCounter = 300;
    this.timeoutForCounterValue = 30000;
    this.paginationDelay = 5000;
    this.receivePromises = {};
    this.exploreByTypes = ['location', 'hashtag'];
    this.tagPosts = {};
    this.locationPosts = {};
    this.postLikes = {};
    this.postComments = {};

    this.cookieValues = {
      ig_cb: 1,
      sessionid: undefined,
      ds_user_id: undefined,
      csrftoken: undefined,
      shbid: undefined,
      rur: undefined,
      mid: undefined,
      shbts: undefined,
      mcd: undefined,
      urlgen:undefined

    };

    this.baseHeader = {
      'accept-langauge': 'en-US;q=0.9,en;q=0.8,es;q=0.7',
      'origin': 'https://www.instagram.com',
      'referer': 'https://www.instagram.com/',
      'upgrade-insecure-requests': '1',
      'user-agent': this.userAgent,
    };
    this.userId = "";
    this.userName = "";
    this.people = {};
    this.tags = {};
    this.locations = {};
    this.searchList = [];
  }

  // ACCOUNT /////////////////////////////////////
  /**
   * @name generateCookie
   * @desc Generate cookie
   * @description Returns cookie string
   * @param {Boolean} simple
   * @return {String} cookie
   */
  generateCookie(simple) {
    if (simple) return 'ig_cb=1';
    this.cookieValues.ds_user_id = config.userid;
    this.cookieValues.csrftoken = config.csrftoken;
    this.cookieValues.sessionid = config.sessionid;
    var cookie = ''
    var keys = Object.keys(this.cookieValues)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (this.cookieValues[key] !== undefined) {
        cookie += key + '=' + this.cookieValues[key] + (i < keys.length - 1 ? '; ' : '')
      }
    }

    return cookie;
  }

  /**
   * @name combineWithBaseHeader
   * @desc Combine with base header
   * @description merges data with base headers
   * @param {Boolean} data
   * @return {Object}
   */
  combineWithBaseHeader(data) {
    return Object.assign(this.baseHeader, data)
  }

  /**
   * @name updateCookieValues
   * @desc Update essential values
   * @description Updates cookieValues object with src object's values if they exist.
   * @tutorial assumes that essential values will be extracted from a cookie unless specified by the isHTML bool
   * @param {Object} src
   * @param {Boolean} isHTML
   * @return {Object}
   */
  updateCookieValues(src, isHTML) {
    if (!isHTML) {
      var keys = Object.keys(this.cookieValues)
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!this.cookieValues[key])
          for (let cookie in src)
            if (src[cookie].includes(key) && !src[cookie].includes(key + '=""')) {
              var cookieValue = src[cookie].split(';')[0].replace(key + '=', '')
              this.cookieValues[key] = cookieValue
              break;
            }
      }
    } else {
      var subStr = src;
      var startStr = '<script type="text/javascript">window._sharedData = ';
      var start = subStr.indexOf(startStr) + startStr.length;
      subStr = subStr.substr(start, subStr.length);
      subStr = subStr.substr(0, subStr.indexOf('</script>') - 1);

      var json = JSON.parse(subStr);

      this.cookieValues.csrftoken = json.config.csrf_token;
      this.rollout_hash = json.rollout_hash;
    }

  }

  /**
   * @name getCsrfToken
   * @desc Get CSRF token
   * @description Get csrf token
   * @return {Object} Promise
   */
  getCsrfToken() {
    return fetch('https://www.instagram.com',
      {
        'method': 'get',
        'headers':
          this.combineWithBaseHeader(
            {
              'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
              'accept-encoding': 'gzip, deflate, br',
              'cookie': this.generateCookie(true)
            }
          )
      }).then(t => {
      this.updateCookieValues(t.headers.get('set-cookie'))
      return t.text()
    }).then(html => {
      this.updateCookieValues(html, true)
      return this.cookieValues.csrftoken
    }).catch((err) =>
      console.log('Failed to get instagram csrf token: '+ err)
    )
  }

  /**
   * @name getHeaders
   * @desc Get headers
   * @description gets default headers from config and returns them
   * @todo Implementing headers in config module
   * @return {Object} headers
   */
  getHeaders() {
    return {
      'referer': 'https://www.instagram.com',
      // the /username part of referer has been removed to maximize privacy and openness
      'origin': 'https://www.instagram.com',
      'user-agent': this.userAgent,
      'x-instagram-ajax': '1',
      'x-requested-with': 'XMLHttpRequest',
      'x-csrftoken': this.csrfToken,
      cookie: ' sessionid=' + this.sessionId + '; csrftoken=' + this.csrfToken + ';'
    }
  }

  /**
   * @name auth
   * @description Authenticates to Instagram by user name and password and returns session ID
   * @param {String} username
   * @param {String} password
   * @return {Object} Promise
   */
  auth(username, password) {
    var formdata = 'username=' + username + '&password=' + password + '&queryParams=%7B%7D'

    var options = {
      method: 'POST',
      body: formdata,
      headers:
        this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'content-length': formdata.length,
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'ig_cb=' + this.cookieValues.ig_cb+';'+'csrftoken='+ this.csrfToken+';',
            'x-csrftoken': this.csrfToken,
            'x-instagram-ajax': this.rollout_hash,
            'x-requested-with': 'XMLHttpRequest',
          }
        )
    }

    return fetch('https://www.instagram.com/accounts/login/ajax/', options).then(
      t => {
        this.updateCookieValues(t.headers.get('set-cookie'));
        this.userName = username;
        return this.cookieValues.sessionid;
      }).catch(() =>
      console.log('Instagram authentication failed...')
    )
  }

  // DATA /////////////////////////////////////
  /**
   * @name getUserDataByUsername
   * @desc Get user data by user name
   * @description User profile data by username (profile posts are limited to first 12 and to get more posts use getMedia)
   * @param {String} username
   * @return {Object} Promise
   */
  getUserDataByUsername(username) {
    //var url = 'https://www.instagram.com/'  + username + '/?__a=1';
    /*return fetch(encodeURIComponent(url),
      {
        headers: this.getHeaders(),
      }).then(t => t.json().catch((e) => {
      console.log('Instagram returned:' + e)
      console.log(t)
    }).then(r => r))*/

    var fetch_data = {
      'method': 'get',
      'headers':
        this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cookie': this.generateCookie(false)
          }
        )
    }
    return fetch('https://www.instagram.com/' + username, fetch_data).then(res => res.text().then(function (data) {
      const regex = /window\._sharedData = (.*);<\/script>/;
      const match = regex.exec(data);
      if (typeof match[1] === 'undefined') {
        return '';
      }
      return JSON.parse(match[1]).entry_data.ProfilePage[0];
    }))
  }

  /**
   * @name getUserDataById
   * @desc Get user data by user ID
   * @description Returns user data by user ID
   * @param {String} userId
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   */
  getUserDataById(userId, first, after) {
    after = after ? after : "";
    first = first ? first : 12;
    first = first <= 12 ? first : 12;
    var url = 'https://www.instagram.com/graphql/query/?query_id=17851374694183129' + '&id=' + userId + '&first=' + first + '&after=' + after;
    return fetch(url,
      {
        headers: this.getHeaders(),
      }).then(t => t.json().catch((e) => {
      console.log('Instagram returned:' + e)
    }).then(r => r)).finally(console.log('Profile JSON data has fetched from Instagram for user ID: '+userId))

  }

  /**
   * @name getUserPosts
   * @desc Get user media
   * @description Get user's posted media list with userId
   * @param {String} userId
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   * @tutorial for post sampling
   */
  getUserPosts(userId, first, after) {
    after = after ? after : "";
    first = first ? first : 12;
    first = first > 12 ? first : 12;
    var url = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182' + '&id=' + userId + '&first=' + first + '&after=' + after;
    return fetch(url,
      {
        headers:  this.combineWithBaseHeader(
            {
              'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
              'accept-encoding': 'gzip, deflate, br',
              'cookie': this.generateCookie(false)
            }
          )
      }).then(t => t.json().then(r => r)).catch(e=>{
      console.log(e);
    })
  }

  /**
   * @name getUserMedia
   * @desc Get user media
   * @description Get user's posted media list with userId
   * @param {String} userId
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   */

  getAllUserPosts(userId, after, first, postsCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.userPosts[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0

    first = 50;

    const query = {
      id: userId,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[userId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=' + variables,
      {
        'method': 'get',
        'headers':this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cookie': this.generateCookie(false)
          }
        )
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.userPosts[userId.toString()] = self.userPosts[userId.toString()].concat(json.data.user.edge_owner_to_timeline_media.edges)

          if (json.data.user.edge_owner_to_timeline_media.page_info.has_next_page) {
            let after = json.data.user.edge_owner_to_timeline_media.page_info.end_cursor
            return new Promise((resolve) => {
              console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
              setTimeout(() => {
                resolve(self.getAllUserPosts(userId, after, first, 1, 1));
              }, this.paginationDelay);
            });
          } else {
            self.receivePromises[userId.toString()] = undefined
            return self.userPosts[userId.toString()]
          }

        }
        else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getAllUserPosts(userId, after, first, postsCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned error:' + e)
      })
    })
  }

  /**
   * @name getAllTagPosts
   * @desc Get all tag posts
   * @description Get tag's posts
   * @param {String} tag
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   */
  getAllTagPosts(n, tag, after, first, postsCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.tagPosts[tag] = []

    if (typeof self.receivePromises[tag] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=12)? n : 12;

    const query = {
      tag_name: tag,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[tag] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17875800862117404&variables=' + variables,
      {
        'method': 'get',
        'headers':this.getHeaders()
        /*this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cookie': this.generateCookie()
          }
        )*/
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.tagPosts[tag] = self.tagPosts[tag].concat(json.data.hashtag.edge_hashtag_to_media.edges)
          if(self.tagPosts[tag].length < n){
            if (json.data.hashtag.edge_hashtag_to_media.page_info.has_next_page) {
              let after = json.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getAllTagPosts(n, tag, after, first, 1, 1));
                }, this.paginationDelay);
              });
            }
            else {
              self.receivePromises[tag] = undefined
              return self.tagPosts[tag]
            }
          }else {
            self.receivePromises[tag] = undefined
            return self.tagPosts[tag]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getAllTagPosts(n, tag, after, first, postsCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned error:' + e)
      })
    })
  }

  /**
   * @name getAllLocationPosts
   * @desc Get all location posts
   * @description Get location's posts
   * @param {String} locationID
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   */
  getAllLocationPosts(n, location, after, first, postsCounter, selfSelf) {
    const self = this
    location = location || ''
    if (!selfSelf)
      self.locationPosts[location] = []

    if (typeof self.receivePromises[location] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=12)? n : 12;

    const query = {
      id: location,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[location] = 1

    return fetch('https://www.instagram.com/graphql/query/?query_hash=ac38b90f0f3981c42092016a37c59bf7&variables=' + variables,
      {
        'method': 'get',
        'headers':this.getHeaders()
        /*this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cookie': this.generateCookie()
          }
        )*/
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.locationPosts[location] = self.locationPosts[location].concat(json.data.location.edge_location_to_media.edges)
          if(self.locationPosts[location].length < n){
            if (json.data.location.edge_location_to_media.page_info.has_next_page) {
              let after = json.data.location.edge_location_to_media.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getAllLocationPosts(n, location, after, first, 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[location] = undefined
              return self.locationPosts[location]
            }
          }else{
            self.receivePromises[location] = undefined
            return self.locationPosts[location]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getAllLocationPosts(n, location, after, first, postsCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned error:' + e)
      })
    })
  }

  getLocationIdByName(locationName){
    return this.commonSearch(locationName).then(r =>
    {
      let locationId = r.places[0].place.location['pk'];
      return locationId;
    })
  }

  /**
   * @name searchBy
   * @desc Search by
   * @description Search by location & hash tags
   * @param {String} searchBy - location or hashtag
   * @param {String} q - location id, or hash tag
   * @param {String} cursor pagination cursor
   * @param {Int} mediaCounter
   * @return {Object} Promise
   * @tutorial End cursor --> t.entry_data.TagPage[0].tag.media.page_info['end_cursor']
   * @tutorial Media(nodes) --> t.entry_data.TagPage[0].tag.media['nodes']
   */
  explore(by, q, mediaCounter) {
    if (this.exploreByTypes.indexOf(by) === false)
      throw 'search type ' + by + ' is not found'

    //exclusion for hashtag if not cursor
    if (by === 'hashtag') {
      return this.getAllTagPosts(mediaCounter, q);
    }else if (by === 'location'){
      return this.getAllLocationPosts(mediaCounter, q);
    }


  }

  /**
   * @name getUserFollowers
   * @desc Get User Followers
   * @description Gets user followers list
   * @param {Int} userId
   * @param {String} endCursor cursor used to fetch next page
   * @param {Int} count count of results to return (API may return less)
   * @param {Int} followersCounter counter of followers
   * @param {Boolean} selfSelf if call by self
   * @return {Object} array followers list
   */
  getUserFollowers(n, userId, after, first, followersCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.userIdFollowers[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=12)? n : 12;

    const query = {
      id: userId,
      include_reel: true,
      fetch_mutual: true,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[userId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17851374694183129&variables=' + variables,
      {
        'method': 'get',
        'headers': self.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.userIdFollowers[userId] = self.userIdFollowers[userId].concat(json.data.user.edge_followed_by.edges)
          if(self.userIdFollowers[userId].length < n){
            if (json.data.user.edge_followed_by.page_info.has_next_page) {
              let after = json.data.user.edge_followed_by.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getUserFollowers(n, userId, after, first , 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[userId] = undefined
              return self.userIdFollowers[userId]
            }
          }else {
            self.receivePromises[userId] = undefined
            return self.userIdFollowers[userId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getUserFollowers(n, userId, after, first,  followersCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  /**
   * @name getUserFollowing
   * @desc Get User followings
   * @description Gets user followings list
   * @param {Int} userId
   * @param {String} endCursor cursor used to fetch next page
   * @param {Int} count count of results to return (API may return less)
   * @param {Int} followingCounter counter of followings
   * @param {Boolean} selfSelf if call by self
   * @return {Object} array followed by list
   */
  getUserFollowing(n, userId, after, first, followingCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.userIdFollowing[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=12)? n : 12;

    const query = {
      id: userId,
      include_reel: true,
      fetch_mutual: true,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[userId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17874545323001329&variables=' + variables,
      {
        'method': 'get',
        'headers': self.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.userIdFollowing[userId] = self.userIdFollowing[userId].concat(json.data.user.edge_follow.edges)
          if(self.userIdFollowing[userId].length < n){
            if (json.data.user.edge_follow.page_info.has_next_page) {
              let after = json.data.user.edge_follow.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getUserFollowing(n, userId, after, first, 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[userId] = undefined
              return self.userIdFollowing[userId]
            }
          }else{
            self.receivePromises[userId] = undefined
            return self.userIdFollowing[userId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getUserFollowing(n, userId, after, first, followingCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  /**
   * @name commonSearch
   * @desc Common search
   * @description Common search returns locations, hashtags and people
   * @param {String} q
   * @return {Object} Promise
   * @tutorial Place id path --> r.places[0].place.location['pk'], r.places[1].place.location['pk'], ...
   */
  commonSearch(q, rankToken) {
    rankToken = rankToken ? rankToken : ''
    return fetch('https://www.instagram.com/web/search/topsearch/?context=blended&query=' + q + '&rank_token=' + rankToken,
      {
        headers: this.getHeaders() // no required
      }).then(t => t.json().then(r => r))
  }

  /**
   * @name getUserFeed
   * @desc Get user feed
   * @description Returns first n (n<50) items of logged user's (self) home feed
   * @tutorial The logged in user is the user who's session ID is active on Instagram client
   * TODO: improve iteration with start, end and partial
   * @param {Int} n (default - 50)
   * @param {String} cursor
   * @return {Object} Promise
   */
  getUserFeed(n) {
    n = n ? n : 12;
    var url = 'https://www.instagram.com/graphql/query/?query_id=17842794232208280&variables={"fetch_media_item_count":' + n + ',"fetch_media_item_cursor":"","fetch_comment_count":10,"fetch_like":10,"has_stories":false}'
    return fetch(url,
      {
        headers: this.getHeaders(),
      }).then(t => t.json().then(r => r)
    )
  }

  /**
   * @name getFirstFeeds
   * @desc Get first feeds
   * @description Returns first n items of logged user's (self) home feed
   * @tutorial The logged in user is the user who's session ID is active on Instagram client
   * TODO: improve iteration with start, end and partial
   * @param {String} userId
   * @param {Integer} first default - 50
   * @param {String} after
   * @return {Object} Promise
   */
  getAllUserFeeds(n, fetch_media_item_cursor, fetch_media_item_count, postsCounter, selfSelf) {
    const self = this
    var userId = this.userId;
    if (!selfSelf)
      self.userFeedPosts[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0
    fetch_media_item_count = (n<=12)? n : 12;

    const query = {
      fetch_media_item_cursor: fetch_media_item_cursor,
      fetch_media_item_count: fetch_media_item_count,
      fetch_comment_count:10,
      fetch_like:10,
      has_stories: false
    };


    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[userId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17842794232208280&variables=' + variables,
      {
        'method': 'get',
        'headers':this.getHeaders()
        /*this.combineWithBaseHeader(
          {
            'accept': 'text/html,application/xhtml+xml,application/xml;q0.9,image/webp,image/apng,*.*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'cookie': this.generateCookie()
          }
        )*/
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.userFeedPosts[userId] = self.userFeedPosts[userId].concat(json.data.user.edge_web_feed_timeline.edges)
          if(self.userFeedPosts[userId].length < n){
            if (json.data.user.edge_web_feed_timeline.page_info.has_next_page) {
              let fetch_media_item_cursor = json.data.user.edge_web_feed_timeline.page_info.end_cursor;
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getAllUserPosts(n, userId, fetch_media_item_cursor, fetch_media_item_count, 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[userId] = undefined
              return self.userFeedPosts[userId]
            }
          }else {
            self.receivePromises[userId] = undefined
            return self.userFeedPosts[userId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getAllUserFeeds(n, userId, fetch_media_item_cursor, fetch_media_item_count, postsCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned error:' + e)
      })
    })
  }

  /**
   * @name getMediaInfoByUrl
   * @desc Get media info by url
   * @description Gets media info (only not media content) given an instagram media url
   * @example url = https://www.instagram.com/p/BT1ynUvhvaR/
   * @param {String} url
   * @return {Object} Promise
   */
  getMediaInfoByUrl(url) {
    return fetch('https://api.instagram.com/oembed/?url=' + url,
      {
        'headers': this.getHeaders()
      }).then(t => t.json().then(r => r))
  }

  /**
   * @name getMediaInfoByUrl
   * @desc Get media info by url
   * @description Gets media info (only not media content) given an instagram media url
   * @example url = https://www.instagram.com/p/BT1ynUvhvaR/
   * @param {String} url
   * @return {Object} Promise
   */
  getPostJson(shortcode) {
    return fetch('https://www.instagram.com/p/'+shortcode+'/?__a=1',
      {
        'headers': this.getHeaders()
      }).then(t => t.json().then(r => r))
  }

  /**
   * @name getMediaInfoByUrl
   * @desc Get media info by url
   * @description Gets media info (only not media content) given an instagram media url
   * @example url = https://www.instagram.com/p/BT1ynUvhvaR/
   * @param {String} url
   * @return {Object} Promise
   */
  getPostPage(shortcode) {
    return fetch('https://www.instagram.com/p/'+shortcode,
      {
        'headers': this.getHeaders()
      }).then(t => t.text().then(r => r))
  }

  /**
   * @name getMediaIdByUrl
   * @desc Get media by url
   * @description Downloads a media given an instagram media url
   * @example url = https://www.instagram.com/p/BT1ynUvhvaR/
   * @param {String} url
   * @return {Object} Promise
   */
  getMediaIdByUrl(url) {
    return this.getMediaInfoByUrl(url).then(t => t.media_id.split('_')[0])
  }

  /**
   * @name getPostLikes
   * @desc Get post likes
   * @description Gets post likes by count and post's short code
   */
  getPostLikes(n, postId, after, first, likesCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.postLikes[postId] = []

    if (typeof self.receivePromises[postId] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=50)? n : 50;

    const query = {
      shortcode: postId,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[postId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17864450716183058&variables=' + variables,
      {
        'method': 'get',
        'headers': self.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.postLikes[postId] = self.postLikes[postId].concat(json.data.shortcode_media.edge_liked_by.edges)
          if(self.postLikes[postId].length < n){
            if (json.data.shortcode_media.edge_liked_by.page_info.has_next_page) {
              let after = json.data.shortcode_media.edge_liked_by.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getPostLikes(n, postId, after, first , 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[postId] = undefined
              return self.postLikes[postId]
            }
          }else {
            self.receivePromises[postId] = undefined
            return self.postLikes[postId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getPostLikes(n, postId, after, first,  likesCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  /**
   * @name getPostLikes
   * @desc Get post likes
   * @description Gets post likes by count and post's short code
   */
  getPostComments(n, postId, after, first, commentsCounter, selfSelf) {
    const self = this

    if (!selfSelf)
      self.postComments[postId] = []

    if (typeof self.receivePromises[postId] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=50)? n : 50;

    const query = {
      shortcode: postId,
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[postId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17852405266163336&variables=' + variables,
      {
        'method': 'get',
        'headers': self.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.postComments[postId] = self.postComments[postId].concat(json.data.shortcode_media.edge_media_to_comment.edges)
          if(self.postComments[postId].length < n){
            if (json.data.shortcode_media.edge_media_to_comment.page_info.has_next_page) {
              let after = json.data.shortcode_media.edge_media_to_comment.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getPostComments(n, postId, after, first , 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[postId] = undefined
              return self.postComments[postId]
            }
          }else {
            self.receivePromises[postId] = undefined
            return self.postComments[postId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getPostComments(n, postId, after, first,  commentsCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  /**
   * @name getPostLikes
   * @desc Get post likes
   * @description Gets post likes by count and post's short code
   */
  getSuggestedPosts(n, after, first, sugPostCounter, selfSelf) {
    const self = this
    var userId = this.userId;
    if (!selfSelf)
      self.suggestedPosts[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0

    first = (n<=50)? n : 50;

    const query = {
      first: first
    };
    if (after) {
      query.after = after;
    }

    const variables = encodeURIComponent(JSON.stringify(query));

    self.receivePromises[userId] = 1
    return fetch('https://www.instagram.com/graphql/query/?query_id=17863787143139595&variables=' + variables,
      {
        'method': 'get',
        'headers': self.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.suggestedPosts[userId] = self.suggestedPosts[userId].concat(json.data.user.edge_web_discover_media.edges)
          if(self.suggestedPosts[userId].length < n){
            if (json.data.user.edge_web_discover_media.page_info.has_next_page) {
              let after = json.data.user.edge_web_discover_media.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getSuggestedPosts(n, after, first , 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[userId] = undefined
              return self.suggestedPosts[userId]
            }
          }else {
            self.receivePromises[userId] = undefined
            return self.suggestedPosts[userId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getSuggestedPosts(n, after, first,  sugPostCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  /**
   * @name getPostLikes
   * @desc Get post likes
   * @description Gets post likes by count and post's short code
   */
  getSuggestedPeople(n, fetch_media_cursor, fetch_media_count, sugPeopleCounter, selfSelf) {
    const self = this
    var userId = this.userName;
    if (!selfSelf)
      self.suggestedPosts[userId] = []

    if (typeof self.receivePromises[userId] !== 'undefined' && !selfSelf)
      return 0


    const query = {
      fetch_media_count:0,
      fetch_suggested_count: n,
      ignore_cache:true,
      filter_followed_friends:true,
      include_reel:true
    };
    if (fetch_media_cursor) {
      query.fetch_media_cursor = fetch_media_cursor;
    }

    const variables = encodeURIComponent(JSON.stringify(query));
    var url = 'https://www.instagram.com/graphql/query/?query_hash=ae21d996d1918b725a934c0ed7f59a74&variables=%7B%22fetch_media_count%22%3A0%2C%22fetch_suggested_count%22%3A'+n+'%2C%22ignore_cache%22%3Atrue%2C%22filter_followed_friends%22%3Atrue%2C%22seen_ids%22%3A%5B%5D%2C%22include_reel%22%3Atrue%7D';
    //var tempURl = 'https://www.instagram.com/graphql/query/?query_hash=ae21d996d1918b725a934c0ed7f59a74' +'&variables='+ variables;
    self.receivePromises[userId] = 1
    return fetch(url,
      {
        'method': 'get',
        'headers': this.getHeaders()
      }).then(res => {
      return res.text().then((response) => {
        //prepare convert to json
        let json = response;

        try {
          json = JSON.parse(response)
        } catch (e) {
          console.log('Session error')
          console.log(response)
          return [];
        }

        if (json.status === 'ok') {
          self.suggestedPeople[userId] = self.suggestedPeople[userId] || [];
          self.suggestedPeople[userId] = self.suggestedPeople[userId].concat(json.data.user.edge_suggested_users.edges)
          if(self.suggestedPeople[userId].length < n){
            if (json.data.user.edge_suggested_users.page_info.has_next_page && json.data.user.edge_suggested_users.page_info.end_cursor) {
              let fetch_media_cursor = json.data.user.edge_suggested_users.page_info.end_cursor
              return new Promise((resolve) => {
                console.log('fetching next page in ' + this.paginationDelay / 1000 + ' seconds');
                setTimeout(() => {
                  resolve(self.getSuggestedPeople(n, fetch_media_cursor, fetch_media_count, 1, 1));
                }, this.paginationDelay);
              });
            } else {
              self.receivePromises[userId] = undefined
              return self.suggestedPeople[userId]
            }
          }else {
            self.receivePromises[userId] = undefined
            return self.suggestedPeople[userId]
          }


        } else {
          return new Promise((resolve) => {
            console.log(json);
            console.log('request failed, retrying in ' + this.paginationDelay / 1000 + ' seconds');
            setTimeout(() => {
              resolve(self.getSuggestedPeople(n, fetch_media_cursor, fetch_media_count,  sugPeopleCounter, selfSelf));
            }, this.paginationDelay);
          });
        }

      }).catch((e) => {
        console.log('Instagram returned:' + e)
      })
    })
  }

  //////////////////////////////////////////////////////
  // INSTAGRAM OPS /////////////////////////////////////
  /**
   * @name follow
   * @description Follow/unfollow user by user ID
   * @param {int} userId
   * @param {boolean} isUnfollow
   * @return {object} Promise of fetch request
   */

  follow(userId, isUnfollow) {
    const headers =
      {
        'referer': 'https://www.instagram.com/',
        'origin': 'https://www.instagram.com',
        'user-agent': this.userAgent,
        'x-instagram-ajax': '1',
        'content-type': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        'x-csrftoken': undefined,
        cookie: ' sessionid=' + this.sessionId + '; csrftoken=' + this.csrfToken + '; mid=WPL0LQAEAAGG3XL5-xHXzClnpqA3; rur=ASH; mid=WRN1_AAEAAE07QksztCl3OCnLj8Y;'
      }

    return fetch('https://www.instagram.com/web/friendships/' + userId + (isUnfollow === 1 ? '/unfollow' : '/follow'),
      {
        'method': 'post',
        'headers': this.getHeaders()//headers
      }).then(res => {
      return res
    })
  }

  /**
   * @name like
   * @description like a post on instagram
   * @tutorial postId is big Integer thus dealt as String not Integer(int max value is 2147483647)
   * @example postID - '1510335854710027921'
   * @param {String} post id
   * @return {Object} Promise
   */
  like(postId) {
    return fetch('https://www.instagram.com/web/likes/' + postId + '/like/',
      {
        'method': 'POST',
        'headers': this.getHeaders()
      }).then(t =>
      t.json().then(r => r)
    )
  }

  /**
   * @name unlike
   * @description unlike a post on instagram
   * @tutorial postId is big Integer thus dealt as String not Integer(int max value is 2147483647)
   * @example postID - '1510335854710027921'
   * @param {String} postId
   * @return {Object} Promise
   */
  unlike(postId) {
    return fetch('https://www.instagram.com/web/likes/' + postId + '/unlike/',
      {
        'method': 'POST',
        'headers': this.getHeaders()
      }).then(t =>
      t.json().then(r => r)
    )
  }

  // INSTAGRAM JSON RESULT UTILITIES
  /**
   * @name getNextFeeds
   * @desc Get next feeds
   * @description Returns end cursor or false
   * @param {Object} json contents from this.getFirstFeeds or previous iteration of this.getNextFeeds
   * @return {String} end_cursor string or false in case has_next_page=false
   */
  getNextFeeds(json) {
    let page = json.data.user.edge_web_feed_timeline.page_info

    return page.has_next_page ? page.end_cursor : false
  }

  /**
   * @name getUserIdByUserName
   * @desc Get user ID by user name
   * @description Extracts user ID from json object and returns it.
   * @param {Object} json
   * @return {String} id
   * @tutorial if next page does not exist - false
   */
  getUserIdByUserName(json) {
    let id = json.graphql.user.id;
    return id ? id : false
  }

  /**
   * @name isPrivate
   * @desc Is private
   * @description Checks if the account is private
   * @param {Object} json
   * @return {Boolean} priv
   */
  isPrivate(json) {
    let priv = json.graphql.user.is_private;
    return priv ? priv : false

  }

  /**
   * @name isVerified
   * @desc Is verified
   * @description Checks if the account is verified
   * @param {Object} json
   * @return {Boolean} verf
   */
  isVerified(json) {
    let verf = json.graphql.user.is_verified;
    return verf ? verf : false


  }

  /*/!**
   * @name getUserPostsNextPage
   * @description Get media next page
   * @description Returns the end_cursor or false (in case of having no next page)
   * @param {Object} json contents from this.getUserMedia
   * @return {String} if next page is not exists - false
   *!/
  getUserPostsNextPage(json) {
    let page = json

    return page.has_next_page ? page.end_cursor : false
  }
  */
///////////////////////////////////////////////////////
  // THIS IS REGISTRATION PART AND HAS BEEN COMMENTED FOR IT IS NOT MUCH NECESSARY!
  /*  /!**
     * @name registration
     * @description Registration process for Instagram, returning true or false (true if account was successfully created)
     * @param {String} username
     * @param {String} password
     * @param {String} name
     * @param {String} email
     * @return {Boolen} account_created
     *!/
    registration(username, password, name, email) {
      let form = new FormData();
      form.append('username', username)
      form.append('password', password)
      form.append('firstname', name)
      form.append('email', email)
      form.append('seamless_login_enabled', "1")

      return fetch('https://www.instagram.com/accounts/web_create_ajax/', {
        'method': 'post',
        'body': form,
        'headers': {
          'referer': 'https://www.instagram.com/',
          'origin': 'https://www.instagram.com',
          'user-agent': this.userAgent,
          'x-instagram-ajax': '1',
          'x-requested-with': 'XMLHttpRequest',
          'x-csrftoken': this.csrfToken,
          cookie: 'csrftoken=' + this.csrfToken
        }
      })
        .then(res => res.json())
        .then(json => {
          //console.log(json.errors);
          return json.account_created;
        })
        .catch(() => console.log('Instagram registration failed'))
    }*/
}
