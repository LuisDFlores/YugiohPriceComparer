const tcg = document.querySelector('#tcg')
const ebay = document.querySelector('#ebay')
const market = document.querySelector('#market')

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${choice}`
  console.log(url)
  fetch(url)
      .then(res => res.json()) // parse response as JSONz
      .then(data=> {
        console.log(data)

        tcg.classList.remove("invisible")
        ebay.classList.remove("invisible")
        market.classList.remove("invisible")

        let yugiObj = data.data[0]
        let cardImg = yugiObj.card_images[0]
        let card_src = cardImg.image_url
        let prices = yugiObj.card_prices[0]

        //Into Dom
        document.querySelector("#name").innerText = yugiObj.name
        document.getElementById("cardPic").src = card_src;
          if(yugiObj.level){
            document.querySelector("#level").innerText = yugiObj.level
          }
          if (yugiObj.type) {
            document.querySelector("#type").innerText = yugiObj.type
          }
          if (yugiObj.desc) {
            document.querySelector("#desc").innerText = yugiObj.desc
          }
          if (yugiObj.attribute) {
            document.querySelector("#attribute").innerText = yugiObj.attribute
          }
          if (yugiObj.race) {
            document.querySelector("#race").innerText = yugiObj.race
          }
      document.querySelector("#tcgP").innerText = prices.tcgplayer_price
      document.querySelector("#ebayP").innerText = prices.ebay_price
      document.querySelector("#marketP").innerText = prices.cardmarket_price
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

