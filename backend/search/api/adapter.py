import requests
from urllib.parse import urljoin


# Abstract interface for the Git service
class GitService:
    _session = None
    timeout = 60
    _api_root = ''
    credentials = None

    def __init__(self, ip: str, credentials=None, timeout=None, **kwargs):
        self._host = ip
        self.timeout = timeout
        self.credentials = credentials or {}
        self._session = requests.Session()

    @property
    def api_root(self):
        return self._api_root

    def get_url(self, entity):
        url = urljoin(self._host, self.api_root)
        return urljoin(url, entity)

    def make_request(self, method, url, params=None, data=None, mapper=None):
        params = params or {}
        params.update(self.credentials)
        return self._session.request(method, url, params, data, timeout=self.timeout)
    
    def search_repositories_or_users(self, query):
        pass


# Adapter for GitHub
class GitHubAdapter(GitService):
    def search_repositories_or_users(self, entity, query):
        # Call the appropriate GitHub API method to fetch repositories or users
        url = self.get_url(entity)
        response = self.make_request('GET', url, params={'q':query})
        return response


github = 'github'

adapters = {
    github: GitHubAdapter
    # Here we can add more git service provider like gitlab, bitbucket etc.
}

class Adapter(object):
    adapter = {}

    def __init__(self, slug, *args, **kwargs):
        self.slug = slug
        """
        related Adapter try to make this more and more generic 
        code refactor required.
        """
        self.adapter = adapters[self.slug](**kwargs)

