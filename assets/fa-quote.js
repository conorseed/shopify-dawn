document.addEventListener('DOMContentLoaded', async function() {
  // 1. fetch nonce from api
  const nonce = await fetchNonce();
  if (nonce instanceof Error) return

  // check home
  const home = await checkHome();
  if (home instanceof Error) return

  // 2. fetch cart info from shopify
  const cart = await fetchCart();
  if (cart instanceof Error) return

  // 3. send cart info to api with nonce
  const data = {cart, nonce}
  console.log('before function', data)
  const res = await requestQuote({cart, nonce});
  if (res instanceof Error) return

  alert('Quote request sent!')

})

async function fetchNonce() {
  try {
    const res = await fetch('https://quote.footwearandapparel.co.nz/nonce',{
      method: 'GET',
      credentials: 'include' // Send cookies
    })
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

async function requestQuote({cart, nonce}) {
  try {
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
  } catch (e) {
    console.warn('error sending email',e)
    return e
  }
}

async function checkHome(){
  try {
    const res = await fetch('https://quote.footwearandapparel.co.nz/',{
      method: 'GET',
      credentials: 'include' // Send cookies
    })
    const data = await res.json()
    console.log(data)
  } catch (e) {
    console.warn('error fetching home',e)
    return e
  }
}