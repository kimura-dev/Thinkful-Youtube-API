    var pageToken = {};
        $(document).ready(function () {
            $('.popup').hide()
            $('.overlayBg').hide()
            $('#searchButton').click(function (e) {
                e.preventDefault();
                searchYoutube();
            })
            $('.tokenClass').click(function (e) {
                e.preventDeafault();
                if($(this).text() == 'Next'){
                    pageToken.nextPage;
                }
                else{
                    pageToken.prevPage;
                }
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
                    , maxResults: 5
                    , pageToken: pageToken.current
                }
            }).done(function (data) {
                console.log(pageToken.current);
                pageToken.nextPage = data.nextPageToken;
                console.log(data.nextPageToken);
                pageToken.prevPage = data.prevPageToken;
                var html = '';
                $.each(data['items'], function (index, value) {
                    let title = value.snippet.title;
                    let thumbnail = value.snippet.thumbnails.medium.url;
                    let videoId = value.id.videoId;
                    html += `<div><div class="title">${title}</div>
                    <div><div class="url"><a href="https://www.youtube.com/watch?v=${videoId} target="_blank">${videoId}</a></div>
                    <div><img  class="thumbnail" src="${thumbnail}" videoID=${videoId}></div>
                    </div>`;
                })
                $('#output').html(html);
            })

        }

                        /*  <div class="section group">
                                <div class="col span_1_of_4">1 of 4</div>
                                <div class="col span_1_of_4">1 of 4</div>
                                <div class="col span_1_of_4">1 of 4</div>
                                <div class="col span_1_of_4">1 of 4</div>
                            </div>
                                    
                  .done(function (data) {
                pageToken.nextPage = data.nextPageToken;
                pageToken.prevPage = data.prevPageToken;
                console.log(pageToken)
                var html = '';
                $.each(data['items'], function (index, value) {
                    html += '<div><div class="title">' + value.snippet.title + '</div>';
                    html += '<div><div class="url"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">' + value.id.videoId + '</a></div>';
                    html += '<div><img  class="thumbnail" src="' + value.snippet.thumbnails.medium.url + '" videoID="' + value.id.videoId + '"></div>';
                    html += '</div>';
                })
                $('#output').html(html);
            })
        }  */         
                        