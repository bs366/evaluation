let _ = lodash
/*
FlowRouter.subscriptions = function() {
    this.register('userInfo', Meteor.subscribe('userProfile'));
    this.register('roots', Meteor.subscribe('roots'));
};
*/
const enterAnimate = () => {
    $('.animate-this').animateCss('fadeInLeft', () => {
        //$('.fixed-action-btn').toggleClass('hidden');
    })
}

const exitAnimate = () => {
    $('.animate-this').animateCss('fadeOut')
}

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [enterAnimate],
    //triggersExit: [exitAnimate]
});

authenticatedRoutes.route('/edit-profile', {
    name: 'editProfile',
    action() {
        BlazeLayout.render('default', { mainContent: 'userProfileEdit'})
    }
})

authenticatedRoutes.route('/choose-organization', {
    name: 'rootChooser',
    action() {
        BlazeLayout.render('default', {mainContent: 'rootChooser'})
    }
})

authenticatedRoutes.route('/', {
    name: 'index',
    action() {
        BlazeLayout.render('default', { mainContent: 'index', sidebar: 'tempNav' });
    }
});

// authenticatedRoutes.route('/logout', {
//     name: 'logout',
//     action() {
//         Meteor.logout();
//     }
// });

authenticatedRoutes.route('/units/:id', {
    name: 'unitView',
    action() {
        BlazeLayout.render('default', { mainContent: 'unitView', sidebar: 'tempNav' });
    }
});

authenticatedRoutes.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render('default', { mainContent: 'dashboardUI', sidebar: 'tempNav' });
    }
});

authenticatedRoutes.route('/admin', {
    name: 'admin',
    // action() {
    //     //This is a proof of concept that we can use the same routes for different roles
    //     //This means that users would be able to share a link and have it go to a similar place
    //     //Especially helpful for the different sidebar views (admin, projects)
    //     /*if (Meteor.userId() == "2P3t3FZxgefQQgseN"){
    //         BlazeLayout.render('default', { mainContent: 'noUnitSelected' });
    //     }*/
    //     //BlazeLayout.render('default', { mainContent: 'dashboard', sidebar: 'adminSidebar' });
    // },
    triggersEnter: [(context, redirect) => {
      if(Blaze._globalHelpers.isAdmin()){
        redirect('/admin/' + Session.get('root'))
      }else if(!Blaze._globalHelpers.isAdmin()){
        redirect('projects')
      }

    }]
});

authenticatedRoutes.route('/admin/:id', {
    name: 'adminUnit',
    action(params) {
        BlazeLayout.render('default', { mainContent: 'dashboard', sidebar: 'adminSidebar' });
    },
    triggersEnter: [() => {
        $('#adminTabs').tabs('select_tab', 'adminTab1');
    }]
});

authenticatedRoutes.route('/projects', {
    name: 'projects',
    action() {
        BlazeLayout.render('default', { mainContent: 'noUnitSelected', sidebar: 'projectsSidebar' });
    }
});


// Handling the side bar based on context is really weird.
// Still figuring things out.
authenticatedRoutes.route('/projects/:id', {
    name: 'projectView',
    action(params) {
        let p = Projects.findOne(params.id)
        BlazeLayout.render('default', { mainContent: 'project', sidebar: 'projectsSidebar', proj: p });
    }
});

authenticatedRoutes.route('/create-evaluation', {
    name: 'createEvaluation',
    action() {
        BlazeLayout.render('default', { mainContent: 'createEvaluation', sidebar: 'tempNav' });
    }
});

authenticatedRoutes.route('/project/:pid/:evalId', {
    name: 'singleEval',
    action() {
        BlazeLayout.render('default', { mainContent: 'evaluations'});
    }
});

authenticatedRoutes.route('/results/:pid', {
  name: 'evalResults',
  action() {
    BlazeLayout.render('default', { mainContent: 'evalResults'})
  }
})
