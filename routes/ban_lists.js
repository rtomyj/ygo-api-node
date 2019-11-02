const router = require('express').Router()
const con = require('../mysql/con')

function fixDate(date)
{
	if (date < 9)	return `0${date}`
	return date
}

const cache = new WeakMap()


router.get('/', (req, res, err) => {
	if (cache['dates'] != null) res.send(cache['dates'])
	else
	{
		let sql = 'select distinct ban_list_date from ban_lists'
		con.query(sql, (err, data) => {
			if (err) console.log('err')
			else
			{
				let dates = data.map(row => {
					listDate = row.ban_list_date
					let dateStr = `${listDate.getFullYear()}-${fixDate(listDate.getMonth() + 1)}-${listDate.getDate()}`

					return dateStr
				})

				result = {
					"banListStartDates": dates
				}
				cache['dates'] = result
				res.send(result)
			}
		})
	}
})

module.exports = router