const cron = require('node-cron');
const ConfirmedAds = require('./models/confirmedAdsModel');
const Ads = require('./models/advertisementModel');

// Define the cron job
cron.schedule('0 0 */1 * *', async () => { // Runs at midnight every day
    try {
        // Find confirmed advertisements older than 10 days
        const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // Current time minus 10 days
        const olderAds = await ConfirmedAds.find({ createdAt: { $lt: tenDaysAgo } });

        // Move older ads to the ads collection
        for (const ad of olderAds) {
            await Ads.create(ad.toObject()); // Create a new ad in the ads collection
            await ConfirmedAds.findByIdAndDelete(ad._id); // Delete the ad from the confirmedads collection
        }
    } catch (error) {
        console.error('Error executing scheduled job:', error);
    }
});
