import React, { useEffect, useState } from "react";
import "./VisitForm.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import * as ReactBootStart from 'react-bootstrap';




export default function VisitForm() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isSucces, setSuccess] = useState(null);
    const [attchment, setAttchment] = useState([]);
    const [formColor, setFormColor] = useState("formColor");
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });
    const handleInputChange = (event) => {
        setAttchment([]);
        console.log(event.target.files.length);
        for (let i = 0; i < event.target.files.length; i++) {

            setAttchment((attchment) => [...attchment, event.target.files[i].name]);
            console.log(event.target.files[i]);
        }
        

        setuserInfo({
            ...userInfo,
            file: event.target.files,
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    }
   
    const onSubmit = data => {
        console.log(data);
        console.log(data.example);

        Axios.post('http://localhost:3001/api/createvisitform', {
            city: data.city,
            region: data.region,
            distance: data.distance,
            surroundedByNorth: data.surroundedByNorth,
            surroundedBySouth: data.surroundedBySouth,
            surroundedByEast: data.surroundedByEast,
            surroundedByWest: data.surroundedByWest,
            institutionSize: data.institutionSize,
            ownershipDeed: data.ownershipDeed,
            buildingDescription: data.buildingDescription,
            facilities: data.facilities,
            electricitySource: data.electricitySource,
            productionDescription: data.productionDescription,
            employeesNumber: data.employeesNumber,
            shiftsNumber: data.shiftsNumber,
            workHours: data.workHours,
            notes: data.notes ?? "",
            recommendations: data.recommendations ?? "",
            dateTime: data.dateTime

        }).then(res => { // then print response status
            // console.warn(res);
            console.warn(res.data.formID);
            if (res.data.success === 1) {
                console.log(res.data.formID)
                var attachmentKeys = {
                    formID: res.data.formID,
                    cr_Number: 12345,
                    formType: "visitForm",
                }

                for (const i in userInfo.file) {
                    console.log(userInfo.file[i]);
                    const formdata = new FormData();
                    formdata.append('attachment', userInfo.file[i]);
                    formdata.append('requestNumber', JSON.stringify(attachmentKeys));
                    Axios.post("http://localhost:3001/api/imageupload", formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(res => { // then print response status
                        // console.warn(res);
                        if (res.data.success === 1) {
                            setAttchment((attchment) => [...attchment, userInfo.file[i].name + " Uploaded successfully!!"]);

                        }
                    })
                }
                console.log(attchment);
                toast.success('Form Data Saved Successfully!');
                setFormColor("successColor");
            }
            if (res.data.success === 0) {
                setFormColor("errorColor");
                toast.error('Failed to Save!\n' + res.data.sqlMessage);
            }
        })

    }

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="visitformpage">
            <div><Toaster /></div>
            {/*  "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form className={formColor} onSubmit={handleSubmit(onSubmit)}>
                <ReactBootStart.Accordion style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', borderRadius: '8px' }} defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
                    <ReactBootStart.Accordion.Item eventKey="0" style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', }}>
                        <ReactBootStart.Accordion.Header style={{ backgroundColor: 'grey', }}>Location - الموقع</ReactBootStart.Accordion.Header>
                        <ReactBootStart.Accordion.Body style={{ backgroundColor: 'rgb(14, 13, 13)', }}>

                            <div className="labelDiv"><label>City - المدينة</label></div>
                            <input type="text" {...register("city", { required: true })} />
                            {errors.city && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>Region - المنطقة</label></div>
                            <select {...register("region", { required: true })}>
                                <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
                                <option value="منطقة الرياض ">منطقة الرياض</option>
                                <option value="منطقة الشرقية">منطقة الشرقية</option>
                                <option value="منطقة المدينة المنورة">منطقة المدينة المنورة</option>
                                <option value="منطقة القصيم"> منطقة القصيم</option>
                                <option value="منطقة عسير"> منطقة عسير</option>
                                <option value="منطقة تبوك"> منطقة تبوك</option>
                                <option value="منطقة حائل"> منطقة حائل</option>
                                <option value="منطقة الحدود الشمالية"> منطقة الحدود الشمالية</option>
                                <option value="منطقة جازان"> منطقة جازان</option>
                                <option value="منطقة نجران"> منطقة نجران</option>
                                <option value="منطقة الباحة"> منطقة الباحة</option>
                                <option value="منطقة الجوف"> منطقة الجوف</option>
                            </select>
                            {errors.region && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>Distance to urban sites - البعد عن اقرب منطقة معروفة</label></div>
                            <input type="Number" {...register("distance", { required: true, min: { value: 0, message: "Number can't be negative" } })} />
                            {errors.distance && <p1>{errors.distance.message}</p1>}

                        </ReactBootStart.Accordion.Body>
                    </ReactBootStart.Accordion.Item>
                   
                   
                    <ReactBootStart.Accordion.Item eventKey="1" style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', }}>
                        <ReactBootStart.Accordion.Header style={{ backgroundColor: 'grey', }}>Surrounding Area - المنطقة المحيطة</ReactBootStart.Accordion.Header>
                        <ReactBootStart.Accordion.Body style={{ backgroundColor: 'rgb(14, 13, 13)', }}>

                            <div className="labelDiv"><label>North of Site - شمال الموقع</label></div>
                            <input type="text" {...register("surroundedByNorth", { required: true })} />
                            {errors.surroundedByNorth && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>South of Site - جنوب الموقع</label></div>
                            <input type="text" {...register("surroundedBySouth", { required: true })} />
                            {errors.surroundedBySouth && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>East of Site - شرق الموقع</label></div>
                            <input type="text" {...register("surroundedByEast", { required: true })} />
                            {errors.surroundedByEast && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>West of Site - غرب الموقع</label></div>
                            <input type="text" {...register("surroundedByWest", { required: true })} />
                            {errors.surroundedByWest && <p1>This field is required</p1>}

                        </ReactBootStart.Accordion.Body>
                    </ReactBootStart.Accordion.Item>


                    <ReactBootStart.Accordion.Item eventKey="2" style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', }}>
                        <ReactBootStart.Accordion.Header style={{ backgroundColor: 'grey', }}>Facility Description - وصف المنشأة</ReactBootStart.Accordion.Header>
                        <ReactBootStart.Accordion.Body style={{ backgroundColor: 'rgb(14, 13, 13)', }}>

                            <div className="labelDiv"><label>Institution Size - مساحة المنشأة</label></div>
                            <input type="number" {...register("institutionSize", { required: true, min: { value: 0, message: "Number can't be negative" } })} />
                            {errors.institutionSize && <p1>{errors.institutionSize.message}</p1>}

                            <div className="labelDiv"><label>Ownership Deed - صك الملكية</label></div>
                            <select {...register("ownershipDeed", { required: true })} >
                                <option value="ملك"> {"ملك"}</option>
                                <option value="إجار">{"إجار"}</option>
                                <option value="اخرى">{"اخرى"}</option>
                            </select>
                            {errors.ownershipDeed && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>Building Description - وصف المبنى</label></div>
                            <input type="text" {...register("buildingDescription", { required: true })} />
                            {errors.buildingDescription && <p1>This field is required</p1>}


                            <div className="labelDiv"><label>ِAdditional Facilities - مرافق المشروع</label></div>
                            <input type="text" {...register("facilities", { required: true })} />
                            {errors.facilities && <p1>This field is required</p1>}



                            <div className="labelDiv"><label>Electricity Source - مصدر الكهرباء</label></div>
                            <input type="text" {...register("electricitySource", { required: true })} />
                            {errors.electricitySource && <p1>This field is required</p1>}

                        </ReactBootStart.Accordion.Body>
                    </ReactBootStart.Accordion.Item>
                   
                   
                    <ReactBootStart.Accordion.Item eventKey="3" style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', }}>
                        <ReactBootStart.Accordion.Header style={{ backgroundColor: 'grey', }}>Production Process  - عملية الإنتاج </ReactBootStart.Accordion.Header>
                        <ReactBootStart.Accordion.Body style={{ backgroundColor: 'rgb(14, 13, 13)', }}>

                            <div className="labelDiv"><label>Production Description - وصف الإنتاج</label></div>
                            <input type="text" {...register("productionDescription", { required: true })} />
                            {errors.productionDescription && <p1>This field is required</p1>}

                        </ReactBootStart.Accordion.Body>
                    </ReactBootStart.Accordion.Item>
                    
                    
                    <ReactBootStart.Accordion.Item eventKey="3" style={{ backgroundColor: 'rgb(14, 13, 13)', border: '3px solid rgb(145, 145, 145)', }}>
                        <ReactBootStart.Accordion.Header style={{ backgroundColor: 'grey', }}>HR - الموارد البشرية </ReactBootStart.Accordion.Header>
                        <ReactBootStart.Accordion.Body style={{ backgroundColor: 'rgb(14, 13, 13)', }}>

                            <div className="labelDiv"><label>Employees Number - عدد الموظفين</label></div>
                            <input type="number" {...register("employeesNumber", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                            {errors.employeesNumber && <p1>{errors.employeesNumber.message}</p1>}


                            <div className="labelDiv"><label>Shifts Number - عدد الورديات</label></div>
                            <input type="number" {...register("shiftsNumber", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                            {errors.shiftsNumber && <p1>{errors.shiftsNumber.message}</p1>}


                            <div className="labelDiv"><label>Work Hours - ساعات العمل</label></div>
                            <input type="number" {...register("workHours", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" }, })} />
                            {errors.workHours && <p1>{errors.workHours.message} </p1>}


                        </ReactBootStart.Accordion.Body>
                    </ReactBootStart.Accordion.Item>
                </ReactBootStart.Accordion>


                <div className="labelDiv"><label>Notes - الملاحظات</label></div>
                <textarea {...register("notes", { required: true, })} />
                {errors.notes && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Recommendations - التوصيات</label></div>
                <textarea {...register("recommendations", { required: true })} />
                {errors.recommendations && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Date and Time - التاريخ و الوقت</label></div>
                <input type="datetime-local" {...register("dateTime", { required: true })} />
                {errors.dateTime && <p1>This field is required</p1>}

                <div className="formdesign">
                    {isSucces !== null ? <h4> {isSucces} </h4> : null}
                    <div className="form-row">
                        <div className="labelDiv"> <label className="text-white">Select Attachments :</label></div>
                        <input type="file" className="attchmentButton" name="upload_file" onChange={handleInputChange} multiple />
                    </div>
                </div>

                {userInfo.filepreview !== null ? attchment.map((val, key) => <h4 key={key}> {val} </h4>) : null}
                <div className="submitButtonDiv"></div>
                <input type="submit" value="Save Form" />
            </form>
        </div>
    );
}