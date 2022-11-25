import React, { Component, useState } from 'react'
import { Container,Form,Button,Table,Card} from 'react-bootstrap';
import {det,zeros,matrix} from 'mathjs'

const Newtoninterpolation = () => {
    const [xDimention,setxDimention] = useState([1])
    const [yDimention,setyDimention] = useState([1])
    const [point,setpoint] = useState([])
    const [Ans,setAns] = useState([])
    const [TESTDIMENTION,settest] = useState([])
 
   const cal_newton = () =>{
        
   }
   const addpoint = (e) =>{
    var pointmatrix = []
        if(xDimention.length > e.target.value){
            for(var i=0;i<parseFloat(e.target.value);i++){
                pointmatrix[i] = 0
            }
            
            console.log(pointmatrix)
            setpoint(pointmatrix)
        }
        
   }
    const Addmatrix =(e) => {
        var A = [],B=[]
        for(var i=0;i<parseFloat(e.target.value);i++)
          {
            B[i] =0
            A[i]= 0
      
            // console.log(A);
            
          }
          setxDimention(A)
          setyDimention(B)
        }
  
          const handleChangematrixA =(e,row) => {
              xDimention[row] = parseFloat(e.target.value)
              console.log(xDimention)
            }
            const handleChangematrixB =(e,row) => {
                yDimention[row]= parseFloat(e.target.value)
              console.log(yDimention)
            }
            const handleChangematrixpoint =(e,row) => {
                point[row]= parseFloat(e.target.value)
              console.log(point)
            }
    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Newton Divide Interpolation</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={Addmatrix} placeholder="Input Number of Dimentions" />
                 <Form.Control size="lg" type="text" name = "point" onChange={addpoint} placeholder="Input point" />
             </Form.Group>
         </Form>
         {/* <ul>
            {Dimention.map(Dimention => (
                <li key={Dimention.id}>1</li>
            ))}
         </ul> */}
 <Table responsive="sm">
            <thead>
                    <tr>
                    <th>X</th>
                    <th>Y</th>
                    </tr>
                </thead>
         {xDimention.map((row,i) => (
           
            <tbody  key={i}>
          <tr>
          <td><input  onChange={e => handleChangematrixA(e,i)}/></td>
            <td><input  onChange={e => handleChangematrixB(e,i)}/></td>
          </tr>
          
        </tbody>
           
         ))}
         </Table> 
         <Table responsive="sm">
            <thead>
                    <tr>
                    <th>point</th>
                    </tr>
                </thead>
         {point.map((row,i) => (
           
            <tbody  key={i}>
          <tr>
          <td><input  onChange={e => handleChangematrixpoint(e,i)}/></td>
          </tr>
          
        </tbody>
           
         ))}
         </Table> 
              <Button as="input" bg="dark" variant="dark"type="submit" value="Submit" onClick={() => cal_newton()} />
         </Container>
         {Ans.map((Ans,index) =>(<h1 key={index}>X{index+1} = {Ans}</h1>))}


         {/* {TESTDIMENTION.map((test, i) => (
              <Table responsive="sm">
              <tbody>
                {test.map((gg,j) => (
<tr key={j}>
                  {gg.map((cb, k) => (
                    <td >
                     {cb}
                    </td>
                    ))}
</tr>
                ))}
                </tbody>
                </Table>
            ))} */}
            {/* {[[1,2,6,5]]},{[[2,1,4,6]]} */}

         </div>
         
    
    )
  
}

export default Newtoninterpolation;
