$(function() {
			
	window.User = Backbone.Model.extend();
	
	window.User_Collection = Backbone.Collection.extend({
		model: User,
		url: 'http://localhost:5000/users'
	});
	
	window.List = Backbone.View.extend({
		el: '#test',
		collection: new User_Collection,
		initialize: function() {
			var that = this;
			this.collection.fetch({ success: function() {
				that.render();
			}});
		},
		render: function() {
			_.each(this.collection.models, function(user) {
				$(this.el).append('<li>' + user.get('value')['name'] + '</li>');
			}, this);
			return this;
		}
	});
	
	$.test = new List();

});