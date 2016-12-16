const publicRoutes = FlowRouter.group( { name: 'public' } );

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render( 'default', { yield: 'signup' } );
  }
});

publicRoutes.route('/signup/:token', {
    name: 'acceptInvite',
    action(params) {
      // console.log(FlowRouter.subsReady("myInvite"))
      // invite = Invites.findOne( {token: params.token} );
      BlazeLayout.render( 'default', { yield: 'acceptInvite', token: params.token} );
    },
    subscriptions(params) {
      this.register('myInvite', Meteor.subscribe('singleInvite', params.token));
    }
})

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    BlazeLayout.render( 'default', { yield: 'login' } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'resetPassword' } );
  }
});

publicRoutes.route( '/home', {
  name: 'splash',
  action() {
    BlazeLayout.render('default', {yield: 'splash'})
  }
});

publicRoutes.route('/logout', {
    name: 'logout',
    triggersEnter: () => {FlowRouter.go('splash')}
});
