// const express = require('express')
// const path = require('path')
const PORT = process.env.PORT || 8080

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   // .set('views', path.join(__dirname, 'views'))
//   // .set('view engine', 'ejs')
//   // .get('/', (req, res) => res.render('pages/index'))

//   .listen(PORT, () => console.log(`Listening on ${PORT}`))







var express = require('express');
// var path = require('path')
var app = express();

var formidable = require('formidable');

var mongoose = require('mongoose');

var fs = require('fs-extra')

var path = require('path')

var bodyParser = require('body-parser')

// var multer = require('multer')

// var express = require('express');

var express = require('express');
// var path = require('path')
var app = express();

var formidable = require('formidable');

var mongoose = require('mongoose');

var fs = require('fs-extra')

var path = require('path')

var bodyParser = require('body-parser')

var multer = require('multer')
var upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error('The File Type is not supported'), false)
      return
    }
    cb(null, true);
  }
})
// var express = require('express');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

var expressSession = require('express-session');

// var jwt = require('jsonwebtoken')

const webPush = require('web-push');

var { signupSchema, POSTAD, MessageSchema,
  FavoriteSchema, notificationSchema } = require('./schema/allSchema');

// mongoose.connect("mongodb://127.0.0.1:27017/local", { useNewUrlParser: true })
mongoose.connect("mongodb://localhost:27017/olxClone",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('mongoDB is connected...')
  })
  .catch((err) => {
    console.log(err);
  })

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

var createAccount = mongoose.model('createAccounts', signupSchema)
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password', passReqToCallback: true
},
  function (req, email, password, done) {

    createAccount.findOne({ email: email, password: password })
      .then((user) => {

        if (user) {

          return done(null, user, req);
        }
        else {

          return done(null, null)
        }


      })
  }
))
passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  createAccount.findOne({ _id: id }, ((err, user) => {
    if (err) {
      done(err);
    }
    if (!user) {
      done(null, false);
    }
    done(null, user)

  }));

})



app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', function (req, res) {
  createAccount.find({ email: req.body.email }, function (err, record) {
    if (record.length == 0) {

      var saveAccounts = new createAccount();

      saveAccounts.name = req.body.name;
      saveAccounts.email = req.body.email;
      saveAccounts.password = req.body.password;
      saveAccounts.singupDate = (new Date).toDateString();
      saveAccounts.save(function (err, record) {
        if (err) {

          res.status(400).send(err);
        }
        else {

          // const token = jwt.sign({
          //     id: record.id,
          //     name: record.name,
          //     email: record.email,
          // }, 'mysecret'
          // )
          // passport.authenticate('local')
          // res.send({ auth: true })
          // res.redirect(307, '/login')
          res.status(200).send('Your Account Has Been Created \n Please Login Your Account');

        }

      });


    }
    else {
      res.status(409);
      res.end('The Email is already in use');
    }
  });

});
app.post('/login', passport.authenticate('local'), function (req, res) {
  let user = { name: req.user.name, email: req.user.email, _id: req.user._id }
  // console.log("user", user)
  res.status(200).send(user)
})
app.post('/check', function (req, res) {

  // let user = { username: '10214914147200302', email: 'dummy@mail.com', registered: '2018-08-05T13:18:28.933Z', name: 'Dummy User', nickName: "Dummy", fbId: '10214914147200302', fbPhoto: 'https://graph.facebook.com/v2.6/10214914147200302/picture?type=large', }
  if (req.isAuthenticated()) {
    res.status(200).json({ auth: true, success: true, user: { name: req.user.name, email: req.user.email, _id: req.user._id }, message: "Successfully logged in" });
  }
  else {
    res.status(200).json({ auth: false, success: true, message: "Logged Out" });
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200);
});

