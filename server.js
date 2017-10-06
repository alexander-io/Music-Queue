let express = require('express')
let app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
let fs = require('fs')

server.listen(8080)

// global
let music_library = {}

class Q {
  constructor() {
    this.supporting_array = []
  }
  enqueue(x) {
    this.supporting_array.push(x)
  }
  dequeue() {
    return this.supporting_array.shift()
  }
}

let add_song_to_library = function(song) {
  music_library[song.title] = song
}

let make_song = function(
  title,
  artist,
  album,
  duration,
  path_to_file,
  path_to_art
) {
  return {
    title : title,
    artist : artist,
    album : album,
    duration : duration,
    path_to_file : path_to_file,
    path_to_art : path_to_art
  }
}

let search_title = function(search_query) {
  console.log('searching the library for matching titles');
  for (x in music_library) {
    if (music_library[x] == search_query) {
      return music_library[x]
    }
  }
}

let search_artist = function() {
  console.log('searching the library for matching artists');
}
let search_album = function() {
  console.log('searching the library for matching albums');
}

let search_music_library = function(search_query) {
  // compare the search query to the keys/titles of the library
  if (music_library.hasOwnProperty(search_query)){
    return music_library[search_query]
  } else {
    // couldn't find a matching title comparing the external key...
    // ... se let's search inside each object to determine if we can find a match for the search query
    search_title(search_query)

  }
}

// TEST : add song to library
add_song_to_library(make_song('biking', 'frank ocean', 'faux', '260', 'music/hiphop/frank_ocean/biking/biking.mp3', 'music/hiphop/frank_ocean/biking/biking.png'))
add_song_to_library(make_song('riding', 'frank ocean', 'faux', '2000', 'music/hiphop/frank_ocean/biking/biking.mp3', 'music/hiphop/frank_ocean/biking/biking.png'))
add_song_to_library(make_song('idwdta', 'xxxtentacion', 'teh', '120', 'music/hiphop/frank_ocean/biking/biking.mp3', 'music/hiphop/frank_ocean/biking/biking.png'))
add_song_to_library(make_song('11pm', 'plvto', 'wha', '260', 'music/hiphop/frank_ocean/biking/biking.mp3', 'music/hiphop/frank_ocean/biking/biking.png'))


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
  console.log('got req');
})

app.get('/materialize.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/materialize-css/dist/js/materialize.js')
})

app.get('/jquery.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.js')
})

app.get('/materialize.css', function(req, res) {
  res.sendFile(__dirname + '/node_modules/materialize-css/dist/css/materialize.css')
})

app.get('/fonts/roboto/Roboto-Regular.woff', function(req, res) {
  res.sendFile(__dirname + '/node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff')
})

app.get('/fonts/roboto/Roboto-Regular.woff2', function(req, res) {
  res.sendFile(__dirname +  '/node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff2')
})

io.on('connection', function(socket) {
  socket.emit('music library', music_library)
})
