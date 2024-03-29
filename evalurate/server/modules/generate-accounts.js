let administrators = [
  {
    name: { first: faker.name.firstName(), last: faker.name.lastName() },
    profile: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumberFormat(),
      jobTitle: faker.name.jobTitle(),
      avatar: faker.image.avatar()
    },
    email: faker.internet.email(),
    password: 'password',
    //username: faker.internet.userName()
  }
];

let generateAccounts = () => {
  let fakeUserCount = 5,
      usersExist    = _checkIfAccountsExist( administrators.length + fakeUserCount );

  if ( !usersExist ) {
    _createUsers( administrators );
    _createUsers( _generateFakeUsers( fakeUserCount ) );
  }
};

let _checkIfAccountsExist = ( count ) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = ( users ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    if ( !userExists ) {
      _createUser( user );
    }
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  console.log(user)
  Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: user.profile,
    //username: user.username
  });
};

let _generateFakeUsers = ( count ) => {
  let users = [];

  for ( let i = 0; i < count; i++ ) {
    users.push({
      //name: { first: faker.name.firstName(), last: faker.name.lastName() },
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumberFormat(),
        jobTitle: faker.name.jobTitle(),
        avatar: faker.image.avatar()
      },
      email: faker.internet.email(),
      password: 'password',
      //username: faker.internet.userName()
    });
  }
  return users;
};

Modules.server.generateAccounts = generateAccounts;
