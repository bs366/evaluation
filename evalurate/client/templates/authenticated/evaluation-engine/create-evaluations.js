Template.evaluationAutoForm.helpers({
    updateFormId() {
        return `update_${this.evalTemp.templateId}`;
    },
    schema() {
        let schema = {},
            me = Meteor.userId(),
            eval = Evaluations.findOne(FlowRouter.getParam('evalId')),
            project = Projects.findOne(FlowRouter.getParam('pid')),
            unit = Units.findOne(this.team);

        for (let field of this.evalTemp.fields) {
          if (field.modifier == "eachMember"){
            for (let member of unit.members){
              let currUser = Meteor.users.findOne(member).profile
              schema[field.name + '.' + member] = {
                label: currUser.firstName + ' ' + currUser.lastName,
                type: field.type,
                autoform: field.autoform
              }
            }
          }else{
            schema[field.name] = {type: field.type, label: field.label}
          }
        }
        let hiddenField = {
            afFieldInput: {
                type: "hidden"
            },
            afFormGroup: {
                label: false
            }
        }
        schema["evaluationId"] = {type: String, defaultValue: () => {
                return FlowRouter.getParam('evalId')
            },
            autoform: hiddenField
        }
        schema["teamId"] = {type: String, defaultValue: () => {
                return unit._id
            },
            autoform: hiddenField
        }
        schema["owner"] = {type: String, defaultValue: () => {
                return me
            },
            autoform: hiddenField
        }
        return new SimpleSchema(schema);
    },
    uniqueEvalId() {
      return "insertResponseForm-" + this.team
    }
})

Template.evaluations.onCreated( () => {
    if (FlowRouter.getParam('evalId')){
      Template.instance().subscribe('singleEval', FlowRouter.getParam('evalId'))
    }
    if (FlowRouter.getParam('pid')) {
      Template.instance().subscribe('singleProject', FlowRouter.getParam('pid'))
      Template.instance().subscribe('projectTeams', FlowRouter.getParam('pid'))
      Template.instance().subscribe('responsesTemp')
    }
    if (Session.get('root')) {
      Template.instance().subscribe('peers', Session.get('root'))
    }
    Template.instance().subscribe('evalTemplates')
})

Template.evaluations.helpers({
    evaluation(teamId) {
        if (FlowRouter.getParam('evalId') && teamId) {
            let e = Evaluations.findOne({
                _id: FlowRouter.getParam('evalId')
            })
            return {team: teamId, evalTemp: EvalTemplates.findOne(e.templateId)}
        }
    },
    evalTeams() {
      let p = Projects.findOne(FlowRouter.getParam('pid'))
      let r = ResponsesTemp.find({$and: [
        {evaluationId: FlowRouter.getParam('evalId')},
        {owner: Meteor.userId()}
      ]}).map((resp) => { return resp.teamId})
      return Units.find({$and: [{_id: {$in: p.teams}},
        {members: Meteor.userId()},
        {_id: {$not: {$in: r}}}]}).map((team) => {return {
          teamName: team.name,
          teamId: team._id
        }})
    }
});


let peerEval = new SimpleSchema({
    "type": {
        type: Number,
    },

})
