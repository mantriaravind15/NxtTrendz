import './index.css'
import { FaGooglePay } from "react-icons/fa";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Component } from "react";
import CartContext from '../../Context';
import { Link } from 'react-router-dom';

class Payment extends Component {
  state = {
    onShowDetails: false,
    onPayUpi: false,
    paymentSucces: false,
  }

  onClickPrice = () => {
    this.setState(prevState => ({
      onShowDetails: !prevState.onShowDetails
    }))
  }

  onPayUpiMode = () => {
    this.setState(prevState => ({
      onPayUpi: !prevState.onPayUpi
    }))
  }

  payThroughUpi = () => {
    this.setState({ paymentSucces: true })
  }

  renderSuccessView = () => {
    const deliveryDate = Math.ceil(Math.random() * 10)
    return (
      <div className="payment-success-container">
        <div className='payment-success'>
 <h1>Payment Success</h1>
        <p>Your Order Delivery Expected In {deliveryDate} days</p>
        <Link to="/products">
          <button type='button'>Shop More</button>
        </Link>
        </div>
       
      </div>
    )
  }

  renderPaymentView = () => {
    const { onShowDetails, onPayUpi } = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const { cartList } = value
          let total = 0

          // Calculate total from cart items
          cartList.forEach(element => {
            total += element.price * element.quantity
          })

          const processingFee = total * 0.01 // 1% processing fee
          const totalPay = total + processingFee

          return (
            <div className="payment-main-container">
              <div className="payments-header">
                <h1>Payments</h1>
                <p>100% Secure</p>
              </div>

              <div>
                {onShowDetails && (
                  <div className='payments-header-status-bar'>
                    <div className="payments-header">
                      <p>Price</p>
                      <p><MdOutlineCurrencyRupee/> {total.toFixed(2)}</p>
                    </div>
                    <div className="payments-header">
                      <p>Processing Fee</p>
                      <p><MdOutlineCurrencyRupee/> {processingFee.toFixed(2)}</p>
                    </div>
                    <hr />
                  </div>
                )}

                <div className="payments-header-status" onClick={this.onClickPrice}>
                  <p>Total Amount</p>
                  <p>
                    <MdOutlineCurrencyRupee/>  {totalPay.toFixed(2)} {onShowDetails ? <GoChevronUp /> : <GoChevronDown />}
                  </p>
                </div>
              </div>

              <div onClick={this.onPayUpiMode}>
                {onPayUpi ? (
                  <div>
                    <div className='gpay'>
                      <p>Google Pay</p>
                      <FaGooglePay />
                    </div>
                    <button onClick={this.payThroughUpi} className='pay'><MdOutlineCurrencyRupee/> {totalPay.toFixed(2)}</button>
                  </div>
                ) : (
                  <div className='payment-upi-pay'>
                    <div className='payment-upi'>
                      <p>UPI Logo</p>
                      <h1>Pay UPI</h1>
                    </div>
                    <GoChevronDown />
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const { paymentSucces } = this.state
    return paymentSucces ? this.renderSuccessView() : this.renderPaymentView()
  }
}

export default Payment
