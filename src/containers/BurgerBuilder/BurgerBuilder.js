import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from "../../hoc/Auxiliary/Auxiliary"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIDIENT_PRICES = {
    salad: 1.3,
    cheese: 2.5,
    meat: 3.1,
    bacon: 0.7,
}



class BurgerBuilder extends Component {
    // constructor( props ){
    //     super( props )
    //     this.state = {...}
    // }


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState (updatedIngredients) {
        const ingredients = { ...updatedIngredients };
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        
        this.setState({purchasable: sum > 0});
    } 


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);

    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGRIDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddition;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    purchaseHandler =  () => {
        this.setState({purchasing:true});
    };


    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }


    purchaseContinueHandler = () => {
        alert("Enjoy your Burger!!");
        this.setState(
            {
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                totalPrice: 4,
                purchasable: false,
                purchasing: false
            }
        )
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                     purchaseCanceled = {this.purchaseCancelHandler}
                     purchaseContinued = {this.purchaseContinueHandler} 
                     totalPrice = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                    addIngredient = {this.addIngredientHandler}
                    removeIngredient = {this.removeIngredientHandler}
                    disabled = { disabledInfo }
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler} />
            </Aux>
        );
    }
};

export default BurgerBuilder;