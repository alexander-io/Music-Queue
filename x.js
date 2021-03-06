(function(){
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
  add_song_to_library(make_song('biking', 'frank ocean', null, '260', 'music/hiphop/frank_ocean/biking/biking.mp3', 'music/hiphop/frank_ocean/biking/biking.png'))
  console.log(search_music_library(process.argv[2]))

  let play_queue = new Q()
})()
