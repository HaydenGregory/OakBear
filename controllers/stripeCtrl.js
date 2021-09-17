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
            req.session.accountID = account.id;
            const user = await Users.findOne({ email: req.session.user.email })
            user.account = account;
            await user.save();
            const origin = `${req.headers.origin}`;
            const accountLinkURL = await generateAccountLink(account.id, origin, req.body.item.item_id);
            res.send({ url: accountLinkURL });
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    refresh: async (req, res) => {
        if (!req.session.accountID) {
            res.redirect("/");
            return;
        }
        try {
            const { accountID } = req.session;
            const origin = `${req.secure ? "https://" : "http://"}${req.headers.host}/`;
            const accountLinkURL = await generateAccountLink(accountID, origin, req.query.id)
            res.redirect(accountLinkURL);
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    complete: async (req, res) => {
        try {
            const item = await Items.findOne({ item_id: req.query.id })
            item.active = true
            await item.save()
            req.session.account = await stripe.accounts.retrieve(
                req.session.accountID
                // "acct_1JamAb2ZsmSaCyaJ"
            );
            res.redirect('/')
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    get: async (req, res) => {
        try {
            const account = await stripe.accounts.retrieve(
                req.session.user?.account?.id || req.session.accountID 
            );
            const user = await Users.findOne({ email: req.session.user.email })
            user.account = account;
            await user.save();
            res.status(200).json(account)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}


module.exports = stripeCtrl