let acceptInvite = ( options ) => {
  _validate( options.form, options.template );
};

let _validate = ( form, template ) => {
  $( form ).validate( validation( template ) );
};

let validation = ( template ) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      },
      token: {
        required: true,
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler() { _handleAcceptInvite( template ); }
  };
};

let _handleAcceptInvite = ( template ) => {
  let token = template.find( '[name="token"]' ).value,
      user = {
        email: template.find( '[name="emailAddress"]' ).value,
        password: template.find( '[name="password"]' ).value
      }

  let invite = Invites.findOne({ token: token });
  // validate invite
  if(!invite){
    // There's no invite associated with this token
    Bert.alert( "There is no invite associated with this token, please check the link and try again.", "danger");
  }
  else if (invite.accountCreated){
    // if the account for this invite has already been created
    Bert.alert( "The account associated with this invite has already been created", "danger");
  }
  else if (user.email != invite.email) {
    // if the user is trying to sign up with a different email than they were invited with
    Bert.alert( "You must sign up with the same email you were invited with, please try again.", "danger" );
  }
  else{
    Accounts.createUser( user, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( 'Welcome!', 'success' );
      }
    });
    FlowRouter.go("/dashboard")
  }
};

Modules.client.acceptInvite = acceptInvite;
