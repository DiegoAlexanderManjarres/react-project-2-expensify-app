import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import uuidv4 from 'uuidv4'
import { 
	setTextFilter, 
	sortByAmount, 
	sortByDate, 
	setStartDate,
	setEndDate 
} from '../actions/filters'


export class  ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null,
		idGennerator: uuidv4()
	}  
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate)
		this.props.setEndDate(endDate)
	}
	onFocusChange = (calendarFocused) => (
		this.setState(() => ({ calendarFocused }))
	)
	onTextChange = (e) => {
		const text = e.target.value;
		this.props.setTextFilter(text);
	}
	onSortChange = (e) => (
		e.target.value === 'date' 
		? this.props.sortByDate() 
		: this.props.sortByAmount()        
	)		
	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group__item">
						<input 
							type='text' 
							value={this.props.filters.text}
							onChange={this.onTextChange}
							className="select"
							placeholder="Search Expenses"/>							
					</div>
					<div className="input-group__item">
						<select
							onChange={this.onSortChange}
							className="text-input">
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker 
							startDate={this.props.filters.startDate}
							endDate={this.props.filters.endDate}
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calendarFocused}
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							isOutsideRange={() => false}
							showClearDates={true}
							startDateId={this.state.idGennerator}
							endDateId={this.state.idGennerator}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: (amount) => dispatch(sortByAmount(amount)),
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

const mapStateToProps = (state) => ({
	filters: state.filters
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)