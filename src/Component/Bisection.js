import React, {useState} from 'react';
import { Container,Form,Button,Table} from 'react-bootstrap';
import {Graph} from './Graph';
import {func} from './service';

const Bisection = () => {
    const [Detail,setDetail] = useState({fx:'',xl:'',xr:'',showGraph:false})
    const [arrayofXm,setarrayofXm] = useState([])
    const [errorarray,seterrorarray] = useState([])
    const [Iteration,setIteration] = useState([])
    const [testarr,settestarr] = useState([{iteration :'',arrayofxl: '',arrayoffxl:'',arrayofxr:'',arrayoffxr:'',arrayofxm:'',arrayoffxm:''}])
    const handleChange =(e) => {
      const {name,value} = e.target
      setDetail((prev) =>{return {...prev,[name]:value,showGraph:false}})
      
    }
    // const addtoArray = (a,b,c,d,e,f,g) =>{
    //     settestarr((Oldarray)=> [...Oldarray,{iteration:a,arrayofxl:b.toFixed(6),arrayoffxl:c.toFixed(6),arrayofxr:d.toFixed(6),arrayoffxr:e.toFixed(6),arrayofxm:f.toFixed(13),arrayoffxm:g.toFixed(13)}])
    //     // testarr.push({iteration:a,arrayofxl:b.toFixed(6),arrayoffxl:c.toFixed(6),arrayofxr:d.toFixed(6),arrayoffxr:e.toFixed(6),arrayofxm:f.toFixed(13),arrayoffxm:g.toFixed(13)})
    // }

    //npx json-server --watch Api.json --port 8000 
    const CallApi = async () =>{
        const response = await fetch("http://localhost:8000/Bisection")
        const data = await response.json()
        console.log(data)
        setDetail((prev) =>{return {...prev,fx:data[0].fx,xl:data[0].xl,xr:data[0].xr,showGraph:false}})
        // console.log(Detail)
    }

    const bisection = (xl,xr) => {
        setDetail(prev => { return {...prev,showGraph : true}})
        var r=0,er,xmold=0,xm;
        var dataofxm = [],iterationarray = [],erroraray=[]
        do{
            xm = (xl+xr)/2;
            if(r == 0){
                var test = [{iteration:r,arrayofxl:xl.toFixed(6),arrayoffxl:func(Detail.fx,xl).toFixed(6),arrayofxr:xr.toFixed(6),arrayoffxr:func(Detail.fx,xr).toFixed(6),arrayofxm:xm.toFixed(6),arrayoffxm:func(Detail.fx,xm).toFixed(6)}]
            }else{
            test.push({iteration:r,arrayofxl:xl.toFixed(6),arrayoffxl:func(Detail.fx,xl).toFixed(6),arrayofxr:xr.toFixed(6),arrayoffxr:func(Detail.fx,xr).toFixed(6),arrayofxm:xm.toFixed(6),arrayoffxm:func(Detail.fx,xm).toFixed(6)})
            }
            if(func(Detail.fx,xm)*func(Detail.fx,xr) < 0){
                xl=xm;
            }
            else{
                xr=xm;
            }
            er = Math.abs((xm-xmold)/xm)*100;
            xmold =xm;
            dataofxm[r] = xm;
            iterationarray[r] = r;
            if(r!=0){
                erroraray[r] = er;
            }
            r++;
        }while(er > 0.000001);
        setarrayofXm(dataofxm)
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
                    <th>xm</th>
                    <th>F(xm)</th>
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
                        <td>{val.arrayofxm}</td>
                        <td>{val.arrayoffxm}</td>
                        </tr>
                        ))}
                </tbody>
                </Table>
            </Container>
          );
    }

    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Bisection</h2>
        <Container>
        <Form>
            <Form.Group className="mb-3">
                <Form.Control size="lg" type="text" name ="fx"  onChange={handleChange} value={Detail.fx} placeholder="Input Function" />
                <Form.Control size="lg" type="text" name = "xl"  onChange={handleChange} value={Detail.xl}  placeholder="Input XL" />
                <Form.Control size="lg" type="text" name = "xr"   onChange={handleChange} value={Detail.xr} placeholder="Input XR" />
            </Form.Group>
        </Form>
        <Button  bg="dark" variant="dark" as="input" onClick={() =>bisection(parseFloat(Detail.xl),parseFloat(Detail.xr))} type="submit" value="Submit" />
        <div style={{padding: "30px" }}><Button bg="dark" variant="dark" as="input" onClick={() =>CallApi()} type="submit" value="Api" /> </div>
        </Container>
        <Container>
        {Detail.showGraph && <div style={{padding: "30px" }}><h2 >{arrayofXm[arrayofXm.length-1]} </h2> {Graph(Iteration,arrayofXm,errorarray,"x","error")} <div style={{padding: "30px" }}>{createTable()}</div></div>}
        </Container>
        </div>
    )
}
export default Bisection;
