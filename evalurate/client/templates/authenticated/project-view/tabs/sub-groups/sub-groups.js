Template.unitSettings.events({
	'click .bottom-add-btn': function () {
		MaterializeModal.display({
			bodyTemplate: "addChildUnit"
		})
	}
});

Template.unitSettings.helpers({
	permaChildren: (id) => {
		let u = Units.findOne(id)
		if (u.children){
			return Units.find({_id: {$in: u.children}, temp: false})
		}
	}
})
