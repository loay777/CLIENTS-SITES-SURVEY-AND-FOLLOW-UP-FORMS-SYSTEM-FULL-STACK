import React, { useEffect, useState } from "react";
import Axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as ReactBootStart from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { FcDocument, FcDownload, FcEmptyTrash } from "react-icons/fc";
import jsPDf from 'jspdf';





export default function DisplayFollowUPFrom() {

  
    const location = useLocation();
    const [previousData, setPreviousData] = useState(location.state);
    let hostname = "http://46.251.130.34:8080";
    let { followupfromId } = useParams()
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });
    const [attachments, setAttachments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            requestNumber: previousData.request_number,
            followUpDate: previousData.date,
            requestType: previousData.request_type,
            category: previousData.category,
            in_out_indus_city: previousData.in_industrial_city,
            institutionName: previousData.institution_name,
            crNumber: previousData.cr_number,
            registrationDate: previousData.registration_date,
            zatcaCertExp: previousData.zatca_cert_exp,
            missing: previousData.missing,
            notes: previousData.notes
        }

    });

    useEffect(async () => {
        console.log(previousData.in_industrial_city)
        setAttchment([]);
        const attached = await Axios.get(`${hostname}/api/getattachment/${previousData.cr_number}`).then((res) => {
            res.data.forEach((item) => { console.log(item) });
            // setAttachments("/attachments/"+res.data[0].url);
            res.data.forEach((item) => { setAttachments((attachments) => [...attachments, item.url]) });
            // console.log(res.data[0].url);
            //get the list of attachment URLs here and fetch from file 
        })
        setIsLoading(false);
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


    const [inIndustrialCity, setInIndustrialCity] = useState(previousData.in_industrial_city);
    const [outIndustrialCity, setOutIndustrialCity] = useState(previousData.out_industrial_city);
    const [formColor, setFormColor] = useState("formColor");
    const [isSucces, setSuccess] = useState(null);
    const [attchment, setAttchment] = useState([]);
    const [editMode, setEditMode] = useState(false);
    
    const savePDF = () => {
        const docPDF = new jsPDf()
        docPDF.setTableHeaderRow(["Form ID", "Request Number", "Date"]);
        docPDF.html();
        // docPDF.table(20,20,{[Form_ID: ]})
        docPDF.text(`Follow UP From\nForm ID: ${followupfromId} \nRequest Number: ${watch('requestNumber')} \nDate: ${watch('followUpDate')} `, 20, 20,);
        docPDF.save("test.pdf");
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
        console.log(attachments);
    }

    const deleteImage = (imageName) => {
        axios.get(`${hostname}/api/deleteimage/${imageName}`)
    }

    const onSubmit = data => {
        // setInIndustrialCity(previousData.in_industrial_city);
        // console.log("IN: " + inIndustrialCity)
        // setOutIndustrialCity(previousData.out_industrial_city);
        // console.log("out: " + outIndustrialCity)
        console.log("FORM ID:" + followupfromId);
        Axios.post(`${hostname}/api/updatefollowup/${followupfromId}`, {
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
            missing: data.missing,
            notes: data.notes,

        }).then(res => { // then print response status
            console.log(res.data.formID);
            setAttchment([]);
            if (res.data.success === 1) {
                console.log(res.data.formID)
                var attachmentKey = {
                    formID: followupfromId,
                    cr_Number: data.crNumber,
                    formType: "followUpForm",
                }

                for (const i in userInfo.file) {
                    console.log(userInfo.file[i]);
                    const formdata = new FormData();
                    formdata.append('attachment', userInfo.file[i]);
                    formdata.append('requestNumber', JSON.stringify(attachmentKey));
                    Axios.post(`${hostname}/api/imageupload`, formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(res => { // then print response status
                        // console.warn(res);
                        if (res.data.success === 1) {
                            setAttchment((attchment) => [...attchment, userInfo.file[i].name + " Uploaded successfully!!"]);
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
                toast.error('Failed to Save!\n' + res.data.sqlMessage);

            }
        })
    }

    return (

        <> {previousData ? <div className="followUpPage">
            <div><Toaster /></div>
            <form className={formColor} onSubmit={handleSubmit(onSubmit)} >
                <div className="labelDiv"><label>EDIT</label></div>
                <BootstrapSwitchButton
                    checked={false}
                    onlabel='ON'
                    offlabel='OFF'
                    onstyle="success"
                    offstyle="dark"
                    style="border"
                    size="lg"
                    onChange={toggleEditMode}
                />

                <div className="labelDiv"><label>Request Number - رقم الطلب</label></div>
                <input type="number" disabled={editMode ? false : true} {...register("requestNumber", { required: { value: true, message: "This filed is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.requestNumber && <p1>{errors.requestNumber.message}</p1>}


                <div className="labelDiv"><label>Date - التاريخ</label></div>
                <input type="date" disabled={editMode ? false : true} {...register("followUpDate", { required: { value: true, message: "This filed is required" } })} />
                {errors.followUpDate && <p1>{errors.followUpDate.message}</p1>}


                <div className="labelDiv"><label>Request type -نوع الطلب </label></div>
                <input type="text" disabled={editMode ? false : true} {...register("requestType", { required: { value: true, message: "This filed is required" } })} />
                {errors.requestType && <p1>{errors.requestType.message}</p1>}



                <div className="labelDiv"><label>Category - الفئة</label></div>
                <input type="text" disabled={editMode ? false : true} {...register("category", { required: { value: true, message: "This filed is required" } })} />
                {errors.category && <p1>{errors.category.message}</p1>}


                <label>In Industrial Area داخل منطقة صناعية </label>
                {inIndustrialCity ? <input type="radio" disabled={editMode ? false : true} {...register("in_out_indus_city", { value: true, required: { value: true, message: "This filed is required" } })} value="In" onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} checked />
                    : <input type="radio" disabled={editMode ? false : true} {...register("in_out_indus_city", { value: false, required: { value: true, message: "This filed is required" } })} value="In" onChange={(e) => { setInIndustrialCity(true); setOutIndustrialCity(false); }} />}

                <label>Out of Industrial Area خارج منطقة صناعية </label>
                {outIndustrialCity ? <input type="radio" disabled={editMode ? false : true} {...register("in_out_indus_city", { value: true, required: { value: true, message: "This filed is required" } })} value="out" onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} checked />
                    : <input type="radio" disabled={editMode ? false : true} {...register("in_out_indus_city", { value: false, required: { value: true, message: "This filed is required" } })} value="out" onChange={(e) => { setOutIndustrialCity(true); setInIndustrialCity(false); }} />}
                {errors.in_out_indus_city && <div className="radioLabelDiv"><p1>{errors.in_out_indus_city.message}</p1></div>}


                <div className="labelDiv"><label>Institution Name - اسم المنشئة</label></div>
                <input type="text" disabled={editMode ? false : true}   {...register("institutionName", { required: { value: true, message: "This filed is required" } })} />
                {errors.institutionName && <p1>{errors.institutionName.message}</p1>}


                <div className="labelDiv"><label>CR Number - رقم السجل التجاري</label></div>
                <input type="number" disabled={editMode ? false : true}  {...register("crNumber", { required: { value: true, message: "This filed is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.crNumber && <p1>{errors.crNumber.message}</p1>}


                <div className="labelDiv"><label>Record Date -  تاريخ السجل</label></div>
                <input type="date" disabled={editMode ? false : true} {...register("registrationDate", { required: { value: true, message: "This filed is required" } })} />
                {errors.registrationDate && <p1>{errors.registrationDate.message}</p1>}


                <div className="labelDiv"><label>Zakat Cert Expiry Date -  صلاحية شهادة الزكاة والدخل</label></div>
                <input type="date" disabled={editMode ? false : true} {...register("zatcaCertExp", { required: { value: true, message: "This filed is required" } })} />
                {errors.zatcaCertExp && <p1>{errors.zatcaCertExp.message}</p1>}


                <div className="labelDiv"><label> Missing - النواقص</label></div>
                <textarea disabled={editMode ? false : true}{...register("missing", { required: { value: true, message: "This filed is required" } })} />
                {errors.missing && <p1>{errors.missing.message}</p1>}


                <div className="labelDiv"><label> Notes - الملاحظات</label></div>
                <textarea disabled={editMode ? false : true} {...register("notes", { required: { value: true, message: "This filed is required" } })} />
                {errors.notes && <p1>{errors.notes.message}</p1>}



                <div className="formdesign">
                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                    <div className="form-row">
                        <div className="labelDiv"> <label className="text-white">Select Image :</label></div>
                        <input type="file"  disabled={editMode ? false : true} className="attchmentButton" name="upload_file" onChange={handleInputChange} multiple />
                    </div>
                </div>

                {userInfo.filepreview !== null ? attchment.map((val, key) => <h4 key={key}> {val} </h4>) : null}
                {attachments.map((val, key) => {
                    if (val.split('.').pop() === "pdf") {
                        return (<div key={key}>
                            {/* <img  src={"/attachments/" +val} onClick={ ()=>{ 
                            console.log(val);
                            // deleteImage(val) 
                            } } /><br /> */}

                            <h4> {val} <FcDocument size={"40px"}></FcDocument> </h4>
                            <Link to={"/attachments/" + val} target="_blank" download><FcDownload size={"31px"}></FcDownload></Link>
                            {editMode && <FcEmptyTrash size={"34px"} onClick={() => {
                                deleteImage(val)
                            }}> </FcEmptyTrash>} <br /> <br /><br />
                        </div>
                        )
                    }
                    // console.log(val.id);
                    return (
                        <div key={key}>
                            <img src={"/attachments/" + val}
                                className='img-fluid hover-shadow'
                                alt=''
                                style={{ maxWidth: '24rem' }}
                                onClick={() => {
                                    console.log(val);
                                    // deleteImage(val) 
                                }} /><br />

                            {/* <h4> {val.split('.').pop()}</h4> */}
                            <h4> {val} </h4>
                            <Link to={"/attachments/" + val} target="_blank" download><FcDownload size={"31px"} ></FcDownload></Link>
                            {editMode && <FcEmptyTrash size={"34px"}   onClick={() => {
                                deleteImage(val)
                            }}> </FcEmptyTrash>} <br /> <br /><br />
                        </div>
                    )
                })
                }
                {/* <button disabled={editMode ? false : true} onClick={onSubmit}>Save</button> */}
                <input disabled={editMode ? false : true} type="submit" value="Save Form" />
                {/* <button onClick={toggleEditMode}>Edit</button> */}
                {/* <input type="button">Edit</input> */}
                <input type="button" onClick={savePDF} name="GET PDF"></input>
            </form>
        </div>
            : <div className="centerLoading"><ReactBootStart.Spinner animation="border" variant="success" /> </div>} </>

    )
}