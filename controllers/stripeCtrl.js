const Items = require('../models/itemModel')
const Users = require('../models/userModel');

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51JaNRWFTU8njpX3HbtlLNrglLc67VZ2VBk5UmNiCoZ6VKtsi8GGZGCy9NMshk1gUy5VB74VduEmR4Y8doQ2Ej5P900FDQHhtRO');

function generateAccountLink(accountID, origin, itemID) {
    return stripe.accountLinks.create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}stripe/refresh?id=${itemID}`,
        return_url: `${origin}stripe/complete?id=${itemID}`
    }).then((link) => link.url);
}

const stripeCtrl = {
    register: async (req, res) => {
        try {
            const account = await stripe.accounts.create({
                country: 'US',
                type: 'express',
                email: req.session.user.email,
                business_type: "individual",
                business_profile: {
                    product_description: req.body.item.title,
                },
                capabilities: {
                    card_payments: {
                        requested: true,
                    },
                    transfers: {
                        requested: true,
                    },
                },
            });
            const user = await Users.findOne({ email: req.session.user.email });
            user.account = account;
            await user.save();
            req.session.user = user;
            const origin = `${req.headers.origin}`;
            const accountLinkURL = await generateAccountLink(account.id, origin, req.body.item.item_id);
            res.send({ url: accountLinkURL });
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    refresh: async (req, res) => {
        if (!req.session?.user?.account?.id) {
            res.redirect("/");
            return;
        }
        try {
            const accountID = req.session.user.account.id;
            const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}/`;
            const accountLinkURL = await generateAccountLink(accountID, origin, req.query.id)
            res.redirect(accountLinkURL);
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    complete: async (req, res) => {
        try {
            const origin = `${req.headers.origin}`;
            const item = await Items.findOne({ item_id: req.query.id })
            item.active = true;
            item.sellerID = req.session.user.account.id;
            await item.save()
            const account = await stripe.accounts.retrieve(
                req.session.user?.account?.id
            );
            const user = await Users.findOne({ email: req.session.user.email })
            user.account = account;
            await user.save();
            res.redirect(`${origin}/itemdetails/${item.id}`)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    get: async (req, res) => {
        try {
            if (!req.session?.user?.account?.id) {
                res.status(401).json({ error: "No seller account" })
            }
            const account = await stripe.accounts.retrieve(
                req.session.user?.account?.id
            );
            const user = await Users.findOne({ email: req.session.user.email })
            user.account = account;
            await user.save();
            res.status(200).json(account)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    createCheckout: async (req, res) => {
        try {
            const origin = `${req.headers.origin}`;
            const item = await Items.findOne({ item_id: req.body.item_id })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    name: item.title,
                    amount: item.price + '00',
                    currency: 'usd',
                    quantity: 1,
                    // images: item.images.url
                }],
                payment_intent_data: {
                    application_fee_amount: 123,
                    transfer_data: {
                        destination: item.sellerID
                    },
                },
                success_url: `${origin}/stripe/checkout_complete/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/stripe/checkout_canceled/?session_id={CHECKOUT_SESSION_ID}`,
            })
            item.checkoutid = session.id
            await item.save()
            res.json({ url: session.url })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    checkoutComplete: async (req, res) => {
        try {
            const origin = `${req.headers.origin}`;
            const { session_id } = req.query;
            const session = await stripe.checkout.sessions.retrieve(session_id);
            const item = await Items.findOne({ checkoutid: session.id })
            item.active = false
            await item.save()
            res.redirect(`${origin}/checkout_complete/${session.id}`)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    checkoutCanceled: async (req, res) => {
        try {
            const origin = `${req.headers.origin}`;
            const { session_id } = req.query;
            const session = await stripe.checkout.sessions.retrieve(session_id);
            const item = await Items.findOne({ checkoutid: session.id })
            item.checkoutid = null
            await item.save()
            res.redirect(`${origin}/itemdetails/${item.id}`)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}


module.exports = stripeCtrl