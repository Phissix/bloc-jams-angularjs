(function() {
     function SongPlayer(Fixtures) {
         /**
         * @desc  Holds SongPlayer objects
         * @type {object}
         */
          var SongPlayer = {};

          /**
          * @desc  Stores album information
          * @type {object}
          */
          var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  stopSong(SongPlayer.currentSong);
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              SongPlayer.currentSong = song;
          };

         /**
         * @function playSong
         * @desc Plays current song and sets song.playing to true
         * @param {Object} song
         */
          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
          };

          /**
          * @function stopSong
          * @desc Stops current song and sets song.playing to null
          * @param {Object} song
          */
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          };

          /**
          * @function getSongIndex
          * @desc Gets the index of the song in the album
          * @param {Object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

          /**
          * @desc Holds current song number
          * @type {Number}
          */
          SongPlayer.currentSong = null;

         /**
         * @function SongPlayer.play
         * @desc Plays current song if paused, or selected song
         * @param {Object} song
         */
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      playSong(song);
                  }
              }
         };

        /**
        * @function SongPlayer.pause
        * @desc Pauses current song
        * @param {Object} song
        */
         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };

         /**
         * @function previous
         * @desc Plays previous song
         */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

        /**
        * @function next
        * @desc Plays next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
