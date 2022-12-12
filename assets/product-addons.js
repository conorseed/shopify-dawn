let data = JSON.parse(document.querySelector('variant-selects [type="application/json"]').textContent)
console.log(data)

let gallery = document.querySelector('[id^="GalleryViewer"]')
console.log(gallery)
document.addEventListener('sliderUpdated', e=>{
  console.log('yo', e)
});