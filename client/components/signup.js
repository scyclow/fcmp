const $ = require('../utils/$');
const _ = require('../utils/_');
const api = require('../utils/api');

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
$.onClick(
  () => setTimeout(
    () => $(signUpModal, 'margin-top', '-75px'),
    300
  ),
  callToAction
);


// Hide modal when clickin background
$.onClick(() => {

  $(signUpModal, 'margin-top', '100vh')

}, signUpModalBackground);


function *nextLoadingChar(str) {
  let i = 0;
  while (true) yield str[i++ % str.length];
}

function take5s(cb = _.noop) {
  return new Promise((resolve) => setTimeout(() => resolve(cb()), 2000))
}

$.onClick(() => {
  $(signupForm, 'display', 'none');
  signupLoading.innerHTML = 'LOADING ';
  const loadingChars = nextLoadingChar('>>>>>>>$$$$$$$$+++++++');
  const loadingAnimation = setInterval(
    () => signupLoading.innerHTML += loadingChars.next().value,
    50
  );

  const request = api.post('users/', { email: 'bleh@blah.com', pin: '1234' })
    .catch(e => console.error(e))

  Promise.all([request, take5s()])
    .then(() => clearInterval(loadingAnimation))
    .then(() => $(signupLoading, 'display', 'none'))
    .then(() => request.then(response => {

      signupOutput.innerHTML = JSON.stringify(_.pick(response, ['address', 'balance', 'email']));
    }))

}, submission);
