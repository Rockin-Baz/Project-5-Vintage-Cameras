var data = JSON.parse(localStorage.getItem('cart'));
var cartTableContainer = document.getElementById('cart_table');
var cartTable = document.getElementById('dynamic_cart');
var emptyCart = document.getElementById('empty_cart');
var tableWrapper = document.getElementById('table_wrapper');
var formWrapper = document.getElementById('form_wrapper');

// Main Loop to create the Cart Table
if (data) {
    for (let i = 0; i < data.length; i++) {

        var tr = document.createElement('tr');

        // Img Container
        var imgContainer = document.createElement('td');

        // Img itself. Create it, then append it  to the Img Container
        var img = document.createElement('img');
        img.setAttribute('src', data[i].imageUrl);
        imgContainer.appendChild(img);

        // Title
        var title = document.createElement('td');
        title.innerHTML = data[i].name;

        // Lense
        var lense = document.createElement('td');
        lense.innerHTML = data[i].lense;

        // Price
        var price = document.createElement('td');
        price.innerHTML = '£' + data[i].price;

        // Quantity Container
        var quantityContainer = document.createElement('td');

        // Quantity input itself, that we create, manipulate its value, and inject it into the <td> of quantityContainer
        var quantity = document.createElement('input');
        quantity.type = 'number';
        quantity.value = data[i].quantity;
        quantity.setAttribute('min', 1);
        quantity.setAttribute('data-index', i);

        // Update localStorage with updated product's quantity value
        quantity.addEventListener('change', function (e) {
            let index = e.target.getAttribute('data-index');
            let value = e.target.value;

            // Update a specific product's quantity in its object
            data[index].quantity = parseInt(value);

            // Update the localStorage with all new products values
            localStorage.setItem('cart', JSON.stringify(data));

            // Upon changing the quantity (increase/decrease), reload the page to get the new total
            location.reload();
        })

        // Adding the quantity to its container <td>
        quantityContainer.appendChild(quantity);

        // Remove button
        var removeContainer = document.createElement('td');
        var removeBtn = document.createElement('button');
        removeBtn.setAttribute('data-index', i);
        removeBtn.innerHTML = 'X';
        removeContainer.appendChild(removeBtn);

        // Remove that clicked product from the `data` array + update localStorage
        removeBtn.addEventListener('click', function (e) {
            let index = e.target.getAttribute('data-index');

            // Remove item from array based on its index
            data.splice(index, 1);
            // Let's update localStorage with new "spliced" array!
            localStorage.setItem('cart', JSON.stringify(data));
            // Refresh to see updated cart items
            location.reload();
        })


        // Total (Quantity * Price) of EACH product
        var total = document.createElement('td');
        total.innerHTML = '£' + data[i].price * data[i].quantity;


        // Append all td to the parent tr
        tr.appendChild(imgContainer);
        tr.appendChild(title);
        tr.appendChild(lense);
        tr.appendChild(price);
        tr.appendChild(quantityContainer);
        tr.appendChild(total);
        tr.appendChild(removeContainer);

        // console.log(tr)

        // WHO IS THE PARENT OF THAT <tr>!?
        // Append the <tr> itself to the cartTable
        cartTable.appendChild(tr); // directParent.appendChild(childName);

    }
}

// Empty Cart button
var emptyCartBtn = document.getElementById('empty_btn');
emptyCartBtn.addEventListener('click', function () {
    localStorage.removeItem('cart')
    location.reload();
})

// Show "No Cart Items Container" if there's no items in the cart (LocalStorage)
if (data && data.length > 0) {
    tableWrapper.style.display = 'block';
    formWrapper.style.display = 'block';
    emptyCart.style.display = 'none';
} else {
    tableWrapper.style.display = 'none';
    formWrapper.style.display = 'none';
    emptyCart.style.display = 'block';
}


/**
 * Order Form Submission
 * ---------------------
 * 1. Prevent the form from re-loading the page (bcs we're lossing the data)
 * 2. Prepare the needed data for the API
 * 3. Send form data + cart items to the backend API to get Order ID
 * 4. Redirect the user to "Order Received" page & Show the Order ID!
 */

// 1.1 Select the form itself
var form = document.getElementById('order_form');

// 1.2 Listen to the form submission event
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 2.1 Capture/Save the form data
    var u_fname = document.getElementById('first_name').value;
    var u_lname = document.getElementById('last_name').value;
    var u_email = document.getElementById('email').value;
    var u_city = document.getElementById('city').value;
    var u_address = document.getElementById('address').value;

    var contact = {
        firstName: u_fname,
        lastName: u_lname,
        email: u_email,
        city: u_city,
        address: u_address
    }

    // 2.2 Prepare the `products` array of Product IDs, not the actual products. ONLY IDs
    var products = JSON.parse(localStorage.getItem('cart'));
    var productsIds = [];

    for (let i = 0; i < products.length; i++) {
        productsIds.push(products[i].id)
    }

    var apiData = {
        contact,
        productsIds
    }

    // 3. Call the API & Send it `contact` object + `products` array AND get Order ID
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contact: apiData.contact,
            products: apiData.productsIds
        })
    })
        .then(res => res.json())
        .then(data => { // Converted JSON
            console.log(data)
            console.log(data.orderId)

            // Empty Cart from LocalStorage
            localStorage.removeItem('cart');

            // Redirect the user to order received page with the genereated order id
            window.location = 'order-received.html?id=' + data.orderId;
        })

})