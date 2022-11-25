import React, { Component, useState } from 'react'
import { Container,Form,Button,Table,Card} from 'react-bootstrap';
import {det,zeros,matrix} from 'mathjs'
import {Graph} from './Graph';

const Lagrange = () => {
    const [xDimention,setxDimention] = useState([1])
    const [yDimention,setyDimention] = useState([1])
    const [Initialx,setInitialx] = useState()
    const [pointDimetion,setpoint] = useState([]) 
    const [Ans,setAns] = useState([])
    const [showGraph,setshowGraph] = useState(false)

    const CallApi = async () =>{
      const response = await fetch("http://localhost:8000/Lagrange")
      const data = await response.json()
      console.log(data)
      // Addmatrix(data[0].Dimention)
      setxDimention(data[0].xDimention)
      setyDimention(data[0].yDimention)
      // addpoint(data[0].pointDimetion)
      setpoint(data[0].point)
      setInitialx(data[0].x)
      
      // console.log(Detail)
  }
 
   const cal_lagrange = () =>{
    // var x = [0,20000,40000,60000,80000]
    // var y = [9.81,9.7487,9.6879,9.6879,9.5682]
    // var xp=42000
    var x = xDimention
    var y = yDimention
    var xp = Initialx
    var yp=0
    var point = pointDimetion
    for(var i =0;i<point.length;i++){
        var p=1;
        for(var j=0;j<point.length;j++){
            if(i != j){
                p = p*(xp-x[point[j]-1])/(x[point[i]-1]-x[point[j]-1])
            }
        }
        yp = yp+ p*y[point[i]-1];
        Ans.push(yp)
    }
    console.log(yp);
    setshowGraph(true)
   }
   const addpoint = (e) =>{
    var pointmatrix = []
        if(xDimention.length >= e.target.value){
            for(var i=0;i<parseFloat(e.target.value);i++){
                pointmatrix[i] = 0
            }
            // console.log(xDimention.length)
            console.log(pointmatrix)
            setpoint(pointmatrix)
        }
        
   }
   const handleChange = (e) =>{
    setInitialx(parseFloat(e.target.value));
    console.log(Initialx)
   }
    const Addmatrix =(e) => {
        var A = [],B=[]
        for(var i=0;i<parseFloat(e.target.value);i++)
          {
            B[i] =" "
            A[i]= " "
      
            // console.log(A);
            
          }
          setxDimention(A)
          setyDimention(B)
          setshowGraph(false)
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
                pointDimetion[row]= parseFloat(e.target.value)
              console.log(pointDimetion)
            }
    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Lagrange Interpolation</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={Addmatrix} placeholder="Input Number of Dimentions" />
                 <Form.Control size="lg" type="text" name = "point" onChange={addpoint} placeholder="Input point" />
                 <Form.Control size="lg" type="text" value={Initialx} name = "x" onChange={handleChange} placeholder="Input x" />
             </Form.Group>
         </Form>
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
          <td><input  value={xDimention[i]} onChange={e => handleChangematrixA(e,i)}/></td>
            <td><input  value ={yDimention[i]} onChange={e => handleChangematrixB(e,i)}/></td>
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
         {pointDimetion.map((row,i) => (
           
            <tbody  key={i}>
          <tr>
          <td><input  value={row}onChange={e => handleChangematrixpoint(e,i)}/></td>
          </tr>
          
        </tbody>
           
         ))}
         </Table> 
              <Button as="input" bg="dark" variant="dark"type="submit" value="Submit" onClick={() => cal_lagrange()} />
              <div style={{padding: "30px" }}><Button bg="dark" variant="dark" as="input" onClick={() =>CallApi()} type="submit" value="Api" /> </div>
         </Container>
         <Container>
        {showGraph && <div style={{padding: "30px" }}><h2 >{Ans[Ans.length-1]} </h2> {Graph(xDimention,yDimention,Ans,"X/Y","Answer")}</div>}
        </Container>
         </div>
         
    
    )
  
}

export default Lagrange;
