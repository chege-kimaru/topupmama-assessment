# TopUpMama Assessment

[Visit App](https://topupmamaassessment.netlify.app)

## Tech Used

- Angular 11
- NgRx
- Bootstrap 4
- Ngx-toatr
- SweetAlert 2

## Installation

1. `git clone https://github.com/chege-kimaru/topupmama-assessment.git && cd topupmama-assessment`
2. `npm install`
3. `ng s -o`

## Instructions, Guidelines and Assumptions

### Registration

As per the API, you can only use the following accounts to register a new user:

- george.bluth@reqres.in
- janet.weaver@reqres.in
- emma.wong@reqres.in
- eve.holt@reqres.in
- charles.morris@reqres.in
- tracey.ramos@reqres.in

Only the following symbols are allowed in the password `!@#$%^&*-+=.`

### Login

The API does not persist new data including your password, the browser therefore simulates the authentication process. You therefore need to login from the same device you registered with.

Once logged in, on refreshing page, you continue with your previous session not unless it has expired in which case you will need to login again.

### Refresh Token

Similarly, the api does not have an actual refresh token endpoint. To simulate the refreshing, we use the login endpoint with the login details the user had provided earlier.

### Manage users

In the same way, new users you add will be saved in state and will be lost every time you refresh the page.

Pagination is tied to the server, once you change pages (load data for that page), any updated information will be overwritten with the original data since the API did not persist your updates.

### Account

Once you edit your account, the new details will only remain as long as you do not refresh the page.

### User Location

I am using [Ip Registry](https://api.ipregistry.co/?key=tryout) to get user information. Since I am using a `tryout` api key, you might receive a `429, TOO MANY REQUESTS` when you refresh the page many times.

## Others

The main focus of the app was the functionality rather than the design. We are therefore depending entirely on bootstrap for its components.

The application can further be improved. I have left TODO marks where there needs to be improvement.
