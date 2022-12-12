var variants = document.querySelector('variant-selects')
var gallery = document.querySelector('media-gallery')

gallery.elements.thumbnails.addEventListener('click', ()=>{

  let mediaId = gallery.elements.viewer.querySelector('.is-active .product__media-toggle').getAttribute("data-media-id")
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