import React, { Component, useState } from 'react'
import {det,zeros,matrix} from 'mathjs'


const Home = () =>{
    let array1 =[[1,1,4,4],[1,3,7,9],[-1,-2,-4,6],[1,1,3,-2]]
    const [test,settest] = useState([[1,1,4,4],[1,3,7,9],[-1,-2,-4,6],[1,1,3,-2]])
    return (
        <div> {test.map((val) => <tr>{val.map((test) => <td>{test}</td>)}</tr>)}
            </div>
    )
}
export default Home;