var POSTADModel = mongoose.model('postadTable', POSTAD)
app.post('/postadd', upload.array('img1', 4), async function (req, res) {
  // console.log('recieve')
  if (req.files.length == 4) {
    var savePost = new POSTADModel();
    // var fileManger = new formidable.IncomingForm();
    var imageList = [];
    // fileManger.parse(req, async function (err, fileds, files) {
    // for (var oneFile in files) {

    // var commingFiles = Array.isArray(files) ? files[oneFile] : [files[oneFile]];

    // commingFiles.forEach(function (file) {

    //     var fileRename = (new Date).getTime() + file.name;
    //     fs.copy(file.path, __dirname + '/Images/' + fileRename)

    //     imageList.push(fileRename)

    // })
    // files.forEach(async function (file) {

    var cloud1 = await cloudinary.uploader.upload(req.files[0].path);
    // console.log(cloud1)
    // var fileRename = (new Date).getTime() + file.name;
    // fs.copy(file.path, __dirname + '/public/' + fileRename)

    imageList.push(cloud1.secure_url)

    var cloud2 = await cloudinary.uploader.upload(req.files[1].path);
    // console.log(cloud2)
    // var fileRename = (new Date).getTime() + file.name;
    // fs.copy(file.path, __dirname + '/public/' + fileRename)

    imageList.push(cloud2.secure_url)

    var cloud3 = await cloudinary.uploader.upload(req.files[2].path);
    // console.log(cloud3)
    // var fileRename = (new Date).getTime() + file.name;
    // fs.copy(file.path, __dirname + '/public/' + fileRename)

    imageList.push(cloud3.secure_url)

    var cloud4 = await cloudinary.uploader.upload(req.files[3].path);
    // console.log(cloud4)
    // var fileRename = (new Date).getTime() + file.name;
    // fs.copy(file.path, __dirname + '/public/' + fileRename)

    imageList.push(cloud4.secure_url)
    // })
    // }

    savePost.addTitle = req.body.addtitle.toUpperCase();
    savePost.catagory = req.body.category;
    savePost.model = req.body.model;
    savePost.condition = req.body.condition;
    savePost.price = req.body.price;
    savePost.destination = req.body.description;
    savePost.imageList = imageList;
    savePost.name = req.body.Name;
    savePost.phone = req.body.phoneNumber;
    savePost.city = req.body.City;
    savePost.userID = req.user._id;
    savePost.postDate = (new Date).toDateString();
    await savePost.save(async function (err, record) {
      if (err) {
        res.send(err);
      }
      else {
        res.send('Past Has Been Saved')
      }
    })
  }
  else {
    res.status(400).send(new Error('Please Attatch 4 Files'));
  }

  // })

  // res.send('mobeen')
})

app.get('/allPost', function (req, res) {
  POSTADModel.find({}, function (err, record) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(record)
    }
  })
})

app.get('/allUserPost', function (req, res) {

  POSTADModel.find({ userID: req.query.id }, function (err, record) {
    if (err) {
      res.send(err)
    }
    else {

      res.send(record)
    }
  })
})

app.get('/byCategory', function (req, res) {

  if (req.query.category == "All") {
    POSTADModel.find({}, function (err, record) {
      if (err) {
        res.send(err)
      }
      else {

        res.send(record)
      }
    })
  }
  else {
    POSTADModel.find({ catagory: req.query.category }, function (err, record) {
      if (err) {
        res.send(err)
      }
      else {

        res.send(record)
      }
    })
  }

})
app.get('/byAddTitle', function (req, res) {

  POSTADModel.find({ addTitle: { $regex: '.*' + req.query.title + '.*' } }, function (err, record) {
    if (err) {
      res.send(err)
    }
    else {

      res.send(record)
    }
  })

})
app.get('/detailDescription', function (req, res) {

  POSTADModel.findOne({ _id: req.query.id }).populate("userID", 'singupDate').exec(function (err, record) {
    if (err) {

      res.send(err)
    }
    else {

      res.send(record)
    }
  })

})



app.use(express.static('Images'))




const MessageModel = mongoose.model('message', MessageSchema)


app.get('/showMessage', function (req, res) {

  MessageModel.find({ postID: req.query.postID }).populate("postID").exec(function (err, record) {
    if (err) {

      res.send(err)
    }
    else {

      res.send(record)
    }
  })
})
app.post('/deleteMessage', function (req, res) {
  MessageModel.findByIdAndRemove({ _id: req.body.data }, function (err, record) {
    if (err) {

      res.send(err)
    }
    else {

      MessageModel.find({ postID: req.body.postID }).populate("postID").exec(function (err, record) {
        if (err) {

          res.send(err)
        }
        else {

          res.send(record)
        }
      })

    }
  })

})

