var userValidate;

function reg(){
	bindEvent();
	validate();
};

function login(){
	bindEvent();
	validate();
}

function bindEvent(){
	$("#submitBtn").click(function(){
		if(!userValidate.form()){
			return;
		}
		var $this = $(this);
		$this.button('loading');
		$.post($("#userForm").attr("action"),
			$("#userForm").serialize(),
			function(data){
				var isSuccess = false;
				if(data.status){
					$("#message").removeClass("alert-danger hide").addClass('alert alert-success').html(data.message);
					isSuccess = true;
				} else {
					$("#message").removeClass("alert-success hide").addClass('alert alert-danger').html(data.message);
					$this.button('reset');
				}
				setTimeout(function(){
					$("#message").addClass('hide');
					if(isSuccess){
						window.location.href = "/";
					}
				}, 2000);
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