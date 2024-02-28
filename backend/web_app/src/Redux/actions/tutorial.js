import * as types from '../constants/tutorial';

export const updateTutorialState = data => ({
  type: types.UPDATE_TUTORIAL_STATE,
  data,
});

export const showWelcomeModal = data => ({
  type: types.SHOW_WELCOME_MODAL,
  data,
});
