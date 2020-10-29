# kacrut-app

List of available endpoints:
* POST /register
* POST /login
* GET /memes
* GET /memes/randomJoke
* POST /memes
* GET /favorites
* POST /favorites
* DELETE /favorites/:id

----

**REGISTER**
----
  Register into the web app

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        username: "string",
        password: "string"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

 
* **Error Response:** ini juga diisi

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat register disini
  ```

----

**LOGIN**
----
  Login into the web app

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**
    ```javascript
    {
        username: "string",
        password: "string"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

 
* **Error Response:** ini juga diisi

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```javascript
    {
        isi disini ya
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat login disini
  ```

-----


**GET MEMES**
----
  Returns data of all memes in the db

* **URL**

  /memes

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        {
            id: "number",
            name: "string",
            url: "string",
            width: "number",
            height: "number"
        },
        {
            ...
        },
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat get memes disini
  ```

----

**GET RANDOM JOKE**
----
  Returns data of a random joke

* **URL**

  /memes/randomJoke

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        error: false,
        category: "Dark",
        type: "twopart",
        setup: "How do we know Jesus wasn't black?",
        delivery: "He would have been hung from a tree, not a cross.",
        flags: {
            nsfw: false,
            religious: true,
            political: false,
            racist: true,
            sexist: false
        },
        id: 112,
        lang: "en"
    }
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat get random disini
  ```

----

**ADD MEME**
----
  Returns data of a newly added meme

* **URL**

  /memes

* **Method:**

  `POST`

* **Data Params**

    * **headers**
        ```javascript
        access_token = "string"
        ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
        id: "number",
        name: "string",
        url: "string",
        width: "number",
        height: "number"
    }
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat add meme disini
  ```

----

**GET FAVORITES**
----
  Returns data of user's favorite memes

* **URL**

  /favorites

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        ntar y
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

    OR

  * **Code:** 401 <br />
    **Content:** 
    ```javascript
    {
        msg: "authentication failed"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat get favorit disini
  ```

----

**ADD FAVORITES**
----
  Add a meme to favorites

* **URL**

  /favorites

* **Method:**

  `POST`

* **Data Params**

    * **headers**
        ```javascript
        access_token = "string"
        ```
    * **data**
        ```javascript
        {
            UserId: "integer",
            MemeId: "integer"
        }
        ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        ntar y
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

    OR

  * **Code:** 401 <br />
    **Content:** 
    ```javascript
    {
        msg: "authentication failed"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat add favorit disini
  ```

----

**DELETE FAVORITE**
----
  Delete a meme from the favorite list

* **URL**

  /favorites/:id

* **Method:**

  `DELETE`

* **URL Params**

    **required**
    `id: "integer"`

* **Data Params**

    * **headers**
        ```javascript
        access_token = "string"
        ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
        ntar y
    ]
    ```

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```javascript
    {
        msg: "internal server error"
    }
    ```

    OR

  * **Code:** 401 <br />
    **Content:** 
    ```javascript
    {
        msg: "not authorized"
    }
    ```

    OR

  * **Code:** 404 <br />
    **Content:** 
    ```javascript
    {
        msg: "favorite not found"
    }
    ```

* **Sample Call:**

  ```javascript
  yang kerjain client isi $.ajax() buat delete favorit disini
  ```

----