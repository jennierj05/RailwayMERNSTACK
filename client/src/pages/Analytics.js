import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
function Analytics() {
    const navigate = useNavigate();
    const click1 = () => {
      navigate('/query1');
    };
    const click2 = () => {
      navigate('/query2');
    };
    const click3 = () => {
      navigate('/query3');
    };
   
    return (
      <div className="centered-container"> 
      <h1>RAILWAY ADMIN ZONE</h1>
        <Button className="custom-button"onClick={click1}>ADD Train</Button>
        <Button className="custom-button"onClick={click2}>View Train</Button>
        <Button className="custom-button"onClick={click3}>Customer Status</Button>
      </div>
    );
    
    }
export default Analytics;