function onMobileSize() {
  return window.innerWidth < 768 || screen.width < 768
}

function onDesktopSize() {
  return window.innerWidth > 768 && screen.width > 768
}

export { onMobileSize, onDesktopSize }
