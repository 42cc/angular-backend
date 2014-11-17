"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""


from django.test import LiveServerTestCase
from selenium import webdriver


myInfo = [
    ('First Name',    'Ruslan'),
    ('Last Name',     'Makarenko'),
    ('Date of birth', '01.12.1986'),
    ('Email',         'ruslan.makarenko@gmail.com'),
    ('Jabber',        'macruss@jabber.kiev.ua')
]
        
class AngularTest(LiveServerTestCase):
    fixtures = ['initial_data.json']

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()
        
    def test_render_my_info_on_main_page(self):
        self.browser.get(self.live_server_url)
        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEquals(heading.text, 'My info')

        contact_fields = self.browser.find_elements_by_tag_name('tr')

        for i in range(len(myInfo)):
            self.assertIn(myInfo[i][0], contact_fields[i].text)
            self.assertIn(myInfo[i][1], contact_fields[i].text)

    def test_view_contacts(self):
        self.browser.get(self.live_server_url)

        self.browser.find_element_by_link_text('Contacts').click()
        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEquals(heading.text, 'Contacts')

        contacts = self.browser.find_elements_by_css_selector('a[ng-href]')

        self.assertEquals(len(contacts), 5)
        self.assertIn("Leonard", contacts[4].text)

    def _change_items_per_page(self):
        items_per_page = self.browser.find_element_by_css_selector('#items-per-page')
        for option in items_per_page.find_elements_by_tag_name('option'):
            if option.text == '20':
                option.click()
                break

    def test_link_edit_contact(self):
        self.browser.get(self.live_server_url + '#/contacts')

        self._change_items_per_page()

        contact = self.browser.find_element_by_css_selector('a[ng-href="#/contacts/1"]')
        contact.click()

        heading = self.browser.find_element_by_tag_name('h2')
        self.assertEquals(heading.text, 'Edit contact')

    def test_editing_contact(self):
        self.browser.get(self.live_server_url + '#/contacts/1')

        first_name_field = self.browser.find_element_by_css_selector(
            'input[ng-model="edit.contact.first_name"]'
        )
        first_name_field.clear()
        first_name_field.send_keys("Ruslan")

        last_name_field = self.browser.find_element_by_css_selector(
            'input[ng-model="edit.contact.last_name"]'
        )
        last_name_field.clear()
        last_name_field.send_keys("Makarenko")

        email_field = self.browser.find_element_by_css_selector(
            'input[ng-model="edit.contact.email"]'
        )
        email_field.clear()
        email_field.send_keys("ruslan.makarenko@gmail.com")

        self.browser.find_element_by_css_selector(
            'button[ng-click="edit.updateContact(edit.contact)"]'
        ).click()

        self.browser.get(self.live_server_url + '#/contacts/')
        self._change_items_per_page()

        contact = self.browser.find_element_by_css_selector('a[ng-href="#/contacts/1"]')
        self.assertEquals(contact.text, "Ruslan Makarenko")

    def test_search_on_contacts(self):
        self.browser.get(self.live_server_url + '#/contacts')

        search_field = self.browser.find_element_by_css_selector('input[ng-model="contacts.search"]')
        search_field.send_keys('Abbott')

        contacts = self.browser.find_elements_by_css_selector('td a[ng-href]')
        self.assertEquals(len(contacts), 1)
        self.assertEquals(contacts[0].text, 'Robert Abbott')

    def test_order_by_contacts(self):
        self.browser.get(self.live_server_url + '#/contacts')

        order_by = self.browser.find_element_by_css_selector('#order-by')

        for option in order_by.find_elements_by_tag_name('option'):
            if option.text == 'Name':
                option.click()
                break

        contacts = self.browser.find_elements_by_css_selector('td a[ng-href]')
        self.assertEquals(contacts[0].text, 'Bruce Ableson')

        for option in order_by.find_elements_by_tag_name('option'):
            if option.text == 'Date of birth':
                option.click()
                break

        dates_of_birth = self.browser.find_elements_by_css_selector('td[ng-bind="contact.birth_date"]')
        self.assertEquals(dates_of_birth[0].text, '1933-03-02')
        self.assertEquals(dates_of_birth[1].text, '1945-12-31')

    def test_page_pagination(self):
        self.browser.get(self.live_server_url + '#/contacts')

        items_per_page = self.browser.find_element_by_css_selector('#items-per-page')

        def change_option_items_per_page(items):
            for option in items_per_page.find_elements_by_tag_name('option'):
                if option.text == items:
                    option.click()
                    break

        change_option_items_per_page('10')

        order_by = self.browser.find_element_by_css_selector('#order-by')
        for option in order_by.find_elements_by_tag_name('option'):
            if option.text == 'Name':
                option.click()
                break

        contacts = self.browser.find_elements_by_css_selector('a[ng-href]')
        self.assertEquals(len(contacts), 10)

        contact1_5 = contacts[5].text
        contact1_4 = contacts[4].text

        change_option_items_per_page('5')

        next_btn = self.browser.find_element_by_link_text('NEXT')
        prev_btn = self.browser.find_element_by_link_text('PREV')

        next_btn.click()

        contacts2 = self.browser.find_elements_by_css_selector('a[ng-href]')
        self.assertEquals(len(contacts2), 5)

        contact2 = contacts2[0].text
        self.assertEquals(contact1_5, contact2)

        prev_btn.click()

        contacts3 = self.browser.find_elements_by_css_selector('a[ng-href]')

        contact3 = contacts3[4].text
        self.assertEquals(contact1_4, contact3)