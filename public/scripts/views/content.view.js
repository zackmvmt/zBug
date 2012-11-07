App.View.Content = Backbone.View.extend({
	
	className: 'content',
	
	build: function() {
		
		return ['fragment', [
		
			new App.View.List
		
		]];
		
	}
	
});