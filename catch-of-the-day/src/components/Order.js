import React from "react";

class Order extends React.Component {
  render() {
    const orderIds = Object.keys(this.props.order);
    // const total = orderIds.reduce();

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {orderIds}
      </div>
    );
  }
}

export default Order;
