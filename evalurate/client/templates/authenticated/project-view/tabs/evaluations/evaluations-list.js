SimpleSchema.debug = true;

Template.evalList.helpers({
	'evals': () => {
		return Evaluations.find({projectId: Template.instance().data.projId})
	},
	'evalTitle': (templateId) => {
		return EvalTemplates.findOne(templateId)
	},
  numResponses(evalId) {
    return ResponsesTemp.find({evaluationId: evalId}).count()
  },
  totalResponses() {
    let p = Projects.findOne(Template.instance().data.projId)
    let teams = Units.find({_id: {$in: p.teams}})
    let count = 0
    teams.forEach((team) => {
      count += team.members.length
    })
    return count
  },
  percentComplete(num, den) {
    return Math.floor(num/den*100).toString() + "%"
  }
})

Template.evalListForMembers.helpers({
  'pendingEvals': () => {
		let e = Evaluations.find({projectId: Template.instance().data.projId}),
        ids = []
    e.forEach((eval) => {
        if (!ResponsesTemp.findOne({$and: [
          {owner: Meteor.userId()},
          {evaluationId: eval._id}]})) {
              ids.push(eval._id)
          }
    })
    if (ids.length > 0) {
        return Evaluations.find({_id: {$in: ids}})
    }else{
        return false
    }
	},
  'completedEvals': () => {
		let e = Evaluations.find({projectId: Template.instance().data.projId}),
        ids = []
    e.forEach((eval) => {
        if (ResponsesTemp.findOne({$and: [
          {owner: Meteor.userId()},
          {evaluationId: eval._id}]})) {
              ids.push(eval._id)
          }
    })
    if (ids.length > 0) {
        return Evaluations.find({_id: {$in: ids}})
    }else{
        return false
    }
	},
	'evalTitle': (templateId) => {
		return EvalTemplates.findOne(templateId)
	}
})

Template.evalList.onCreated(() => {
    Template.instance().subscribe('projectEvals', Template.instance().data.projId)
})

Template.evalListForMembers.onCreated(() => {
    Template.instance().subscribe('projectEvals', Template.instance().data.projId)
})

Template.evalTemplateList.helpers({
  'templates': () => {

    let temps = EvalTemplates.find()
    //let list = [{options: [{label: 'Choose a template', value: ''}]}]
    let templateId = {};
    templateId['autoform'] = {};
    templateId['autoform.options'] = []
    templateId['allowedValues'] = [];

    temps.forEach((temp) => {
      templateId['allowedValues'].push(temp._id)
      templateId['autoform.options'].push({
        label: temp.title,
        value: temp._id
      })
    })
    templateId['type'] = String;

    return templateId
  }
})

Template.evalList.events({
	'click .add-evaluation': (event) => {
		event.preventDefault()
    Session.set('thisProject', Template.instance().data.projId)
		MaterializeModal.display({
			bodyTemplate: "evalTemplateList"
		})
	}
})

AutoForm.hooks({
  createEval: {
    before: {
      insert: (doc) => {
        doc.projectId = Session.get('thisProject')
        return doc
      }
    }
  }
})
