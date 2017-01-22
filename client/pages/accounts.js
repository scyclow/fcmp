require('styles');
const $ = require('utils/$');
const api = require('utils/api');

window.IMPORTANT = {
  pause: false
};

$.onKeyPress(['p', 'P']) (() =>
  window.IMPORTANT.pause = !window.IMPORTANT.pause
);

const addressContainer = $.cls('account-addresses')[0];


function renderAccounts(addesses) {
  addressContainer.innerHTML = addesses.map(address => `
    <div class="account-listing">
      <div class="account-listing-address">ADDRESS: ${address.address}</div>
      <div class="account-listing-address">BALANCE: ${address.balance}</div>
    </div>
  `).join('');


}

api.get('accounts').then(renderAccounts)
