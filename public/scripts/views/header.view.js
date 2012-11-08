App.View.Header = Backbone.View.extend({
	
	className: 'header',
	
	events: {
		'click ul.nav li.one': 'logout'
	},
	
	build: function() {
		
		return ['fragment', [
		
			['h2', 'zBug'],
			
			['ul.nav', [
				['li.one', 'logout'],
				['li.two', 'settings'],
				['li.tre', 'add new']
			]],
			
			['.divider', [
				['.blip.one'],
				['.blip.two'],
				['.blip.tre']
			]]
		
		]];
		
	},
	
	logout: function() {
		$.post(Global.BaseUrl + '/logout', function(data) {
			window.location.reload();
		});
	}
	
});