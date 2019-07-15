module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);

  });

  app.on('login', (authResult, { connection }) => {
    if(connection) {
      const user = connection.user;
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);
      // if(user.isAdmin) { app.channel('admins').join(connection); }
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });
  //app.publish(() => app.channel('instagram'));
  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // app.publish(eventname, () => {})
    console.log('Publishing all events to all authenticated users.');
    return app.channel('authenticated');
  });
  // app.service('users').publish('created', () => app.channel('admins'));
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
