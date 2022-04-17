import { useShopContext } from '../../context/shopContext';
import classes from './shoppingCartSummary.module.css';

export default function shoppingCartSummary() {
  const { state, funcs } = useShopContext();
  const { cart } = state;

  if (!cart)
    //TODO: return Skeleton instead
    return <span>Loading...</span>;

  return (
    <div className={classes.cont}>
      <table>
        <tbody>
          <tr>
            <th>Number of tickets:</th>
            <td>{cart.ticketsCnt}</td>
          </tr>
          <tr>
            <th>Price of tickets:</th>
            <td>
              ${cart.total} {cart.currency}{' '}
              <span className={classes.fees}>
                includes fees
                <span className={classes.feesDetail}>
                  ${cart.totalFees} {cart.currency}
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <th>Payment method fee:</th>
            <td>
              ${cart.paymentFee ? cart.paymentFee : 0} {cart.currency}
            </td>
          </tr>
          <tr>
            <th>Total charge:</th>
            <td>
              ${cart.totalCharge ? cart.totalCharge : cart.total}{' '}
              {cart.currency}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
