import React, { Component, useState } from 'react'
import { Container,Form,Button,Table} from 'react-bootstrap';
import {error, func} from './service'
import {Graph} from './Graph';

const False_position=()=>{
  const [Detail,setDetail] = useState({fx: '',xl:0,xr:0,showGraph:false})
  const [arrayofX1,setarrayofX1] = useState([])
  const [Iteration,setIteration] = useState([])
  const [errorarray,seterrorarray] = useState([])
  const [testarr,settestarr] = useState([{iteration :'',arrayofxl: '',arrayoffxl:'',arrayofxr:'',arrayoffxr:'',arrayofx1:'',arrayoffx1:''}])

  const handleChange =(e) => {
    const {name,value} = e.target
    setDetail((prev) =>{return {...prev,[name]:value}})
  }
  const false_position=(xl,xr) =>{
    setDetail(prev => { return {...prev,showGraph : true}})
    var r=0,x1,x1old=0,er;
    var dataofx1 = [],iterationarray = [],erroraray=[]
    do{
        x1 = ((xl*func(Detail.fx,xr))-(xr*func(Detail.fx,xl)))/(func(Detail.fx,xr)-func(Detail.fx,xl));
        if(r == 0){
          var test = [{iteration:r,arrayofxl:xl.toFixed(6),arrayoffxl:func(Detail.fx,xl).toFixed(6),arrayofxr:xr.toFixed(6),arrayoffxr:func(Detail.fx,xr).toFixed(6),arrayofx1:x1.toFixed(6),arrayoffx1:func(Detail.fx,x1).toFixed(6)}]
      }else{
      test.push({iteration:r,arrayofxl:xl.toFixed(6),arrayoffxl:func(Detail.fx,xl).toFixed(6),arrayofxr:xr.toFixed(6),arrayoffxr:func(Detail.fx,xr).toFixed(6),arrayofx1:x1.toFixed(6),arrayoffx1:func(Detail.fx,x1).toFixed(6)})
      }
        console.log("Iteration "+r+" XL ="+xl+" XR ="+xr+"\nx1 ="+x1);

        if(func(Detail.fx,x1)*func(Detail.fx,xr) < 0){
            xl=x1;
        }
        else if(func(Detail.fx,x1)*func(Detail.fx,xr) > 0){
            xr=x1;
        }
        
        er = error(x1,x1old)
        x1old =x1;
        dataofx1[r] = x1;
        iterationarray[r] = r;
        if(r!=0){
          erroraray[r] = er;
      }
        r++;
    }while(er > 0.000001);
    setarrayofX1(dataofx1)
    setIteration(iterationarray)
    settestarr(test)
    seterrorarray(erroraray)

  }
  const createTable = ()=> {
    return (
        <Container>
        <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Iteration</th>
                <th>xl</th>
                <th>F(xl)</th>
                <th>xr</th>
                <th>F(xr)</th>
                <th>x1</th>
                <th>F(x1)</th>
                </tr>
            </thead>
            <tbody>
                {testarr.map((val,i) => (
                    <tr key={i}>
                    <td>{val.iteration}</td>
                    <td>{val.arrayofxl}</td>
                    <td>{val.arrayoffxl}</td>
                    <td>{val.arrayofxr}</td>
                    <td>{val.arrayoffxr}</td>
                    <td>{val.arrayofx1}</td>
                    <td>{val.arrayoffx1}</td>
                    </tr>
                    ))}
            </tbody>
            </Table>
        </Container>
      );
}
    return (
      <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>False Position</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name ="fx"  onChange={handleChange} placeholder="Input Function" />
                 <Form.Control size="lg" type="text" name = "xl" onChange={handleChange} placeholder="Input XL" />
                 <Form.Control size="lg" type="text" name = "xr" onChange={handleChange} placeholder="Input XR" />
             </Form.Group>
         </Form>
         <Button  bg="dark" variant="dark" as="input" onClick={() => false_position(parseFloat(Detail.xl),parseFloat(Detail.xr))}type="submit" value="Submit" />
         </Container>
         <Container>
        {Detail.showGraph && <div style={{padding: "30px" }}><h2 >{arrayofX1[arrayofX1.length-1]} </h2> {Graph(Iteration,arrayofX1,errorarray,"x","error")} <div style={{padding: "30px" }}>{createTable()}</div></div>}
        </Container>
         </div>
    )
}
export default False_position;