   var pageToken = {};
        $(document).ready(function () {
            $('.popup').hide()
            $('.overlayBg').hide()
            $('#searchButton').click(function (e) {
                e.preventDefault();
                searchYoutube();
            })
            $('.tokenClass').click(function () {
                pageToken.current = $(this).val() == 'Next' ? pageToken.nextPage : pageToken.prevPage;
                searchYoutube();
            })
            $('.overlayBg').click(function () {
                $('.popup').hide()
                $('.overlayBg').hide()
            })
            $('#output').on('click', '.thumbnail', function () {
                $('.popup').show()
                $('.overlayBg').show();
                $(window).scrollTop(0)
                $('.popup iframe').attr('src', 'https://www.youtube.com/embed/' + $(this).attr('videoID'));
            })
        })
        function searchYoutube() {
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search'
                , dataType: 'json'
                , type: 'GET'
                , data: {
                    key: 'AIzaSyA9YIeJMUAUAO5QaCo0wzfbdGlLIbjo1D4'
                    , q: $('#search').val()
                    , part: 'snippet'
                    , maxResults: 6
                    , pageToken: pageToken.current
                }
            }).done(function (data) {
                pageToken.nextPage = data.nextPageToken;
                pageToken.prevPage = data.prevPageToken;
                console.log(pageToken)
                var html = "";
                $.each(data['items'], function (index, value) {
                    html += '<div class="col span 1-of-4"><p class="title">' + value.snippet.title + '</p>';
                    html += '<p class="url"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">' + value.id.videoId + '</a></p>';
                    html += '<p><img  class="thumbnail" src="' + value.snippet.thumbnails.medium.url + '" videoID="' + value.id.videoId + '"></p>';
                    html += '</div>';
                })
                $('#output').html(html);
            })
        }

