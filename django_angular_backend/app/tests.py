"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.core.urlresolvers import reverse
from django.test import TestCase
from django.test.client import Client



class MainPageTest(TestCase):

    def test_bio_on_main_page(self):
        c = Client()
        response = c.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertIn(response, 'Ruslan')
        self.assertIn(response, 'Makarenko')
        self.assertIn(response, '01.12.2014')
        