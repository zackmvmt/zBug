App.View.List = Backbone.View.extend({
	
	className: 'list',
	collection: new App.Collection.Bug,
	
	initialize: function() {
		this.collection.fetch();
		this.collection.bind('reset', this.render, this);
	},
	
	build: function() {
	
		console.log(this.collection);
	
		return ['fragment', [
		
			'this is the list'
		
		]];	
		
	}
	
});