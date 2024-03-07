document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.checkout');
    const totalItemsElement = document.getElementById('totalItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const backgroundButton = document.querySelector('.change-background');
    const changePriceButtons = document.querySelectorAll('.change-price');

    addToCartButtons.forEach(button => {
        button.dataset.novoAtributo = 'valorDoNovoAtributo';
    })

    let totalItems = 0;
    let totalPrice = 0;
    let currentBackgroundColor = getComputedStyle(document.body).backgroundColor;

    function updateCart() {
        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = formatCurrency(totalPrice);
    }

    function formatCurrency(value) {
        return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    function formatPrice(price) {
        return parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    function changeBackgroundColor() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = '#' + randomColor;
        currentBackgroundColor = '#' + randomColor;
    }

    function displayDateTime() {
        const dateTimeElement = document.getElementById('date-time');
        const textColor = isDarkColor(currentBackgroundColor) ? 'white' : 'black';
        dateTimeElement.style.color = textColor;
        
        function updateDateTime() {
            const now = new Date();
            const formattedDateTime = now.toLocaleString();
            dateTimeElement.textContent = formattedDateTime;
        }
        
        // Chamar updateDateTime() inicialmente para exibir a hora atual
        updateDateTime();
        
        // Chamar updateDateTime() a cada segundo
        setInterval(updateDateTime, 1000);
    }

    function isDarkColor(color) {
        const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance <= 0.5;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const productPriceText = product.querySelector('p').textContent.trim();
            const productPrice = parseFloat(productPriceText.replace('R$ ', '').replace('.', '').replace(',', '.'));
            totalItems++;
            totalPrice += productPrice;
            updateCart();
        });
    });

    changePriceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.closest('.product');
            const priceElement = product.querySelector('p');
            let newPrice = prompt('Digite o novo preço! exemplo "1,00" real ou "1" real:');
            newPrice = newPrice ? newPrice.trim().replace('.', '').replace(',', '.') : null;
            if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                priceElement.textContent = 'R$ ' + formatPrice(newPrice);
                updateCart();
            } else {
                alert('Por favor, insira um preço válido no formato: exemplo "1,00" real ou "1" real');
            }
        });
    });

    checkoutButton.addEventListener('click', function() {
        alert('Compra finalizada! Total: ' + formatCurrency(totalPrice));
    });

    backgroundButton.addEventListener('click', function() {
        changeBackgroundColor();
        displayDateTime();
    });

    displayDateTime();
});
