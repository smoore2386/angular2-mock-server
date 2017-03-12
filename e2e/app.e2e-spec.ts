import { Angular2MockServerPage } from './app.po';

describe('angular2-mock-server App', () => {
  let page: Angular2MockServerPage;

  beforeEach(() => {
    page = new Angular2MockServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
