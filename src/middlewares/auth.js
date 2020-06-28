module.exports.isLogged = (req, res, next) => {
    if( !req.isAuthenticated()) {
        return res.json({message: "Ops, você precisa está logado para acessar está página!"})
    }

    next()
}