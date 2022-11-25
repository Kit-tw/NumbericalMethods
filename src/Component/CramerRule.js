import React, { Component, useState } from 'react'
import { Container,Form,Button,Table,Card} from 'react-bootstrap';
import {det,zeros,matrix} from 'mathjs'


const CramerRule = () => {
    const [Dimention,setDimention] = useState([])
    const [Bmatrix,setBmatrix] = useState([])   
    const [Ans,setAns] = useState([])
    const [TESTDIMENTION,settest] = useState([])
    const copymatrix=(m)=>{
      var array = [[]]

      for(var i=0;i<m.length;i++)
      {
        array[i]= [];
        for(var k=0;k<m.length;k++)
        {
          array[i][k]= m[i][k];

        }
      }
      return array
    }

    const cramer = () =>{
    var matrix1 = Dimention
    var matrix2 = Bmatrix
    var counter = 0
    var arrayAns =[]
    while (counter != matrix1.length) {
          var transformMatrix = copymatrix(matrix1)
          TESTDIMENTION.push(transformMatrix)
              for (var i = 0; i < matrix1.length; i++) {
                  for (var j = 0; j < matrix1.length; j++) {
                      if (j == counter) {
                          transformMatrix[i][j] = matrix2[i]
                          // console.log(transformMatrix)
                          break;
                      }
                  }
              }
              arrayAns[counter] = Math.round(det(transformMatrix)) / Math.round(det(matrix1))
              counter++;
              // console.log(Math.round(det(transformMatrix)) / Math.round(det(matrix1)))
          }
          setAns(arrayAns)
          // console.log(Ans)

    }
    const Addmatrix =(e) => {
      var A = [[]],B=[]
      for(var i=0;i<parseFloat(e.target.value);i++)
        {
          A[i]= [];
          B[i] =[];
          // console.log(A);
          for(var k=0;k<parseFloat(e.target.value);k++)
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
        <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Cramer's Rule</h2>
         <Container>
         <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={Addmatrix} placeholder="Input Number of Dimentions" />
             </Form.Group>
         </Form>
         {/* <ul>
            {Dimention.map(Dimention => (
                <li key={Dimention.id}>1</li>
            ))}
         </ul> */}

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
         
              <Button as="input" bg="dark" variant="dark"type="submit" value="Submit" onClick={() => cramer()} />
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

export default CramerRule;