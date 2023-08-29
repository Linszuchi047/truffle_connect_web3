import React, { useEffect, useState } from "react";
const Tabletop = require('tabletop')



export default function State() {
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
            <div>{data}</div>

        </>
    );
}