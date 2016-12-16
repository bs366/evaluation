let startup = () => {
 	_setBrowserPolicies();
  	_generateAccounts();
    _evalTemplateFixtures();

	ServiceConfiguration.configurations.remove({
	    service: "google"
	});
	ServiceConfiguration.configurations.insert({
	    service: "google",
	    clientId: "786655902490-964unc0s0d84d7nionkkaincco334sm2.apps.googleusercontent.com",
	    secret: "gv92DPWftPZKTBqavYjsEqBg"
	});
};

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

var _evalTemplateFixtures = () => Modules.server.evalTemplateFixtures();

Modules.server.startup = startup;
