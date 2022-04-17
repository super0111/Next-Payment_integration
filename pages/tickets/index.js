import TimerBar from '../../components/tickets/timerBar';
import StatusBar from '../../components/tickets/statusBar';
import ShoppingCartSummary from '../../components/tickets/shoppingCartSummary'
import Payment from '../../components/tickets/payment'
import classes from './index.module.css'
import { useShopContext } from '../../context/shopContext';

export default function index() {
    const {state} = useShopContext()
    
    return (
        <div className={classes.cont}>
            <TimerBar />
            <StatusBar />
            <ShoppingCartSummary />
            <Payment />
        </div>
    );
}