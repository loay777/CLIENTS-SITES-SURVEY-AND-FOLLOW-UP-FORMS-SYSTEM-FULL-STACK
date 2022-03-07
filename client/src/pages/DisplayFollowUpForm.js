import React, { useEffect, useState } from "react";
import "./CreateRecord.css";
import Axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";



export default function DisplayFollowUPFrom() {
    let { followupfromId } = useParams()
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });
    const [formData, setFormData] = useState({});

    useEffect( async () => {
        const data = await Axios.get(`http://localhost:3001/api/getfollowupformsbyid/${followupfromId}`).then((data) => {
            console.log(data.data);
            setFormData(data.data[0]);
        })
        // setRequestnumber(formData.request_number);
        // var form_date = formData.date.toString().substring(0, 10);
        // setFormData(form_date);
        
        
        //     console.log(form_date);
        // se(formData.request_numbe);

         // {
        //     "id": 4,
        //     "request_number": 1000001,
        //     "date": "2022-01-20T21:00:00.000Z",
        //     "request_type": "Req Type TEST",
        //     "category": "Category TEST",
        //     "value={formData.in_industrial_city}": 1,
        //     "value={formData.out_industrial_city}": 0,
        //     "value={formData.institution_name}": "NAME",
        //     "value={formData.cr_number}": 123456,
        //     "value={formData.registration_date}": "2021-12-11T21:00:00.000Z",
        //     "value={formData.zatca_cert_exp}": "2021-12-12",
        //     "value={formData.current_facilities}": "Currnt Fsiah",
        //     "value={formData.missing}": "MISSING TEST",
        //     "value={formData.notes}": "TEST  NOTE"
        //   }

    }, [])
    const handleInputChange = (event) => {
        setAttchment([]);
        console.log(event.target.files.length);
        for (let i = 0; i < event.target.files.length; i++) {
            
            setAttchment((attchment) => [...attchment, event.target.files[i].name]);
            console.log(event.target.files[i]);

        }
        console.log(event.target.files[5]);
        // console.log("First: "+attchment);

        setuserInfo({
            ...userInfo,
            file: event.target.files,
            filepreview: URL.createObjectURL(event.target.files[0]),

        });
        
    }

    const [isSucces, setSuccess] = useState(null);
    const [dataComplete, setDataComplete] = useState(null);

    const submit = () => {
        const formdata = new FormData();
        formdata.append('attachment', userInfo.file);

        Axios.post("http://localhost:3001/api/imageupload", formdata, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => { // then print response status
                console.warn(res);
                if (res.data.success === 1) {
                    setSuccess("Image upload successfully");
                }
            })
    }

    const [requestNumber, setRequestnumber] = useState("")
    const [followUpDate, setFollowUpDate] = useState("")
    const [requestType, setRequestType] = useState("")
    const [category, setCategory] = useState("")
    const [inIndustrialCity, setInIndustrialCity] = useState("")
    const [outIndustrialCity, setOutIndustrialCity] = useState("")
    const [institutionName, setInstitutionName] = useState("")
    const [crNumber, setCrNumber] = useState("")
    const [registrationDate, setRegistrationDate] = useState("")
    const [zatcaCertExp, setZatcaCertExp] = useState("")
    const [currentFacilities, setCurrentFacilities] = useState("")
    const [missing, setMissing] = useState("")
    const [notes, setNotes] = useState("")
    const [attchment, setAttchment] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () =>{
        setEditMode(!editMode);
    }

    // useEffect(() => {
    //     console.log("in indus city: " + inIndustrialCity +
    //         "\nout indus city: " + outIndustrialCity)
    // }, [inIndustrialCity, outIndustrialCity])

    const submitRecord = () => {

        Axios.post('http://localhost:3001/api/createfollowup', {
            requestNumber: requestNumber,
            followUpDate: followUpDate,
            requestType: requestType,
            category: category,
            inIndustrialCity: inIndustrialCity,
            outIndustrialCity: outIndustrialCity,
            institutionName: institutionName,
            crNumber: crNumber,
            registrationDate: registrationDate,
            zatcaCertExp: zatcaCertExp,
            currentFacilities: currentFacilities,
            missing: missing,
            notes: notes,

        }).then(res => { // then print response status
            console.warn(res.data.formID);
            setAttchment([]);
            if (res.data.success === 1) {
                console.log(res.data.formID)
                var attachmentKey = {
                    formID: res.data.formID,
                    cr_Number: crNumber,
                }

                for (const i in userInfo.file) {
                    console.log(userInfo.file[i]);
                    const formdata = new FormData();
                    formdata.append('attachment', userInfo.file[i]);
                    formdata.append('requestNumber', JSON.stringify(attachmentKey));
                    Axios.post("http://localhost:3001/api/imageupload", formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(res => { // then print response status
                        // console.warn(res);
                        if (res.data.success === 1) {
                            setAttchment((attchment) => [...attchment, userInfo.file[i].name + " Uploaded successfully!!"]);
                            toast.success('Yaay,Attachments were Uploaded Successfully!');
                        }

                    })
                }
                console.log(attchment);
                // setDataComplete("Form Data Saved Successfully");
                // console.warn(res.data.followupID); we can use the followup db insertID if we want as a Key instead of request number   
                toast.success('Form Fields Saved Successfully!');
            }
            if (res.data.success === 0) {
                setDataComplete("Data Not Complete");
                toast.error('Failed to Save!');
            }
        })

        // console.log("Request Number = " + requestNumber)
        // var attachmentKey = {
        //     reqNumber: requestNumber,
        // }
        // const formdata = new FormData();
        // formdata.append('attachment', userInfo.file);
        // formdata.append('requestNumber', JSON.stringify(attachmentKey));
        // Axios.post("http://localhost:3001/api/imageupload", formdata, {
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        //     .then(res => { // then print response status
        //         // console.warn(res);
        //         if (res.data.success === 1) {
        //             setSuccess("Image upload successfully");
        //         }

        //     })
    };

    return (

       

        <div className="recordPage">
            <div><Toaster /></div>
            <div className="recordForm">

                <label>Request Number - رقم الطلب</label>
                <input type="number"  disabled= {editMode?false:true} defaultValue={formData.request_number} onChange={(e) => { setRequestnumber(e.target.value);}} />

                <label>Date - التاريخ</label>
                <input type="date"   disabled= {editMode?false:true} defaultValue={formData.date} onChange={(e) => { setFollowUpDate(e.target.value); }} />

                <label>Request type -نوع الطلب </label>
                <input type="text"   disabled= {editMode?false:true} defaultValue={formData.request_type} onChange={(e) => { setRequestType(e.target.value); }} />

                <label>Category - الفئة</label>
                <input type="text" disabled= {editMode?false:true} defaultValue={formData.category} onChange={(e) => { setCategory(e.target.value); }} />

                <label>In Industrial Area داخل منطقة صناعية </label>
                {formData.in_industrial_city?<input type="radio" id="in_industrial_city" name="fav_language"  disabled= {editMode?false:true}  onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} checked />
                :<input type="radio" id="in_industrial_city" name="fav_language"  disabled= {editMode?false:true}  onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} />}
               
               <label>Out of Industrial Area خارج منطقة صناعية </label>
                {formData.out_industrial_city?<input type="radio" id="out_industrial_city" name="fav_language" disabled= {editMode?false:true} defaultValue={formData.out_industrial_city} onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} checked />
                :<input type="radio" id="out_industrial_city" name="fav_language" disabled= {editMode?false:true} defaultValue={formData.out_industrial_city} onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} />}
                
                <label>Institution Name - اسم المنشئة</label>
                <input type="text" disabled= {editMode?false:true} defaultValue={formData.institution_name} onChange={(e) => { setInstitutionName(e.target.value); }}></input>

                <label>CR Number - رقم السجل التجاري</label>
                <input type="text" disabled= {editMode?false:true} defaultValue={formData.cr_number}  pattern="[0-9]" required onChange={(e) => { setCrNumber(e.target.value); }}></input>

                <label>Record Date -  تاريخ السجل</label>
                <input type="date" disabled= {editMode?false:true} defaultValue={formData.registration_date} onChange={(e) => { setRegistrationDate(e.target.value); }} />

                <label>Zakat Cert Expiry Date -  صلاحية شهادة الزكاة والدخل</label>
                <input type="date" disabled= {editMode?false:true} defaultValue={formData.zatca_cert_exp} onChange={(e) => { setZatcaCertExp(e.target.value); }} />

                <label> Missing - النواقص</label>
                <textarea disabled= {editMode?false:true} defaultValue={formData.missing} onChange={(e) => { setMissing(e.target.value); }} />

                <label> Notes - الملاحظات</label>
                <textarea  disabled= {editMode?false:true} defaultValue={formData.notes} onChange={(e) => { setNotes(e.target.value); }} />
                {dataComplete !== null ? <h4> {dataComplete} </h4> : null}
                <div className="formdesign">
                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                    <div className="form-row">
                        <label className="text-white">Select Image :</label>
                        <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} multiple />
                    </div>

                </div>

                {userInfo.filepreview !== null ? attchment.map((val, key) => <h4 key={key}> {val} </h4>
                    // <img className="previewimg" src={val} alt="UploadImage" />
                ) : null}

                {/* <label> Add Attchment</label>
                <input type='file' /> */}

                <button disabled= {editMode?false:true} onClick={submitRecord}>Save</button>
                <button onClick={toggleEditMode}>Edit</button>

            </div>
        </div>
    )
}