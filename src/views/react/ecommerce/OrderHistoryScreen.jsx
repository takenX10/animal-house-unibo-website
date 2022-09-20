import React, { useContext, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from '../../../components/ecommerce/LoadingBox';
import MessageBox from '../../../components/ecommerce/MessageBox';
import { Store } from '../../../context/Store';
import "../../../assets/css/ecommerce.css";


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export default function OrderHistoryScreen() {

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const request = await fetch('/api/shop/orders/mine', {
          method: 'GET',
          headers: new Headers({ authorization: `Bearer ${userInfo.token}` })
        });
        const data = await request.json();

        if (!request.ok)
          throw new Error(data.message);
        console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      }
    }
    fetchData();
  }, [userInfo])

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1 className="my-3">Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th className="d-none d-md-table-cell">PAID</th>
              <th className="d-none d-md-table-cell">DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="d-none d-md-table-cell">{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td className="d-none d-md-table-cell" >{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td className="d-none d-md-table-cell" >{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                <td>
                  <Button
                    type='button'
                    variant='light'
                    className="mb-0"
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
