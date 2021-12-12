// 1. Capturing the orderId from the URL (We redirected the user to, from our cart page after submitting the form)
var urlParams = new URLSearchParams(document.location.search.substring(1));
var orderId = urlParams.get("id");

// 2. Inject the orderId we captured from the URL in the actual element
var orderIdContainer = document.getElementById('order_id');
orderIdContainer.innerHTML = orderId;