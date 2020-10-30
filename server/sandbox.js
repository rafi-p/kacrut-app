const axios = require('axios')
const fs = require('fs')

axios({
  method: 'GET',
  url: 'https://api.imgflip.com/get_memes'
})
.then(result => {
    fs.writeFileSync('./meme.json', JSON.stringify(result.data.data.memes, null, 2))
})
.catch(err => {
  console.log(err)
})

