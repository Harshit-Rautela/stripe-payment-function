import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY );
export default async function(req,res){
    try {
        const {amount, currency} = JSON.parse(req.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency:currency          
        })
        res.status(201).json({client_secret:paymentIntent.client_secret})      
    } catch (err) {
        res.status(500).json({message:err.message});       
    }
}

