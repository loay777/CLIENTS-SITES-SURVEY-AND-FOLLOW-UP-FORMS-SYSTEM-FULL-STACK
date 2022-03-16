import React, { useEffect, useState } from "react";
import "./FollowUpForm.css";
import Axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";


export default function FollowUpForm() {
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });
    
    const handleInputChange = (event) => {
        setAttchment([]);
        console.log(event.target.files.length);
        for (let i = 0 ; i< event.target.files.length ; i++){
            
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
    const [attchment, setAttchment] = useState([]);
    const [outIndustrialCity, setOutIndustrialCity] = useState("")
    const [inIndustrialCity, setInIndustrialCity] = useState("")
    const [formColor, setFormColor] = useState("formColor");


    const onSubmit = data => {

        Axios.post('http://localhost:3001/api/createfollowup', {
            requestNumber: data.requestNumber,
            followUpDate: data.followUpDate,
            requestType: data.requestType,
            category: data.category,
            inIndustrialCity: inIndustrialCity,
            outIndustrialCity: outIndustrialCity,
            institutionName: data.institutionName,
            crNumber: data.crNumber,
            registrationDate: data.registrationDate,
            zatcaCertExp: data.zatcaCertExp,
            currentFacilities: data.currentFacilities,
            missing: data.missing,
            notes: data.notes,

        }).then(res => { // then print response status
            console.warn(res.data.formID);
            setAttchment([]);
            if (res.data.success === 1) {
                console.log(res.data.formID)
                var attachmentKeys = {      
                    formID: res.data.formID,
                    cr_Number: data.crNumber,
                    formType: "followUpForm",
                }
                
                for (const i in userInfo.file){
                    console.log(userInfo.file[i]);
                    const formdata = new FormData();
                    formdata.append('attachment', userInfo.file[i]);
                    formdata.append('requestNumber', JSON.stringify(attachmentKeys));
                    Axios.post("http://localhost:3001/api/imageupload", formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(res => { // then print response status
                        // console.warn(res);
                        if (res.data.success === 1) {
                            setAttchment((attchment) => [...attchment,userInfo.file[i].name+ " Uploaded successfully!!"]);
                            // toast.success('Yaay,Attachments were Uploaded Successfully!');
                        }
                    })
                }
                console.log(attchment);
                // setDataComplete("Form Data Saved Successfully");
               // console.warn(res.data.followupID); we can use the followup db insertID if we want as a Key instead of request number   
               setFormColor("successColor"); 
               
               toast.success('Form Data Saved Successfully!');
            }
            if (res.data.success === 0) {
                // setDataComplete("Data Not Complete");
                setFormColor("errorColor");
                toast.error('Failed to Save!\n'+ res.data.sqlMessage);

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
        
        <div className="followUpPage">
            <div><Toaster/></div>
            <form className={formColor} onSubmit={handleSubmit(onSubmit)}>


                <div className="labelDiv"><label>Request Number - رقم الطلب</label></div>
                <input type="number"{...register("requestNumber", { required: { value: true, message: "This filed is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.requestNumber && <p1>{errors.requestNumber.message}</p1>}


                <div className="labelDiv"><label>Date - التاريخ</label></div>
                <input type="date"{...register("followUpDate", { required:{ value: true, message: "This filed is required" }})} />
                {errors.followUpDate && <p1>{errors.followUpDate.message}</p1>}

            
                <div className="labelDiv"><label>Request type -نوع الطلب </label></div>
                <input type="text" {...register("requestType", { required: { value: true, message: "This filed is required" }})} />
                {errors.requestType && <p1>{errors.requestType.message}</p1>}


                <div className="labelDiv"><label>Category - الفئة</label></div>
                <input type="text" {...register("category", { required:{ value: true, message: "This filed is required" }})} />
                {errors.category && <p1>{errors.category.message}</p1>}


                <div className="radioLabelDiv"><label>In Industrial Area داخل منطقة صناعية </label></div>
                <input type="radio"  {...register("in_out_indus_city", { required:{ value: true, message: "This filed is required" } })} value="In" onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} />
                <div className="radioLabelDiv"><label>Out of Industrial City خارج منطقة صناعية</label></div>
                <input type="radio"  {...register("in_out_indus_city", { required:{ value: true, message: "This filed is required" } })} value="out" onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} />
                {errors.in_out_indus_city && <div className="radioLabelDiv"><p1>{errors.in_out_indus_city.message}</p1></div>}
                {/* <input {...register("Developer", { required: true })} type="radio" value="Yes" />
                <input {...register("Developer", { required: true })} type="radio" value="No" /> */}
               

                <div className="labelDiv"><label>Institution Name - اسم المنشئة</label></div>
                <input type="text" {...register("institutionName", { required:{ value: true, message: "This filed is required" }})} />
                {errors.institutionName && <p1>{errors.institutionName.message}</p1>}


                <div className="labelDiv"><label>CR Number - رقم السجل التجاري</label></div>
                <input type="number" {...register("crNumber", { required: { value: true, message: "This filed is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.crNumber && <p1>{errors.crNumber.message}</p1>}


                <div className="labelDiv"><label>Record Date -  تاريخ السجل</label></div>
                <input type="date" {...register("registrationDate", { required:{ value: true, message: "This filed is required" }})} />
                {errors.registrationDate && <p1>{errors.registrationDate.message}</p1>}


                <div className="labelDiv"><label>Zakat Cert Expiry Date -  صلاحية شهادة الزكاة والدخل</label></div>
                <input type="date" {...register("zatcaCertExp", { required:{ value: true, message: "This filed is required" }})} />
                {errors.zatcaCertExp && <p1>{errors.zatcaCertExp.message}</p1>}


                <div className="labelDiv"><label> Missing - النواقص</label></div>
                <textarea {...register("missing", { required:{ value: true, message: "This filed is required" }})} />
                {errors.missing && <p1>{errors.missing.message}</p1>}


                <div className="labelDiv"><label> Notes - الملاحظات</label></div>
                <textarea {...register("notes", { required:{ value: true, message: "This filed is required" }})} />
                {errors.notes && <p1>{errors.notes.message}</p1>}


                
                <div className="formdesign">
                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                    <div className="form-row">
                    <div className="labelDiv"> <label className="text-white">Select Image :</label></div>
                        <input type="file" className="attchmentButton" name="upload_file" onChange={handleInputChange} multiple  />
                    </div>   
                </div>
               
                {userInfo.filepreview !== null ?attchment.map((val,key)=> <h4 key={key}> {val} </h4>): null}

                
                <input type="submit" value="Save Form" />
                
            </form>
        </div>
    )
}