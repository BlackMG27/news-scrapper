var db = require('../models');

module.exports = function (app) {

    app.get('/articlescrape', function (req, res) {
        axios.get('https://www.infoworld.com/category/javascript/').then(function (response) {
            const $ = cheerio.load(response.data);
            $('.river-well').each(function (i, element) {
                let endGame = {};
                endGame.title = $(this).children('.post-cont').children('h3').children('a').text();
                endGame.link = $(this).children('.post-cont').children('h3').children('a').attr('href');
                endGame.summary = $(this).children('.post-cont').children('h4').text();
                //endGame.photo = $(this).children('well-img').children('a').children('img').attr('src');
                endGame.link = 'https://www.infoworld.com' + endGame.link;
                console.log(endGame);
                let dataTitle = response.data.title
                //if (!response.data.includes(dataTitle)) {
                db.Article.create(endGame).then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                })
                //}
            })
            res.send('Scrape Complete!');
        })

    });


    app.get('/', function (req, res) {
        db.Article.find({}, function (err, data) {
            if (err) throw err;
            res.render('news', data);
        })
    });

    //save to save collection
    app.put('/articles/:id', function (req, res) {
        const id = req.params.id;
        db.Article.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                saved: true
            }
        }, {
            new: true
        }).then(function (dbArticle) {
            res.json(dbArticle);
        })
    })

    //get the saved articles
    app.get('/saved', function (req, res) {
        db.Article.find({
            saved: true
        }, function (err, data) {
            if (err) throw err;
            res.render('saved', data);
        })
    })

    //add the notes to collection
    app.get('/saved/:id', function (req, res) {
        const id = req.param.id;
        db.Article.findById(id)
            .populate('note')
            .sort({
                _id: -1
            })
            .then(function (data) {
                res.json(data);
            })
    })

    //make a note and save it to the notes collection
    app.post('/saved/:id', function (req, res) {
        const id = req.param.id;
        const title = req.body.title;
        const body = req.body.body
        db.Note.create({
            articleId: id,
            title: title,
            body: body
        }).then(function (data) {
            res.json(data);
        })
    })

    app.get('/clearall', function (req, res) {
        db.Article.drop({},
            function (err, data) {
                if (err) throw err;
                res.json(data);
            })
    })
}