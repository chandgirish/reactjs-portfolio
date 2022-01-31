import React, {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";

export const Dashboard = () => {

    const [product, setProduct] = useState('');

    const getData = () => {
        axios.get('http://localhost:9000/api/product')
            .then(function (response){
                console.log(response);
                setProduct(response.data)
            })
            .catch(function (err){
                console.log(err)
            })
    }

   useEffect(() =>{
       getData();
   }, [])


    return(
        <>
            <Typography variant="h3">Dashboard</Typography>
            <Typography>
                Total Sell Amount : {product.totalSell}
            </Typography>
            <Typography>
                Total Buy Amount : {product.totalBuy}
            </Typography>
            <Typography>
                Overall Profit/Loss : {product.totalBalance}
            </Typography>

        </>
    )
}