import React,{useState} from 'react';

function Razor() {
  const [amount, setamount] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(amount === ""){
    alert("please enter amount");
    }else{
      var options = {
        key: "rzp_test_WqgTwAho34JCMY",
        key_secret:"L2HVa9a3EzpwnGU8fCz",
        amount: amount *100,
        currency:"INR",
        name:"STARTUP_PROJECTS",
        description:"for testing purpose",
        handler: function(response){
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name:"Jennie Roopa",
          email:"jennieroopakumar_bai25@mepcoeng.ac.in",
          contact:"6381738156"
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }
  return (
    <div className="App">
     <br/>
     <input type="text"placeholder='Enter Amount'value={amount}onChange={(e)=>setamount(e.target.value)} />
     <br/><br/>
     <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

export default Razor;