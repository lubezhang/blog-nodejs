(function($){
	function start(){
		bindEvent();
		validate();
	};

	function bindEvent(){
		$("#topicSendBtn").click(function(){
			$(this).button('loading');
			$.post("/topic/create",$("#topicForm").serialize(),function(data){
				window.location.href = "/";
			});
		});
	}

	function validate(){

	}

	start();
})(jQuery);