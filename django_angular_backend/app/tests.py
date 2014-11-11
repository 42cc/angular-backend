"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.core.urlresolvers import reverse
from django.test import LiveServerTestCase
from selenium import webdriver

myInfo = {
    'First Name':    'Ruslan',
    'Last Name':     'Makarenko',
    'Date of birth': '01.12.1986',
    'Email':         'ruslan.makarenko@gmail.com',
    'Jabber':        'macruss@jabber.kiev.ua'
}
        
class MyInfoPageTest(LiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()
        
    def test_render_my_info_on_main_page(self):
        self.browser.get(self.live_server_url)

        contact_fields = self.browser.find_elements_by_tag_name('tr')

        for i in range(len(myInfo)):
            self.assertIn(contact_fields[i].text, myInfo.keys()[i])
            self.assertIn(contact_fields[i].text, myInfo.values()[i])

