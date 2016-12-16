Meteor.startup(function () {
  smtp = {
    username: 'email@email.com',   // eg: server@gentlenode.com
    password: 'password',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }

  // uncomment these lines when deploying
  //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  //console.log(process.env.MAIL_URL)
});