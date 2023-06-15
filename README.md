# Twitter Connect: Bridging Web2 and Web3 for Transparent Twitter Engagement

Twitter Connect is an extension that allows you to easily check if a Twitter account is linked to an on-chain wallet, providing you with the on-chain activities associated with that account.

This functionality is made possible through Social Connect, a project that enables users to connect their Web2 identifiers, like Twitter accounts, Phone Numbers, Discord Usernmes and even email addresses, with their on-chain wallets.

With Social Connect, crypto influencers can connect their Twitter account with their on-chain accounts  to foster greater transparency between them and their audience. This is an essential first step towards migrating one's Web2 footprint to the decentralized Web3 world and Twitter Connect hopes be be part this first step.

## How to Use Twitter Connect on Your Local Machine

Here's a quick guide to running Twitter Connect on your local machine:

1. Begin by cloning the Twitter Connect repository into a folder of your choice.
2. Enable developer mode in your Chrome browser by navigating to chrome://extensions.
3. Look for the "Load unpacked" button and click on it. This will open your file explorer.
4. Select the folder where you cloned the Twitter Connect repository, specifically the extension folder, and click "Select folder."
5. Voila! The extension will now be installed in your browser.
6. Open the extension and click on activate.
7. For testing purposes, we have pre-associated Twitter accounts with connected on-chain wallets. You can explore and test the extension using these Twitter accounts.

## Built With

Twitter Connect consists of two key components: the extension and the backend.

The extension is built using HTML, CSS, and JavaScript, ensuring a user-friendly and seamless experience.

The backend of Twitter Connect is developed with Node.js, Express, Mongoose, and other technologies. To efficiently determine if a Twitter handle is linked to an on-chain wallet, the backend stores the handle and its corresponding address in MongoDB. Regular updates are performed to check for any changes in the associated wallet addresses, ensuring accurate information.

## What's Next?

Our next milestone for Twitter Connect is to publish it on the Chrome Store, making it readily available for a wider audience.

Additionally, implementation of more advanced functionalities and features into the extension, further enhancing its value and usefulness.
