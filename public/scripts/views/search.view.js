App.View.Search = Backbone.View.extend({
	
	className: 'list_search',
	
	events: {
		'keydown input': 'submitDebounced'
	},
	
	build: function() {
		
		return ['fragment', [
			['input.search', { name: 'search', placeholder: 'search...' }]
		]];
		
	},
	
	submit: function() {
		var that = this;
		var search = $(this.el).gather().search;
		// fetch all the bugs first
		this.collection.fetch({ success: function() {
			// loop through the collection
			var bugs = that.collection.filter(function(bug) {
				// loop through all the fields
				return that.options.fields.map(function(field) {
					// if this bug has the search in this field, return it
					return (bug.get(field).indexOf(search) != -1);
				}).contains(true);
			});
			// if there are some models, reset the collection
			if (search != '' && bugs.length > 0) {
				that.collection.reset(bugs);
			}
			that.trigger('render');
		} });
		
	},
	
	submitDebounced: (function() {
		this.submit();
	}).debounce(500)
	
});