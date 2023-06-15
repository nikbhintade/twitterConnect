require("dotenv").config();
const { newKit } = require("@celo/contractkit");
const { OdisUtils } = require("@celo/identity");

async function socialConnect(handle) {
	console.log("Checking connection for handle:", handle);

	let ISSUER_PRIVATE_KEY = process.env.PRIVATE_KEY;

	try {
		const kit = await newKit("https://alfajores-forno.celo-testnet.org");
		kit.addAccount(ISSUER_PRIVATE_KEY);
		const issuerAddress =
			kit.web3.eth.accounts.privateKeyToAccount(
				ISSUER_PRIVATE_KEY
			).address;
		kit.defaultAccount = issuerAddress;

		console.log("ContractKit instance created.");
		console.log("Issuer Address:", issuerAddress);

		const userPlaintextIdentifier = handle;
		// const userAccountAddress = "0xAdF2ABd3aeac943123F0Dc825ce3E9152C9f81D2";

		console.log("User Plaintext Identifier:", userPlaintextIdentifier);
		// console.log("User Account Address:", userAccountAddress);

		const attestationVerifiedTime = Date.now();

		console.log("Attestation Verified Time:", attestationVerifiedTime);

		const authSigner = {
			authenticationMethod:
				OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
			contractKit: kit,
		};
		const serviceContext = OdisUtils.Query.getServiceContext("alfajores");

		console.log("Service Context:", serviceContext);

		const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
			issuerAddress,
			authSigner,
			serviceContext
		);

		console.log("Remaining Quota:", remainingQuota);

		if (remainingQuota < 1) {
			const stableTokenContract = await kit.contracts.getStableToken();
			console.log(
				"Stable Token Contract Address:",
				stableTokenContract.address
			);
			const odisPaymentsContract = await kit.contracts.getOdisPayments();
			console.log(
				"ODIS Payments Contract Address:",
				odisPaymentsContract.address
			);
			const ONE_CENT_CUSD_WEI = 9000000000000000;
			try {
				await stableTokenContract
					.increaseAllowance(
						odisPaymentsContract.address,
						ONE_CENT_CUSD_WEI
					)
					.sendAndWaitForReceipt();
				console.log("Increased Stable Token Allowance");
			} catch (error) {
				console.error(
					"Error in Stable Token Contract: Increase Allowance"
				);
				console.error(error);
			}
		}

		const { obfuscatedIdentifier } =
			await OdisUtils.Identifier.getObfuscatedIdentifier(
				handle,
				OdisUtils.Identifier.IdentifierPrefix.TWITTER,
				issuerAddress,
				authSigner,
				serviceContext
			);

		// console.log("Obfuscated Identifier:", obfuscatedIdentifier);

		const federatedAttestationsContract =
			await kit.contracts.getFederatedAttestations();

		const attestations =
			await federatedAttestationsContract.lookupAttestations(
				obfuscatedIdentifier,
				["0x2705605dc8cE700B82928aAA061A5979FdC3A2CD"]
			);

		console.log("Attestations Accounts:", attestations.accounts);

		return attestations.accounts;
	} catch (error) {
		console.error("An error occurred:", error);
		throw error;
	}
}

module.exports = {
    socialConnect
}