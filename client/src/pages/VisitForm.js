import React, { useEffect, useState } from "react";
import "./VisitForm.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';



export default function VisitForm() {
   
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isSucces, setSuccess] = useState(null);
    const [formColor, setFormColor] = useState("formColor");
    // const [userInfo, setuserInfo] = useState({
    //     file: [],
    //     filepreview: null,
    // });

    // const handleInputChange = (event) => {
    //     setuserInfo({
    //         ...userInfo,
    //         file: event.target.files[0],
    //         filepreview: URL.createObjectURL(event.target.files[0]),
    //     });

    // }
    // const submit = () => {
    //     const formdata = new FormData();
    //     formdata.append('attachment', userInfo.file);

    //     Axios.post("http://localhost:3001/api/imageupload", formdata, {
    //         headers: { "Content-Type": "multipart/form-data" },
    //     })
    //         .then(res => { // then print response status
    //             console.warn(res);
    //             if (res.data.success === 1) {
    //                 setSuccess("Image upload successfully");
    //             }

    //         })
    // }
    const onSubmit = data => {
        console.log(data);
        console.log(data.example);

        Axios.post('http://localhost:3001/api/savevisitform', {
            site: data.site ?? "",
            city: data.city,
            region: data.region,
            distance: data.distance,
            surroundedByNorth: data.surroundedByNorth,
            surroundedBySouth: data.surroundedBySouth,
            surroundedByEast: data.surroundedByEast,
            surroundedByWest: data.surroundedByWest,
            facilityDescription: data.facilityDescription,
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
            // console.warn(res.data.success);
            if (res.data.success === 1) {
                setFormColor("successColor");
                toast.success('Form Saved Successfully!');
            }
            if (res.data.success === 0) {
                setFormColor("errorColor");
                toast.error('Failed to Save!\n'+ res.data.sqlMessage);
            }
        })

    }

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="visitformpage">
            <div><Toaster/></div>
            {/*  "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form className={formColor} onSubmit={handleSubmit(onSubmit)}>

                <div className="labelDiv"><label>Site - الموقع</label></div>
                <input type="text" {...register("site", { required: true })} />
                {errors.site && <p1>This field is required</p1>}


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
                

                <div className="labelDiv"><label>Distance - المسافة</label></div>
                <input type="Number" {...register("distance", { required: true, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.distance && <p1>{errors.distance.message}</p1>}


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


                <div className="labelDiv"><label>Facility Description - وصف المنشأة</label></div> 
                <textarea {...register("facilityDescription", { required: true })} />
                {errors.facilityDescription && <p1>This field is required</p1>}

                
                <div className="labelDiv"><label>Institution Size - حجم المنشأة</label></div>
                <input type="number" {...register("institutionSize", { required: true, min: { value: 0, message: "Number can't be negative" }})} />
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


                <div className="labelDiv"><label>ِAdditional Facilities - مرافق إضافية</label></div>
                <input type="text" {...register("facilities", { required: true })} />
                {errors.facilities && <p1>This field is required</p1>}



                <div className="labelDiv"><label>Electricity Source - مصدر الكهرباء</label></div>
                <input type="text" {...register("electricitySource", { required: true })} />
                {errors.electricitySource && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Production Description - وصف الإنتاج</label></div>
                <input type="text" {...register("productionDescription", { required: true })} />
                {errors.productionDescription && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Employees Number - عدد الموظفين</label></div>
                <input type="number" {...register("employeesNumber", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.employeesNumber && <p1>{errors.employeesNumber.message}</p1>}


                <div className="labelDiv"><label>Shifts Number - عدد الورديات</label></div>
                <input type="number" {...register("shiftsNumber", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" } })} />
                {errors.shiftsNumber && <p1>{errors.shiftsNumber.message}</p1>}


                <div className="labelDiv"><label>Work Hours - ساعات العمل</label></div>
                <input type="number" {...register("workHours", { required: { value: true, message: "This field is required" }, min: { value: 0, message: "Number can't be negative" },  })} />
                {errors.workHours && <p1>{errors.workHours.message} </p1>}


                <div className="labelDiv"><label>Notes - الملاحظات</label></div>
                <textarea {...register("notes", { required: true, })} />
                {errors.notes && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Recommendations - التوصيات</label></div>
                <textarea {...register("recommendations", { required: true })} />
                {errors.recommendations && <p1>This field is required</p1>}


                <div className="labelDiv"><label>Date and Time - التاريخ و الوقت</label></div>
                <input type="datetime-local" {...register("dateTime", { required: true })} />
                {errors.dateTime && <p1>This field is required</p1>}


               <div className="submitButtonDiv"></div>
               <input type="submit" value="Save Form" />
            </form>
        </div>
    );
}