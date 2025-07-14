const container = document.getElementById('container');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

document.getElementById('register').addEventListener('click', () => {
	container.classList.add("active");
});

document.getElementById('login').addEventListener('click', () => {
	container.classList.remove("active");
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const userData = {
		name: document.getElementById('registerName').value,
		login: document.getElementById('registerUsername').value,
		password: document.getElementById('registerPassword').value
	};

	fetch('http://localhost:8080/api/auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData)
	})
		.then(response => response.json())
		.then(data => {
			if (data.id) {
				alert('Registration successful');
				document.getElementById('registerForm').reset();
			} else {
				alert('Registration failed: ' + data);
			}
		})
		.catch(error => alert('Error: ' + error));
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const userData = {
		login: document.getElementById('loginUsername').value,
		password: document.getElementById('loginPassword').value
	};

	fetch('http://localhost:8080/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData)
	})
		.then(response => response.json())
		.then(data => {
			if (data.id) {
				window.location.href = 'profile.html';
			} else {
				alert('Login failed: ' + data);
			}
		})
		.catch(error => alert('Error: ' + error));
});

