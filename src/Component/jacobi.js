import React, { Component,useState} from 'react'
import { Container,Form,Button,Table} from 'react-bootstrap';

const Jacobi = () =>{
    const [Dimention,setDimention] = useState([])
    const [Bmatrix,setBmatrix] = useState([])
    const [initialX,setinitialX] = useState([])   
    const [Ans,setAns] = useState([])
    const Addmatrix =(e) => {
        var A = [[]],B=[]
        for(var i=0;i<Number(e.target.value);i++)
          {
            A[i]= [];
            B[i] =[];
            console.log(A);
            for(var k=0;k<Number(e.target.value);k++)
            {
              B[i] =0
              A[i][k]= 0
      
            }
            setDimention(A)
            setBmatrix(B)
          }}
  
          const handleChangematrixA =(e,row,column) => {
              Dimention[row][column] = parseFloat(e.target.value)
              // console.log(Dimention)
            }
            const handleChangematrixB =(e,row) => {
              Bmatrix[row]= parseFloat(e.target.value)
              // console.log(Bmatrix)
            }
            const handleChangestartInitialX =(e,row) => {
                initialX[row]= parseFloat(e.target.value)
                // console.log(initialX)
              }
            const cal_jacobi = () =>{
                function calx_jacobi (a,n) {
                    var ans = 0
                    for(i = 0;i<a.length;i++){
                        if(n != i){
                            ans += a[n][i]*defualtvalue[i]
                        }
                    }
                    return ans;
                }
                // a = [[5,2,0,0],[2,5,2,0],[0,2,5,2],[0,0,2,5]]
                // b = [12,17,14,7]
                // defualtvalue = [0,0,0,0]
                var a = Dimention,b = Bmatrix,defualtvalue = initialX,x = [],r=1,i,k,j,error
                do{
                    for(k=0;k<a.length;k++){
                        x[k] =(1/a[k][k])*(b[k]-calx_jacobi(a,k))
                    }
                    error = Math.abs((x[0] - defualtvalue[0]) / x[0])*100;
                    for(j=0;j<defualtvalue.length;j++){
                        defualtvalue[j] = x[j]
                    }
                    r++
                
                }while(error > 0.000001)
                for(k=0;k<a.length;k++){
                    console.log("X",k+1," = : ",x[k].toFixed(2))
                }
                setAns(x)
                console.log("iteration :" ,r,"รอบ")
            }

    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Gauss's Jacobi</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={Addmatrix} placeholder="Input Number of Dimentions" />
             </Form.Group>
         </Form>
         {Dimention.map((row,i) => (<div key={i}>
            <Table responsive="sm">
            <tbody>
          <tr>
            {row.map((column,j)=>(
                <td key={j}><input onChange={e => handleChangematrixA(e,i,j)}/></td>
            ))}
            <td><input  onChange={e => handleChangematrixB(e,i)}/></td>
          </tr>
          
        </tbody>
            </Table>
         </div>))}
         <h2>Initial X</h2>
         {Dimention.map((row,i) => <div key={i}>
         <Table responsive="sm">
         <tbody>
            <tr>
            <td key={i}><input onChange={e => handleChangestartInitialX(e,i)}/></td>
            </tr>
            </tbody>
            
         </Table>
         </div>)}
         
              <Button as="input" type="submit" value="Submit" onClick={() => cal_jacobi()} />
         </Container>
         {Ans.map((Ans,index) =>(<h1 key={index}>X{index+1} = {Ans}</h1>))}
         </div>
    )
  
}
export default  Jacobi