App.View.Dashboard = Backbone.View.extend({

	className: 'app',

	events:{},
	
	initialize: function() {},
	
	build: function() {
	
		return ['fragment', [
		
			new App.View.Header,
			new App.View.Content
		
		]];
		
	}
	
});