const passport = require('passport');
const ApiKey = require('./apikeys');
const LocalAPIKey= require('passport-localapikey-update').Strategy;

passport.use(new LocalAPIKey(
    (apikey, done) => {
        ApiKey.findOne({apikey: apikey},(err, user) => {
            if (err) {return done(err); }
            if (!user ){
                return done(null,false, {message: 'Unknown apikey' + apikey});

            } else {
                console.log("Logged as:" + user.user);
                return done(null, user)

            }

        })
    }

));