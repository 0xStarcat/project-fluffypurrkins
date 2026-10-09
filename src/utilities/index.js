import ReactGA from 'react-ga'

const portfolioImages = require.context('../images/portfolio', true, /\.(gif|jpe?g|png|svg)$/i)

export const getPortfolioImage = image => {
  const imagePath = `.${image.url}`
  if (!portfolioImages.keys().includes(imagePath)) {
    throw new Error(`Portfolio image is missing from the local assets: ${image.url}`)
  }
  return portfolioImages(imagePath)
}

export const pathify = string => {
  return string
    .toLowerCase()
    .replace(/[^A-Za-z0-9\s]/gi, '')
    .replace(/\s/gi, '-')
}

export const trackProjectOpen = location => {
  if (location.hash && (location.pathname === '/work' || location.pathname === '/projects')) {
    // track project clicks
    ReactGA.event({
      category: location.pathname,
      action: 'Open list item',
      label: location.hash
    })
    return true
  } else {
    return false
  }
}
