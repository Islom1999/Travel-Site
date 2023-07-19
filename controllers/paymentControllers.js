
const Order = require('../model/orderModel')

const createOrder = async (req, res) => {
    try {
        const orderData = await Order.find()
        const {firstName, lastName, date, email, phone, address, peopleCount, country, amount} = req.body
        let number = 1
        const oldNumber = orderData[orderData.length - 1]?.number

        console.log(req.body)

        if (Boolean(oldNumber)) {
            number = parseInt(oldNumber) + 1
        }
        const newOrder = {
            number,
            firstName,
            lastName,
            date,
            email,
            phone,
            address,
            peopleCount,
            country,
            amount,
            created_at: new Date()
        }

        const MERCHANT_ID = process.env.MERCHANT_ID || '62ed0fe539c675be34e66bb6'

        const result = await Order.create(newOrder)
        console.log(result, 'aaa', result.number, 'amount', result.amount)
        const link = Buffer.from(`m=${MERCHANT_ID};ac.order_id=${result.number};a=${result.amount*100}`).toString("base64")
        console.log(link)
        const payme_link = `https://checkout.paycom.uz/${link}`
        res.redirect(payme_link)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createOrder
}