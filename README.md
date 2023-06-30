Backend Requirements
--------------------

Prerequisites
* python >= 3.8
* pip3
* redis-server == 5.0.7

1. Clone the repository on you local machine with the command: 
    ```
    git clone https://github.com/GyanP/git-search.git
    ```

3. Create a virtual environment. If you don't have virtualenv installed, you can download it with the command:
    ```
    pip install virtualenv
    ```

4. Create a virtual environment with the following command:
    ```
    virtualenv <virtual environment name>
    ```

5. Activate the virtual environment using the command:
    ```
    source <virtual environment name>/bin/activate
    ```

6. Now move to repo with command:
    ```
    cd git-search/backend
    ```

7. Install the app dependencies by running:
    ```
    pip install -r backend/requirements.txt
    ```

8. For apply migrations run following command:
    ```
    python manage.py migrate
    ```

9. Now run the backend server by executing the following command:
    ```
    python manage.py runserver
    ```

10. To Run test case:
    ```
    python manage.py test search
    ```

11. Clear the backend redis cache by following endpoint

    ```
    Method : GET
    Endpoint: http://localhost:8000/api/clear-cache/

    ```

12. Search The repositories , users, issues using the search text please call the following endpoint:

    ```
    Method : POST
    Endpoint: http://localhost:8000/api/search/
    Request Data: {
        'type': "users" // repositories or issues or users
        'text': "xyz"
    }

    Response Data: {
        "total_count": 0, 
        "incomplete_results": false, 
        "items": ["data..."]
    }
    ```

13. Explaination of adapter.py: 
    
    ```
    In backend I used the adapter design pattern for more generic code here you can see /backend/adapter.py the purpose of use that is related Adapter try to make this more and more generic 
    code refactor required, currently we are integrating github search apis if in future we want to integrate bitbucket search, gitlab search we just need to create anthor class in adapter.py without interrupting the our code in views.py, In that file we just need to pass the slug and ip for new git service provider here I skip the keys mapping but in future we can do that as well.
    ```

14. Explaination of exceptions.py:
    ```
    In backend I used the /backend/execptions.py file for more generic code for error handling like if any error comes in api we simply raise that error class inside that error class we mention the error_code, status_code and default_detail then return the response as json.
    ```

Frontend Requirements:
----------------------

1. Now move to repo with command:
    ```
    cd git-search/frontend
    ```

2. Now run the following command for install the frontend dependencies by following command
    ```
    npm install
    ```

2. Now run the frontend server by executing the following command:

    ```
    npm start
    ```

3. Open the link on browser:
    ```
    http://localhost:3000
    ```
