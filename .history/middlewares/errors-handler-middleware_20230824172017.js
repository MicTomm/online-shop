app.use(function(error, req, res, next){
    res.status(500).render('500');
});