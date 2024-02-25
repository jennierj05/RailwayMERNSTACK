import React, { useState } from 'react';
import { Form, Button } from 'antd';

const PnrForm = () => {
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const apiUrl = `/api/v1/analytics/pnr-status?pnrNumber=${values.pnrNumber}`;
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.success) {
        setQueryResult(data);
      } else {
        setQueryResult([]);
        console.log('No data found for the specified criteria');
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    form.setFieldsValue({
      [name]: value
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="pnrNumber" label="Enter PNR Number:">
          <input
            type="text"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      {!loading && queryResult.length > 0 && (
        <div className="query-result">
          <h3>Ticket Information</h3>
          <table>
            <thead>
              <tr>
                <th>From Station</th>
                <th>To Station</th>
                <th>Berth</th>
                <th>Seat Number</th>
                <th>Departure Date</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {queryResult.map((resultItem, index) => (
                <tr key={index}>
                  <td>{resultItem.fromStation}</td>
                  <td>{resultItem.toStation}</td>
                  <td>{resultItem.Berth}</td>
                  <td>{resultItem.seatNumber}</td>
                  <td>{resultItem.departureDate}</td>
                  <td>{resultItem.Class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PnrForm;
