App.View.Dashboard = Backbone.View.extend({

	className: 'app',

	events:{},
	
	initialize: function() {},
	
	build: function() {
		
		var header = new App.View.Header;
		var content = new App.View.Content;
		
		header.forward(['addNew'], content);
		
		content.bind('addNew', function() {
			var newBug = new App.Model.Bug({
				summary: 'this is a test????'
			});
			this.collection.add(newBug);
			this.display = new App.View.Edit({ model: newBug });
			this.render();
		});
	
		return ['fragment', [
			header,
			content
		]];
		
	}
	
});