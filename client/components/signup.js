const $ = require('../utils/$');
const _ = require('../utils/_');
const api = require('../utils/api');
const API_ROOT = api.root;
const CLIENT_ROOT = process.env.CLIENT_ROOT

const callToAction = $.id('call-to-action');
const signUpModal = $.id('signup-modal-container');
const signUpModalBackground = $.cls('signup-modal-background')[0];
const submission = $.id('signup-submission');
const signupForm = $.id('signup-form');
const signupLoading = $.id('signup-loading');
const signupOutput = $.id('signup-output');


const navHeight = '45px';
const modalHeight = `calc(100vh - ${navHeight}`;

$(signUpModal, 'height', modalHeight)

// display modal when call to action is clicked
$.onClick(callToAction)(() => setTimeout(
  () => $(signUpModal, 'margin-top', '-75px'),
  300
));


// Hide modal when clickin background
$.onClick(signUpModalBackground)(() => {

  $(signUpModal, 'margin-top', '100vh')

});


function *nextLoadingChar(str) {
  let i = 0;
  while (true) yield str[i++ % str.length];
}

function setLoadingAnimation() {
  $(signupForm, 'display', 'none');
  signupLoading.innerHTML = 'LOADING ';
  const loadingChars = nextLoadingChar('>>>>>>>$$$$$$$$+++++++');

  const loadingAnimation = setInterval(
    () => signupLoading.innerHTML += loadingChars.next().value,
    50
  );

  return () => {
    // clearInterval(loadingAnimation);
    // $(signupLoading, 'display', 'none');
  }
};

function renderResponse({ address, secretToken }) {
  return `
    <style>
      .response-section {
        border-bottom: 1px solid;
        overflow-wrap: break-word;
        font-size: 18px;
        padding: 5px 0;
      }

      .response-data {
        font-size: 28px;
        background-color: #000;
        color: #fff;
      }

      .api-section {
        padding-bottom: 5px;
        border-bottom: 1px dotted;
      }
    </style>

    <div>
      <div class="response-section">
        YOUR NEW FASTCASH ADDRESS IS: <br>
        <span class="response-data">${address}</span>
      </div>
      <div class="response-section">
        This is your secret token DO NOT GIVE THIS TO ANYONE.
        Whoever posseses this token will have unmitigated access to your fastcash account.<br>
        SECRET TOKEN: <span class="response-data">${secretToken}</span>
      </div>

      <div class="response-section">
        FASTCASHMONEYPLUS.biz is currently in Development Beta mode. As such, the public FASTCASH API is available, with a graphical user interface forthcoming. Esxpected sometime in early 2017.
        <div class="api-section">
          VIEW ALL FASTCASH ADDRESSES AND BALANCES: <br>GET \`
            <a href="${CLIENT_ROOT}accounts">
              ${API_ROOT}accounts
            </a>
          \`
        </div>
        <div class="api-section">
          CREATE A NEW ADDRESS: <br>POST \`${API_ROOT}accounts\`
        </div>
        <div class="api-section">
          VIEW ALL TRANSFERS: <br>GET
            <a href="${CLIENT_ROOT}transfers">
              ${API_ROOT}transfers
            </a>
          \`
        </div>
        <div class="api-section">
          TRANSFER FUNDS FROM YOUR ADDRESS TO ANOTHER ADDRESS
          (NOTE: In development beta, this only queues transfers in the system. A second execution request is required for funds to change hands):<br>
          POST \`${API_ROOT}transfer\`<br>
          WITH THE FOLLOWING JAVA SCRIPT OBJECT NOTATION ("JSON") INCLUDED IN THE REQUEST BODY:<br>
          { payer: &lt;payer address&gt;, payee: &lt;payee address&gt;, amount: &lt;amount: Number&gt; }<br>
          THE REQUEST RETURNS A "JSON" RESPONSE WITH THE FOLLOWING FIELDS:<br>
          { _id: &lt;alpha-numeric identification string&gt;, createdAt: &lt;date of transfer request&gt;, staus: &lt;'PENDING' | 'PROCESSING' | 'FULFILLED'&gt; payer: &lt;payer address&gt;, payee: &lt;payee address&gt;, amount: &lt;amount: Number&gt; }
        </div>
        <div class="api-section">
          EXECUTE TRANSFER:<br>
          POST \`${API_ROOT}transfer/execute\`<br>
          WITH THE FOLLOWING JAVA SCRIPT OBJECT NOTATION ("JSON") INCLUDED IN THE REQUEST BODY:<br>
          { transferId: &gt;_id of transfer request&lt;, payerToken: &gt;address's SECRET TOKEN&lt; }<br>
          THE REQUEST WILL RETURN EITHER A 200 (the transfer was success) OR 500 (the transfer was unsuccess) RESPONSE CODE
        </div>
      </div>
    </div>
  `;
}

$.onClick(submission)(async () => {
  const clearLoadingAnimation = setLoadingAnimation();

  const wait5s = _.promise.wait(2000);
  const request = api.post('accounts').catch(e => console.error(e));

  const [response, something] = await Promise.all([request, wait5s]);

  clearLoadingAnimation();

  signupOutput.innerHTML = renderResponse(response)
});
