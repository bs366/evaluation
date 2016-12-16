Template.acceptInvite.onRendered( () => {
  Modules.client.acceptInvite({
    form: "#signup",
    template: Template.instance()
  });
});

Template.acceptInvite.events({
  'submit form': ( event ) => event.preventDefault()
});

Template.acceptInvite.helpers({
	invite() {
		return Invites.findOne({token: FlowRouter.getParam("token")});
	}
})