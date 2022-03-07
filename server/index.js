const express = require("express")
const app = express()
const PORT = 3001
const cors = require("cors")
const db = require("./config/db")
const multer = require("multer")
const path = require('path');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(express.json());
app.get("/", cors(), async (req, res) => { // JUST A COMMAND TO CHECK IF THE BACK-END IS RUNNING
  res.send("HELLO FROM THE SERVER SIIIIIIIDE!!")
  // res.json( {
  //   message:"Hello from server!"
  // } );
});

app.post('/api/create', (req, res) => { // POST TO SEND RECORD TO DB

  const title = req.body.title;
  const clientName = req.body.clientName;
  const location = req.body.location;
  const timeDate = req.body.timeDate;
  const notes = req.body.notes;

  // for debugging //
  // console.log("Title: " + title +
  //        "\nClient Name: " + clientName +
  //         "\nLocation: " + location +
  //          "\nDate&Time: " + timeDate +
  //           "\nNotes: " + notes)

  db.query("INSERT INTO records (title, notes, client_name, visit_date, location) VALUES (?,?,?,?,?)", [title, notes, clientName, timeDate, location], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});



app.post('/api/createfollowup', async (req, res)  => { // POST TO SEND FOLLOW UP FROM TO DB

  const requestNumber = req.body.requestNumber;
  const followUpDate = req.body.followUpDate;
  const requestType = req.body.requestType;
  const category = req.body.category;
  const inIndustrialCity = req.body.inIndustrialCity
  const outIndustrialCity = req.body.outIndustrialCity;
  const institutionName = req.body.institutionName;
  const crNumber = req.body.crNumber;
  const registrationDate = req.body.registrationDate;
  const zatcaCertExp = req.body.zatcaCertExp;
  const currentFacilities = req.body.currentFacilities;
  const missing = req.body.missing;
  const notes = req.body.notes;
  const fd = req.body.formData;
 
  
  await db.query("INSERT INTO follow_up_form ( request_number ,date, request_type, category, in_industrial_city, out_industrial_city,  institution_name, cr_number, registration_date, zatca_cert_exp, current_facilities, missing, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [requestNumber, followUpDate, requestType, category, inIndustrialCity, outIndustrialCity, institutionName, crNumber, registrationDate, zatcaCertExp, "onon", missing, notes], (err, result) => {
      // for debugging [1000001, '2002-09-11', "Req Type TEST", "Category TEST", true, false, "NAME", 123456, '2021-12-12', '2021-12-12', "Currnt Fsiah", "MISSING TEST", "TEST  NOTE"]
        if (err) {
          console.log(err);
          return res.json({ success: 0});
        }else{
          console.log(result.insertId);
          return res.json({ success: 1 , formID: result.insertId});
          // console.log(result.insertId);
        } 
      }    
   );

});

app.post('/api/savevisitform', async (req, res)  => { // POST TO SEND FOLLOW UP FROM TO DB

  const site =  req.body.site;
  const city =  req.body.city;
  const region =  req.body.region;
  const distance =   req.body.distance;
  const surroundedByNorth =  req.body.surroundedByNorth;
  const surroundedBySouth =  req.body.surroundedBySouth;
  const surroundedByEast =  req.body.surroundedByEast;
  const surroundedByWest =  req.body.surroundedByWest;
  const facilityDescription =  req.body.facilityDescription;
  const institutionSize =  req.body.institutionSize;
  const ownershipDeed =  req.body.ownershipDeed;
  const buildingDescription =  req.body.buildingDescription;
  const facilities =  req.body.facilities;
  const electricitySource =  req.body.electricitySource;
  const productionDescription =  req.body.productionDescription;
  const employeesNumber =  req.body.employeesNumber;
  const shiftsNumber =  req.body.shiftsNumber;
  const workHours =  req.body.workHours;
  const notes =  req.body.notes;
  const recommendations =   req.body.recommendations ;
  const dateTime =  req.body.dateTime;
 
  // for debugging //
  // console.log("Date: " + followUpDate +
  //        "\nregistrationDate: " + registrationDate +
  //         "\nzatcaCertExp: " + zatcaCertExp )

 await db.query("INSERT INTO visit_form ( `site`, `city`, `region`, `distance`, `surrounded_by_north`, `surrounded_by_south`, `surrounded_by_east`, `surrounded_by_west`, `facilty_description`, `institution_size`, `ownership_deed`, `building_description`, `facilities`, `electricity_source`, `production_description`, `employees_number`, `shifts_number`, `work_hours`, `notes`, `recommendations`, `date_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
     [site,city, region, distance, 
      surroundedByNorth, surroundedBySouth,
      surroundedByEast, surroundedByWest, 
      facilityDescription,
      institutionSize, ownershipDeed,
      buildingDescription, facilities,
      electricitySource, productionDescription, 
      employeesNumber, shiftsNumber,
      workHours, notes, recommendations,dateTime], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: 0 , sqlMessage: err.sqlMessage});
      }else{
        console.log(result.insertId);
        return res.json({ success: 1 , followupID: result.insertId});
      }
      
    });

});

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images/', 'uploads'),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + '-' + file.originalname)
  }
})

app.post('/api/imageupload', async (req, res) => {
  
  try {
    // 'attachment' is the name of our file input field in the HTML form
    let date = new Date().toISOString().slice(0, 10);
    let upload = multer({ storage: storage }).single('attachment');
  //  let uploads = multer({storage: storage}).array(['attachment','attachment','attachment']) 

    upload(req, res, function (err) {
     let data = JSON.parse(req.body.requestNumber);
     let formID = data.formID;
     let crNumber = data.cr_Number;
     console.log(data.reqNumber)
      if (!req.file) {
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      }
      // console.log(req.body)
      const classifiedsadd = {
        image: req.file.filename
      };
      
      const sql = "INSERT INTO attachment (url, date_stored, form_type,form_id,cr_number) VALUES (?,?,?,?,?)"; ///SQL Query to add the image Info to DB
      db.query(sql, [classifiedsadd.image, date, "follow_up_form", formID,crNumber], (err, results) => {
        if (err) throw err;
        res.json({ success: 1 })
      });

    });

  } catch (err) { console.log(err) }
  // console.log("I'm done Uploading the image")

})




app.get("/api/getfollowupforms", (req, res) => { // GET THE RECORDS FROM DB
  db.query("SELECT * FROM follow_up_form ", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result)
  });

});

app.get("/api/getfollowupformsbyid/:id", (req, res) => { // GET THE RECORDS FROM DB
  var id = req.params.id;
  db.query("SELECT * FROM follow_up_form where id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result)
  });

});



app.get("/api/getvisitforms", (req, res) => { 
  db.query("SELECT * FROM visit_form", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result)
  });

});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})

