import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad:', type: 'salad'},
    { label: 'Bacon:', type: 'bacon'},
    { label: 'Cheese:', type: 'cheese'},
    { label: 'Meat:', type: 'meat'},
];

const buildControls = ( props ) => (
    <div className = { classes.BuildControls }>
        <p>Current Price: $ { props.price.toFixed(2) }</p>
        {controls.map(ctrl => (
            <BuildControl 
            key = {ctrl.label} 
            label = {ctrl.label}
            type = {ctrl.type}
            addIngredient = {() => props.addIngredient(ctrl.type)}
            removeIngredient = {() => props.removeIngredient(ctrl.type)}
            disabled = {props.disabled[ctrl.type]} />
        ))}
        <button className = {classes.OrderButton} disabled={!props.purchasable} onClick = {props.ordered}>Order Now!</button>
    </div>
);

export default buildControls;