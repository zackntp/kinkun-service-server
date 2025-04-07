const multer = require("multer");//for upload image
const path = require('path');//handle file path

//funrion upload image --------------------------------------------------------------------------------------------
const storage =multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'images/kinkun');
    },
    filename:(req,file,cb) =>{
        cb(null,'kinkun_' + Math.floor(Math.random()* Date.now)) + path.extname(file.originalname);

    }
    

})
exports.upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter:(req,file,cb) =>{
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype); //ตรวจสอบ file type
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //ตรวจสอบนามสกุล

        if(mimetype && extname){
            return cb(null,true);
        }else{
            cb('Error: File upload only supports the following filetypes - ' + filetypes);
        }
    }
})

//Add eat data
//---------------------------------------------------------------------------------------------------
exports.createKinkun = async (req,res) => {
    try {
        
    } catch(err) {
        res.status(500).json({message: `ERROR : ${err}`})
    }
}



//update eat data
//---------------------------------------------------------------------------------------------------
exports.editKinkun = async (req,res) => {
    try {
        
    } catch(err) {
        res.status(500).json({message: `ERROR : ${err}`})
    }
}

//delete eat data
//---------------------------------------------------------------------------------------------------

exports.deleteKinkun = async(req,res)=>{
    try {
        
    } catch (err) {
        res.status(500).json({message: `ERROR : ${err}`})
    }
}

// kinkun list
exports.showAllKinkun = async (req,res) => {
    try {
       
    } catch (err) {
        res.status(500).json({message: `ERROR : ${err}`})
    }
}


//kinkun get by
//---------------------------------------------------------------------------------------------------
exports.showOnlyKinkun = async (req,res) => {
    try {
        
    } catch (err) {
        res.status(500).json({message: `ERROR : ${err}`})
    }
}