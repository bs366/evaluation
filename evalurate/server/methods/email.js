const urls = {
  development: 'http://localhost:3000/signup/',
  production: 'http://evalurate.co/signup/'
};


Meteor.methods({
	inviteByEmail(fromUserId, email){
		// create new invite in collection
		// send invite email 
		
		// check inputs
		check(email, String);
		check(fromUserId, String);

		let emailExists = Invites.findOne( {email: email} ),
			fromUser = Meteor.users.findOne({ _id: fromUserId });

		// if the email hasn't been invited already
		if( !emailExists ){
			// Compile the Email Body
			SSR.compileTemplate( 'inviteEmail', Assets.getText( 'email/templates/inviteEmail.html' ) );

			let token = Random.hexString( 15 );
			// make an invite
			Invites.insert({
				email: email,
				invited: false,
				requested: ( new Date() ).toISOString(),
				token: token,
				accountCreated: false,
				dateInvited: (new Date ).toISOString()
			});	
			
			// Send the Email
			if(!fromUser.profile.avatar){
				fromUser.profile.avatar = "https://api.adorable.io/avatars/285/abott@adorable.png"
			}
			Email.send({
		        to: email,
		        from: 'EvaluRate <robot@evalurate.co>',
		        subject: 'Someone has invited you to a team on EvaluRate!',
		        html: SSR.render( 'inviteEmail', {
		        	user: fromUser,
		        	url: urls[ process.env.NODE_ENV ] + token
		        })
		    });
		}
		
	}, 
	outstandingEvaluationsEmail(evaluationId, userId){
		check(evaluationId, String);
		check(userId, String)

		// Compile the Email Body
		SSR.compileTemplate( 'evaluationsEmail', Assets.getText( 'email/templates/evaluationsEmail.html' ) );
		
		// get the evaluation
		let myEval = Evaluations.findOne({ _id: evaluationId  }),
			project = Projects.findOne({ _id: myEval.projectId }),
			user = Meteor.users.findOne({ _id: userId });

		url = urls[ process.env.NODE_ENV ] + myEval.

		// populate Email and send
		Email.send({
	        to: user.email,
	        from: 'EvaluRate <robot@evalurate.co>',
	        subject: 'You have outstanding evauations on EvaluRates!',
	        html: SSR.render( 'evaluationsEmail', {
	        	numberOutstanding: "1",
	        	projectName: project.name,
	        	url: urls[ process.env.NODE_ENV ] + token
	        })
	    });
	}
})