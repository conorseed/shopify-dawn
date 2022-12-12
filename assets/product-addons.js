var variants = JSON.parse(document.querySelector('variant-selects [type="application/json"]').textContent)
console.log(variants)

let test = customElements.get('variant-selects')
console.log('what this?', test)
console.log('testing', test.getVariantData())

document.addEventListener('sliderUpdated', e=>{
  console.log(e)
  let mediaId = e.detail.mediaId
  let filteredVariants = variants.filter(variant=>{
    return mediaId.includes(variant.featured_media.id)
  })
  
  if(!filteredVariants.length){
    return;
  }

  
});