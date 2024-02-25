import React, { useState,useEffect } from 'react';
import {  Select ,Radio } from 'antd';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios'
import "../styles/AddTicket.css"
import {message} from "antd";
const { Option } = Select;
function AddTicket() {
  const berthOptions = ['Lower-Berth', 'Middle-Berth', 'Upper-Berth', 'Side-Lower-Berth', 'Side-Upper-Berth','RAC','Waiting-List'];
  const [ticketData, setTicketData] = useState({
    fromStation: '',
    toStation:'',
    departureDate: '',
    Class: '',
    General: '',
    pnrNumber: Math.floor(100000 + Math.random() * 900000),
    Count: '',
    totalAmount: Math.floor(Math.random() * 500) * 50,
    seatNumber: Math.floor(1 + Math.random() * 110),
    Berth:berthOptions[Math.floor(Math.random() * berthOptions.length)]
  }); 
  useEffect(() => {
    const calculateTotalAmount = () => {
      const count = parseInt(ticketData.Count);
      if (!isNaN(count)) {
        const newTotalAmount = count * 100; // Assuming 50 is the base fare
        setTicketData(prevState => ({ ...prevState, totalAmount: newTotalAmount }));
      }
    };
    calculateTotalAmount();
  }, [ticketData.Count]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/v1/user/AddTicket', ticketData);
      if (res.data.success) {
        message.success('Added successfully');
  
// Generate PDF with form details
const doc = new jsPDF();

// Add text to PDF with borders and colors
doc.setTextColor(255, 0, 0); // Set text color to red
doc.setFontSize(16); // Set font size
doc.text('Ticket is booked successfully', 10, 10);

doc.setTextColor(0, 0, 0); // Set text color back to black
doc.setFontSize(14); // Reset font size

// Draw rectangles around text with borders
doc.rect(10, 20, 100, 10); // Source
doc.text(`Source: ${ticketData.fromStation}`, 12, 28);

doc.rect(10, 30, 100, 10); // Destination
doc.text(`Destination: ${ticketData.toStation}`, 12, 38);

doc.rect(10, 40, 100, 10); // Date of Travel
doc.text(`Date of Travel: ${ticketData.departureDate}`, 12, 48);

doc.rect(10, 50, 100, 10); // Count
doc.text(`Count: ${ticketData.Count}`, 12, 58);

doc.rect(10, 60, 100, 10); // Class
doc.text(`Class: ${ticketData.Class}`, 12, 68);

doc.rect(10, 70, 100, 10); // General
doc.text(`General: ${ticketData.General}`, 12, 78);

doc.rect(10, 80, 100, 10); // PNR Number
doc.text(`PNR Number: ${ticketData.pnrNumber}`, 12, 88);

doc.rect(10, 90, 100, 10); // Allocated Seat NO
doc.text(`Allocated Seat NO: ${ticketData.seatNumber}`, 12, 98);

doc.rect(10, 100, 100, 10); // Allocated Berth
doc.text(`Allocated Berth: ${ticketData.Berth}`, 12, 108);

doc.rect(10, 110, 100, 10); // Total Fare
doc.text(`Total Fare: ${ticketData.totalAmount}`, 12, 118);

// Save PDF
doc.save('ticket.pdf');

      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };
  
  const allStates = [
    "THIRICHENDUR", "KAYALPATTINAM", "ARMUGANERI", "KURUMBUR", "NAZARETH", "SRIVAIKUNTAM",
    "SEYDUNGANALLUR", "TIRUNELVELI", "VANCHIMANIYACHI", "KOVILPATTI", "SATTUR", "VIRUDUNAGAR",
    "MADURAI", "KODAIKANAL ROAD", "DINDIGUAL", "THIRUCHCHIRAPALLI", "BUDALUR", "THANJAVUR",
    "PAPANASAM", "KUMBAKONAM", "ADUTURAI", "MAYILADUTURAI", "SRIKAZHI", "CHIDAMBARAM",
    "TIRUPADRIPULAYUR", "PANRUTI", "VILUPURAM", "TINDIVANAM", "MELMARUVATTUR", "CHENGALPATTU",
    "TAMBARAM", "CHENNAI EGMORE", "TUTICORIN", "TUTI MELUR", "MILVITTAN", "KAILASPURAM",
    "VANCHIMANIYACHI", "JAISALMER", "KADAMBUR", "KOVILPATTI", "BHARATPUR JN", "SATTUR",
    "VIRUDUNAGAR", "TIRUMANGALAM", "TIRUPARANKNDRAM", "MADURAI", "SHOLAVANDAN", "KODAIKANAL ROAD",
    "DINDIGUAL", "KARUR", "PUGALUR", "KODUMUDI", "ERODE JN", "SALEM JN", "DHARMAPURI", "PALAKKODU",
    "HOSUR", "CARMELARAM", "BENGALURU EAST", "BENGALURU CANT", "KSR BENGALURU", "KENGERI", "BIDADI",
    "RAMANGARAM", "CHANNAPATNA", "MADDUR", "MANDYA", "PANDAVAPURA", "MYSURE", "ERODE", "TOTIYAPALAYAM",
    "PERUNDURAI", "INGUR", "VIJAYAMANGALAM", "ULTHUKUZHI", "TIRUPPUR", "VANJIPALAYAM", "SOMANU", "SULUR",
    "IRUGUR", "SINGANALLUR", "PILAMEDU", "COIMBATORE EAST", "COIMBATORE", "COIMBATORE", "COIMBATORE-NORTH",
    "KARAIMADAI", "METUPALAYAM", "METUPALAYAM", "COONOOR", "ARAVANKADU", "KETTI", "LOVEDALE", "UDAGAMANDALAM"
  ];

  const allState = ["CHENNAI EGMORE", "MYSURE", "COIMBATORE EAST", "METUPALAYAM", "UDAGAMANDALAM", "COIMBATORE", "CHENNAI", "ERODE","SALEM","COIMBATORE-NORTH"];
  const classes = ["First Class", "Second Class", "Third Class", "Sleeper Class", "AC Chair Car", "AC 3 Tier", "AC 2 Tier"];

  return (
    <div className="add-ticket-container">
      <h2>Add Ticket</h2>
      <form   id="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fromStation">From Station:</label>
          <Select
            style={{ width: '100%' }}
            value={ticketData.fromStation}
            onChange={(value) => setTicketData({ ...ticketData, fromStation: value })}
            required
          >
            {allStates.map(state => (
              <Option key={state} value={state}>{state}</Option>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="toStation">To Station:</label>
          <Select
            style={{ width: '100%' }}
            value={ticketData.toStation}
            onChange={(value) => setTicketData({ ...ticketData, toStation: value })}
            required
          >
            {allState.map(state => (
              <Option key={state} value={state}>{state}</Option>
            ))}
          </Select>
          </div>
        <div className="form-group">
          <label htmlFor="departureDate">Date of Travel:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={ticketData.departureDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Count">Count:</label>
          <input
            type="Number"
            id="Count"
            name="Count"
            value={ticketData.Count}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Class:</label>
          <Select
            style={{ width: '100%' }}
            value={ticketData.Class}
            onChange={(value) => setTicketData({ ...ticketData, Class: value })}
            required
          >
            {classes.map((cls, index) => (
              <Option key={index} value={cls}>{cls}</Option>
            ))}
          </Select>
        </div>

        <div className="form-group">
          <label>General:</label>
          <Radio.Group
            onChange={(e) => setTicketData({ ...ticketData, General: e.target.value })}
            value={ticketData.General}
          >
            <Radio value="personWithDisability">Person with Disability</Radio>
            <Radio value="berthPreference">Available Berth Preference</Radio>
          </Radio.Group>
        </div>

    
        <div className="form-group">
          <label htmlFor="pnrNumber">PNR Number:</label>
          <input
            type="text"
            id="pnrNumber"
            name="pnrNumber"
            value={ticketData.pnrNumber}
            onChange={handleInputChange}
            disabled
          />
        </div>  
        <div className="form-group">
          <label htmlFor="Count">Seat NO:</label>
          <input
            type="Number"
            id="seatNumber"
            name="seatNumber"
            value={ticketData.seatNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Berth">Berth:</label>
          <input
            type="text"
            id="Berth"
            name="Berth"
            value={ticketData.Berth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalAmount">Total Fare:</label>
          <input
            type="text"
            id="totalAmount"
            name="totalAmount"
            value={ticketData.totalAmount}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <Razor />
    
        
        <button type="submit" className="btn btn-success w-100 rounded-0">Add Ticket</button>
        
      </form>
    </div>
  );
}

function Razor() {
  const [amount, setamount] = useState('');

  const handleSubmit1 = (e)=>{
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
     <button  className="btn btn-success w-100 rounded-0" onClick={handleSubmit1}>submit</button>
    </div>
  );
}

export default AddTicket;