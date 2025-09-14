const form = document.querySelector("#form")

async function sendData() {

  const formData = new FormData(form)

  try {
    const response = await fetch("postResponse", {
      method: "POST",
      body: formData,
    })
    const result = await response.text()
    return result
  } catch (e) {
    console.error(e)
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const result = await sendData()
  let notificationDiv = document.getElementById("notification")
  notificationDiv.innerHTML = ""
  if (result == "posted successfully") {
    notificationDiv.className = "notification"
  } else {
    notificationDiv.className = "notificationError"
  }
  let text = document.createElement("h1")
  text.className = "notificationText"
  let textNode = document.createTextNode(result)
  notificationDiv.appendChild(text).appendChild(textNode)
})

document.forms.form.elements[0].addEventListener("input", event => {
  if (document.forms.form.elements[0].value.length < 50) {
    characterCounter = document.getElementById("characterCounter")
    characterCounter.innerHTML = ""
    let text = document.createElement("p")
    let textNode = document.createTextNode(`${document.forms.form.elements[0].value.length}/50`)
    characterCounter.appendChild(text).appendChild(textNode)
  } else {
    characterCounter = document.getElementById("characterCounter")
    characterCounter.innerHTML = ""
    let text = document.createElement("p")
    let textNode = document.createTextNode(`${document.forms.form.elements[0].value.length}/400`)
    characterCounter.appendChild(text).appendChild(textNode)
  }
})
