/**
 * How to integrate with the Cameras API? (aka. API Integration)
 * 1. Create a JS file, and link it with HTML
 * 2. Call/Fetch the API you needed using JS (Console)
 * 3. Display/Visualize those returned data, the way we want (i.e. Create a card, loop over it to display a list of products)
 */



/**
 * 1. Give JS an API to fetch
 * 2. Then? Convert the API response to JSON (so we can work on it!)
 * 3. Then? Console log it for me!
 * parameters....
 */
var dynamicProducts = document.getElementById('dynamic_products');

fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => { // Converted JSON

        /**
        <section class="product-list">
            <div class="card">
                <img src="./img/Camera pic1.webp" alt="Vintage Camera">
                <h2>Canon G III QL17</h2>
                <p>orem ipsum dolor sit amet consectetur adipisicing elit. Animi blanditiis non facere nihil maiores, rem dicta
                aperiam accusamus amet saepe.</p>
                <a href="single-product.html">View Product</a>
            </div>
        </section>
         */

        for (var i = 0; i < data.length; i++) {
            var card = document.createElement('div');
            card.classList.add('card');

            var img = document.createElement('img');
            img.setAttribute('src', data[i].imageUrl)
            card.appendChild(img);

            var title = document.createElement('h2');
            title.innerHTML = data[i].name;
            card.appendChild(title);

            var price = document.createElement('h3');
            price.innerHTML = '£' + data[i].price;
            card.appendChild(price);

            var description = document.createElement('p');
            description.innerHTML = data[i].description;
            card.appendChild(description);

            var btn = document.createElement('a');
            btn.setAttribute('href', 'single-product.html?id=' + data[i]._id)
            btn.innerHTML = "View product";
            card.appendChild(btn);

            // Append the card itself to the Product List
            dynamicProducts.appendChild(card)
        }

    })