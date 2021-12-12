// Update Cart Icon with Total Cart Items from LocalStorage!
var totalCartContainer = document.getElementById('cart_count');

// By default, I'll set it to 0
var totalCartCount = 0;

// If there's already 'cart' stored in localStorage, get the length!
if (JSON.parse(localStorage.getItem('cart')) != null) {
    totalCartCount = JSON.parse(localStorage.getItem('cart')).length;
}

// Update total cart count in HTML
totalCartContainer.innerHTML = totalCartCount;