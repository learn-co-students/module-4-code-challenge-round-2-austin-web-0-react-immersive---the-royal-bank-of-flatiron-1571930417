import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()

    this.state = {
      transactions: [],
      searchInput: ''
    }

  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchInput: event.target.value })
    let original = this.state.transactions
    let filteredList = [...this.state.transactions]
    if (this.state.searchInput === ''){
      this.setState({ transactions: original })
    } else {
      filteredList = filteredList.filter(transaction => {
        let downcaseCat = transaction.category.toLowerCase();
        let downcaseDesc = transaction.description.toLowerCase();
        let searchTerm = this.state.searchInput.toLowerCase();
        console.log(transaction)
        return downcaseCat.includes(searchTerm) || downcaseDesc.includes(searchTerm)
      })
      this.setState({ transactions: filteredList })
    }
  }


  componentDidMount() {
      fetch("https://boiling-brook-94902.herokuapp.com/transactions")
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ transactions: resp })
      })
  }


  render() {
    return (
      <div>
        <Search transactions={this.state.transactions} handleChange={this.handleChange}/>
        <TransactionsList transactions={this.state.transactions}/>
      </div>
    )
  }
}

export default AccountContainer
