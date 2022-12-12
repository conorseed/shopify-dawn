let data = JSON.parse(document.querySelector('variant-selects [type="application/json"]').textContent)
console.log(data)

let gallery = customElements.get('media-gallery')
console.log(gallery)