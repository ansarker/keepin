const Card = require('../models/model.card');
const { encrypt } = require('../helpers/helper');
const { ObjectId } = require('bson');

exports.post_card = async (req, res) => {
  const { title, card_holder, number, brand, expiration_month, expiration_year, pincode } = req.body;
  const encPincode = encrypt(pincode);
  const { iv: salt, encryptedData: pin } = encPincode;
  const newCard = new Card({
    userId: req.user.email, title, card_holder, number, brand, expiration_month, expiration_year, salt, pin
  })
  let result = await newCard.save();

  res.status(201).json({
    success: true,
    result,
    msg: "Successfully added data"
  })
}

exports.get_card = (req, res) => {
  if (req.query.q) {
    const searchValue = new RegExp(req.query.q, "i");
    Card.find({
      userId: req.user.email,
      $or: [
        { title: searchValue },
        { email: searchValue },
        { username: searchValue }
      ]
    }).then(data => {
      res.status(201).json({
        success: true,
        data
      });
    }).catch((err) => {
      res.status(401).json({
        success: false,
        msg: 'Nothing found :('
      })
    })
  } else {
    Card.find({ userId: req.user.email }).then((data) => {
      res.status(201).json({
        success: true,
        data,
        msg: 'Showing all the data'
      });
    }).catch((err) => {
      res.status(401).json({
        success: false,
        msg: 'No data available :('
      })
    })
  }
}

exports.delete_card = (req, res) => {
  const { _id } = req.body;
  const deleteId = { _id: ObjectId(_id) };
  Card.deleteOne(deleteId, (err, result) => {
    if (err) throw err
    res.status(201).json({
      success: true,
      result,
      msg: 'Deletion success'
    });
  })
}

exports.update_card = (req, res) => {
  console.log(req.body);
  const updateId = { _id: ObjectId(req.params.id) }
  const { title, card_holder, number, brand, expiration_month, expiration_year, pincode } = req.body;
  if (pincode === undefined) {
    Card.updateOne(updateId, {
      $set: req.body
    }).then((response) => {
      res.status(201).json({
        success: true,
        response,
        msg: 'Updated successfully'
      })
    })
  } else {
    const encPincode = encrypt(pincode);
    const { iv: salt, encryptedData: pin } = encPincode;

    Card.updateOne(updateId, {
      $set: { title, card_holder, number, brand, expiration_month, expiration_year, salt, pin }
    }).then((response) => {
      res.status(201).json({
        success: true,
        response,
        msg: 'Updated successfully'
      })
    })
  }
}

exports.find_by_id = (req, res) => {
  const _id = req.params.id;
  Card.findById(_id)
    .then((data) => {
      res.status(201).json({
        success: true,
        data
      });
    })
}