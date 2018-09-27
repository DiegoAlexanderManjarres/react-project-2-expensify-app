import React from 'react'
import Parser from 'html-react-parser'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {
 	constructor(props) {
		super(props)
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: '',
			titleButton: props.expense? 'Save Expense' : 'Add Expense'
		}
  }
  
   onDescriptionChange = (e) => {
		e.preventDefault();
		const description = e.target.value;
		this.setState(() => ({ description }));
  }
  	onNoteChange = (e) => {
		e.preventDefault()  
		const note = e.target.value;
		this.setState(() => ({ note }))
  }
 	onAmountChange = (e) => {
		e.preventDefault();
		const reg = /^\d{1,}(\.\d{0,2})?$/;
		const amount = e.target.value;
		if (!amount || amount.match(reg)) {
			this.setState(() => ({ amount }));
		} 
  }
  onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}    
   }
  	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }))
   }
   onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.description || !this.state.amount) {
		// Set error state to 'Please provide description and amount'
		// used module html-react-parser for the template string with html
			this.setState(() => ({
				...this.state, 
				error: `
				   Please provide 
					<strong> description </strong> 
					and 
					<strong> amount </strong>.
				`
			}));
		} else {
		// Clear the error
			this.setState(() => ({ ...this.state, error: '' }));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			})
		}
   }
   render(){
		return (	
			<form className="form" onSubmit={this.onSubmit}>
				{
					this.state.error && 
					<p className="form__error">{Parser(this.state.error)}</p>
				}
					<input
						type='text'
						placeholder='Description'
						autoFocus
						className="text-input"
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input 
						type="text"
						placeholder="Amount"
						className="text-input"
						value={this.state.amount}
						onChange={this.onAmountChange}            
					/>
					<SingleDatePicker 
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
						block
						/>
					<textarea 
						placeholder="Add a note for your expense (optional)"
						value={this.state.note}
						onChange={this.onNoteChange}
						className="textarea"/>
					<div>
						<button className="button">{this.state.titleButton}</button>
					</div>	
			</form>
			
		)
  }
}
