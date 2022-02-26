import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllOrders, subscribeToEvents } from '../store/interactions'
import OrderBook from './OrderBook'
import Trades from './Trades'
import MyTransactions from './MyTransactions'
import PriceChart from './PriceChart'
import Balance from './Balance'
import NewOrder from './NewOrder'
import { exchangeSelector,
         tokenSelector,
         web3Selector
 } from '../store/selectors'


class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, web3, exchange, token } = props
    await loadAllOrders(exchange, dispatch, token, web3)
    await subscribeToEvents(exchange, web3, token, dispatch)
  }

  render() {
    return (
      <div className="content">
        <div className="vertical-split">
          <Balance />
          <NewOrder />
        </div>
        <OrderBook />
        <div className="vertical-split">
          <PriceChart />
          <MyTransactions />
        </div>
        <Trades />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state)

  }
}

export default connect(mapStateToProps)(Content)
