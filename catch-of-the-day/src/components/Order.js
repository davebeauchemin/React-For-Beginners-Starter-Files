import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 }
    };

    // Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 250, exit: 250 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order); // will print ["fish1"]
    // prevTotalt is total from start, key is ["fish1"] from orderIds
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]; // fishes["fishes1"] - get the infos of the ["fish1"]
      const count = this.props.order[key]; // order["fishes1"] - Get the amount of the order {fish1: 3}
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
