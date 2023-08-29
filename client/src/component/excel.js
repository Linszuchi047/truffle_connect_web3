import React, { useEffect, useState, Fragment } from "react";
import Tabletop from "tabletop";



export default function Excel() {
    const [data, setData] = useState([]);


    useEffect(() => {
        Tabletop.init({
            key: "2PACX-1vRrM7MqMoTiexlmJDhV3IhkiJQ8hWUVRL8ZDlEgB8ci-P-TrWkzLzXQl6ucSVEH_1s2F1rbckYG9sDR",
            simpleSheet: true
        })
            .then((data) => setData(data))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <>
            <h1>data from google sheets</h1>
            <div>{data}</div>

        </>
    );
}