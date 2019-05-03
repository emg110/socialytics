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
    for (var i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.node) {
        item = item.node;
      }
      if (item.user) {
        item = data.user
      }
      if (item.graphql) {
        if (item.graphql.shortcode_media) {
          for (i in item.graphql.shortcode_media) {
            item[i] = item.graphql.shortcode_media[i]
          }
          delete item.graphql.shortcode_media
          delete item.graphql

        }
      }
      item.account = account;
      items.push(item);
    }
    let recordData = await fapi.service(service)
      .create(items)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    data.account = account;
    let recordData = await fapi.service(service)
      .create(data)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