const FavoriteModel = mongoose.model('favourite', FavoriteSchema);
app.post('/favorite', function (req, res) {
  // console.log("jkjk")
  const { userID, postID } = req.body;
  FavoriteModel.findOne({ userID: userID, postID: postID }, function (err, record) {
    if (err) {

      res.send(err)
    }
    else {
      if (record == null) {

        var saveFavorite = new FavoriteModel();
        saveFavorite.userID = userID;
        saveFavorite.postID = postID;
        saveFavorite.save(function (err, record) {
          if (err) {
            res.send(err)
          }
          else {
            res.send(true)
          }
        })
      }
      else {
        FavoriteModel.findOneAndRemove({ userID: userID, postID: postID }, function (err, recod) {
          if (err) {

            res.send(err)
          }
          else {
            res.send(false)
          }
        })
      }
    }
  })

})
app.post('/getfavorite', function (req, res) {

  FavoriteModel.findOne({ userID: req.body.userID, postID: req.body.postID }, function (err, record) {
    if (err) {

      res.send(err)
    }
    else if (record == null) {

      res.send(false)
    }
    else {

      res.send(true)
    }
  })
})
app.get('/favoritlist', function (req, res) {
  FavoriteModel.find({ userID: req.query.id }).populate("postID").exec(function (err, record) {
    if (err) {

      res.send(err)
    }
    else {

      res.send(record)
    }
  })

})
app.post('/favoriteRemove', function (req, res) {

  FavoriteModel.findOneAndRemove({ _id: req.body.postID }, function (err, record) {
    if (err) {

      res.send(err)
    }
    else {

      FavoriteModel.find({ userID: req.body.userID }).populate("postID").exec(function (err, record) {
        if (err) {

          res.send(err)
        }
        else {

          res.send(record)
        }
      })
    }
  })

})
app.post('/deletePost', function (req, res) {
  POSTADModel.findByIdAndRemove({ _id: req.body.postID }, function (err, recod) {
    if (err) {
      res.status(400).send(err)
    }
    else {
      FavoriteModel.findOneAndRemove({ postID: req.body.postID }, function (err, record) {
        if (err) {
          res.status(400).send(err)
        }
        else {
          // console.log(record)
          res.status(200).send(record)
        }
      })
    }
  })

})

const notificationModel = mongoose.model('subscriptionTable', notificationSchema)
app.post('/getNotification', function (req, res) {


  var saveSubscription = new notificationModel();
  saveSubscription.userID = req.body.id;
  saveSubscription.subscription = JSON.stringify(req.body.subscribeUser);
  saveSubscription.save(function (err, record) {
    if (err) {
      res.json(err)
    }
    else {
      res.json('ok bhai ')
    }
  })


})

const publicKey = "BEvPj4JMdIghfcQ38DKteXMiBSg8RnHVfQpLEdgNJxqetXnNfoiaHw96Dn_MB7D-wnxovnrEuXH82CmXm8aSJZg";
const privateKey = "Mn0X5VmJuPeTwZm8heMJ1nRWsmHYebSPWuGXj4MmVCM";

webPush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
app.post('/saveMessage', function (req, res) {
  var saveMessage = new MessageModel();
  const { userID, postID, name, contact, message } = req.body;
  saveMessage.userID = userID;
  saveMessage.postID = postID;
  saveMessage.name = name;
  saveMessage.contact = contact;
  saveMessage.message = message;

  saveMessage.save(function (err, recod) {
    if (err) {
      res.send(err)
    }
    else {
      POSTADModel.findById({ _id: postID }).populate('userID').exec(function (err, record) {
        if (err) {
          res.send(err)
        }
        else {

          notificationModel.findOne({ userID: record.userID._id }, function (err, record) {
            if (err) {
              res.send(err)
            }
            else if (record) {
              const payload = JSON.stringify({ title: 'Push Test' })

              webPush.sendNotification(JSON.parse(record.subscription), payload)
                .catch((err) => console.log("mera", err))

            }
          })
        }
      })

    }
  })
})
// app.use(express.static("../build"))

// app.listen(8080, () => { console.log('sever is running on 8080 port') })


app.use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index'))

  .listen(PORT, () => console.log(`Listening on ${PORT}`))