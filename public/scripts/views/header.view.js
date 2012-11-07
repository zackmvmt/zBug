App.View.Header = Backbone.View.extend({
	
	className: 'header',
	
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
		
	}
	
});