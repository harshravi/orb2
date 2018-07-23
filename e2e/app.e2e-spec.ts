import { FordORB2Page } from './app.po';

describe('ford-orb2 App', () => {
  let page: FordORB2Page;

  beforeEach(() => {
    page = new FordORB2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
