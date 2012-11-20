App.View.Search = Backbone.View.extend({
	
	className: 'list_search',
	
	build: function() {
		
		return ['fragment', [
			['input.search', { name: 'search', placeholder: 'search...' }]
		]];
		
	}
	
});