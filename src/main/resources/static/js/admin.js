document.addEventListener('DOMContentLoaded', function () {
	initSubscriptionForm();
	initClassForm();
});

function initSubscriptionForm() {
	const form = document.getElementById('subscription-form');
	const monthsInput = document.getElementById('months');
	const sessionsInput = document.getElementById('trainer-sessions');

	function updatePrice() {
		let total = 0;
		// Базовая цена за месяцы
		const months = parseInt(monthsInput.value);
		switch (months) {
			case 1: total = 2000; break;
			case 2: total = 4000; break;
			case 3: total = 4500; break;
			case 4: total = 5500; break;
			case 5: total = 6800; break;
			case 6: total = 7000; break;
			case 7: total = 9000; break;
			case 8: total = 9200; break;
			case 9: total = 1000; break;
			case 10: total = 11000; break;
			case 11: total = 11800; break;
			case 12: total = 12000; break;
		}

		// Доплата за тренера
		total += parseInt(sessionsInput.value) * 400;

		// Доплаты за опции
		if (document.querySelector('input[name="visits"]:checked')?.value === 'unlimited') {
			total += 1500;
		}
		if (document.querySelector('input[name="time"]:checked')?.value === 'full') {
			total += 750;
		}
		if (document.querySelector('input[name="freeze"]:checked')?.value === 'yes') {
			total += 1500;
		}
		if (document.querySelector('input[name="pool"]:checked')?.value === 'yes') {
			total += 1000;
		}

		document.getElementById('total-price').textContent = total;
	}

	// Обновление отображения значений слайдеров
	monthsInput.addEventListener('input', function () {
		document.getElementById('months-value').textContent = `${this.value} ${getMonthWord(this.value)}`;
		updatePrice();
	});

	sessionsInput.addEventListener('input', function () {
		document.getElementById('sessions-value').textContent =
			`${this.value} ${getSessionWord(this.value)}`;
		updatePrice();
	});

	// Обновление цены при изменении любой опции
	document.querySelectorAll('input[type="radio"]').forEach(radio => {
		radio.addEventListener('change', updatePrice);
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const subscriptionData = {
			firstName: document.getElementById('first-name').value,
			lastName: document.getElementById('last-name').value,
			login: document.getElementById('login').value,
			phone: document.getElementById('phone').value,
			months: parseInt(monthsInput.value),
			trainerSessions: parseInt(sessionsInput.value),
			unlimited: document.querySelector('input[name="visits"]:checked').value === 'unlimited',
			fullDay: document.querySelector('input[name="time"]:checked').value === 'full',
			freezeAvailable: document.querySelector('input[name="freeze"]:checked').value === 'yes',
			poolAccess: document.querySelector('input[name="pool"]:checked').value === 'yes',
			startDate: document.getElementById('start-date').value
		};

		fetch('/api/subscriptions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(subscriptionData)
		})
			.then(response => response.json())
			.then(data => {
				alert('Абонемент успешно создан');
				form.reset();
			})
			.catch(error => alert('Ошибка при создании абонемента: ' + error));
	});
}

function initClassForm() {
	const form = document.getElementById('class-form');

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		const classData = {
			classDate: document.getElementById('class-date').value,
			classType: document.querySelector('input[name="class-type"]:checked').value
		};

		fetch('/api/classes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(classData)
		})
			.then(response => response.json())
			.then(data => {
				alert('Занятие успешно создано');
				form.reset();
			})
			.catch(error => alert('Ошибка при создании занятия: ' + error));
	});
}

function getMonthWord(number) {
	const cases = [2, 0, 1, 1, 1, 2];
	const titles = ['месяц', 'месяца', 'месяцев'];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 :
		cases[(number % 10 < 5) ? number % 10 : 5]];
}

function getSessionWord(number) {
	const cases = [2, 0, 1, 1, 1, 2];
	const titles = ['занятие', 'занятия', 'занятий'];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 :
		cases[(number % 10 < 5) ? number % 10 : 5]];
}