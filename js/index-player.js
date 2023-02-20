// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/cairokee-marboot-be-astek-mp-3-128-k/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Ana_El_Segara",
                "length": "3:40",
                "file": "Ana_El_Segara"
            },
             {
                "track": 2,
                "name": "Ghareeb",
                "length": "3:42",
                "file": "Ghareeb"
            }, {
                "track": 3,
                "name": "Nas_w_Nas",
                "length": "4:52",
                "file": "Nas_w_Nas"
            }, {
                "track": 4,
                "name": "Kan_Lak_Maaya",
                "length": "3:49",
                "file": "Kan_Lak_Maaya"
            }, {
                "track": 5,
                "name": "Marboot_Be_Astek",
                "length": "5:28",
                "file": "Marboot_Be_Astek"
            }, {
                "track": 6,
                "name": "Ya_Abyad_Ya_Eswed",
                "length": "4:27",
                "file": "Ya_Abyad_Ya_Eswed"
            }, 
            // {
            //     "track": 7,
            //     "name": "All The King's Men (Take 1) - Alternate Cuts",
            //     "length": "5:45",
            //     "file": "AC_ATKMTake_1"
            // }
        ],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});