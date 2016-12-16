let login = (options) => {
    if (!Session.get('root'))
        Session.setPersistent('root', '')
    _validate(options.form, options.template);
};

let _validate = (form, template) => {
    $(form).validate(validation(template));
};

Accounts.onLogin(() => {
    if (Meteor.user().profile){
        if (Meteor.user().profile.defaultOrg)
            Session.set('root', Meteor.user().profile.defaultOrg)
    }
})

let validation = (template) => {
    return {
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            },
            password: {
                required: 'Need a password here.'
            }
        },
        submitHandler() {
            _handleLogin(template);
        }
    };
};

let _handleLogin = (template) => {
    let email = template.find('[name="emailAddress"]').value,
        password = template.find('[name="password"]').value;

    Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Logged in!', 'success');
        }
    });
};

Modules.client.login = login;