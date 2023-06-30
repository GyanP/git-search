from django.test import TestCase
from django.core.cache import cache
from unittest.mock import patch

from api.exceptions import GitInvalidSearchError

class MyViewTestCase(TestCase):
    def test_get_cache_clear(self):
        # Set some data in cache for testing purposes
        cache.set('key1', 'value1')
        cache.set('key2', 'value2')

        response = self.client.get('/api/clear-cache/')

        # Assert cache is cleared
        self.assertIsNone(cache.get('key1'))
        self.assertIsNone(cache.get('key2'))

        # Assert response
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'message': 'Cache clear successfully'})

    def test_post_invalid_search(self):
        search_type = ''
        search_text = 'test'
  
        # Make the request
        response = self.client.post('/api/search/', {'type': search_type, 'text': search_text})
        # Assert response
        self.assertEqual(response.status_code, GitInvalidSearchError().get_json_response().status_code)
        self.assertEqual(response.content, GitInvalidSearchError().get_json_response().content)

    @patch('search.api.views.cache.get')
    def test_post_valid_search_cached_results(self, mock_cache_get):
        search_type = 'users'
        search_text = 'test'
        cache_key = f"{search_type}:{search_text}"
        cached_results = '{"results": "cached results"}'

        # Mock cache.get method to return cached results
        mock_cache_get.return_value = cached_results

        # Make the request
        response = self.client.post('/api/search/', {'type': search_type, 'text': search_text})

        # Assert cache method call
        mock_cache_get.assert_called_once_with(cache_key)

        # Assert response
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'results': 'cached results'})

    def test_post_valid_search_fetch_results(self):
        search_type = 'users'
        search_text = 'test'
        cache.clear()
        response = self.client.post('/api/search/', {'type': search_type, 'text': search_text})        
        # Assert response
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json()['items']))


