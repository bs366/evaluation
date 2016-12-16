let _ = lodash;

let evalTemplateFixtures = () => {
  let Templates = [];

  Templates[0] = {
    "title": "All Around Peer Eval.",
    "fields": [{
      "name": "Teamwork",
      "label": "Teamwork",
      "type": "Number",
      "modifier": "eachMember",
      "autoform": {
        'afFieldInput': {
          'type': "range"
        }
      }
    }, {
      "name": "Performance",
      "label": "Performance",
      "autoform": {
        'afFieldInput': {
          'type': "range"
        }
      },
      "type": "Number",
      "modifier": "eachMember"
    }],
    "creator": "Evalurate"
  }
  _.forEach(Templates, function(value) {
    if (!EvalTemplates.findOne({
        title: value.title
      })) {
      EvalTemplates.insert(value)
    }
  })



}


Modules.server.evalTemplateFixtures = evalTemplateFixtures;
