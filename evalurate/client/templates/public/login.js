Template.login.onRendered( () => {
  Modules.client.login( { form: "#login", template: Template.instance() } );
});

Template.login.events({
	'submit form': ( event ) => event.preventDefault(),
	'click #cas-login': () => Meteor.loginWithCas(),
	'click #google-login': ( event ) => {
		event.preventDefault() 
		Meteor.loginWithGoogle()
	}
});

