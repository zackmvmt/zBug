App.View.Content = Backbone.View.extend({
	
	className: 'content',
	collection: new App.Collection.Bug,
	
	initialize: function() {
		var that = this;
		this.collection.fetch({ success: function() {
			that.render();
		} });
	},
	
	build: function() {
	
		var that = this;
	
		var fields = [
			{ name: 'status', key: 'status', values: ['all', 'open', 'regress', 'fixed'] },
			{ name: 'type', key: 'bug_type', values: ['all', 'copy', 'images', 'front_end', 'back_end', 'unknown'] },
			{ name: 'severity', key: 'severity', values: [0, 1, 2, 3, 4, 5] }
		];
		
		var sortsearch = ['.list_sort', [
			['fragment', fields.map(function(field) {
				return ['fragment', [
					['label', field.name],
					['select', { name: field.key }, field.values.map(function(opt) {
						return ['option', { value: opt }, isNaN(opt) ? opt.replace('_', ' ') : opt]; 
					})]
				]];
			})],
			['input.search', { name: 'search', placeholder: 'search...' }]
		]];
		
		return (this.display) ? this.display : ['.list', [
			sortsearch,
			new App.View.Grid({
				collection: this.collection,
				columns: [
					{ name: 'status', label: 'Status' },
					{ name: 'severity', label: 'Severity' },
					{ name: 'bug_type', label: 'Type' },
					{ name: 'summary', label: 'Summary' }
				],
			})
			.bind('rowClick', function(e){
				var displayModel = e[0];
				that.display = new App.View.Edit({
					model: displayModel
				})
				.bind('back', function() {
					that.display = null;
					that.render();
				});
				that.render();
			})
		]];
		
	}
	
});