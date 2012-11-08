App.View.List = Backbone.View.extend({
	
	className: 'list',
	collection: new App.Collection.Bug,
	
	initialize: function() {
		var that = this;
		this.collection.fetch({ success: function() {
			that.render();
		} });
	},
	
	build: function() {
		
		var that = this;
		
		var statuses = ['all', 'open', 'regress', 'fixed'];
		var bug_types = ['all', 'copy', 'images', 'front_end', 'back_end', 'unknown'];
		
		return ['fragment', [
		
			['.list_sort', [
				['label', 'status'],
				['select', { name: 'status' }, statuses.map(function(type) {
						return ['option', { value: type }, type.replace('_', ' ')];
					}),
				],
				['label', 'type'],
				['select', { name: 'bug_type' }, bug_types.map(function(type) {
						return ['option', { value: type }, type.replace('_', ' ')];
					}),
				],
				['label', 'severity'],
				['select', { name: 'severity' }, [
					['option', { value: 'all' }, 'all'],
					['fragment', [0, 1, 2, 3, 4, 5].map(function(num) {
						return ['option', { value: num }, num];	
					})]
				]],
				['input.search', { name: 'search', placeholder: 'search...' }]
			]],
		
			new App.View.Grid({
				collection: that.collection,
				columns: [
					{ name: 'status', label: 'Status' },
					{ name: 'severity', label: 'Severity' },
					{ name: 'bug_type', label: 'Type' },
					{ name: 'summary', label: 'Summary' }
				],
			})
		
		]];	
		
	}
	
});