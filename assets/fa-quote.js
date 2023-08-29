document.addEventListener('DOMContentLoaded', async function() {
  // 1. fetch nonce from api
  try {
    const res = await fetch('https://quote.footwearandapparel.co.nz/nonce')
    const data = await res.json()
    const nonce = data.nonce
    console.log(nonce)
  } catch (e) {
    console.warn('error fetching nonce',e)
    return
  }

  // 2. fetch cart info from shopify
  try {
    const res = await fetch(window.location.origin + '/cart.json')
    const data = await res.json()
    const cart = data
    console.log(cart)
  } catch (e) {
    console.warn('error fetching cart',e)
    return
  }

  // 3. send cart info to api with nonce
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
    return
  }

})