const CHILD_SHEET_NAME = 'ORDER'
const SPREADSHEET_ID = '1mc1gBy62CG389XSssR23LAKKokMGnOOUZB1a5oEeXBc'
const DESIRED_ORDER = [
  'status',
  'id',
  'fullname',
  'email',
  'phone',
  'country',
  'postal_code',
  'address',
  'order_items',
  'height',
  'weight',
  'measurements',
  'message',
  'order_date'
] // A-N range

const SHEET_ORDER_WRITABLE_RANGE = 'A:N'

module.exports = {
  CHILD_SHEET_NAME,
  SPREADSHEET_ID,
  DESIRED_ORDER,
  SHEET_ORDER_WRITABLE_RANGE
}
