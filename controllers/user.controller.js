const multer = require("multer"); //for upload image
const path = require("path"); //handle file pathconst
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//funrion upload image --------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/user");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "user_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype); //ตรวจสอบ file type
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    ); //ตรวจสอบนามสกุล

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      );
    }
  },
}).single("userImage");

// ---------------------------------------------------------------------------------------------------------------
//function add user

exports.createUser = async (req, res) => {
  try {
    const result = await prisma.user_tb.create({
      data: {
        userFullname: req.body.userFullname,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userImage: req.file ? req.file.path.replace("image\\user\\", "") : "",
      },
    });
    res.status(201).json({
      message: "Insert OK",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err}` });
  }
};

//function authen login

exports.checkLogin = async (req, res) => {
  try {
    const result = await prisma.user_tb.findFirst({
      where: {
        userEmail: req.params.userEmail,
        userPassword: req.params.userPassword,
      },
    });
    if (!result) {
      return res.status(404).json({
        message: "Login Failed : User not found",
      });
    }
    res.status(200).json({
      message: "Login Success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err.message}` });
  }
};

//function update user
exports.editUser = async (req, res) => {
  try {
    let result = {};
    if (req.file) {
      result = await prisma.user_tb.update({
        data: {
          userFullname: req.body.userFullname,
          userEmail: req.body.userEmail,
          userPassword: req.body.userPassword,
          userImage: req.file ? req.file.path.replace("image\\user\\", "") : "",
        },
        where:{
            userId: parseInt(req.params.userId),
        }
      });
      
    } else {
      result = await prisma.user_tb.update({
        data: {
          userFullname: req.body.userFullname,
          userEmail: req.body.userEmail,
          userPassword: req.body.userPassword,
        },
        where: {
          userId: parseInt(req.params.userId),
        },
      });
    }

    res.status(200).json({
      message: "Update OK",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err.message}` });
  }
};
