export function setScheme(scheme) {
  const schemeAttribute = document.createAttribute('scheme')
  schemeAttribute.value = scheme ? scheme : 'bright_light'
  document.body.attributes.setNamedItem(schemeAttribute)
}
