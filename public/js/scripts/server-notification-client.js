// Socket.io is exposed as the `io` global.
/*var socket = io(window.location.protocol+window.location.host);*/
// @feathersjs/client is exposed as the `feathers` global.

function startListening(app){
  var posts = app.service('/instagram/posts');
  posts.on('created', (post) => {
    if(!window.bulkevent){
      var caption = 'POST WITH NO CAPTION';
      var pic = picit(post);
      var title = 'Post:';
      if (post.edge_media_to_caption) {
        if (post.edge_media_to_caption.edges[0]) {
          caption = post.edge_media_to_caption.edges[0].node.text;
        }
      }

      $.notify({
        // options
        icon: pic,
        title: title,
        message: caption.substring(0, 100) + '...'
      }, {
        // settings
        type: 'info',
        delay: 2000,
        icon_type: 'src',
        template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span class="stack-span" data-notify="icon"></span> ' +
          '</br>'+
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '</div>'
      });
    }
  });

  var feeds = app.service('/instagram/feed');
  feeds.on('created', (feed) => {
    var caption = 'FEED PROFILE WITH NO CAPTION';
    var pic = picit(feed);
    var title = 'Feed people:';
    if (feed.edge_media_to_caption) {
      if (feed.full_name.length > 1) {
        caption = feed.full_name;
      } else {
        caption = feed.username;
      }
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption.substring(0, 100) + '...'
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var profiles = app.service('/instagram/profiles');
  profiles.on('created', (profile) => {
    var caption = 'PROFILE WITH NO NAME';
    var title = 'Profile: ';
    var pic = picit(profile);
    if (profile.full_name) {
      caption = profile.full_name;
    } else {
      caption = profile.username;
    }
    $.notify({
      // options
      title: title,
      icon: pic,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 5000,
      icon_type: 'src',
    });
    //console.log('message created', message);
  });

  var searches = app.service('/instagram/search');
  searches.on('created', (search) => {
    var result = 'Search results with: ';
    if (search.places) {
      result += '<span class="glyphicon glyphicon-map-marker"></span>'+ search.places.length + '  Places | ';
    }
    if (search.hashtags) {
      result += '<span class="glyphicon glyphicon-tags"></span>'+ search.hashtags.length + '  Hashtags | ';
    }
    if (search.users) {
      result += '<span class="glyphicon glyphicon-user"></span>'+ search.users.length + '  Users | ';
    }
    $.notify({
      // options
      icon: 'glyphicon glyphicon-search',
      message: result
    }, {
      // settings
      type: 'info',
      delay: 12000,
      icon_type: 'class',
    });
    //console.log('message created', message);
  });

  var medias = app.service('/instagram/media');
  medias.on('created', (media) => {
    var caption = 'MEDIA WITH NO CAPTION';
    var pic = picit(media);
    var title = 'Post:';
    if (media.edge_media_to_caption) {
      if (media.edge_media_to_caption.edges[0]) {
        caption = media.edge_media_to_caption.edges[0].node.text;
      }
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var locations = app.service('/instagram/location');
  locations.on('created', (post) => {
    var caption = 'LOCATION POST WITH NO CAPTION';
    var pic = picit(post);
    var title = 'Location post:';
    if (post.edge_media_to_caption) {
      if (post.edge_media_to_caption.edges[0]) {
        caption = post.edge_media_to_caption.edges[0].node.text;
      }
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var likes = app.service('/instagram/likes');
  likes.on('created', (like) => {
    var caption = 'POST WITH NO CAPTION';
    var pic = picit(like);
    var title = 'Post:';
    if (like.full_name) {
      caption = like.full_name ? like.full_name.length > 0 : like.username
    }
    caption += ' liked this post';


    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var followers = app.service('/instagram/followers');
  followers.on('created', (follower) => {
    var caption = 'FOLLOWER WITH NO NAME';
    var pic = picit(follower);
    var title = 'Follower: ';
    if (follower.full_name) {
      caption = follower.full_name ? follower.full_name.length > 0 : follower.username

    }
    caption += ' follows you!'


    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var followings = app.service('/instagram/following');
  followings.on('created', (following) => {
    var caption = 'POST WITH NO CAPTION';
    var pic = picit(following);
    var title = 'Following: ';
    if (following.username) {
      caption = 'You follow ' + following.full_name.length > 1 ? following.full_name : following.username
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });


  var comments = app.service('/instagram/comment');
  comments.on('created', (comment) => {
    var caption = 'COMMENT WITH NO CAPTION';
    var pic = picit(comment);
    var title = 'Comment: ';
    if (comment.text) {
      if (comment.owner) {
        caption = comment.owner.username + ' commented: ' + comment.text;
      }
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });

  var tags = app.service('/instagram/tag');
  tags.on('created', (post) => {
    var caption = 'TAG POST WITH NO CAPTION';
    var pic = picit(post);
    var title = 'Tag post: ';
    if (post.edge_media_to_caption) {
      if (post.edge_media_to_caption.edges[0]) {
        caption = post.edge_media_to_caption.edges[0].node.text;
      }
    }

    $.notify({
      // options
      icon: pic,
      title: title,
      message: caption
    }, {
      // settings
      type: 'info',
      delay: 8000,
      icon_type: 'src',
      template: '<div style="width:15%" data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span class="stack-span" data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +

        '</div>'
    });
    //console.log('message created', message);
  });
  socket.on('authenticated', function (response) {
    if(!response.socRes){
      console.log(response)
    }

  })
}
