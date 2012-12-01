var http = require('http');
var path = require('path');
var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;


// Get config from env variables.
var TWITTER_CONSUMER_KEY = process.env.TWITTER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_SECRET;
var MONGO_URI = process.env.MONGO_URI;
var HOST = process.env.NODE_ENV === 'production'
  ? 'team2.jit.su' : 'localhost:3000';


mongoose.connect(MONGO_URI);
mongoose.model('User', require('./user'));

var User = mongoose.model('User');

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://' + HOST + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({uid: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        user = new User();
        user.provider = 'twitter';
        user.uid = profile.id;
        user.name = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, done);
});

var app = express();


// Configure Express.
var sessionStore = new connect.session.MemoryStore();
var sessionKey = 'connect.sid';
var cookieSecret = 'pikapika';
app.configure(function() {
  app.use(express.cookieParser(cookieSecret));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ store: sessionStore, key: sessionKey }));
  /*
  app.use(express.cookieSession(
    secret: cookieSecret,
    cookie: { maxAge: 60 * 60 * 1000 }
  }));
  */
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '..', 'public')));
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/play');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var playFile = path.join(__dirname, '..', 'public/play.html');
app.get('/play', function(req, res) {
  if (req.isAuthenticated()) {
    return res.sendfile(playFile);
  }
  res.redirect('/');
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var passportsio = require('passport.socketio');


// Start the app.
server.listen(3000, function() {
  console.log('team2 started on ' + HOST);
});


// Configure socket.io to only connect when logged in.
io.configure(function() {
  io.set('authorization', passportsio.authorize({
    sessionKey: sessionKey,
    sessionStore: sessionStore,
    sessionSecret: cookieSecret
  }));
});

io.sockets.on('connection', require('./onconnection'));
