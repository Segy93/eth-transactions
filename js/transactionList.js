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
        document.addEventListener("Account.TransactionList.Requested", getData, false);
    }

    /**
     * Gets account transactions
     *
     * @param {CustomEvent<InterfaceTransactionListSubmitted>} event Custom event for the transaction list
     */
    function getData(event) {
        const data = event.detail;
        const params = `?module=account&action=txlist&address=${data.address}&startblock=${data.block}&page=${data.page}&offset=10&sort=asc${data.api_key}`;
        fetch(`${data.api}${params}`)
            .then((res) =>
                res.json()
            )
            .then((out) =>
                renderTable(out)
            )
            .catch(function(err) { throw err; })
        ;
    }

    /**
     * Renders data
     *
     * @param {Object} data data
     */
    function renderTable(data) {
        data.result.forEach(function(single) {
            // eslint-disable-next-line no-undef
            const eth = ethers.utils.formatEther(single.value);
            document.querySelector(".index__tbody").insertAdjacentHTML(
                "beforeend",
                `<tr>
                    <td>${single.from}</td>
                    <td>${single.to}</td>
                    <td>${eth}</td>
                </tr>`
            );
        });
    }


document.addEventListener("DOMContentLoaded", init);
}());
