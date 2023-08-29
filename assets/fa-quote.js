document.addEventListener('DOMContentLoaded', async function() {
  // 1. fetch nonce from api
  const nonce = await fetchNonce();
  if (nonce instanceof Error) return

  // 2. fetch cart info from shopify
  const cart = await fetchCart();
  if (cart instanceof Error) return

  // 3. send cart info to api with nonce
  const res = await requestQuote();
  if (res instanceof Error) return

  alert('Quote request sent!')

})

async function fetchNonce() {
  try {
    const res = await fetch('https://quote.footwearandapparel.co.nz/nonce')
    const data = await res.json()
    const nonce = data.nonce
    console.log(nonce)
  } catch (e) {
    console.warn('error fetching nonce',e)
    return e
  }
}

async function fetchCart() {
  try {
    const res = await fetch(window.location.origin + '/cart.json')
    const data = await res.json()
    const cart = data
    console.log(cart)
  } catch (e) {
    console.warn('error fetching cart',e)
    return e
  }
}

async function requestQuote() {
  try {
    console.log('cart',cart);
    const res = await fetch('https://quote.footwearandapparel.co.nz/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart,
        nonce
      })
    })
    const data = await res.json()
    const quote = data.quote
    console.log(quote)
  } catch (e) {
    console.warn('error sending email',e)
    return e
  }
}