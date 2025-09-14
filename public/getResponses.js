async function getData() {
  const url = "getResponses"

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

const result = await getData()

if (result.posts.length == 0) {
  const noResultsYetText = document.createElement("h1")
  const noResultsYetTextNode = document.createTextNode("No results! You can be the first one to post!")
  noResultsYetText.appendChild(noResultsYetTextNode)
  document.getElementById("posts").appendChild(noResultsYetText)
  let link = document.createElement("a")
  link.href = "."
  let button = document.createElement("button")
  button.textContent = "Create post"
  document.getElementById("posts").appendChild(link).appendChild(button)
} else {
  for (let i = 0; i < result.posts.length; i++) {
    console.log(result.posts[i])
    let divPost = document.createElement("div")
    divPost.className = "post"
    //document.getElementById("posts").appendChild(divPost)
    let text = document.createElement("p")
    let textNode = document.createTextNode(result.posts[i])
    document.getElementById("posts").appendChild(divPost).appendChild(text).appendChild(textNode)
  }
}
