// spec.js
describe('ticket 1: Show my name, surname, bio, contacts on the main page ', function() {
 

 it('should have a correct title', function() {
    browser.get('http://127.0.0.1/static/tickets/01/index.html');

 
    expect(browser.getTitle()).toEqual('42cc-Contacts-Ticket 1')

  });

  it('should display my name', function() {
    expect(element(by.binding('my.contact.firstName')).getText()).toEqual('Dmitry');
  });


  it('should display my surnname', function() {
    expect(element(by.binding('my.contact.lastName')).getText()).toEqual('Scheglov');
  });

  it('should display my birthday', function() {
    expect(element(by.binding('my.contact.birthday')).getText()).toEqual('1979-12-15');
  });

  it('should display my bio', function() {
    expect(element(by.binding('my.contact.bio')).getText()).toEqual('180cm, 72kg');
  });

  it('should display my skype id', function() {
    expect(element(by.binding('my.contact.skype')).getText()).toEqual('Dmitry.Scheglov');
  });

  it('should display my e-mail', function() {
    expect(element(by.binding('my.contact.eMail')).getText()).toEqual('Dmitry.Scheglov@gmail.com');
  });

  it('should display my jabber', function() {
    expect(element(by.binding('my.contact.jabber')).getText()).toEqual('schehlovd@42cc.co');
  });

  it('should display other info avbout me', function() {
    expect(element(by.binding('my.contact.other')).getText()).toEqual('...');
  });

});
