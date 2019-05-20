module.exports = async function writeDatabase(fapi, data, service, account) {
  if (data.user) {
    if (data.user.edge_owner_to_timeline_media) {
      if (data.user.edge_owner_to_timeline_media.edges) {
        data = data.user.edge_owner_to_timeline_media.edges
      }
    }else if (Object.keys(data).length <= 1) data = data.user
  }
  if (data.graphql) {
    if (data.graphql.shortcode_media) {
      for (i in data.graphql.shortcode_media) {
        data[i] = data.graphql.shortcode_media[i]
      }
      delete data.graphql.shortcode_media
      delete data.graphql

    }
  }
  if (data.length) {
    let items = [];
    let itemIds = [];
    for (var i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.node) {
        item = item.node;
      }
      if (item.user) {
        item = item.user
      }
      if (item.graphql) {
        if (item.graphql.shortcode_media) {
          item = item.graphql.shortcode_media
        }
      }
      item.account = account;
      items.push(item);
      itemIds.push(item.id)
    }
    let removeDataMulti = await fapi.service(service)
      .remove(null,
        {
          query:{
            "id": {
              $in:itemIds
            }
          }
        })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
    let createDataMulti = await fapi.service(service)
      .create(items)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }else if(data.id){
    let removeData = await fapi.service(service)
      .remove(data.id)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
    let createDataMulti = await fapi.service(service)
      .create(data)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }


}
