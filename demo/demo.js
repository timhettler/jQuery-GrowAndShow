$(document).ready(function(){
	$('button').on('click', function(){
		$('.items').growAndShow($(this).data('affects'));
	});
});