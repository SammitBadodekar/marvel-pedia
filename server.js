const express = require('express');
const { send } = require('express/lib/response');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get('/'),(req, res) => {
    res.send('index.html')
}


/* search box and results*/

var Marvel = require('marvel')
var marvel = new Marvel({ publicKey: "2ab9cbe8b87244a8877154fea3e3c60b", privateKey: "0e44fa45a253873efe3c63f2a923e9e8c26be183"})

app.get('/characters', (req, res) => {
  const query = req.query.query;
  marvel.characters.nameStartsWith(`${query}`).get((err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      res.send(resp);
    }
  });
});
/* generating random characters */
app.get('/random-characters', (req, res) => {
  const query = req.query.query;
  marvel.characters.offset(`${query}`).get((err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      res.send(resp);
    }
  });
});
/* generating random comics */
app.get('/random-comics', (req, res) => {
  const query = req.query.query;
  marvel.comics.offset(`${query}`).get((err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      res.send(resp);
    }
  });
});

/* generating random events */
app.get('/random-events', (req, res) => {
  const query = req.query.query;
  marvel.events.offset(`${query}`).get((err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      res.send(resp);
    }
  });
});
/* when user clicks on search results */
/* for getting char img,name,descriptions */
let charInfo;
app.get('/character-info',(req,res)=>{
  const query = req.query.query;
   marvel.characters.id(`${query}`).get(async(err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
      
    } else {
      charInfo = resp[0];
      let comicsData = [];
      const comicData = await comicNameInfo(query);
      let eventName = resp[0].events.items
      let comData = Object.values(comicData)
      comData.forEach(element => {
       comicsData.push(element) 
      });
      res.render('character-info',{
        charImg:`${charInfo.thumbnail.path}.${charInfo.thumbnail.extension}`,
        charName:`${charInfo.name}`,
        charDesc:`${charInfo.description}`,
        comName:`${JSON.stringify(comicsData)}`,
        eveName:`${JSON.stringify(eventName)}`
      })
    }
  });
})
let comInfo;
app.get('/comics-info',(req,res)=>{
  const query = req.query.query;
   marvel.comics.id(`${query}`).get(async(err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      comInfo = resp[0];
      res.render('comics-info',{
        comicImg:`${comInfo.thumbnail.path}.${comInfo.thumbnail.extension}`,
        comicName:`${comInfo.title}`,
        comicDesc:`${comInfo.description}`
      })
    }
  });
})
app.get('/events-info',(req,res)=>{
  const query = req.query.query;
   marvel.events.name(`${query}`).get(async(err, resp) => {
    if (err) {
      console.log("Error retrieving data:", err);
      res.status(500).send("An error occurred while retrieving data");
    } else {
      eveInfo = resp[0];
      res.render('events-info',{
        eventsImg:`${eveInfo.thumbnail.path}.${eveInfo.thumbnail.extension}`,
        eventsName:`${eveInfo.title}`,
        eventsDesc:`${eveInfo.description}`,
        prev:`${eveInfo.previous.name}`,
        next:`${eveInfo.next.name}`
      })
    }
  });
})
app.get('/movies-info',async(req,res)=>{
  const query = req.query.query;
  const { default: fetch } = await import('node-fetch');
      const RawMoviesData = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=a664b916`)
      const JsonMovieData = await RawMoviesData.json()
      let moviesInfo = Object.values(JsonMovieData)
      res.render('movies-info',{
        movieImg:`${moviesInfo[13]}`,
        movieName:`${moviesInfo[0]}`,
        movieCast:`${moviesInfo[8]}`,
        movieDesc:`${moviesInfo[9]}`,
        movieRating:`${moviesInfo[16]}`
      })
    })
/*for getting comic img,name,descriptions in which character has appeared*/
function comicNameInfo(charId) {
  return new Promise((resolve, reject) => {
    marvel.comics.sharedAppearances(`${charId}`).get((err, resp) => {
      if (err) {
        console.log("Error retrieving data:", err);
        reject(err);
      } else {
        let comicData = resp
        resolve(comicData);
      }
    });
  });
}

