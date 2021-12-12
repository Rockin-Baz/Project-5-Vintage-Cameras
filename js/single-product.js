/**
 * 1. Get the Product ID from the URL
 * 2. Send that product ID to the API to get this product details ONLY
 * 3. Select single page image, title, price, ... etc. and replace the values with API result data
 */

// Get the Product ID
var urlParams = new URLSearchParams(document.location.search.substring(1));
var productId = urlParams.get("id");


// Select Product Elements
var productImage = document.getElementById('product_image');
var productTitle = document.getElementById('product_title');
var productPrice = document.getElementById('product_price');
var productDesc = document.getElementById('product_desc');
var productLenses = document.getElementById('product_lenses');

// SHOULD NEVER RETURN NULL if done correctly
// console.log(productLenses)

// When you enter the page, the product details is empty, UNTIL the API return the value, then store it in that variable
var productDetails = {};

// Get single Product Details by ID
fetch('http://localhost:3000/api/cameras/' + productId)
	.then(res => res.json())
	.then(data => {
		// Update global variable data
		productDetails = data;

		// Update Product Elements values from API
		productImage.setAttribute('src', data.imageUrl);

		productTitle.innerHTML = data.name;
		productPrice.innerHTML = '£' + data.price;
		productDesc.innerHTML = data.description;

		// innerHTML does NOT work with <select>
		// <select> needs <option> tags to be injected inside it
		// productLenses.innerHTML = data.lenses;

		// Add dynamic product lenses
		for (var i = 0; i < data.lenses.length; i++) {
			var option = document.createElement('option');
			option.text = data.lenses[i];
			option.value = data.lenses[i];
			productLenses.appendChild(option);
		}
	})


/**
 * First Click Event EVER!! CAUTION: IT'S GOING TO BE VERY VERY LONG!
 * 1. Select the element
 * 2. Add the event
 * 3. Specify the action that should be triggered upon firing this event
 */
//cartBtn.addEventListener(eventName, eventFunction) for reference...

// Add To Cart action
var cartBtn = document.getElementById('cart_btn'); // 50%!
cartBtn.addEventListener('click', function () {
	// Single Product -> setItem (Store the current product that we need to add to cart)
	// Cart Page -> getItem (Retrieve the product we stored in the localStorage!)

	let productQuantity = document.querySelector('#quantity').value;

	// Create the added to cart product
	let product = {
		id: productDetails._id,
		name: productDetails.name,
		price: productDetails.price,
		imageUrl: productDetails.imageUrl,
		lense: productLenses.value,
		quantity: parseInt(productQuantity)
	}

	// Append/Push this current product to cartItems
	// parse it to become a normal array!

	// By default, I'll set it to empty...
	var cartItems = [];

	// If there's already 'cart' stored in localStorage, take the old cart items, and then add this newly clicked item!
	if (JSON.parse(localStorage.getItem('cart')) != null) {
		// !NULL means there's a 'cart' in localStorage
		cartItems = JSON.parse(localStorage.getItem('cart'));
	}

	cartItems.push(product)

	// Store the NEW cart items to localStorage
	localStorage.setItem('cart', JSON.stringify(cartItems)); // stringify it to convert normal array to string-like. As localStorage only accepts STRINGS

	// Redirect the user after adding the product to localStorage
	window.location = 'cart.html';
})

