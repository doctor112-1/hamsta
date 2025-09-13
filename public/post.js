const form = document.querySelector("#form")

async function sendData() {

  const formData = new FormData(form)

  try {
    const response = await fetch("/postResponse", {
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
  console.log(result)
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
