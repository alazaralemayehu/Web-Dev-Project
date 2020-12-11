import { assertEquals , assertMatch} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import {authMiddleware} from "../../middlewares/AuthMiddleware.js";
import {app} from '../../app.js';
const expected_login_page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">WSD</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a href="/behavior/reporting" class="nav-link">Report Activities</a> 
            </li>
            <li class="nav-item">
                <a href="/behavior/summary" class="nav-link">Check Activities summary</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Custom Summary
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="/filter_weekly_summary">Weekly Summary</a>
                <a class="dropdown-item" href="/filter_monthly_summary">Monthly Summary</a>
              </div>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
             
            <li class="nav-item">
              <a href="/auth/registration" class="nav-link"><span class="glyphicon glyphicon-user"></span> Sign Up</a>
            </li>
            <li class="nav-item">
              <a href="/auth/login" class="nav-link"><span class="glyphicon glyphicon-log-in"></span> Login</a>
            </li>
          </ul>
        
        </div>
      </nav>
    <div  class="container">
<h1>Login!</h1>
<form class="form-control" method="POST" action="/auth/login">
    
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" name="email" class="form-control" id="email" placeholder="email@example.com">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="form-control" id="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
    <div>New to the website please  <a href="/auth/registration">register</a></div>
</form>

        </div>

    </body>
</html>`;

Deno.test({
    name: "GET request to /api/summary should return 200", 
    async fn() {
        const testClient = await superoak(app);
       await testClient.get("/auth/login")
        .expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({

    name: "GET request to /behavior/reporting should return login page!", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/behavior/reporting").expect(expected_login_page);
        // assertMatch(response, new RegExp('<h1>Login!</h1>'))
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({

  name: "GET request to /behavior/summary should return login page!", 
  async fn() {
      const testClient = await superoak(app);
      await testClient.get("/behavior/summary").expect(expected_login_page);
      // assertMatch(response, new RegExp('<h1>Login!</h1>'))
  },
  sanitizeResources: false,
  sanitizeOps: false
});



