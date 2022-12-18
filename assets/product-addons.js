var variants = document.querySelector('variant-selects')
var gallery = document.querySelector('media-gallery')

// Update variants on Thumbnail click
gallery.elements.thumbnails.addEventListener('click', (e)=>{
  // ignore everything but thumbnail clicks
  if(!e.target.classList.contains('thumbnail')){
     return true
  }
  updateVariants()
});

// Update variants on slider button click
gallery.elements.thumbnails.querySelector('.slider-button--prev').addEventListener('click', event=>{
  let media = gallery.elements.thumbnails.querySelector('[aria-current="true"]').parentNode.previousSibling;
  gallery.setActiveMedia(media.dataset.target, false)
  updateVariants()
  slideVertical(false)
})
gallery.elements.thumbnails.querySelector('.slider-button--next').addEventListener('click', event=>{
  let media = gallery.elements.thumbnails.querySelector('[aria-current="true"]').parentNode.nextSibling
  gallery.setActiveMedia(media.dataset.target, false)
  updateVariants()
  slideVertical(true)
})

// Function to update variants
function updateVariants(){

  // get mediaId of current image
  let mediaId = gallery.elements.viewer.querySelector('.is-active .product__media-toggle').getAttribute("data-media-id")
  
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

// Move vertical slider to correct position
function slideVertical(next){
  // Set New Offset for vertical
  gallery.elements.thumbnails.sliderItemOffset = gallery.elements.thumbnails.sliderItemsToShow[1].offsetTop - gallery.elements.thumbnails.sliderItemsToShow[0].offsetTop;
  // Calculate new position
  gallery.elements.thumbnails.slideScrollPosition = next === true ? gallery.elements.thumbnails.slider.scrollTop + gallery.elements.thumbnails.sliderItemOffset : gallery.elements.thumbnails.slider.scrollTop - gallery.elements.thumbnails.sliderItemOffset;
  // Move
  gallery.elements.thumbnails.slider.scrollTo({
      top: gallery.elements.thumbnails.slideScrollPosition
  });
}
    