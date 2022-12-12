var variants = document.querySelector('variant-selects')
console.log(variants)

document.addEventListener('sliderUpdated', e=>{
  console.log(e)
  let mediaId = e.detail.mediaId
  let filteredVariants = variants.getVariantData().filter(variant=>{
    return mediaId.includes(variant.featured_media.id)
  })
  
  if(!filteredVariants.length){
    return;
  }

  
});