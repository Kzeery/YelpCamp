const campgroundsRoutes = require("./routes/campgrounds"),
      commentRoutes     = require("./routes/comments"),
      methodOverride    = require("method-override"),
      LocalStrategy     = require("passport-local"),
      indexRoutes       = require("./routes/index"),
      User              = require("./models/user"),
      flash             = require("connect-flash"),
      session           = require("express-session"),
      bodyParser        = require("body-parser"),
      mongoose          = require("mongoose"),
      passport          = require("passport"),
      express           = require("express"),
      app               = express();
var   url               = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(session({
    secret: "YelpCampSecret13245",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});