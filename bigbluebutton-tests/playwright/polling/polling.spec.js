const { test } = require('../fixtures');
const { fullyParallel } = require('../playwright.config');
const { Polling } = require('./poll');
const { initializePages } = require('../core/helpers');

test.describe('Polling', async () => {
  const polling = new Polling();

  test.describe.configure({ mode: fullyParallel ? 'parallel' : 'serial' });
  test[fullyParallel ? 'beforeEach' : 'beforeAll'](async ({ browser }) => {
    await initializePages(polling, browser, { isMultiUser: true });
  });

  // Manage
  test('Create poll @ci', async () => {
    await polling.createPoll();
  });

  test('Create anonymous poll @ci', async () => {
    await polling.pollAnonymous();
  });

  test('Create quick poll - from the slide @ci', async () => {
    await polling.quickPoll();
  });

  test('Create poll with user response @ci @flaky', async () => {
    await polling.pollUserResponse();
  });

  test('Stop a poll manually @ci', async () => {
    await polling.stopPoll();
  });

  test('Manage response choices', async () => {
    await polling.manageResponseChoices();
  });

  test('Not able to start new poll without presentation', async () => {
    await polling.notAbleStartNewPollWithoutPresentation();
  });

  test('Custom input @ci', async () => {
    await polling.customInput();
  });

  test('Allow multiple choices @ci', async () => {
    await polling.allowMultipleChoices();
  });

  test('Smart slides questions', async () => {
    await polling.smartSlidesQuestions();
  });

  // Results
  test('Poll results in chat message @ci', async () => {
    await polling.pollResultsOnChat();
  });

  test('Poll results on whiteboard @ci', async () => {
    await polling.pollResultsOnWhiteboard();
  });

  test('Poll results in a different presentation', async () => {
    await polling.pollResultsInDifferentPresentation();
  });
});
