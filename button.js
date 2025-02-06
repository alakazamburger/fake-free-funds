function mine() {
    // current FFF
    const mineButton = document.getElementById("fffbutton")
    const fffText = document.getElementById("fff")
    var fff = Number(fffText.innerHTML.replace(" FFF", ""))
    
    // current AL
    const currentALText = document.getElementById("currentAL")
    const currentALStrIndex = currentALText.innerHTML.indexOf(":")
    var currentAL = Number(currentALText.innerHTML.substring(currentALStrIndex+2))
    
    fff = Math.round((fff+(0.1*currentAL))*10)/10
    fffText.innerHTML = fff + " FFF"
}
  
function alUpgrade() {
    // next AL price
    const alButton = document.getElementById("alButton")
    const priceStr = alButton.innerHTML
    if (priceStr == "Max Level") {
      return
    }
    const bracketIndex = priceStr.indexOf("(")
    const fIndex = priceStr.indexOf("F")
    var price = Number(priceStr.substring(bracketIndex+1, fIndex-1))
    
    // current FFF
    const fffText = document.getElementById("fff")
    var fff = Number(fffText.innerHTML.replace(" FFF", ""))
    
    // current AL
    const currentALText = document.getElementById("currentAL")
    const currentALStrIndex = currentALText.innerHTML.indexOf(":")
    var currentAL = Number(currentALText.innerHTML.substring(currentALStrIndex+2))
    
    if (fff >= price) {
        fff = Math.round((fff-price)*100)/100 // deduct the price
        currentAL += 1
        price = nextALPrice(currentAL) // get the price of the next AL
        
        if (currentAL < 16) {
            alButton.innerHTML = `${currentAL} -> ${currentAL+1} (${price} FFF)`
        } else {
            alButton.innerHTML = "Max Level"
            alButton.style.cursor = "not-allowed"
        }
        fffText.innerHTML = `${fff} FFF`
        currentALText.innerHTML = `Current max automated coins: ${currentAL}`
    }
}
  
function nextALPrice(n) {
    return Math.floor(10*n**1.1)
}