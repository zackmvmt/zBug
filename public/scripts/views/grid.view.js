/**
 * 
 * Creates a grid based on a collection, If columns supplied only shows selected columns
 * 
 * @param collection
 * @param options.columns array ex. [
 * 	{name:'id', label: 'Order Id'},
 * 	{name:'status', label: 'status'}
 * ]
 * @param options.elements_to_build ex. [
 * 	{name: button_to_build, buildFunction: function(model){
 * 		return ['.button, model.id];
 * 	}}
 * ]
 * @event rowClick returns clicked rows model
 */
App.View.Grid = Backbone.View.extend({
	
	tagName: 'table',
	className: 'grid',
	
	events: {
		'click tr.data' : 'rowClick',
		'click th.sort' : 'sort',
	},
	
	initialize: function() {
		var that = this;
		this.collection.bind('add change reset', function(){
			that.render();
		});
	},
	
	build: function(){
		var that = this;
		var columns = RJS.keys(this.collection.length > 0 ? this.collection.first().toJSON() : null);
		var columnNames = this.options.columns ? this.options.columns.pluck('name') : columns;
		var selectedColumns = !this.options.columns ? columns.map(function(field){
			return { name:field, label: null };
		}) : columnNames.map(function(field){
			return that.options.columns.findByProperty('name', field);
		});
		var elementsToBuild = this.options.elements_to_build;
		
		return ['fragment', columns ? 
			[
				['thead tr', (this.options.columns ? this.options.columns : selectedColumns).map(function(columnObj){
					return ['th.sort', {name: columnObj.name}, columnObj.label ? columnObj.label : columnObj.name];
				})],
				['tbody', this.collection.map(function(model) {
					return ['tr.data', { 'data-id': model.id }, selectedColumns.pluck('name').map(function(field){
						elementToBuild = elementsToBuild ? elementsToBuild.findByProperty('name', field) : null;
						return elementToBuild ? ['td', [elementToBuild.buildFunction(model)]] : 
							field == 'status' ? ['td', [model.get(field), ['.indicator.status_' + model.get(field)]]] : ['td', model.get(field).replace('_', ' ')];
					})];
				})]
			] : 'Empty Results'
		]
	},
	
	sort: function(e) {
		var sortSet = $(e.target).attr('data-sort');
		var sort = ((sortSet == 'desc') || (!sortSet)) ? 'asc' : 'desc';
		var fieldName = $(e.target).attr('name');
		var models = this.collection.models;
		models = _.sortBy(models, function(model) {
			return model.get(fieldName);
		});
		if (sort == 'desc') models.reverse();
		this.collection.reset(models);
		this.render();
		$(this.el).find('th[name="' + fieldName + '"]').attr('data-sort', sort);
	},
	
	rowClick: function(e){
		var rowModelId = $(e.srcElement).parent().attr('data-id');
		this.trigger('rowClick', [this.collection.get(rowModelId)]);
	},
});