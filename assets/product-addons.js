var variants = document.querySelector('variant-selects')

document.addEventListener('sliderUpdated', e=>{
  console.log(e)
  let mediaId = e.detail.mediaId
  let filteredVariants = variants.getVariantData().filter(variant=>{
    return mediaId.includes(variant.featured_media.id)
  })
  
  if(!filteredVariants.length){
    return;
  }
  filteredVariants = filteredVariants[0]
  console.log(filteredVariants)
  let selects = variants.querySelectorAll('select')
  selects.forEach((select, i)=>{
    select.value = filteredVariants.options[i]
  })
  variants.onVariantChange()
});