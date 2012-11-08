App.Collection.Bug = Backbone.Collection.extend({
	model: App.Model.Bug,
	url: Global.BaseUrl + '/bugs'
});