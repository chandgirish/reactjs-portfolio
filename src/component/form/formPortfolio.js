import React from "react";
import {Formik, Field, Form} from "formik";
import * as Yup from 'yup';

import TextField from "@mui/material/TextField";
import {Button, makeStyles, MenuItem} from "@mui/material";

//transactionDate

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import axios from "axios";
import {useNavigate} from "react-router";

// const datefns = require("date-fns");

//Validation using yup

const portfolioSchema = Yup.object().shape({
    stockName : Yup.string()
        .required(),
    transactionType : Yup.string()
        .required(),
    quantity : Yup.string()
        .required(),
    amount : Yup.string()
        .required(),

    transactionDate : Yup.date()
        .nullable()
        .required('Required')

})


const stockField = [
    "Notebook",
    "Desktop PC",
    "Monitor"
]



export const FormPortfolio = () => {
    const navigate = useNavigate();

    const handleOnSubmit = (values, actions) => {
        let payload = {
            stockName : values.stockName,
            transactionType : values.transactionType,
            quantity : values.quantity,
            amount : values.amount,
            transactionDate : Intl.DateTimeFormat().format(values.transactionDate)
        }
        console.log(values);
        navigate('/');

        const {data}  = axios.post('http://localhost:9000/api/product', payload);

        if(data.status === 200) {
            alert("success");
        } else {
            alert("something went wrong");
        }
    }



    return(
        <>
            {/*use of formik*/}

            <Formik
                initialValues={{
                    stockName : '',
                    transactionType : '',
                    quantity : '',
                    // autocomplete : '',
                    amount : '',
                    transactionDate : ''
                    // totalAmount : ''
                }}
                validationSchema={portfolioSchema}

                onSubmit={handleOnSubmit}

            >
                {({errors, touched}) => (
                    <Form>


                        <h5>Stock Name</h5>
                        <Field name={'stockName'}>
                            {
                                (props) => {
                                    const {field, form, meta} = props;
                                    // console.log(field);
                                    return (
                                        <>
                                            <TextField
                                                helperText={meta.touched && meta.error}
                                                error = {meta.touched && meta.error}
                                                id="stockName"
                                                type="text"
                                                variant="outlined"
                                                {...field}
                                            />

                                        </>
                                    )
                                }
                            }
                        </Field>

                        <h5>Transaction Type</h5>
                        <Field name={'transactionType'}>
                            {
                                (props) => {
                                    const {field, form, meta} = props;
                                    return (
                                        <>
                                            <TextField
                                                helperText={meta.touched && meta.error}
                                                error = {meta.touched && meta.error}
                                                id="transactionType"
                                                type="text"
                                                variant="outlined"
                                                {...field}
                                            />
                                        </>
                                    )
                                }
                            }
                        </Field>

                        <h5>Quantity</h5>
                        <Field name={'quantity'}>
                            {
                                (props) => {
                                    const {field, form, meta} = props;
                                    return (
                                        <>
                                            <TextField
                                                helperText={meta.touched && meta.error}
                                                error = {meta.touched && meta.error}
                                                id="quantity"
                                                type="number"
                                                variant="outlined"
                                                {...field}
                                                // className={classes.textFieldInput}
                                            />
                                        </>
                                    )
                                }
                            }
                        </Field>

                        <h5>Amount</h5>
                        <Field name={'amount'}>
                            {
                                (props) => {
                                    const {field, form, meta} = props;
                                    return (
                                        <>
                                            <TextField
                                                helperText={meta.touched && meta.error}
                                                error = {meta.touched && meta.error}
                                                id="amount"
                                                type="number"
                                                variant="outlined"
                                                {...field}
                                            />
                                        </>
                                    )
                                }
                            }
                        </Field>


                        <h5>Transaction Date</h5>
                            <Field name={'transactionDate'}>
                                {
                                    (props) => {
                                        const {field, form, meta } = props;
                                        const date = form.values.transactionDate;
                                        // console.log(Intl.DateTimeFormat().format(date))
                                        return(
                                            <>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Transaction Date"
                                                        value={form.values.transactionDate}
                                                        id="transactionDate"
                                                        {...field}
                                                        onChange={value => {
                                                            form.setFieldValue('transactionDate',value);
                                                        }}

                                                        renderInput={(field) =>
                                                            <TextField
                                                                helperText={meta.touched && meta.error ? meta.error : ''}
                                                                error={meta.touched && meta.error}
                                                                {...field}
                                                            />
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </>
                                        )
                                    }
                                }
                            </Field>
                        <br/><br/>


                        <Button type="submit" variant="contained" onClick={handleOnSubmit} >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <Button style={{marginTop : 20, marginBottom : 20}} variant="contained" onClick= {() =>
                navigate('/dashboard')
            }>
            Dashboard
            </Button>
        </>
    )
}
