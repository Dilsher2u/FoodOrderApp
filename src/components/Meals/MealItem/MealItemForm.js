import React, {useRef, useState} from "react";
import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = (props) =>{

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandler = event =>{
        
        event.preventDefault();
        const enteredInputAmount = amountInputRef.current.value;
        const enteredInputAmountNumber = +enteredInputAmount;

        if(enteredInputAmount.trim().length===0 || enteredInputAmountNumber<1 || enteredInputAmountNumber>5){
            setAmountIsValid(false)
            return;
        }
        props.onAddToCart(enteredInputAmountNumber)
    };


    return (
        <form className = {classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount" 
                input={{
                    id:"Amount_"+props.id,
                    type:"number",
                    min: "1",
                    step:"1",
                    defaultValue: "1"
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount </p>}
        </form>
    )
};

export default MealItemForm