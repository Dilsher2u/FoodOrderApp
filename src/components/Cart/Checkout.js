import React from "react"
import classes from './Checkout.module.css';
import { useRef, useState } from "react";

// const isEmpty = value => value.trim()==='';
// const isFiveChars = value => value.trim().length ===5;

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street: true,
        city:true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()
    const confirmHandler = (event) => {
        event.preventDefault();
        const entertedName = nameInputRef.current.value;
        const entertedStreet = streetInputRef.current.value;
        const entertedPostalcode = postalCodeInputRef.current.value;
        const entertedCity = cityInputRef.current.value;

        const entertedNameIsValid = !isEmpty(entertedName)
        const entertedStreetIsValid = !isEmpty(entertedStreet)
        const entertedCityIsValid = !isEmpty(entertedCity)
        const entertedPostalCodeIsValid = isFiveChars(entertedPostalcode)

        setFormInputValidity({
            name: entertedNameIsValid,
            street: entertedStreetIsValid,
            city: entertedCityIsValid,
            postalCode: entertedPostalCodeIsValid,
        });

        const formIsValid = entertedNameIsValid && entertedStreetIsValid && entertedCityIsValid && entertedPostalCodeIsValid
        

        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name: entertedName,
            street: entertedStreet,
            postalCode: entertedPostalcode,
            city: entertedCity
        });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street  ? '' : classes.invalid }`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode  ? '' : classes.invalid }`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref  = {postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal Code</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street  ? '' : classes.invalid }`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref = {cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity  ? '' : classes.invalid }`}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;