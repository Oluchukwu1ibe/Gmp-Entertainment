import Subscriber from "../models/subscribe.js"
import logger from '../utils/log/log.js';


export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !/.+\@.+\..+/.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Check if email is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({ error: 'Email is already subscribed' });
        }

        // Create new subscriber
        const newSubscriber = await Subscriber.create({ email });
        logger.info({ message: 'Successfully subscribed to the newsletter', subscriber: newSubscriber })
        res.status(201).json({ message: 'Successfully subscribed to the newsletter', subscriber: newSubscriber });
    } catch (err) {
        logger.error('Error subscribing to newsletter', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};