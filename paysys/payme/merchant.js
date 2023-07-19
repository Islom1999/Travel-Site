const {PaymeIntegrator, PaymeIntegratorType} = require('payme-merchant-integrator');
const {Router} = require('express')

const OrderModel = require('../../model/orderModel')

const router = Router()

const isAccountExist = async (account) => {
    const order = await OrderModel.findOne({number: +account.order_id});
    if (!order) return false; 
    if (order.paid_at) return false;
    return true; 
}

const getPayingCost = async (account) => {
    const order = await OrderModel.findOne({number: +account.order_id});
    return order.amount;
}

const markAsPaid = async (account, amount) => {
    const order = await OrderModel.findOne({number: +account.order_id});
    // Order mark as paid here
    console.log(`Order Paid ${order.number} amount -> ${amount}`)
    await OrderModel.updateOne({_id: order._id}, {$set: {created_paid: new Date(),paid_at:true}})
}
const markAsCancel =async (account)=>{
    const order = await OrderModel.findOne({number: +account.order_id});
    await OrderModel.updateOne({_id: order._id}, {$set: {paid_at: false,cancel_at_paid:new Date()}})
}
const paymeIntegrator = new PaymeIntegrator({
    db_str: process.env.MONGO_URI || 'mongodb+srv://my-travel-boysun:Boysun-my-travel-2022@cluster0.lk0ujyq.mongodb.net/myTravel',
    collection: `payme_transactions`,
    type: PaymeIntegratorType.ONE_TIME,
    password: 'W9UwBVIk#fAKXaS9?0vA?Hd%jPojp2ZVD0SQ',
    isAccountExist,
    markAsPaid,
    getPayingCost,
    canCancel: async () => true,
    markAsCancel,
})

const authenticate = async (request, reply, next) => {
    await paymeIntegrator.authenticate(request, reply, next);
}

const handler = async (request, reply) => {
    return await paymeIntegrator.handler(request, reply);
}

router.post('/payme', authenticate, handler)

module.exports = router