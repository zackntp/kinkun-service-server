const multer = require("multer"); //for upload image
const path = require("path"); //handle file path

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//funrion upload image --------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/kinkun");
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
}).single("kinkunImage");

//Add eat data
//---------------------------------------------------------------------------------------------------
exports.createKinkun = async (req, res) => {
  try {
    const result = await prisma.kinkun_tb.create({
      data: {
       kinkunTitle: req.body.kinkunTitle,
       kinkunState: req.body.kinkunState,
       kinkunDate: req.body.kinkunDate,
       kinkunCost: parseFloat(req.body.kinkunCost),
       kinkunImage: req.file ? req.file.path.replace("images\\kinkun\\",""): "",
       userId: parseInt(req.body.userId),
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

//update eat data
//---------------------------------------------------------------------------------------------------
exports.editKinkun = async (req, res) => {
  try {
    let result  = {};

    if (req.file){
        result = await prisma.kinkun_tb.update({
            data: {
             kinkunTitle: req.body.kinkunTitle,
             kinkunState: req.body.kinkunState,
             kinkunDate: req.body.kinkunDate,
             kinkunCost: parseFloat(req.body.kinkunCost),
             kinkunImage: req.file ? req.file.path.replace("images\\kinkun\\",""): "",
             userId: parseInt(req.body.userId),
            },
            where:{
                kinkunId:parseInt(req.params.kinkunId)
            }
          });
          res.status(201).json({
            message: "Insert OK",
            data: result,
          });

    }else{
        result = await prisma.kinkun_tb.update({
            data: {
             kinkunTitle: req.body.kinkunTitle,
             kinkunState: req.body.kinkunState,
             kinkunDate: req.body.kinkunDate,
             kinkunCost: parseFloat(req.body.kinkunCost),
             userId: parseInt(req.body.userId),
            },
            where:{
                kinkunId:parseInt(req.params.kinkunId)
            }
          });
          res.status(201).json({
            message: "Insert OK",
            data: result,
          });
    }
    
     
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err}` });
  }
};

//delete eat data
//---------------------------------------------------------------------------------------------------

exports.deleteKinkun = async (req, res) => {
  try {
    const result = await prisma.kinkun_tb.delete({
        where:{
            kinkunId:parseInt(req.params.kinkunId)
        }
    })
    if(result){
        res.status(200).json({
            message: "deleted",
           
        })
    }else{
        res.status(404).json({
            message: "not found",

        })
    }
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err}` });
  }
};

// kinkun list
exports.showAllKinkun = async (req, res) => {
  try {
    const result = await prisma.kinkun_tb.findMany({
      where: {
        userId: parseInt(req.params.userId),
      },
    });
    if (!result) {
      return res.status(404).json({
        message: "not found",
      });
    }
    res.status(200).json({
      message: "OK",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err.message}` });
  }
};

//kinkun get by
//---------------------------------------------------------------------------------------------------
exports.showOnlyKinkun = async (req, res) => {
  try {
    const result = await prisma.kinkun_tb.findFirst({
      where: {
        kinkunId: parseInt(req.params.kinkunId),
      },
    });
    if (!result) {
      return res.status(404).json({
        message: "not found",
      });
    }
    res.status(200).json({
      message: "OK",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: `ERROR : ${err}` });
  }
};
