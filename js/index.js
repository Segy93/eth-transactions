///<reference path="types/crawler.js" />
(function () {
    /** @type {InterfaceIndexConfig} */
    const config = {
        address: "",
        api:     "https://api.etherscan.io/api",
        api_key: "&apikey=QH3F3Q2AM946TTP5CZ5IEE1NNMMR2VJBRZ",
        block:   null,
        page:    1
    };

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
        const form = document.querySelector(".index__form");
        const load_more = document.querySelector(".index__form_more");
        form.addEventListener("submit", requestData, false);
        load_more.addEventListener("submit", loadMore, false);
        document.querySelector("#index__wallet").addEventListener('input', validateAddress, false);
    }

    /**
     * Requests data for address
     *
     * @param {Event} event
     */
    function requestData(event) {
        event.preventDefault();
        const form       = event.currentTarget;
        const elements   = form.elements;
        const is_balance = document.activeElement.value !== 'Request';
        config.address   = elements.wallet.value;
        if (is_balance) {
            requestBalance(form);
        } else {
            config.block     = elements.block.value;
            document.querySelector(".index__tbody").innerHTML = "";
            requestTransationList();
        }
    }

    /**
     * Validates address
     *
     * @param {Event} event Input on text field
     */
    function validateAddress(event) {
        const address  = event.currentTarget.value;
        const element  = document.querySelector("#index__wallet");
        // eslint-disable-next-line no-undef
        const is_valid = ethers.utils.isAddress(address);
        element.setCustomValidity(is_valid ? "" : "Invalid address");
    }

    /**
     * Calls custom event for transaction list
     */
    function requestTransationList() {
        /** @type {InterfaceTransactionListSubmitted} */
        const detail = {
            address: config.address,
            api:     config.api,
            api_key: config.api_key,
            block:   config.block,
            page:    config.page
        };
        const custom_event = new CustomEvent("Account.TransactionList.Requested", {
            detail,
        });
        document.dispatchEvent(custom_event);
    }

    /**
     * Sends custom event for address balance
     *
     * @param {HTMLElement} form HTML form
     */
    function requestBalance(form) {
        /** @type {InterfaceWalletBalanceSubmitted} */
        const detail = {
            address: config.address,
            api:     config.api,
            api_key: config.api_key,
            form
        };
        const custom_event = new CustomEvent("Account.Balance.Requested", {
            detail,
        });
        document.dispatchEvent(custom_event);
    }

    /**
     * Load more transactions
     *
     * @param {Event} event On submit
     */
    function loadMore(event) {
        event.preventDefault();
        ++ config.page;
        requestTransationList();
    }


document.addEventListener("DOMContentLoaded", init);
}());
