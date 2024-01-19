$('.search-button').on('click', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=445cc37&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
    
            $('.movie-container').html(cards);
    
            // ketika tombol detail di klik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=445cc37&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = detail(m);
    
                    $('.modal-body').html(movieDetail);
    
                    },
    
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            })
    
        },
    
        error: (e) => {
            console.log(e.responseText);
        }
    });
})

$.ajax({
    url: 'http://www.omdbapi.com/?apikey=445cc37&s=harry potter',
    success: results => {
        const movies = results.Search;
        let cards = '';
        movies.forEach(m => {
            cards += showCards(m);
        });

        $('.movie-container').html(cards);

        // ketika tombol detail di klik
        $('.modal-detail-button').on('click', function () {
            $.ajax({
                url: 'http://www.omdbapi.com/?apikey=445cc37&i=' + $(this).data('imdbid'),
                success: m => {
                    const movieDetail = detail(m);

                $('.modal-body').html(movieDetail);

                },

                error: (e) => {
                    console.log(e.responseText);
                }
            });
        })

    },

    error: (e) => {
        console.log(e.responseText);
    }
});


showCards = (m) => {
    return `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem;">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show details</a>
                    </div>
                </div>
            </div>`
};

detail = (m) => {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Tahun Rilis : </strong> ${m.Released} </li>
                            <li class="list-group-item"><strong>Genre : </strong> ${m.Genre} </li>
                            <li class="list-group-item"><strong>Rating : </strong> ${m.imdbRating} </li>
                            <li class="list-group-item"><strong>Durasi : </strong> ${m.Runtime} </li>
                            <li class="list-group-item"><strong>Sinopsis : </strong> ${m.Plot} </li>
                        </ul>
                    </div>
                </div>
            </div>`
};