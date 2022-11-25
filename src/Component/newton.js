import React, { Component,useState} from 'react'
import { Container,Form,Button,Table} from 'react-bootstrap';
import {error, func,funcDiff} from './service'
import {Graph} from './Graph';

 const NewtonRaphson = () => {
    const [Detail,setDetail] = useState({fx: '',x:0,showGraph:false})
    const [arrayofX,setarrayofX] = useState([])
    const [Iteration,setIteration] = useState([])
    const [testarr,settestarr] = useState([{iteration :'',arrayofX: '',arrayerror:''}])
    const handleChange =(e) => {
        const {name,value} = e.target
        setDetail((prev) =>{return {...prev,[name]:value}})
      }
      const Newton = (x) =>{
        setDetail(prev => { return {...prev,showGraph : true}})
        var xnew,check=0,r=0
        var dataofX = [],iterationarray = []
        // f = x => x*x-7
        // diff = x =>2*x
        do{
            xnew = x-(func(Detail.fx,x)/funcDiff(Detail.fx,x))
            check = Math.abs((func(Detail.fx,x)/funcDiff(Detail.fx,x))/xnew)*100
            // console.log("Iteration : "+r+"\nX = "+xnew+"\nError = "+check.toFixed(10))
            if(r ==0){
                var array = [{iteration :r,arrayofX: x.toFixed(10),arrayerror:check.toFixed(10)}]
            }else{
                array.push({iteration :r,arrayofX: x.toFixed(10),arrayerror:check.toFixed(10)})
            }
            x = xnew
            dataofX[r] = xnew;
            iterationarray[r] = r;
            r++
        }while(check > 0.000001);
        setIteration(iterationarray)
        setarrayofX(dataofX)
        settestarr(array)
      }
      const createTable = ()=> {
        return (
            <Container>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Iteration</th>
                    <th>x1</th>
                    <th>error</th>
                    </tr>
                </thead>
                <tbody>
                    {testarr.map((val,i) => (
                        <tr key={i}>
                        <td>{val.iteration}</td>
                        <td>{val.arrayofX}</td>
                        <td>{val.arrayerror}</td>
                        </tr>
                        ))}
                </tbody>
                </Table>
            </Container>
          );
    }
    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Newton Raphson</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name ="fx"  onChange={handleChange} placeholder="Input Function" />
                 <Form.Control size="lg" type="text" name = "x" onChange={handleChange} placeholder="Input x" />
             </Form.Group>
         </Form>
         <Button  bg="dark" variant="dark" as="input" onClick={() => Newton(parseFloat(Detail.x))} type="submit" value="Submit" />
         </Container>
         <Container>
        {Detail.showGraph && <div style={{padding: "30px" }}><h2 >{arrayofX[arrayofX.length-1]} </h2> {Graph(Iteration,arrayofX,testarr.arrayerror,"x","error")} <div style={{padding: "30px" }}>{createTable()}</div></div>}
        </Container>
         </div>
    )
}
export default NewtonRaphson;