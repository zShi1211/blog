import moment from 'moment'

export default function index({ date, format }) {
  return moment(date).format(format)
}
