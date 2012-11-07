/*$(function() {
	window.User = Backbone.Model.extend();
	
	window.User_Collection = Backbone.Collection.extend({
		model: User,
		url: Global.BaseUrl + '/users'
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
	
	$('#logout').click(function() {
		$.post(Global.BaseUrl + '/logout', function(data) {
			window.location.reload();
		});
	});

});*/

App.View.Dashboard = Backbone.View.extend({

	className: 'app',

	events:{},
	
	initialize: function() {},
	
	build: function() {
	
		return ['fragment', [
		
			new App.View.Header,
			new App.View.Content
		
		]];
		
	}
	
});