var timerActive = false
var startTime = 0

function formatTime(s) {
    var m = 0
    var h = 0
    
    if (s >= 60) {
        m = Math.floor(s/60)
        s -= m*60
    }
    
    if (m >= 60) {
        h = Math.floor(m/60)
        m -= h*60
    }
    
    return [s, m, h]
}

function everySecond(seconds, timeToWait) {
    if (seconds >= timeToWait) {
      console.log("time's up!")
      clearInterval(secondWait)
      timerActive = false
    }
    
    var timeUnitArr = formatTime(timeToWait-seconds)
    var sec = timeUnitArr[0]
    var min = timeUnitArr[1]
    var hr = timeUnitArr[2]
    sec <= 10 && (sec = `0${sec.toString()}`)
    min <= 10 && (min = `0${min.toString()}`)
    hr <= 10 && (hr = `0${hr.toString()}`)
    var formattedTime = `${hr}:${min}:${sec}`
    document.getElementById("timeLeft").innerHTML = formattedTime
    // console.log(formattedTime)
  }

function mine() {
    // current time
    const dateText = document.getElementById("timeLeft")
    
    if (timerActive == false) {
        startTime = Date.now()
        timerActive = true
    // } else if (timerActive == true) {
    //     return
    }
    
    var timeToWait = 10
    var seconds = Math.floor((Date.now() - startTime) / 1000)
    
    var secondWait = setInterval(everySecond(seconds, timeToWait), 1000)
    
    ////////////////////////////////////////////////////////////////////////////////////////
  
    // current FFF
    const mineButton = document.getElementById("fffbutton")
    const fffText = document.getElementById("fff")
    var fff = Number(fffText.innerHTML.replace(" FFF", ""))
    
    // current AL
    const currentALText = document.getElementById("currentAL")
    const currentALStrIndex = currentALText.innerHTML.indexOf(":")
    var currentAL = Number(currentALText.innerHTML.substring(currentALStrIndex+2))
    
    fff = Math.round((fff+(1*currentAL))*10)/10
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