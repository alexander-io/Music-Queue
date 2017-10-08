(function(){

  let music_mount = document.getElementById('music-mount');
  let queue_mount = document.getElementById('queue-display');
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

  let client_music_queue = new Q()
  console.log(client_music_queue);

  let make_music_wrapper = function(music_library) {
    let music_box_wrapper = document.createElement('div')
    music_box_wrapper.style.padding = '1%'
    music_box_wrapper.style.display = 'block'
    music_box_wrapper.style.width = '100%'
    music_box_wrapper.style.height = '120px'
    music_box_wrapper.style.border = '1px   solid #484848'
    music_box_wrapper.className += 'music-box-wrapper z-depth-5 waves-effect'
    music_box_wrapper.data = music_library[x]

    let music_box = document.createElement('div')
    music_box.style.textAlign = 'center'
    music_box.style.color = 'black'
    // let song_title, song_artist, song_album, song_duration = document.createElement('h4')
    let
    song_title = document.createElement('h6')
    , song_artist = document.createElement('h6')
    , song_album = document.createElement('h6')
    , song_duration = document.createElement('h6')

    // song_title.innerHTML = music_library[x]
    song_title.innerHTML = music_library[x].title
    song_artist.innerHTML = music_library[x].artist
    song_album.innerHTML = music_library[x].album
    song_duration.innerHTML = music_library[x].duration

    music_box.appendChild(song_title)
    music_box.appendChild(song_artist)
    music_box.appendChild(song_album)
    music_box.appendChild(song_duration)

    music_box_wrapper.appendChild(music_box);
    return music_box_wrapper
  }

  let populate_music_library_section = function(music_library) {

    // define a music box to represent each song in the library
    // music_mount.style.padding = '5% 5% 5% 5%'

    for (x in music_library) {
      let music_box_wrapper = make_music_wrapper(music_library)
      // add event listener to music_box_wrapper, onclick add the song to the user's music queue
      music_box_wrapper.addEventListener('click', function(){
        client_music_queue.enqueue(music_box_wrapper.data)
        let clone = music_box_wrapper.cloneNode(true)
        queue_mount.appendChild(clone)
        music_box_wrapper.style.backgroundColor = '#484848'

      })
      music_mount.appendChild(music_box_wrapper)

    }
  }

  // define socket,  { ip : 'localhost', port : 8080}
  let socket = io('http://localhost:8080')

  // listen for 'music library' event
  socket.on('music library', function(music_library) {
    // XXX : test print data received from server
    for (x in music_library) {
      console.log(music_library[x]);
    }

    populate_music_library_section(music_library)

    // emit an event that the server will hopefully hear, send the user-defined song queue data
    socket.emit('next event', {data : 'song_queue'})
  })
})()
