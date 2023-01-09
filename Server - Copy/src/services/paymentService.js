const Stripe = require('stripe');
import {v4 as uuidv4} from 'uuid';
const db = require("../models");
require('dotenv').config();


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const CHECKOUT_COMPLETE = 'checkout.session.completed';
const REFUND_COMPLETE = 'charge.refunded';

let createCheckoutSession = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType
                || !data.date || !data.fullName
                || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                const token = uuidv4();
                // await saveData(data, resolve, token);
                const session = await stripe.checkout.sessions.create(await sessionConfig(data, token));
                console.log(session);
                resolve({
                    errCode: 0,
                    checkoutURL: session.url
                })
            }
        } catch (e) {
            reject(e)
        }
    });

}

let createRefund = async (data) => {
    const bill = ''; // find bill

    if (!bill) {
        throw new Error('Hóa đơn không tồn tại')
    }

    return await stripe.refunds.create({
        payment_intent: bill.id,
        amount: 0,
    })
}

async function eventHandler(data, type) {
    switch (type) {
        case CHECKOUT_COMPLETE:
            // function after checkout
            await stripe.checkout.sessions.expire(data.id);
            break;
        case REFUND_COMPLETE:
            //function after refund
            break;
    }
}

async function saveData(data, resolve, token) {
    //upsert patient(sequielize)
    // let user = await db.User.findOrCreate({
    //     where: {email: data.email},
    //     defaults: {
    //         email: data.email,
    //         roleId: 'R3',
    //         gender: data.selectedGender,
    //         address: data.address,
    //         firstName: data.fullName
    //     }
    // });
    // //create
    // if (user && user[0]) {
    //     await db.Booking.findOrCreate({
    //         where: {patientId: user[0].id},
    //         defaults: {
    //             statusId: 'S1',
    //             doctorId: data.doctorId,
    //             patientId: user[0].id,
    //             date: data.date,
    //             timeType: data.timeType,
    //             token: token
    //         }
    //     })
    // }

    let user = await db.User.findOne({
        where: { email: data.email },
      });
      if (user) {
        await db.Booking.findOrCreate({
          where: { doctorId: data.doctorId,date: data.date, timeType: data.timeType, token: token },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user.id,
            date: data.date,
            timeType: data.timeType,
            token: token,
          },
        });
      }
    let schedule = await db.Schedule.findOne({
        where: {
            doctorId: data.doctorId,
            date: data.date,
            timeType: data.timeType,
            status: 1,
        },
        raw: false,
    });

    if (schedule) {
        schedule.status = false;
        await schedule.save();
        resolve({
            errCode: 0,
            errMessage: "Update the schedule succeed !",
        });
    } else {
        resolve({
            errCode: 2,
            errMessage: "schedule has been disabled or does not exist !",
        });
    }

    resolve({
        data: user,
        errCode: 0,
        errMessage: 'Succeed!'
    })
}

async function sessionConfig(data, token) {
    return {
        line_items: [
            {
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: data.doctorName,
                    },
                    unit_amount: data.doctorPrice,
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        customer_email: data.email,
        submit_type: 'pay',
        locale: 'vi',
        success_url: buildUrlEmail(data.doctorId, token),
        cancel_url: 'https://doctorcare-frontend.herokuapp.com',
    }
}

let buildUrlEmail = (doctorId, token) => {
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
}

module.exports = {
    createCheckoutSession,
    createRefund,
    eventHandler
}
