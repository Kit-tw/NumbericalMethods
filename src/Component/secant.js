import React, { Component,useState} from 'react'
import { Container,Form,Button,Table} from 'react-bootstrap';
import {error, func,funcDiff} from './service'
import {Graph} from './Graph';

const Secant = () =>{
    const [Detail,setDetail] = useState({fx: '',xold:0,xnew:0,showGraph:false})
    const [arrayofX,setarrayofX] = useState([])
    const [Iteration,setIteration] = useState([])
    const [testarr,settestarr] = useState([{iteration :'',arrayofX: '',arrayerror:''}])
    const handleChange =(e) => {
        const {name,value} = e.target
        setDetail((prev) =>{return {...prev,[name]:value}})
      }
    const secantmethods = (xold,xnew) =>{
        setDetail(prev => { return {...prev,showGraph : true}})
        var r=0,x,check,fxold,fxnew,diff
        var dataofX = [],iterationarray = []
        // func = n => n*n-7;
        do{
            fxold = func(Detail.fx,xold)
            fxnew = func(Detail.fx,xnew)
            diff =  (func(Detail.fx,xold)-func(Detail.fx,xnew))/(xold-xnew);
            x = xnew - (fxnew)/diff
            check = Math.abs((fxnew/diff)/x)*100
            if(r ==0){
                var array = [{iteration :r,arrayofX: x.toFixed(10),arrayerror:check.toFixed(10)}]
            }else{
                array.push({iteration :r,arrayofX: x.toFixed(10),arrayerror:check.toFixed(10)})
            }
            dataofX[r] = x;
            iterationarray[r] = r;
            xold = xnew
            xnew = x
            console.log("Iteration : "+r+" x = "+x.toFixed(8)+"\nerror = "+check.toFixed(9)+" %")
            r++

        }while(check > 0.000001)
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
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Secant Methods</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name ="fx"  onChange={handleChange} placeholder="Input Function" />
                 <Form.Control size="lg" type="text" name = "xold" onChange={handleChange} placeholder="Input x0" />
                 <Form.Control size="lg" type="text" name = "xnew" onChange={handleChange} placeholder="Input x1" />
             </Form.Group>
         </Form>
         <Button  bg="dark" variant="dark" as="input" onClick={() => secantmethods(parseFloat(Detail.xold),parseFloat(Detail.xnew))} type="submit" value="Submit" />
         </Container>
         <Container>
        {Detail.showGraph && <div style={{padding: "30px" }}><h2 >{arrayofX[arrayofX.length-1]} </h2> {Graph(Iteration,arrayofX)} <div style={{padding: "30px" }}>{createTable()}</div></div>}
        </Container>
         </div>
    )
}
export default  Secant;
