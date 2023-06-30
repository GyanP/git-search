from django.http import JsonResponse

from rest_framework.exceptions import APIException
from rest_framework.response import Response


class GitException(APIException):
    error_code = 99999
    status_code = 500
    default_detail = "Internal Server Error"

    def get_error_message(self):
        return self.default_detail

    def get_response(self):
        return Response(
            {
                "success": False,
                "error_code": str(self.error_code),
                "error_message": self.get_error_message(),
            },
            status=self.status_code,
        )

    def get_json_response(self):
        return JsonResponse(
            data = {
                "success": False,
                "error_code": str(self.error_code),
                "error_message": self.get_error_message(),
            },
            status=self.status_code,
        )


class GitApiFailedError(GitException):
    error_code = 11
    status_code = 500
    default_detail = "Failed to fetch results from GitHub API"


class GitInvalidSearchError(GitException):
    error_code = 12
    status_code = 400
    default_detail = "Invalid search type or empty search text"

