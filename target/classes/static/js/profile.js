let cart = [];
const prices = {
	'Протеин': 2000,
	'BCAA': 1500,
	'Креатин': 1200,
	'Витамины': 800,
	'Омега-3': 1000,
	'L-карнитин': 1800,
	'Изотоник': 900,
	'Гейнер': 2500
};

document.addEventListener('DOMContentLoaded', function () {
	loadSubscriptionInfo();
	loadGroupClasses();
	updateCart();
});

function loadSubscriptionInfo() {
	const login = localStorage.getItem('userLogin');
	fetch(`/api/subscriptions/user/${login}`)
		.then(response => response.json())
		.then(data => {
			if (data && data.length > 0) {
				const subscription = data[0];
				document.getElementById('status').textContent = subscription.status;
				document.getElementById('end-date').textContent = subscription.endDate;

				const freezeButton = document.getElementById('freeze-button');
				freezeButton.textContent = subscription.status === 'active' ?
					'Заморозить абонемент' : 'Разморозить абонемент';
			}
		})
		.catch(error => console.error('Error:', error));
}

function loadGroupClasses() {
	fetch('/api/classes')
		.then(response => response.json())
		.then(classes => {
			const container = document.getElementById('classes-list');
			container.innerHTML = '';

			classes.forEach(classItem => {
				const card = document.createElement('div');
				card.className = 'class-card';
				card.innerHTML = `
                    <p>${formatDate(classItem.classDate)}</p>
                    <p>${classItem.classType}</p>
                `;
				container.appendChild(card);
			});
		})
		.catch(error => console.error('Error:', error));
}

function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('ru-RU');
}

function addToCart(item, price) {
	const existingItem = cart.find(cartItem => cartItem.name === item);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.push({ name: item, price: price, quantity: 1 });
	}
	updateCart();
}

function updateCart() {
	const cartItems = document.getElementById('cart-items');
	const cartTotal = document.getElementById('cart-total');
	cartItems.innerHTML = '';

	let total = 0;
	cart.forEach(item => {
		const itemDiv = document.createElement('div');
		itemDiv.className = 'cart-item';
		itemDiv.innerHTML = `
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            <span>${item.price * item.quantity} ₽</span>
        `;
		cartItems.appendChild(itemDiv);
		total += item.price * item.quantity;
	});

	cartTotal.textContent = total;
}

function updateQuantity(itemName, change) {
	const item = cart.find(i => i.name === itemName);
	if (item) {
		item.quantity += change;
		if (item.quantity <= 0) {
			cart = cart.filter(i => i.name !== itemName);
		}
		updateCart();
	}
}

function placeOrder() {
	if (cart.length === 0) {
		alert('Корзина пуста');
		return;
	}

	const orderData = {
		items: cart.map(item => `${item.name} "${item.quantity}"`).join(', '),
		totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
	};

	fetch('/api/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(orderData)
	})
		.then(response => response.json())
		.then(data => {
			alert('Заказ успешно оформлен');
			cart = [];
			updateCart();
		})
		.catch(error => alert('Ошибка при оформлении заказа: ' + error));
}

function freezeSubscription() {
	const subscriptionId = localStorage.getItem('subscriptionId');
	fetch(`/api/subscriptions/${subscriptionId}/freeze`, {
		method: 'POST'
	})
		.then(response => response.json())
		.then(data => {
			loadSubscriptionInfo();
		})
		.catch(error => alert('Ошибка при изменении статуса абонемента: ' + error));
}