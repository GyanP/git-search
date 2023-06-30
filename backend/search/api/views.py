import json
from django.http import JsonResponse
from django.conf import settings

from django.core.cache import cache
from rest_framework.views import APIView

from .exceptions import GitApiFailedError, GitInvalidSearchError
from .adapter import Adapter


class GitSearchView(APIView):
    def post(self, request, *args, **kwargs):
        search_type = request.data.get('type', None)  # User-selected search type: users, repositories, or issues
        search_text = request.data.get('text', None)  # User-provided search text

        # Check if search_type and search_text are valid and not empty
        try:
            if search_type and search_text:
                # Check if the results are already cached in Redis
                cache_key = f"{search_type}:{search_text}"
                cached_results = cache.get(cache_key)
                
                if cached_results:
                    results = json.loads(cached_results)
                else:
                    # Fetch results from GitHub API
                    adapter_instance = Adapter(
                        slug = 'github', ip = settings.GITHUB_API,
                    ).adapter
                    response = adapter_instance.search_repositories_or_users(search_type, search_text)
                    if response.status_code == 200:
                        results = response.json()
                        # Cache results in Redis for 2 hours
                        cache.set(cache_key, json.dumps(results), timeout=7200)
                    else:
                        raise GitApiFailedError
                       
                return JsonResponse(results, safe=False)
            else:
                raise GitInvalidSearchError
        
        except (GitApiFailedError, GitInvalidSearchError) as error:
            return error.get_json_response()
   
   # Clear the cache from redis
    def get(self,request, *args, **kwargs):
        cache.clear()
        return JsonResponse(data = {"message":"Cache clear successfully"}, status=200)

            

        