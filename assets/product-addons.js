var variants = document.querySelector('variant-selects')
var gallery = document.querySelector('media-gallery')

gallery.elements.thumbnails.addEventListener('click', (e)=>{
  // ignore everything but thumbnail clicks
  if(!e.target.classList.contains('thumbnail')){
     return true
  }

  // get mediaId of current image
  let mediaId = gallery.elements.viewer.querySelector('.is-active .product__media-toggle').getAttribute("data-media-id")

  updateVariants(mediaId)
});
function updateVariants(mediaId){
  // search for variant linked to mediaId
  let filteredVariants = variants.getVariantData().filter(variant=>{
    return mediaId.includes(variant.featured_media.id)
  })

  // stop if no variants found
  if(!filteredVariants.length){
    return true
  }
  
  // use first found option
  filteredVariants = filteredVariants[0]
  
  // update select values
  let selects = variants.querySelectorAll('select')
  selects.forEach((select, i)=>{
    select.value = filteredVariants.options[i]
  })
  // tell things to update
  variants.onVariantChange()
}