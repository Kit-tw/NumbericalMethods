import React, { Component, useState } from 'react'
import { Container,Form,Button,Table,Card} from 'react-bootstrap';
import {det,zeros,matrix} from 'mathjs'


const GaussElimination = () => {
    const [Dimention,setDimention] = useState([])
    const [Bmatrix,setBmatrix] = useState([])   
    const [Ans,setAns] = useState([])

    const Cal_Gauss_Elimination = () =>{
        let A= Dimention
        let B =Bmatrix
        let X = []
        for (let k = 0; k < A.length; k++) {
            for (let i = k + 1; i < A.length; i++) {
                let temp = A[i][k] / A[k][k];
                for (let j = k; j < A.length; j++) {
                    A[i][j] = A[i][j] - temp * A[k][j];
                }
                B[i] = B[i] - temp * B[k];
            }
        }
        X[A.length - 1] = Math.round(B[A.length - 1] / A[A.length - 1][A.length - 1]); //find Xn
        for (let i = A.length - 2; i >= 0; i--) { //find Xn-1 to X1
            let sum = B[i];
            for (let j = i + 1; j < A.length; j++) {
                sum = sum - A[i][j] * X[j];
            }
            X[i] = Math.round(sum / A[i][i]);
        }
        setAns(X)
        // console.log(Ans)
    }
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
        }
        setDimention(A)
        setBmatrix(B)
      }

        const handleChangematrixA =(e,row,column) => {
            Dimention[row][column] = parseFloat(e.target.value)
            // console.log(Dimention)
          }
          const handleChangematrixB =(e,row) => {
            Bmatrix[row]= parseFloat(e.target.value)
            // console.log(Bmatrix)
          }

    return (
        <div style={{padding: "30px" }}>
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Gauss Elimination</h2>
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
         
              <Button as="input" bg="dark" variant="dark" type="submit" value="Submit" onClick={() => Cal_Gauss_Elimination()} />
         </Container>
         {Ans.map((Ans,index) =>(<h1 key={index}>X{index+1} = {Ans}</h1>))}
         </div>
    )

}

export default GaussElimination;