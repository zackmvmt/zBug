App.View.Sort = Backbone.View.extend({
	
	className: 'list_sort',
	
	events: {
		'change select': 'triggerUpdate'
	},
	
	build: function() {
		
		return ['fragment', [
			['fragment', this.options.fields.map(function(field) {
				return ['fragment', [
					['label', field.name],
					['select', { name: field.key }, field.values.map(function(opt) {
						return ['option', { value: opt }, isNaN(opt) ? opt.replace('_', ' ') : opt]; 
					})],
					(field.name == 'project') ? ['.clear'] : null
				]];
			})],
			['.clear']
		]];
		
	},
	
	// get a list of all the field/value pairs that are defined
	triggerUpdate: function() {
		var fields = $(this.el).find('select');
		fields = _.map(fields, function(field) {
			return ($(field).val() == 'all') ? null : {
				field: $(field).attr('name'),
				value: $(field).val()
			}
		}).compact();
		this.trigger('updateGrid', fields);
	}
	
});