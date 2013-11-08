$(document).ready(function(){
	$('button').on('click', function(){
		$('.items').growAndShow({selector:$(this).data('affects')});
	});
});