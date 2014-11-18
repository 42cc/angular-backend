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


class ValidationTest(LiveServerTestCase):
    fixtures = ['initial_data.json']

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_required_fields(self):
        self.browser.get(self.live_server_url + '#/contacts/1')

        submit_error_msg = self.browser.find_elements_by_id('error_msg')
        save_btn = self.browser.find_element_by_name('cSave"]')


        first_name_field = self.browser.find_element_by_name('cName')
        first_name_field.clear()

        fn_message = self.browser.find_element_by_css_selector('span[ng-show="!edit.contact.first_name"]')
        self.assertEquals(first_name_field.value_of_css_property('background-color'), '#EF7E7E')
        self.assertEquals(fn_message.is_displayed(), True)
        self.assertEquals(submit_error_msg.is_displayed(), True)
        self.assertFalse(save_btn.is_enabled())


        first_name_field.send_keys("Ruslan")
        self.assertEquals(first_name_field.value_of_css_property('background-color'), '#8CD95E')
        self.assertEquals(fn_message.is_displayed(), False)
        self.assertEquals(submit_error_msg.is_displayed(), False)
        self.assertTrue(save_btn.is_enabled())

        last_name_field = self.browser.find_element_by_name('cSurname')
        last_name_field.clear()

        ln_message = self.browser.find_element_by_css_selector('span[ng-show="!edit.contact.last_name"]')
        self.assertEquals(first_name_field.value_of_css_property('background-color'), '#EF7E7E')
        self.assertEquals(ln_message.is_displayed(), True)
        self.assertEquals(submit_error_msg.is_displayed(), True)
        self.assertFalse(save_btn.is_enabled())


        last_name_field.send_keys("Makarenko")
        self.assertEquals(first_name_field.value_of_css_property('background-color'), '#8CD95E')
        self.assertEquals(ln_message.is_displayed(), False)
        self.assertEquals(submit_error_msg.is_displayed(), False)
        self.assertTrue(save_btn.is_enabled())

    def test_valitaion_email_field(self):
        self.browser.get(self.live_server_url + '#/contacts/1')

        save_btn = self.browser.find_element_by_name('cSave"]')
        email = self.browser.find_element_by_name('cEmail')
        email.clear()

        message = self.browser.find_element_by_css_selector('[ng-show="form.cEmail.$error.email"]')
        submit_error_msg = self.browser.find_elements_by_id('error_msg')

        email.send_keys('name')

        self.assertTrue(message.is_displayed())
        self.assertTrue(submit_error_msg.is_displayed())
        self.assertEquals(email.value_of_css_property('background-color'), '#EF7E7E')
        self.assertFalse(save_btn.is_enabled())

        email.send_keys('name@example.com')

        self.assertFalse(message.is_displayed())
        self.assertFalse(submit_error_msg.is_displayed())
        self.assertEquals(email.value_of_css_property('background-color'), '#8CD95E')
        self.assertTrue(save_btn.is_enabled())

    def test_validation_phone_number(self):
        self.browser.get(self.live_server_url + '#/contacts/1')

        submit_error_msg = self.browser.find_elements_by_id('error_msg')
        save_btn = self.browser.find_element_by_name('cSave"]')

        msg_phone = self.browser.find_element_by_css_selector(
            '[ng-show="form.phoneNumber.$error.phoneNumber"]'
        )
        msg_cellphone = self.browser.find_element_by_css_selector(
            '[ng-show="form.cellPhoneNumber.$error.phoneNumber"]'
        )

        phone = self.browser.find_element_by_name('phoneNumber')
        cellphone = self.browser.find_element_by_name('cellPhoneNumber')

        def phone_field_testing(phone, msg):
            phone.send_keys('12345678910')
            self.assertTrue(msg.is_displayed())
            self.assertTrue(submit_error_msg.is_displayed())
            self.assertFalse(save_btn.is_enabled())

            phone.send_keys('+123456789')
            self.assertTrue(msg.is_displayed())
            self.assertTrue(submit_error_msg.is_displayed())
            self.assertFalse(save_btn.is_enabled())

            phone.send_keys('+12345678910')
            self.assertFalse(msg.is_displayed())
            self.assertFalse(submit_error_msg.is_displayed())
            self.assertTrue(save_btn.is_enabled())

        phone_field_testing(phone, msg_phone)

        phone_field_testing(cellphone, msg_cellphone)



