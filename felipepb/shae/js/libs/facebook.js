window.fbAsyncInit = function() {
    // FB.init({
        // appId      : '250928885096517',
        // xfbml      : true,
        // version    : 'v2.0'
    // });
	
	var collectUserData = function (response) {
		var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        
        FB.api(uid, {fields: 'name,link,picture'}, function (response) {
            $.ajax({
                type: "POST",
				accepts: "application/json",
				crossDomain: true,
				contentType: 'application/json',
				headers: { 'Accept': 'application/json', 'X-ZUMO-APPLICATION': 'NFxVmTKKNrzyoUMZUmdsAzMxnCCQOv20'},
                url: "https://tww.azure-mobile.net/api/shae",
                data: JSON.stringify({ user: uid,
				                       name: response.name,
				                       link: response.link,
									   picture: response.picture.data.url }),
                success: function (data) {
                    alert(data);
                },
                dataType: "json"
            });
        });
	};
	
    FB.getLoginStatus(function(response) {
        console.log('login status: ' + response.status);
	    if (response.status === 'connected') {
			collectUserData(response);
        } else {
			FB.login(function(response) {
				console.log('login response: ' + response.status);
                if (response.status === 'connected') {
                    collectUserData(response);
                }
            });
		}
    });
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=250928885096517&version=v2.0";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

