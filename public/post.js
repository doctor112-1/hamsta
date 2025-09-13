const form = document.querySelector("#form")

async function sendData() {

  const formData = new FormData(form)

  try {
    const response = await fetch("/postResponse", {
      method: "POST",
      body: formData,
    })
    console.log(await response.text())
  } catch (e) {
    console.error(e)
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  sendData()
})
