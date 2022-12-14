
const showTipBox = (tip) => {
  const box = document.createElement("div")
  box.className = "tipBox"
  box.id = "tipBox"
  const innerBox = document.createElement("div")
  innerBox.className = "tipInnerBox"
  innerBox.id = "tipInnerBox"
  const innerText = document.createElement("div")
  innerText.className = "tipInnerText"
  innerText.id = "tipInnerText"
  innerText.innerText = tip
  innerBox.appendChild(innerText)
  box.appendChild(innerBox)
  box.onclick = () => box.remove()
  document.body.appendChild(box)
}
