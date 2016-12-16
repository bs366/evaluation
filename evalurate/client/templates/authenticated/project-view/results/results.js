
Template.evalResults.onCreated( () => {
    if (FlowRouter.getParam('pid')) {
      Template.instance().subscribe('projectEvals', FlowRouter.getParam('pid'))
      Template.instance().subscribe('singleProject', FlowRouter.getParam('pid'))
      Template.instance().subscribe('responsesTemp')
      Template.instance().subscribe('projectTeams', FlowRouter.getParam('pid'))
    }
    if (Session.get('root')){
      Template.instance().subscribe('peers', Session.get('root'))
    }
    Template.instance().subscribe('evalTemplates')
})

Template.evalResults.helpers({
    evaluations() {
        if (FlowRouter.getParam('pid')) {
            return Evaluations.find({ projectId: FlowRouter.getParam('pid') })
        }
    },
    evalTempName(tempId) {
      return EvalTemplates.findOne(tempId).title
    },
    numResponses(evalId) {
      return ResponsesTemp.find({evaluationId: evalId}).count()
    },
    totalResponses() {
      let p = Projects.findOne(FlowRouter.getParam('pid'))
      let teams = Units.find({_id: {$in: p.teams}})
      let count = 0
      teams.forEach((team) => {
        count += team.members.length
      })
      return count
    },
    numTeamResponses(evalId, unitId) {
      return ResponsesTemp.find({$and: [{evaluationId: evalId}, {teamId: unitId}] }).count()
    },
    totalTeamResponses(unitId) {
      return Units.findOne(unitId).members.length
    },
    percentComplete(num, den) {
      return (num/den*100).toString() + "%"
    },
    teams() {
      return Units.find({_id: {$in: Projects.findOne(FlowRouter.getParam('pid')).teams}})
    },
    project() {
      return Projects.findOne(FlowRouter.getParam('pid'))
    },
    colSize() {
      let n = Evaluations.find({ projectId: FlowRouter.getParam('pid') }).count() + 1
      return 's' + Math.floor(12/n).toString()
    },
    getScore(userId, unitId, evalId) {
      let r = ResponsesTemp.find({
          evaluationId: evalId,
          teamId: unitId
      })
      let eval = Evaluations.findOne(evalId),
        evalTemp = EvalTemplates.findOne(eval.templateId),
        len = r.count(),
        score = 0
      r.forEach((resp) => {
        for (let key of evalTemp.fields) {
          score += resp[key.label][userId]
        }
      })
      if (score)
        return score / (len * evalTemp.fields.length)
    },
    getIndividualScore(scorer, scored, unitId, evalId) {
      let r = ResponsesTemp.findOne({
          evaluationId: evalId,
          teamId: unitId,
          owner: scorer
      })
      if (r) {
        let eval = Evaluations.findOne(evalId),
            evalTemp = EvalTemplates.findOne(eval.templateId),
            score = 0
        for (let key of evalTemp.fields) {
            score += r[key.label][scored]
        }
        return score / evalTemp.fields.length
      }
    }
});

Template.evalResults.events({
  'click .expand-member-scores': (event) => {
    event.preventDefault()
      $('.hidden-scores[id=' + event.currentTarget.id + ']' ).toggle('hidden')
  }
})
