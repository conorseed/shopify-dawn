document.addEventListener('DOMContentLoaded', async function() {
  var quoteButton = document.getElementById('fa_quote_btn');
  var quoteDialog = document.getElementById('fa_quote_modal');
  var quoteDialogClose = document.getElementById(
    'fa_quote_modal_close'
  );
  var quoteDialogForm = document.getElementById('fa_quote_form');

  // open dialog on button click
  quoteButton.addEventListener('click', function (e) {
    e.preventDefault();
    quoteDialog.showModal();
  });

  // close dialog on close button click
  quoteDialogClose.addEventListener('click', function (e) {
    e.preventDefault();
    quoteDialog.close();
  });

  // handle form submission
  quoteDialogForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // disable the submit input
    var submitInput = document.getElementById('fa_quote_submit');
    submitInput.disabled = true;

    // clear any previous messages
    var message = document.getElementById('fa_quote_message');
    message.innerHTML = '';

    // show the loading spinner
    var loadingSpinner = document.getElementById('fa_quote_loading');
    loadingSpinner.style.display = 'inline-block';

    var messageReturn = '';
    
    try {
      // 1. fetch nonce from api
      const nonce = await fetchNonce();
    
      // 2. fetch cart info from shopify
      const cart = await fetchCart();
    
      // 3. send cart info to api with nonce
      const res = await requestQuote({cart, nonce});

      // update message
      messageReturn = `<div class="success">Quote sent successfully</div>`;
    } catch (error) {
      console.error('Fetch error:', error);
      messageReturn = `<div class="error">Something went wrong. Please try again.</div>`;
    }
  });
})

async function fetchNonce() {
  const res = await fetch('https://quote.footwearandapparel.co.nz/nonce',{
      method: 'GET',
      credentials: 'include' // Send cookies
    })
    const data = await res.json()
    const nonce = data.nonce
    return nonce
}

async function fetchCart() {
  const res = await fetch(window.location.origin + '/cart.json')
    const data = await res.json()
    const cart = data
    return cart
}

async function requestQuote({cart, nonce}) {
  const body = {
      cart,
      nonce
    }
    console.log('body',body)
    const res = await fetch('https://quote.footwearandapparel.co.nz/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include' // Send cookies
    })
    const data = await res.json()
    console.log(data)
}