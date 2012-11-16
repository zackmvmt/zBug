App.View.Dashboard = Backbone.View.extend({

	className: 'app',

	events:{},
	
	initialize: function() {},
	
	build: function() {
		
		var header = new App.View.Header;
		var content = new App.View.Content;
		
		header.forward(['addNew'], content);
		
		content.bind('addNew', function() {
			var d = new Date();
			var newBug = new App.Model.Bug({
				type: 'bug',
				status: 'open',
				bug_type: 'unknown',
				summary: '',
				history: [
					{
						email: Global.UserEmail,
						message: Global.UserName + ' discovered this bug',
						status: null,
						time: d.getTime(),
						hash: Global.UserHash
					},
					{
						email: Global.UserEmail,
						message: Global.UserName + ' maked this bug as open',
						status: 'open',
						time: d.setSeconds(d.getSeconds() + 2),
						hash: Global.UserHash
					}
				]
			});
			this.collection.add(newBug);
			var that = this;
			this.display = new App.View.Edit({
				model: newBug
			})
			.bind('back', function() {
				that.display = null;
				that.collection.fetch({ success: function() {
					that.render();
				}});
			});
			this.render();
		});
	
		return ['fragment', [
			header,
			content
		]];
		
	}
	
});