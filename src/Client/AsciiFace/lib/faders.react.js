function fadeAsciiRandomly(callback) {
  let elements = document.getElementsByClassName('ascii-band')
  let invisibleElements = 0
  for (let i = 0; i < elements.length; i++) {
    let randomDuration = (Math.random() * 1500) + 500
    elements[i].style.transition = `opacity ${randomDuration}ms linear`
    elements[i].style.opacity = '0'
    elements[i].addEventListener('transitionend', () => {
      invisibleElements++
      if(invisibleElements === elements.length - 1) {
        setTimeout(callback, 500)
      }
    })
  }
}
function fadeAsciiTopToBottom(callback) {
  let elements = document.getElementsByClassName('ascii-band')
  let linearDuration = 0
  let invisibleElements = 0
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.transition = `opacity ${linearDuration}ms linear`
    elements[i].style.opacity = '0'
    elements[i].addEventListener('transitionend', () => {
      invisibleElements++
      if(invisibleElements === elements.length - 1) {
        setTimeout(callback, 500)
      }
    })
    if (elements[i].innerHTML.length > 200) { linearDuration += 100 }
    else { linearDuration += 10 }
  }
}

function fadeAsciiBottomToTop(callback) {
  let elements = document.getElementsByClassName('ascii-band')
  let linearDuration = 0
  let invisibleElements = 0
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].style.transition = `opacity ${linearDuration}ms linear`
    elements[i].style.opacity = '0'
    elements[i].addEventListener('transitionend', () => {
      invisibleElements++
      if(invisibleElements === elements.length - 1) {
        setTimeout(callback, 500)
      }
    })
    if (elements[i].innerHTML.length > 200) { linearDuration += 100 }
    else { linearDuration += 10 }
  }
}
function resetAscii() {
  let elements = document.getElementsByClassName('ascii-band')
  for (let i = 0; i < elements.length; i++) { elements[i].style.opacity = '1' }
}

export { fadeAsciiBottomToTop, fadeAsciiTopToBottom, fadeAsciiRandomly, resetAscii }
