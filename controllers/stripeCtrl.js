// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51JaNRWFTU8njpX3HbtlLNrglLc67VZ2VBk5UmNiCoZ6VKtsi8GGZGCy9NMshk1gUy5VB74VduEmR4Y8doQ2Ej5P900FDQHhtRO');

function generateAccountLink(accountID, origin) {
    return stripe.accountLinks.create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/stripe/refresh`,
        return_url: `${origin}/`,
    }).then((link) => link.url);
}

const stripeCtrl = {
    register: async (req, res) => {
        try {
            const account = await stripe.accounts.create({ type: "express" });
            req.session.accountID = account.id;

            const origin = `${req.headers.origin}`;
            const accountLinkURL = await generateAccountLink(account.id, origin);
            res.send({ url: accountLinkURL });
            // res.status(201).json(account)
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
            const origin = `${req.secure ? "https://" : "https://"}${req.headers.host}`;

            const accountLinkURL = await generateAccountLink(accountID, origin)
            res.redirect(accountLinkURL);
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}


module.exports = stripeCtrl