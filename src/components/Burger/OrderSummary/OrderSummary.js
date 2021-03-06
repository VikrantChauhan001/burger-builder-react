import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button';

const orderSummary = ( props ) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (<li key = {igKey}>
                    <span style = {{textTransform: 'capitalize'}}>{igKey} </span>: {props.ingredients[igKey]}
                </li>);
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>Total Price: $ {props.totalPrice.toFixed(2)}</h4>
            <p>Continue to Checkout?</p>
            <Button clicked = {props.purchaseCanceled} btnType = "Danger">CANCEL</Button>
            <Button clicked = {props.purchaseContinued} btnType = "Success" >CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;