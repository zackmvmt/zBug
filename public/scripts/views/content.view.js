App.View.Content = Backbone.View.extend({
	
	className: 'content',
	collection: new App.Collection.Bug,
	
	initialize: function() {
		var that = this;
		this.fields = {}; // stores the current fields for sorting
		this.collection.fetch({ success: function() {
			that.render();
		} });
	},
	
	build: function() {
	
		var app = this;
		var that = this;
		
		var sort = new App.View.Sort({ fields: this.loadFields() });
		
		var search = new App.View.Search({
			collection: this.collection,
			fields: ['summary']
		});
		
		var grid = new App.View.Grid({
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
				model: displayModel,
				projects: that.options.projects.pluck('name')
			})
			.bind('back', function() {
				that.display = null;
				that.render();
			});
			that.render();
		})
		.bind('updateGrid', function(fields) {
			app.fields = fields;
			var that = this;
			this.collection.fetch({ success: function() {
				if (fields.length > 0) {
					var models = that.collection.models.filter(function(model) {
						return fields.map(function(field) {
							return model.get(field.field) == field.value;
						}).contains(false) ? false : true;
					});
					that.collection.reset(models);
				}
				that.render();
			} });
		});
		
		search.forward(['render'], grid);
		sort.forward(['updateGrid'], grid);
		
		return (this.display) ? this.display : ['.list', [sort, search, grid]];
		
	},
	
	// load the fields in the right order. if they have one selected, make sure it stays that way
	loadFields: function() {
	
		var that = this;
		var projects = [];
		
		if (this.options.projects) {
			var projects = this.options.projects.pluck('name');
			projects.unshift('all');
		}
		
		var defaultFields = [
			{ name: 'project', key: 'project', values: projects },
			{ name: 'status', key: 'status', values: ['all', 'open', 'regress', 'fixed'] },
			{ name: 'type', key: 'bug_type', values: ['all', 'copy', 'images', 'front_end', 'back_end', 'unknown'] },
			{ name: 'severity', key: 'severity', values: ['all', 1, 2, 3, 4, 5] }
		];
	
		var result = defaultFields.map(function(field) {
			// if the field is in the list of fields
			if (!_.isEmpty(that.fields) && _.contains(that.fields.pluck('field'), field.name)) {
				// get the value out of the current field values
				var selectedField = that.fields.find(function(tempField) {
					return tempField.field == field.name;
				});
				// put in front of the others
				field.values = _.flatten([selectedField.value, _.without(field.values, selectedField.value)])
			}
			return field;
		});
		
		return result;
		
	}
	
});