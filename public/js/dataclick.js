// Dismiss function
$("[data-dismiss]").each(function() {
	var me = $(this),
			target = me.data('dismiss');

	me.click(function() {
		$(target).fadeOut(function() {
			$(target).remove();
		});
		return false;
	});
});