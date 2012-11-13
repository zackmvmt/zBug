/** Custom extensions to Backbone.js. */

/** Extend Backbone.View with some base functionality. */
Backbone.View = Backbone.View.extend({
	// Override render to use build() to produce a markup array that Creatable can consume.
	render: function() {
		$(this.el).empty().append(create(this.build()));
		this.trigger("rendered");
		return this;
	},

	build: function() {
		return null;
	},

	forward: function(events, context) {
		var that = this;
		events.map(function(e) {
			that.bind(e, function() {
				var args = Array.prototype.slice.apply(arguments);
				context.trigger.apply(context, [e].concat(args));
			});
		});
		return this;
	}
});