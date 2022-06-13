// const { delete } = require('../app');
const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const schedule = require('node-schedule');
// const date = new Date(actualDate.getFullYear(), 5, actualDate.getDate(), 23, 59, 59);
// console.log(actualDate.getDate());

// schedule.scheduleJob(date, function(){
//     User.updateMany({}, {paid: false}).then(user => {
//         console.log("Data updated!")
//         })
// });

const CronJob = require('cron').CronJob;
const job = new CronJob(
      '10 52 * * * *',
      function() {
        // const actualDate = new Date();
        // console.log('You will see this message every tsy haiko intsony. Date:', actualDate);
        User.updateMany({}, {paid: false}).then(user => {
        console.log("Data updated!")
        })
      },
      null,
      true,
      'Indian/Antananarivo'
  );


// class testController {
//   createNewUser(req, res) {
//     bcrypt
//       .hash(req.body.password, 10)
//       .then((hash) => {
//         const user = new User({
//           name: req.body.name,
//           firstname: req.body.firstname,
//           password: hash,
//           phone: req.body.phone,
//           paid: false,
//         });
//         user
//           .save()
//           .then(() => {
//             res.json({ message: "User created with success!" })
//           })
//           .catch((err) => {console.error(err)});
//       })
//       .catch((err) => console.log(err));
//   }
// }

const createNewUser = (req, res) => {
    User.findOne({phone: req.body.phone}).then(user => {
      if(user)
      {
        res.json({
          success: false,
          message: "Phone already used. Please use another phone number.",
        })
      }
      else
      {
        bcrypt.hash(req.body.password, 10)
        .then(hash =>
          {
          const user = new User({
              name: req.body.name,
              firstname: req.body.firstname,
              password: hash,
              phone: req.body.phone,
              paid: false,
          });
          user.save().then(() => res.json({message: 'User created with success!'})).catch((err) => console.error(err))
      }).catch((err) => console.log(err))
      }
    })  
}

const getUser = (req, res) => {
    User.findById(req.params.id,' -password -__v').then((user) => {res.json({user: user})}).catch((err) => console.log(err))
}

const putUser = (req, res) => {
    const user = {...req.body}
    User.findOneAndUpdate({id:req.params.id}, {...user}).then((user) => res.json({user: user})).catch((err) => console.log(err))
}

const login = (req, res) => {
    User.findOne({phone: req.body.phone})
    .then(user => {
        if (user)
        {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(valid)
                {
                    User.updateOne({phone: user.phone}, {connected: true}).then((user) => {res.json({user: user})}).catch((err) => console.log(err))
                    res.json({
                        success: true,
                        message: "You are connected",
                        token : jwt.sign(
                            { phone: user.phone, paid: user.paid },
                            'RANDOM_TOKEN_SECRET',
                            {}
                        )
                    })
                }
                else
                {
                    res.json({
                        success: false,
                        message: "Authentification error"
                    });
                }
            })
            .catch((err) => console.log(err))
        }
        else
        {
            res.json({
                success: false,
                message: "Authentification error !"
            });
        }
    })
    .catch((err) => console.log(err))
}

const pay = (req, res) => {
    const {phone, paid} = jwt.verify(
        req.body.token,
        'RANDOM_TOKEN_SECRET'
    )
    if(!paid)
    {
        User.findOne({phone: phone}).then(user =>{
            if (user) {
                User.updateOne({phone: user.phone}, {paid: true}).then(() => {
                    res.json({
                        success: true,
                        message: "Successfully paid !",
                        token : jwt.sign(
                            { phone: user.phone, paid: true },
                            'RANDOM_TOKEN_SECRET',
                            {}
                        )
                    })
                })
            }
            else
            {
            res.json({
                success: false,
                message: "User not found !"
            })}
        })
    }
    else
    {
        res.json({
            success: false,
            message: "Already paid !"
        })
    }
    // res.json({
    //     success: true,
    //     message: "ok",
    // })
}

module.exports = {
    createNewUser : createNewUser,
    getUser : getUser,
    putUser : putUser,
    login : login,
    pay : pay,
}

// module.exports = new testController();
