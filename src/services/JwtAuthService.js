const JwtAuthService = {}
JwtAuthService.login = function (data) {
	return fetch('https://server-my-app-0012.herokuapp.com/api/auth/login',{
		method:"POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/auth/signup',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

export default JwtAuthService