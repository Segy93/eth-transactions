///<reference path="types/crawler.js" />
(function () {
    /**
     * Initialization function on DOMContentLoaded
     */
    function init() {
        initListeners();
    }

    /**
     * Listeners initialization
     */
    function initListeners() {
        document.addEventListener('Account.Balance.Requested', getBalance, false);
    }


    /**
     * Custom event for account balance
     *
     * @param {CustomEvent<InterfaceWalletBalanceSubmitted>} event CustomEvent with detail data
     */
    function getBalance(event) {
        const data = event.detail;
        const timestamp = new Date(data.form.elements.date.value).getTime() / 1000;
        const params = `?module=block&action=getblocknobytime&address=${data.address}&timestamp=${timestamp}&closest=before${data.api_key}`;
        fetch(`${data.api}${params}`)
            .then((res) =>
                res.json()
            )
            .then((out) =>
                printBalance(out, data.address)
            )
            .catch(function(err) { throw err; })
        ;
    }

    /**
     * Prints account balance
     *
     * @param {Object} data    Prints data from api
     * @param {String} address Public address
     */
    function printBalance(data, address) {
        // Create an Ethereum provider using Infura
        // eslint-disable-next-line no-undef
        const provider      = new ethers.providers.InfuraProvider('mainnet', 'e98f0fe20eb84e87b1de8f34746c7114');
        const block_number  = parseInt(data.result, 10);

        // Get the ETH balance of the address at the specified block number
        const eth_promise   = provider.getBalance(address, block_number);
        Promise.all([eth_promise])
            .then(([eth_balance]) => {
                // eslint-disable-next-line no-undef
                alert(`Eth balance: ${ethers.utils.formatEther(eth_balance)}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    document.addEventListener("DOMContentLoaded", init);
}());
