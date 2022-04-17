import Image from 'next/image';
import { useState } from 'react';
import { useShopContext } from '../../context/shopContext';
import classes from './payment.module.css';

const paymentMethods = [
  {
    method: 'visa',
    img: '/images/Tickets/visa.png',
    w: 86,
    h: 28,
  },
  {
    method: 'mc',
    img: '/images/Tickets/mc.png',
    w: 65,
    h: 40,
  },
  {
    method: 'amex',
    img: '/images/Tickets/amex.png',
    w: 44,
    h: 44,
  },
  {
    method: 'spei',
    img: '/images/Tickets/spei.jpg',
    w: 88,
    h: 28,
  },
  {
    method: 'oxxo',
    img: '/images/Tickets/oxxo.png',
    w: 68,
    h: 38,
  },
];

export default function Payment() {
  const { state, funcs } = useShopContext()
  const { stage } = state

  if (!state) return null;

  return (
    <div className={classes.cont}>
    { stage != 'captured' &&  <PaymentMethod setPaymentFee={funcs.setPaymentFee} /> }
    { stage == 'authorized' && <Confirmation /> }
    { stage == 'captured' && <PurchaseComplete /> }
    { stage == 'error' && <Error /> }
    </div>
  );
}

function PaymentMethod(props) {
  const { setPaymentFee } = props;
  const [sel, setSel] = useState();

  function onMethodChange(e) {
    setSel(e.currentTarget.value);
    const fee = e.currentTarget.value == 'amex' ? 0.03 : 0.02;
    const gst = 0.18;
    setPaymentFee(fee * gst);
  }
  return (
    <div className={classes.cont}>
      <div>Payment method:</div>
      <div className={classes.pymnt}>
        {paymentMethods.map((m, i) => (
          <div key={i} className={classes.opt}>
            <input
              type='radio'
              name='method'
              id={m.method}
              value={m.method}
              checked={sel == m.method}
              onChange={onMethodChange}
            />
            <label htmlFor={m.method} className={classes.lbl}>
              <Image src={m.img} width={m.w} height={m.h} />
            </label>
          </div>
        ))}
      </div>
      {sel && <CardForm />}
    </div>
  );
}

function CardForm() {
  const [card, setCard] = useState({
    number: '4097440000000004',
    securityCode: '321',
    expirationDate: '2022/12',
    name: 'APPROVED',
  });
  const {
    funcs: { authorizePayment },
  } = useShopContext();

  function onPay(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    authorizePayment(card);
  }
  function onCardChange(e) {
    console.log(e.currentTarget);
    let newCard = { ...card };
    newCard[e.currentTarget.name] = e.currentTarget.value;
    setCard(newCard);
  }
  return (
    <form className={classes.form}>
      <div>
        <label htmlFor='nameoncard'>Name on Card</label>
        <input id='nameoncard' name='nameoncard' type='text' />
      </div>
      <div>
        <label htmlFor='cardNumber'>
          Card Number {/*TODO: tooltip for 'Dashes not required'*/}
        </label>
        <input
          id='cardNumber'
          name='number'
          type='text'
          placeholder='Enter your credit card number'
          value={card.number}
          onChange={onCardChange}
        />
      </div>
      <div>
        <span className={classes.expdt}>Exp. Date</span>
        <input name='experationdate' type='text' placeholder='MM/YYYY' />
      </div>
      <div className={classes.cvc}>
        <label htmlFor='cvc'>CVC</label>
        <input
          id='cvc'
          name='securityCode'
          type='text'
          placeholder='XXX'
          value={card.securityCode}
          onChange={onCardChange}
        />
      </div>
      <div>
        <button type='submit' onClick={onPay}>
          Buy Now
        </button>
      </div>
    </form>
  );
}

function Confirmation() {
    const { funcs: {capturePayment} } = useShopContext()
    function pay(e) {
        e.preventDefault()
        e.currentTarget.disabled=true
        capturePayment()
    }
    return (
        <form className={classes.form}>
            <span>Payment accepted!</span>
            <button type='submit' onClick={pay}>Confirm Purchase</button>
        </form>
    )
}

function PurchaseComplete() {
  return <div>
    <h2>Payment successful!</h2>
    <span>Your delivery method is <b>digital ticket</b>, so your ticket(s) will be delievered to your email soon.</span>
  </div>
}

function Error() {
    const { state: { error } } = useShopContext()
    console.log({error})
    return <span>Error!</span>
}
