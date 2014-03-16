(function($){
	var userValidate;

	function start(){
		bindEvent();
		validate();
	};

	function bindEvent(){
		$("#regBtn").click(function(){
			if(!userValidate.form()){
				return;
			}

			$.post("/reg",
				$("#userForm").serialize(),
				function(data){
					if(data.status){
						$("#message").removeClass().addClass('alert alert-success show').html(data.message);
					} else {
						$("#message").removeClass().addClass('alert alert-danger show').html(data.message);
					}
				},
				"json"
			)
		});
	};

	function validate(){
		jQuery.validator.setDefaults({
		  
		});
		userValidate = $("#userForm").validate({
			
			rules:{
				username:{
					required: true,
					email: true
				},
				password:{
					required: true,
					minlength:6,
					maxlength:30
				},
				passwordRepeat:{
					required: true,
					minlength:6,
					maxlength:30,
					equalTo: "#password"
				}
			}
		});
	}

	start();
})(jQuery);