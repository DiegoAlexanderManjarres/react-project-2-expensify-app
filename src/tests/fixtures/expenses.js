import  moment  from 'moment';
// Test data
export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
},{
    id: '2',
    note: '',
    description: 'rent',
    amount: 109500,
    createdAt: moment(0).subtract(5, 'days').valueOf()
},{
    id: '3',
    description: 'Credit card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}]
