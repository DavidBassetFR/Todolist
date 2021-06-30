module.exports = {

    facto : (req, res, next, name) => {        
        req.modelName = name.charAt(0).toUpperCase() + name.slice(1);
        next();
    },
}
   
