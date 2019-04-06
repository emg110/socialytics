window.results = [];
window.currentFreeIndex = 0;
function ig_media_preview(base64data) {
    var jpegtpl = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsaGikdKUEmJkFCLy8vQkc/Pj4/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHSkpNCY0PygoP0c/NT9HR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//AABEIABQAKgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AA==",
        t = atob(base64data),
        p = t.slice(3).split(""),
        o = t.substring(0, 3).split("").map(function (e) {
            return e.charCodeAt(0)
        }),
        c = atob(jpegtpl).split("");
    c[162] = String.fromCharCode(o[1]);
    c[160] = String.fromCharCode(o[2]);
    return base64data ? "data:image/jpeg;base64," + btoa(c.concat(p).join("")) : null
};

function openNav(id) {
    document.getElementById(id).style.backgroundColor = "#111";
    document.getElementById(id).style.width = "35%";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav(id) {
    document.getElementById(id).style.width = "0";
}

function backNav() {
    var html = undefined;
    var currentFreeIndex = window.currentFreeIndex;
    var results = window.results
    if(currentFreeIndex<2){
        $("#backbtn").hide();
    }
    else if(currentFreeIndex>=2){
        $("#backbtn").show();
        html = results[currentFreeIndex-2].html;
        window.results = results.slice(0,currentFreeIndex-1);
        window.currentFreeIndex--;

        if(window.currentFreeIndex<2) $("#backbtn").hide();
    }


    if(html !== undefined)document.getElementById('instagram-container').innerHTML = html;
/*    $("#instagram-profile-container").hide();
    $("#instagram-profiles-container").hide();
    $("#instagram-post-container").hide();
    $("#instagram-posts-container").hide();*/
    /*$("#instagram-container").show();*/

}

function getEndpoint(endpoint, type, code, target) {
/*    $("#instagram-profile-container").hide();
    $("#instagram-profiles-container").hide();
    $("#instagram-post-container").hide();
    $("#instagram-posts-container").hide();*/
    $("#carosel").hide();
    $("#logo").show();
    if (type !== "form-data") {
        closeNav('insta-sidepanel');
        openNav('insta-sidepanel');
        if (!code) document.getElementById('instagram-container').innerHTML = html;
        var username = document.getElementById('username-input').value;
        var tag = document.getElementById('tag-input').value;
        var location = document.getElementById('location-input').value;
        var query = document.getElementById('search-input').value;
        var count = document.getElementById('count-input').value || 50;
        var shortcode = document.getElementById('shortcode-input').value;
        var url = endpoint;
        switch (type) {
            case 'profile':
                if (code) {
                    if (code.length >= 3) {
                        url = endpoint + code;
                    } else {
                        url = "NA";
                    }
                } else if (username.length !== undefined) {
                    if (username.length >= 3) {
                        url = endpoint + username;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'whoami':
                url = endpoint;
                break
            case 'recent-posts':
                if (username.length !== undefined) {
                    if (username.length >= 3) {
                        url = endpoint + 'username=' + username + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'all-posts':
                if (username.length !== undefined) {
                    if (username.length >= 3) {
                        url = endpoint + 'username=' + username;
                    } else {
                        url = "NA";
                    }
                }
                break

            case 'tag-posts':
                if (tag.length !== undefined) {
                    if (tag.length >= 3) {
                        url = endpoint + 'tag=' + tag + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'location-posts':
                if (location.length !== undefined) {
                    if (location.length >= 3) {
                        url = endpoint + 'location=' + location + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'user-following':
                if (username.length !== undefined) {
                    if (username.length >= 3) {
                        url = endpoint + 'username=' + username + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'user-followers':
                if (username.length !== undefined) {
                    if (username.length >= 3) {
                        url = endpoint + 'username=' + username + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'search-posts':
                if (query.length !== undefined) {
                    if (query.length >= 3) {
                        url = endpoint + 'query=' + query + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'feed-posts':
                if (count !== undefined) {
                    if (count >= 10) {
                        url = endpoint + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'all-feed-posts':
                break
            case 'post-likes':
                if (shortcode.length !== undefined) {
                    if (shortcode.length >= 3) {
                        url = endpoint + 'shortcode=' + shortcode + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'post-comments':
                if (shortcode.length !== undefined) {
                    if (shortcode.length >= 3) {
                        url = endpoint + 'shortcode=' + shortcode + '&' + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'post-json':
                if (code) {
                    if (code.length >= 3) {
                        url = endpoint + 'shortcode=' + code;
                    } else {
                        url = "NA";
                    }
                } else if (shortcode.length !== undefined) {
                    if (shortcode.length >= 3) {
                        url = endpoint + 'shortcode=' + shortcode;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'post-page':
                if (shortcode.length !== undefined) {
                    if (shortcode.length >= 3) {
                        url = endpoint + 'shortcode=' + shortcode;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'sugg-posts':
                if (count !== undefined) {
                    if (count >= 10) {
                        url = endpoint + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
            case 'sugg-people':
                if (count !== undefined) {
                    if (count >= 10) {
                        url = endpoint + 'count=' + count;
                    } else {
                        url = "NA";
                    }
                }
                break
        }
        if(target === 'main'){
            window.results = [];
            window.currentFreeIndex = 0;
            $("#backbtn").hide();
        }else{
            $("#backbtn").show();
        }
        if (url !== "NA" && url.indexOf('http://') >= 0) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (e) {
                var html = xhr.responseText;
                document.getElementById('insta-sidepanel').style.backgroundColor = "#fff";
                var index = window.currentFreeIndex;
                window.results[index]={html:html};
                
                document.getElementById('instagram-container').innerHTML = html;
                window.currentFreeIndex++;
                
              /*  if (target == 'post') {
                    $("#backbtn").show();
                /!*    $("#instagram-post-container").show();
                    $("#instagram-profile-container").hide();
                    $("#instagram-container").hide();*!/

                    document.getElementById('instagram-container').innerHTML = html;
                }
                else if (target == 'posts') {
                    $("#backbtn").show();
               /!*     $("#instagram-posts-container").show();
                    $("#instagram-profile-container").hide();
                    $("#instagram-profiles-container").hide();
                    $("#instagram-post-container").hide();
                    $("#instagram-container").hide();*!/

                    document.getElementById('instagram-container').innerHTML = html;
                }
                else if (target == 'profile') {
                    $("#backbtn").show();
                  /!*  $("#instagram-profile-container").show();
                    $("#instagram-container").hide();
                    $("#instagram-post-container").hide();
                    $("#instagram-posts-container").hide();
                    $("#instagram-profiles-container").hide();*!/

                    document.getElementById('instagram-container').innerHTML = html;
                }
                else if (target == 'profiles') {
                    $("#backbtn").show();
                  /!*  $("#instagram-profiles-container").show();
                    $("#instagram-profile-container").hide();
                    $("#instagram-posts-container").hide();
                    $("#instagram-post-container").hide();
                    $("#instagram-container").hide();*!/

                    document.getElementById('instagram-container').innerHTML = html;
                }
                else {
                   /!* $("#instagram-container").show();
                    $("#instagram-profile-container").hide();
                    $("#instagram-profiles-container").hide();
                    $("#instagram-post-container").hide();
                    $("#instagram-posts-container").hide();*!/
                    document.getElementById('instagram-container').innerHTML = html;
                }
*/
                /*document.getElementById('media-preview').src = ig_media_preview(document.getElementById('media-preview').src.replace('http://localhost:8080/',''));
                document.getElementById('media-view').src = ig_media_preview(document.getElementById('media-view').src.replace('http://localhost:8080/',''));*/

            }
            xhr.send();
        } else {
            closeNav('insta-sidepanel');
            console.log('please provide all required');
            window.alert('please provide all required');
        }
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", endpoint, true);
        xhr.onload = function (e) {
            var txt = xhr.responseText;
            var json = JSON.parse(txt);
            document.getElementById('username-input').value = json.username;
            document.getElementById('tag-input').value = json.tag;
            document.getElementById('location-input').value = json.location;
            document.getElementById('search-input').value = json.query;
            document.getElementById('count-input').value = json.count;
            document.getElementById('shortcode-input').value = json.shortcode;
            console.log(json);
        }
        xhr.send();

    }

}


/*function loadMap(divName){
  var latlon = divName.split('_');
  var coor = [latlon[0], latlon[1]];
  var map = L.map(divName).setView(coor, 13);
  map.invalidateSize();
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: ''}).addTo(map);
  L.marker(coor).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
}*/
function carosel() {
    $("#powerpoint").carousel();
    // Enable Carousel Indicators
    $(".item").click(function () {
        $("#powerpoint").carousel(1);
    });
    // Enable Carousel Controls
    $(".carousel-control-prev").click(function () {
        $("#powerpoint").carousel("prev");
    });
}

// Socket.io is exposed as the `io` global.
var socket = io('http://localhost:8080');
// @feathersjs/client is exposed as the `feathers` global.
var feathersClient = feathers().configure(feathers.socketio(socket));

var posts = feathersClient.service('/instagram/posts');
posts.on('created', (post) => {
    var caption = 'POST WITH NO CAPTION';
    var pic = '';
    var title = 'Post:';
    if (post.edge_media_to_caption) {
        if (post.edge_media_to_caption.edges[0]) {
            caption = post.edge_media_to_caption.edges[0].node.text;
        }
    }
    if (post.thumbnail_src) {
        pic = post.thumbnail_src;
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

var profiles = feathersClient.service('/instagram/profiles');
profiles.on('created', (profile) => {
    var caption = 'PROFILE WITH NO NAME';
    var pic = '';
    if (profile.full_name) {
        caption = profile.username;
    }
    if (profile.profile_pic_url) {
        pic = profile.profile_pic_url;
    }
    $.notify({
        // options
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

var searches = feathersClient.service('/instagram/search');
searches.on('created', (search) => {
    var result = 'Search results with: ';
    if (search.places) {
        result += search.places.length + ' Places | ';
    }
    if (search.hashtags) {
        result += search.hashtags.length + ' Hashtags | ';
    }
    if (search.people) {
        result += search.people.length + ' People | ';
    }
    $.notify({
        // options
        icon: 'glyphicon glyphicon-search',
        message: result
    }, {
        // settings
        type: 'info',
        delay: 5000,
        icon_type: 'class',
    });
    //console.log('message created', message);
});

var medias = feathersClient.service('/instagram/media');
medias.on('created', (media) => {
    var caption = 'POST WITH NO CAPTION';
    var pic = '';
    var title = 'Post:';
    media = media.graphql.shortcode_media || media;
    if (media.edge_media_to_caption) {
        if (media.edge_media_to_caption.edges[0]) {
            caption = media.edge_media_to_caption.edges[0].node.text;
        }
    }
    if (media.media_preview) {
        pic = media.media_preview;
        pic = ig_media_preview(pic);
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

$("#carosel").hide();
$("#logo").click(function () {
    $("#carosel").show();
    $("#logo").hide();
});
$("#github").click(function () {
    window.open('https://houmanhadian.github.io/', '_blank');
});


var html = '<div class="loader loader--style1" title="0">\n' +
    '        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
    '             x="0px" y="0px"\n' +
    '             width="150px" height="150px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\n' +
    '  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n' +
    '    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n' +
    '    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\n' +
    '          <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n' +
    '    C22.32,8.481,24.301,9.057,26.013,10.047z">\n' +
    '            <animateTransform attributeType="xml"\n' +
    '                              attributeName="transform"\n' +
    '                              type="rotate"\n' +
    '                              from="0 20 20"\n' +
    '                              to="360 20 20"\n' +
    '                              dur="0.5s"\n' +
    '                              repeatCount="indefinite"/>\n' +
    '          </path>\n' +
    '  </svg>\n' +
    '      </div>';
