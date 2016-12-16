Meteor.publish('usersProjects', function() {
	let units = Units.find({members: this.userId}, {_id: 1}).map(function(item){ return item._id; })
	let p = Projects.find({teams: {$in: units}})
	let pids = p.map((proj) => { return proj._id })
	let e = Evaluations.find({projectId: {$in: pids}})
	let eids = e.map((eval) => {return eval._id})
	return [p, e, ResponsesTemp.find({evaluationId: {$in: eids}})]
})

Meteor.publish( 'singleProject', function(id) {
	check(id, String)
	return Projects.find(id)
})

Meteor.publish( 'projectsList', function(id) {
	check(id, String)
	return Projects.find({
			$or: [
				{parent: id},
				{teams: id}
			]})
})

Meteor.publish('projectTeams', function(id){
	check(id, String)
	let project = Projects.findOne(id)
	return Units.find({_id: {$in: project.teams}})
})
