import { AnCliPage } from './app.po';

describe('an-cli App', () => {
  let page: AnCliPage;

  beforeEach(() => {
    page = new AnCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
