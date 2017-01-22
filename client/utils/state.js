// @flow weak
'use strict';

const _ = require('./_');
const STATE = {};
const actionsHandlers = [];


function on(){}



/*

state.event({
  type: 'something',
  data: 10
})

state.register(
  'substate',
  { data: 5 },
  {
    something: (action, state) => state.something.data = action.data,
    somethingElse: (action, state) => state.something.data = action.data,
  }
);

state.onChange('substate', (substate) => {
  component.innerHTML = substate.data
})

*/
