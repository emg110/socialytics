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
  if (!data.length) {
    data = [data]
  }
  let items = [];
  let itemIds = [];
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
    itemIds.push(item.id)
  }
  /*let checkData = await fapi.service(service)
    .find({
      query: {
        "id": {
          $in:itemIds
        },
        $sort: {taken_at_timestamp: -1},
        $limit: 20000
      },
      paginate: {
        default: 100000,
        max: 20000
      },
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });*/

  let patchData = await fapi.service(service)
    .patch(null,items,
      {
        query:{
          "id": {
            $in:itemIds
          },
          $limit: 100000
        },
        nedb: {upsert: true}
      })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
}
