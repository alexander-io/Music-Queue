### Music Queue Server

#### Server side directory structure :

```javascript

// music directory structure
// ./music/hip_hop/j_cole/4youreyesonly/song

// list of genres 
let lst_of_genres = [
  'alt',
  'classic',
  'folk',
  'hiphop',
  'indie',
  'lofi',
  'pop'
]

// structure of a song object
let song = {
  title : 'title',
  artist : 'artist',
  album : 'album',
  duration : 1024,
  path_to_file : 'path/to/file',
  path_to_art : 'path/to/art',
  related_artists = ['related_artist_00', 'related_artist_01']
}

// structure of the music library
let music_library = {
  genre = {
    hip_hop = {
      artist_00 = {
        album_00 = {
          song_00 = {
            title : 'title',
            artist : 'artist',
            album : 'album',
            duration : 1024,
            path_to_file : 'path/to/file',
            path_to_art : 'path/to/art'
          },
          song_01 = { /* ... */}, // ...
        }
      }
    },
    /* second genre */lofi = {

    },
    blues = {

    },
    jazz = {

    },
    alt = {

    }
  }
}
```
