App.View.Edit = Backbone.View.extend({
	
	className: 'edit',
	
	events: {
		'click .back': 'back',
		'click .test': 'submit'
	},
	
	build: function() {
		
		return ['fragment', [
			
			['.back', '< back'], ['.clear'],
			['.test', 'test'],
			
			['input.status_title', { value: this.model.get('summary') } ],
			['select.edit_status', { name: 'status' }, this.orderList('status', ['open', 'regress', 'fixed']).map(function(type) {
				return ['option', { value: type }, type.replace('_', ' ')];
			}),],
			['.clear'],
			
			this.loadFields(),
			['.clear'],
			
			['h2', 'Steps'],
			['ol.steps', (this.model.get('steps')) ? this.model.get('steps').map(function(step) {
				return ['li', step];
			}) : null],
			['input.add_step', { type: 'text', placeholder: 'add new step..' }],
			['.add', '+ add'],
			
			['.clear'],
			
			['h2', 'Notes'],
			['textarea', { name: 'notes' }, (this.model.get('notes')) ? this.model.get('notes') : null],
			
			['h2', 'Lifecycle'],
			['input.add_comment', { type: 'text', placeholder: 'comment...' }],
			['.add', '+ add'],
			['.clear'],
			['ul.history', this.model.get('history').reverse().map(function(h) {
				return ['li', [
					['.icon', { 'class': (h.status) ? h.status : '' }, [
						['img', { src: 'http://gravatar.com/avatar/' + h.hash }]
					]],
					['.desc', h.message],
					['.clear']
				]]
			})]
		
		]];
		
	},
	
	loadFields: function() {
		var that = this;
		var fields = [
			{ name: 'type', key: 'bug_type', values: ['copy', 'images', 'front_end', 'back_end', 'unknown'] },
			{ name: 'severity', key: 'severity', values: [0, 1, 2, 3, 4, 5] },
			{ name: 'browser', key: 'browser', values: ['chrome', 'firefox', 'safari', 'internet_explorer'] }
		];
		return ['fragment', fields.map(function(field) {
			return ['.field', [
				['label', field.name],
				['select', { name: field.key }, that.orderList(field.key, field.values).map(function(opt) {
					return ['option', { value: opt }, isNaN(opt) ? opt.replace('_', ' ') : opt];
				})]
			]]
		})];
	},
	
	orderList: function(value, list) {
		return	(this.model.get(value)) ? _.flatten([this.model.get(value), _.without(list, this.model.get(value))]) : list;
	},
	
	back: function() {
		this.trigger('back');
	},
	
	submit: function() {
		this.model.save();
	}
	
});